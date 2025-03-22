'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Wallet, Loader, Info } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { WalletType } from '@/store/walletState';

type WalletModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
	const { connectWallet, wallet, isClient } = useWallet();

	// 서버 사이드 렌더링인 경우 빈 모달 반환
	if (!isClient) {
		return null;
	}

	const handleConnect = async (type: WalletType) => {
		const success = await connectWallet(type);
		if (success) {
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="지갑 연결" size="sm">
			<div className="space-y-4">
				<p className="text-sm text-gray-400 mb-4">XRPL 지갑을 연결하여 스테이킹 서비스를 이용하세요.</p>

				<div className="flex flex-col space-y-3">
					<Button
						onClick={() => handleConnect('xaman')}
						className="w-full justify-start items-center"
						disabled={wallet.loading}
					>
						{wallet.loading && wallet.type === 'xaman' ? (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Wallet className="mr-2 h-4 w-4" />
						)}
						Xaman (XUMM) 연결
					</Button>

					<Button
						onClick={() => handleConnect('futurepass')}
						className="w-full justify-start items-center"
						variant="secondary"
						disabled={wallet.loading || true}
					>
						{wallet.loading && wallet.type === 'futurepass' ? (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Wallet className="mr-2 h-4 w-4" />
						)}
						FuturePass 연결 (준비 중)
					</Button>
				</div>

				<div className="p-3 bg-dark-background/40 rounded-md flex items-start space-x-2 mt-4">
					<Info className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
					<div className="text-xs text-gray-400">
						<p className="mb-1">Xaman 연결 시 알림창이 나타납니다. Xaman 앱에서 요청을 승인해주세요.</p>
						<p>FuturePass 연결은 현재 준비 중입니다.</p>
					</div>
				</div>

				<div className="pt-2 text-xs text-gray-400">
					<p>연결함으로써 이용약관 및 개인정보처리방침에 동의합니다.</p>
				</div>
			</div>
		</Modal>
	);
}
