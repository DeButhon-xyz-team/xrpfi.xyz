'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/global/PageWrapper';
import StakingTabs from '@/components/staking/StakingTabs';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from '@/components/wallet/WalletModal';
import { useSearchParams } from 'next/navigation';

export default function StakingPage() {
	const { wallet } = useWallet();
	const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') as 'stake' | 'withdraw' | null;

	return (
		<PageWrapper title="XRP 스테이킹 관리">
			<StakingTabs defaultTab={tab || 'stake'} />

			{/* 지갑 연결 모달 */}
			<WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
		</PageWrapper>
	);
}
