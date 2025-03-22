import React from 'react';
import { useStakingStore } from '@/store/stakingState';
import { useWalletStore } from '@/store/walletState';
import Card from '@/components/ui/Card';

const StakingSummary: React.FC = () => {
	const { stakingInfo, isLoading } = useStakingStore();
	const { wallet } = useWalletStore();

	if (!wallet.connected) {
		return (
			<Card title="스테이킹 개요">
				<div className="text-center py-6">
					<p className="text-gray-400">지갑을 연결하여 스테이킹 정보를 확인하세요.</p>
				</div>
			</Card>
		);
	}

	if (isLoading) {
		return (
			<Card title="스테이킹 개요">
				<div className="flex justify-center items-center h-32">
					<div className="loader w-8 h-8 border-4 border-t-neon-blue rounded-full animate-spin"></div>
				</div>
			</Card>
		);
	}

	return (
		<Card title="스테이킹 개요">
			<div className="space-y-4 p-2">
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-black/20 rounded-lg p-4">
						<h3 className="text-sm text-gray-400 mb-1">스테이킹된 XRP</h3>
						<p className="text-2xl font-bold text-white">
							{stakingInfo.stakedAmount.toLocaleString()} <span className="text-sm">XRP</span>
						</p>
					</div>
					<div className="bg-black/20 rounded-lg p-4">
						<h3 className="text-sm text-gray-400 mb-1">누적 보상</h3>
						<p className="text-2xl font-bold text-neon-purple">
							{stakingInfo.earnedReward.toLocaleString()} <span className="text-sm">RLUSD</span>
						</p>
					</div>
				</div>

				<div className="bg-black/20 rounded-lg p-4">
					<div className="flex justify-between items-center">
						<h3 className="text-sm text-gray-400">예상 연간 수익률</h3>
						<span className="text-lg font-bold text-neon-blue">{stakingInfo.apr}%</span>
					</div>
					<div className="mt-2">
						<div className="h-2 bg-gray-800 rounded-full overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
								style={{ width: `${stakingInfo.apr * 2}%` }}
							/>
						</div>
					</div>
				</div>

				<div className="text-right">
					<a href="/stake" className="text-sm text-neon-blue hover:text-neon-purple transition-colors duration-150">
						추가 스테이킹 &rarr;
					</a>
				</div>
			</div>
		</Card>
	);
};

export default StakingSummary;
