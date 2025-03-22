'use client';

import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { ExternalLink, Copy, RefreshCw } from 'lucide-react';
import IconButton from '@/components/ui/IconButton';

export default function WalletInfo() {
	const { wallet, refreshBalance, disconnectWallet, getAddressDisplay } = useWallet();
	const addressDisplay = getAddressDisplay();

	if (!wallet.connected || !wallet.address) {
		return null;
	}

	// 주소 복사 함수
	const copyAddress = () => {
		navigator.clipboard.writeText(wallet.address || '');
		// 여기에 토스트 메시지를 표시하는 로직을 추가할 수 있습니다.
	};

	// 블록 익스플로러에서 주소 보기
	const viewOnExplorer = () => {
		window.open(`https://testnet.xrpl.org/accounts/${wallet.address}`, '_blank');
	};

	return (
		<div className="p-3 bg-dark-card rounded-lg border border-dark-border">
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">지갑 주소:</span>
					<span className="text-sm font-mono">{addressDisplay}</span>
				</div>
				<div className="flex space-x-1">
					<IconButton icon={Copy} size="sm" variant="outline" onClick={copyAddress} />
					<IconButton icon={ExternalLink} size="sm" variant="outline" onClick={viewOnExplorer} />
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">잔액:</span>
					<span className="text-neon-green">{wallet.balance.toFixed(2)} XRP</span>
				</div>
				<div className="flex space-x-1">
					<IconButton icon={RefreshCw} size="sm" variant="outline" onClick={refreshBalance} />
				</div>
			</div>

			<div className="mt-2 text-center">
				<button
					onClick={disconnectWallet}
					className="text-xs text-gray-400 hover:text-neon-blue transition-colors duration-150"
				>
					연결 해제
				</button>
			</div>
		</div>
	);
}
