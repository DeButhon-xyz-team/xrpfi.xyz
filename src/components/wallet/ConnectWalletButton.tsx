import React from 'react';
import Button from '@/components/ui/Button';
import { useWalletStore } from '@/store/walletState';
import { useTranslation } from '@/hooks/useTranslation';

interface ConnectWalletButtonProps {
	className?: string;
	label?: string;
	showMessage?: boolean;
}

export default function ConnectWalletButton({
	className = 'w-full',
	label,
	showMessage = true,
}: ConnectWalletButtonProps) {
	const { t } = useTranslation();
	const { openWalletModal } = useWalletStore();

	return (
		<div className="text-center">
			{showMessage && <p className="text-gray-400 mb-4">{t('common.connectWalletMessage')}</p>}
			<Button onClick={openWalletModal} className={className}>
				{label || t('common.connectWallet')}
			</Button>
		</div>
	);
}
