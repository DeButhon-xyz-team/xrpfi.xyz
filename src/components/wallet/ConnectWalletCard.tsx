import React from 'react';
import Card from '@/components/ui/Card';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import { Wallet } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const ConnectWalletCard: React.FC = () => {
	const { t } = useTranslation();

	return (
		<Card title={t('common.connectWallet')} className="w-full">
			<div className="py-8 flex flex-col items-center">
				<Wallet className="w-16 h-16 text-neon-blue mb-4" />
				<h2 className="text-xl font-semibold mb-4">{t('common.connectToStart')}</h2>
				<p className="text-gray-400 mb-6 text-center max-w-md">
					{t('staking.description')}
				</p>
				<div className="w-full px-4 sm:px-8 md:px-16">
					<ConnectWalletButton label={t('common.connectWallet')} className="w-full" showMessage={false} />
				</div>
			</div>
		</Card>
	);
};

export default ConnectWalletCard;
