'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PageWrapper from '@/components/global/PageWrapper';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from '@/components/wallet/WalletModal';
import { useState } from 'react';

export default function Withdraw() {
	const { wallet } = useWallet();
	const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

	return (
		<PageWrapper title="스테이킹 해지">
			<Card className="max-w-md mx-auto">
				<h2 className="text-xl font-semibold mb-4">스테이킹 해지</h2>
				<div className="p-3 bg-dark-background/40 rounded-md mb-4">
					<p className="text-sm font-medium">
						현재 스테이킹: <span className="text-white">0.00 XRP</span>
					</p>
					<p className="text-sm font-medium">
						누적 보상: <span className="text-neon-green">0.00 RLUSD</span>
					</p>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">해지 수량 (XRP)</label>
					<input
						type="number"
						className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-md focus:outline-none focus:ring-1 focus:ring-neon-purple"
						placeholder="0.0"
						disabled={!wallet.connected}
					/>
				</div>

				{wallet.connected ? (
					<Button className="w-full">해지 실행</Button>
				) : (
					<Button className="w-full" onClick={() => setIsWalletModalOpen(true)}>
						지갑 연결
					</Button>
				)}
			</Card>

			<WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
		</PageWrapper>
	);
}
