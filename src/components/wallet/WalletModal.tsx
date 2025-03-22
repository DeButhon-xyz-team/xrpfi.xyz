'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Wallet, Loader } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { WalletType } from '@/store/walletState';

type WalletModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
	const { connectWallet, wallet } = useWallet();

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
						disabled={wallet.loading}
					>
						{wallet.loading && wallet.type === 'futurepass' ? (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Wallet className="mr-2 h-4 w-4" />
						)}
						FuturePass 연결
					</Button>
				</div>

				<div className="pt-2 text-xs text-gray-400">
					<p>연결함으로써 이용약관 및 개인정보처리방침에 동의합니다.</p>
				</div>
			</div>
		</Modal>
	);
}
