import { useCallback } from 'react';
import { useWalletStore, WalletType } from '@/store/walletState';
import { XamanConnector, FuturePassConnector } from '@/lib/walletConnect';

export function useWallet() {
	const { wallet, setWallet, resetWallet, getDisplayAddress } = useWalletStore();

	// 지갑 연결 함수
	const connectWallet = useCallback(
		async (type: WalletType) => {
			if (!type) return;

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
		[setWallet, resetWallet]
	);

	// 지갑 연결 해제 함수
	const disconnectWallet = useCallback(async () => {
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
	}, [wallet.type, resetWallet]);

	// 잔액 새로고침 함수
	const refreshBalance = useCallback(async () => {
		if (!wallet.connected || !wallet.address) return;

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
	}, [wallet.connected, wallet.address, wallet.type, setWallet]);

	return {
		wallet,
		connectWallet,
		disconnectWallet,
		refreshBalance,
		getAddressDisplay: getDisplayAddress,
	};
}
