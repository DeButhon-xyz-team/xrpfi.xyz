import { useCallback, useEffect, useState } from 'react';
import { useWalletStore, WalletType } from '@/store/walletState';
import { XamanConnector, FuturePassConnector, initXamanSDK, activateTestnetAccount } from '@/lib/walletConnect';

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

	// 로딩 상태만 리셋하는 함수
	const resetLoadingState = useCallback(() => {
		setWallet({ loading: false });
	}, [setWallet]);

	// 지갑 연결 함수
	const connectWallet = useCallback(
		async (type: WalletType) => {
			if (!isClient || !type) return false;

			try {
				// 로딩 상태 시작
				setWallet({ loading: true, type });

				let address: string;
				let balance: number;

				// 지갑 유형에 따른 연결 로직 실행
				if (type === 'xaman') {
					const result = await XamanConnector.connect();
					if (!result || !result.address) {
						throw new Error('Xaman 지갑 연결이 취소되었거나 실패했습니다.');
					}
					address = result.address;
					balance = await XamanConnector.getBalance(address);
				} else if (type === 'futurepass') {
					const result = await FuturePassConnector.connect();
					if (!result || !result.address) {
						throw new Error('FuturePass 지갑 연결이 취소되었거나 실패했습니다.');
					}
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

				// 실패 시 상태 초기화 - 명시적으로 loading: false 설정
				setWallet({ loading: false, type: null });

				return false;
			}
		},
		[isClient, setWallet]
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
			// 실패해도 상태는 초기화
			resetWallet();
			return false;
		}
	}, [isClient, wallet.type, resetWallet]);

	// 잔액 새로고침 함수
	const refreshBalance = useCallback(async () => {
		if (!isClient || !wallet.connected || !wallet.address) return;

		try {
			setWallet({ loading: true });

			let balance: number;

			if (wallet.type === 'xaman') {
				balance = await XamanConnector.getBalance(wallet.address);
			} else if (wallet.type === 'futurepass') {
				balance = await FuturePassConnector.getBalance(wallet.address);
			} else {
				setWallet({ loading: false });
				return;
			}

			setWallet({ balance, loading: false });
		} catch (error) {
			console.error('잔액 새로고침 오류:', error);
			setWallet({ loading: false });
		}
	}, [isClient, wallet.connected, wallet.address, wallet.type, setWallet]);

	// 테스트넷 XRP 요청 함수
	const requestTestnetXRP = useCallback(async () => {
		if (!isClient || !wallet.connected || !wallet.address) return false;

		try {
			// 지갑 유형에 따라 적절한 함수 호출
			if (wallet.type === 'xaman' && XamanConnector.requestTestnetXRP) {
				return await XamanConnector.requestTestnetXRP(wallet.address);
			} else if (wallet.type === 'futurepass' && FuturePassConnector.requestTestnetXRP) {
				return await FuturePassConnector.requestTestnetXRP(wallet.address);
			} else {
				// 기본 테스트넷 활성화 함수 사용
				return await activateTestnetAccount(wallet.address);
			}
		} catch (error) {
			console.error('테스트넷 XRP 요청 오류:', error);
			return false;
		}
	}, [isClient, wallet.connected, wallet.address, wallet.type]);

	return {
		wallet,
		connectWallet,
		disconnectWallet,
		refreshBalance,
		resetLoadingState,
		requestTestnetXRP,
		getAddressDisplay: getDisplayAddress,
		isClient,
	};
}
