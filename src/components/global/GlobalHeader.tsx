'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Wallet, Loader, LogOut, RefreshCw } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from '@/components/wallet/WalletModal';

export default function GlobalHeader() {
	const { wallet, getAddressDisplay, disconnectWallet, refreshBalance, resetLoadingState, isClient } = useWallet();
	const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [localLoading, setLocalLoading] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 서버 렌더링 중에는 빈 주소를 사용
	const addressDisplay = isClient ? getAddressDisplay() : '';

	// 지갑 상태가 변경될 때마다 로컬 로딩 상태도 업데이트
	useEffect(() => {
		// 지갑이 연결되면 로딩 상태 해제
		if (wallet.connected) {
			setLocalLoading(false);
		}
	}, [wallet.connected]);

	// 모달이 닫힐 때 로딩 상태 초기화
	useEffect(() => {
		if (!isWalletModalOpen) {
			// 모달이 닫히면 무조건 로컬 로딩 상태 초기화
			setLocalLoading(false);

			// 지갑 연결이 되지 않은 상태에서 모달이 닫히면 글로벌 로딩 상태도 초기화
			if (!wallet.connected) {
				resetLoadingState();
			}
		}
	}, [isWalletModalOpen, wallet.connected, resetLoadingState]);

	// 드롭다운 외부 클릭 시 닫기
	useEffect(() => {
		if (!isClient) return;

		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isClient]);

	// 지갑 연결 해제
	const handleDisconnect = async () => {
		await disconnectWallet();
		setIsDropdownOpen(false);
	};

	// 잔액 새로고침
	const handleRefreshBalance = async () => {
		await refreshBalance();
		setIsDropdownOpen(false);
	};

	// 지갑 연결 모달 열기
	const handleOpenWalletModal = () => {
		setLocalLoading(true);
		setIsWalletModalOpen(true);
	};

	// 지갑 연결 모달 닫기
	const handleCloseWalletModal = () => {
		setIsWalletModalOpen(false);
		setLocalLoading(false);
		// 모달이 닫힐 때 확실하게 로딩 상태 초기화
		if (!wallet.connected) {
			resetLoadingState();
		}
	};

	return (
		<header className="border-b border-dark-border py-4">
			<div className="container mx-auto px-4 flex justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold text-neon-blue hover:text-neon-purple transition-colors duration-150"
				>
					XRPFI
				</Link>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<Link href="/" className="hover:text-neon-purple transition-colors duration-150">
								홈
							</Link>
						</li>
						<li>
							<Link href="/stake" className="hover:text-neon-purple transition-colors duration-150">
								스테이킹
							</Link>
						</li>
						<li>
							<Link href="/withdraw" className="hover:text-neon-purple transition-colors duration-150">
								해지
							</Link>
						</li>
					</ul>
				</nav>
				{isClient && (
					<div className="flex items-center space-x-3">
						{wallet.connected ? (
							<div className="relative" ref={dropdownRef}>
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center py-1 px-3 rounded-full bg-dark-card border border-dark-border hover:border-neon-purple transition-colors duration-150"
								>
									<div className="w-3 h-3 bg-neon-green rounded-full mr-2"></div>
									<span className="text-sm font-mono">{addressDisplay}</span>
								</button>

								{isDropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md border border-dark-border shadow-lg z-10">
										<div className="py-1">
											<button
												onClick={handleRefreshBalance}
												className="flex items-center w-full px-4 py-2 text-sm hover:bg-dark-border transition-colors duration-150"
											>
												<RefreshCw className="w-4 h-4 mr-2" />
												잔액 새로고침
											</button>
											<button
												onClick={() => {
													setIsWalletModalOpen(true);
													setIsDropdownOpen(false);
												}}
												className="flex items-center w-full px-4 py-2 text-sm hover:bg-dark-border transition-colors duration-150"
											>
												<Wallet className="w-4 h-4 mr-2" />
												지갑 변경
											</button>
											<button
												onClick={handleDisconnect}
												className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-dark-border transition-colors duration-150"
											>
												<LogOut className="w-4 h-4 mr-2" />
												연결 해제
											</button>
										</div>
									</div>
								)}
							</div>
						) : wallet.loading || localLoading ? (
							<button className="flex items-center py-1 px-3 text-sm rounded-full bg-dark-card border border-dark-border">
								<Loader className="w-4 h-4 mr-2 animate-spin" />
								연결중...
							</button>
						) : (
							<button
								onClick={handleOpenWalletModal}
								className="flex items-center py-1 px-3 text-sm rounded-full bg-dark-card border border-dark-border hover:bg-dark-border transition-colors duration-150"
							>
								<Wallet className="w-4 h-4 mr-2" />
								지갑 연결
							</button>
						)}
					</div>
				)}
			</div>

			{isClient && <WalletModal isOpen={isWalletModalOpen} onClose={handleCloseWalletModal} />}
		</header>
	);
}
