'use client';

import React, { useState, Suspense } from 'react';
import PageWrapper from '@/components/global/PageWrapper';
import StakingTabs from '@/components/staking/StakingTabs';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from '@/components/wallet/WalletModal';
import { useSearchParams } from 'next/navigation';

// 탭 파라미터를 처리하는 클라이언트 컴포넌트
function StakingContent() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') as 'stake' | 'withdraw' | null;

	return <StakingTabs defaultTab={tab || 'stake'} />;
}

export default function StakingPage() {
	const { wallet } = useWallet();
	const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

	return (
		<PageWrapper title="XRP 스테이킹 관리">
			<Suspense fallback={<StakingTabs defaultTab="stake" />}>
				<StakingContent />
			</Suspense>

			{/* 지갑 연결 모달 */}
			<WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
		</PageWrapper>
	);
}
