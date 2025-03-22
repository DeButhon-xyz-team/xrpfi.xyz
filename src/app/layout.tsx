import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import GlobalHeader from '@/components/global/GlobalHeader';
import GlobalFooter from '@/components/global/GlobalFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'XRPFI - XRPL 사용자를 위한 멀티체인 스테이킹',
	description:
		'XRP를 예치하면 Axelar를 통해 PoS 체인으로 자산이 브릿징되고, 스테이킹 수익이 XRPL 상에서 RLUSD 등으로 지급됩니다',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" className="dark">
			<body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-dark-background to-black`}>
				<GlobalHeader />
				{children}
				<GlobalFooter />
			</body>
		</html>
	);
}
