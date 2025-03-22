'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import PageWrapper from '@/components/global/PageWrapper';
import WalletInfo from '@/components/wallet/WalletInfo';
import StakingSummary from '@/components/staking/StakingSummary';
import AssetChart from '@/components/staking/AssetChart';
import { useWallet } from '@/hooks/useWallet';

export default function Home() {
	const { wallet } = useWallet();

	return (
		<PageWrapper title="Dashboard">
			<div className="flex flex-col gap-6 w-full">
				<StakingSummary />
				<Card title="지갑 정보" className="w-full">
					{wallet.connected ? (
						<WalletInfo />
					) : (
						<div className="text-center py-6">
							<p className="text-gray-400">지갑을 연결하여 지갑 정보를 확인하세요.</p>
						</div>
					)}
				</Card>
				<AssetChart />
			</div>
		</PageWrapper>
	);
}
