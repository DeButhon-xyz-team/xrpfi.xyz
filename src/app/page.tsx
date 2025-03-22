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
		<PageWrapper title="XRPFI 대시보드">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<StakingSummary />
				<AssetChart />
				<Card title={wallet.connected ? '지갑 정보' : '빠른 링크'}>
					{wallet.connected ? (
						<WalletInfo />
					) : (
						<div className="flex flex-col space-y-2">
							<a href="/stake" className="text-neon-blue hover:text-neon-purple transition-colors duration-150">
								스테이킹 하기
							</a>
							<a href="/withdraw" className="text-neon-blue hover:text-neon-purple transition-colors duration-150">
								스테이킹 해지하기
							</a>
						</div>
					)}
				</Card>
			</div>
		</PageWrapper>
	);
}
