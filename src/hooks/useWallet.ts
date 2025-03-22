import { useCallback, useEffect, useState } from 'react';
import { useWalletStore, WalletType } from '@/store/walletState';
import { XamanConnector, FuturePassConnector, initXamanSDK } from '@/lib/walletConnect';

export function useWallet() {
	const { wallet, setWallet, resetWallet, getDisplayAddress } = useWalletStore();
	const [isClient, setIsClient] = useState(false);

	// 클라이언트 사이드 렌더링 확인
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Xaman SDK 초기화
	useEffect(() => {
		// 브라우저 환경에서만 실행
		if (!isClient) return;

		const initializeSdk = async () => {
			try {
				await initXamanSDK();
				console.log('Xaman SDK initialized');
			} catch (error) {
				console.error('Xaman SDK initialization error:', error);
			}
		};

		initializeSdk();
	}, [isClient]);

	// 지갑 연결 함수
	const connectWallet = useCallback(
		async (type: WalletType) => {
			if (!isClient || !type) return false;

			try {
				// 로딩 상태 시작
				setWallet({ loading: true });

				let address: string;
				let balance: number;

				// 지갑 유형에 따른 연결 로직 실행
				if (type === 'xaman') {
					const result = await XamanConnector.connect();
					address = result.address;
					balance = await XamanConnector.getBalance(address);
				} else if (type === 'futurepass') {
					const result = await FuturePassConnector.connect();
					address = result.address;
					balance = await FuturePassConnector.getBalance(address);
				} else {
					throw new Error('지원되지 않는 지갑 유형입니다.');
				}

				// 연결 성공 시 상태 업데이트
				setWallet({
					connected: true,
					address,
					balance,
					type,
					loading: false,
				});

				return true;
			} catch (error) {
				console.error('지갑 연결 오류:', error);

				// 실패 시 상태 초기화
				resetWallet();

				return false;
			}
		},
		[isClient, setWallet, resetWallet]
	);

	// 지갑 연결 해제 함수
	const disconnectWallet = useCallback(async () => {
		if (!isClient) return false;

		try {
			if (wallet.type === 'xaman') {
				await XamanConnector.disconnect();
			} else if (wallet.type === 'futurepass') {
				await FuturePassConnector.disconnect();
			}

			// 상태 초기화
			resetWallet();

			return true;
		} catch (error) {
			console.error('지갑 연결 해제 오류:', error);
			return false;
		}
	}, [isClient, wallet.type, resetWallet]);

	// 잔액 새로고침 함수
	const refreshBalance = useCallback(async () => {
		if (!isClient || !wallet.connected || !wallet.address) return;

		try {
			let balance: number;

			if (wallet.type === 'xaman') {
				balance = await XamanConnector.getBalance(wallet.address);
			} else if (wallet.type === 'futurepass') {
				balance = await FuturePassConnector.getBalance(wallet.address);
			} else {
				return;
			}

			setWallet({ balance });
		} catch (error) {
			console.error('잔액 새로고침 오류:', error);
		}
	}, [isClient, wallet.connected, wallet.address, wallet.type, setWallet]);

	return {
		wallet,
		connectWallet,
		disconnectWallet,
		refreshBalance,
		getAddressDisplay: getDisplayAddress,
		isClient,
	};
}
