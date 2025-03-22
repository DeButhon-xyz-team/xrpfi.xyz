'use client';

import React, { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { ExternalLink, Copy, RefreshCw, AlertCircle, CircleDollarSign, Check } from 'lucide-react';
import IconButton from '@/components/ui/IconButton';
import Button from '@/components/ui/Button';

export default function WalletInfo() {
	const { wallet, refreshBalance, disconnectWallet, getAddressDisplay, requestTestnetXRP } = useWallet();
	const addressDisplay = getAddressDisplay();
	const [isRequestingXRP, setIsRequestingXRP] = useState(false);
	const [requestSuccess, setRequestSuccess] = useState<boolean | null>(null);
	const [isCopied, setIsCopied] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	if (!wallet.connected || !wallet.address) {
		return null;
	}

	// 주소 복사 함수
	const copyAddress = async () => {
		if (!wallet.address) return;

		try {
			await navigator.clipboard.writeText(wallet.address);
			setIsCopied(true);

			// 2초 후 복사 상태 초기화
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (error) {
			console.error('주소 복사 실패:', error);
			// 클립보드 API가 지원되지 않는 경우 대체 방법
			const textArea = document.createElement('textarea');
			textArea.value = wallet.address;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
				document.execCommand('copy');
				setIsCopied(true);

				// 2초 후 복사 상태 초기화
				setTimeout(() => {
					setIsCopied(false);
				}, 2000);
			} catch (err) {
				console.error('대체 복사 방법 실패:', err);
			}

			document.body.removeChild(textArea);
		}
	};

	// 블록 익스플로러에서 주소 보기
	const viewOnExplorer = () => {
		window.open(`https://testnet.xrpl.org/accounts/${wallet.address}`, '_blank');
	};

	// 잔액 새로고침 함수
	const handleRefreshBalance = async () => {
		if (isRefreshing) return; // 중복 실행 방지

		setIsRefreshing(true);
		try {
			await refreshBalance();
		} catch (error) {
			console.error('잔액 새로고침 실패:', error);
		} finally {
			// 새로고침 상태 1초 후 초기화 (UI 피드백 위해)
			setTimeout(() => {
				setIsRefreshing(false);
			}, 1000);
		}
	};

	// 테스트넷 XRP 요청 함수
	const handleRequestTestnetXRP = async () => {
		if (!wallet.address) return;

		setIsRequestingXRP(true);
		setRequestSuccess(null);

		try {
			const success = await requestTestnetXRP();
			setRequestSuccess(success);

			if (success) {
				// 2초 후 잔액 새로고침
				setTimeout(() => {
					handleRefreshBalance();
					setIsRequestingXRP(false);
				}, 2000);
			} else {
				setIsRequestingXRP(false);
			}
		} catch (error) {
			console.error('테스트넷 XRP 요청 실패:', error);
			setRequestSuccess(false);
			setIsRequestingXRP(false);
		}
	};

	// 테스트넷 계정 활성화 필요 또는 잔액이 0인 경우
	const needsTestnetXRP = wallet.balance === 0;

	return (
		<div className="p-3 bg-dark-card rounded-lg border border-dark-border">
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center overflow-hidden">
					<span className="text-sm font-medium mr-1 flex-shrink-0">지갑 주소:</span>
					<span className="text-sm font-mono truncate">{addressDisplay}</span>
				</div>
				<div className="flex space-x-1 flex-shrink-0">
					<IconButton
						icon={isCopied ? Check : Copy}
						size="sm"
						variant="outline"
						onClick={copyAddress}
						className={isCopied ? 'text-green-500 border-green-500' : ''}
					/>
					<IconButton icon={ExternalLink} size="sm" variant="outline" onClick={viewOnExplorer} />
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">잔액:</span>
					<span className={`${needsTestnetXRP ? 'text-yellow-400' : 'text-neon-green'}`}>
						{wallet.balance.toFixed(2)} XRP
					</span>
				</div>
				<div className="flex space-x-1">
					<IconButton
						icon={RefreshCw}
						size="sm"
						variant="outline"
						onClick={handleRefreshBalance}
						disabled={isRefreshing}
						className={isRefreshing ? 'animate-spin' : ''}
					/>
				</div>
			</div>

			{needsTestnetXRP && (
				<div className="mt-3">
					{requestSuccess === false && (
						<div className="p-2 bg-red-950/40 rounded-md text-xs text-red-300 mb-2 flex items-center">
							<AlertCircle className="w-3 h-3 mr-1" />
							테스트넷 XRP 요청에 실패했습니다. 다시 시도해주세요.
						</div>
					)}

					<Button onClick={handleRequestTestnetXRP} className="w-full text-xs" disabled={isRequestingXRP}>
						{isRequestingXRP ? (
							<>
								<RefreshCw className="w-3 h-3 mr-1 animate-spin" />
								요청 중...
							</>
						) : (
							<>
								<CircleDollarSign className="w-3 h-3 mr-1" />
								테스트넷 XRP 요청하기
							</>
						)}
					</Button>

					<p className="mt-1 text-xs text-gray-400">
						테스트넷에서 XRP를 받으려면 버튼을 클릭하세요. 새 창이 열리면 웹사이트에서 안내에 따라 XRP를 요청하세요.
					</p>
				</div>
			)}

			<div className="mt-2 text-center">
				<button
					onClick={disconnectWallet}
					className="text-xs text-gray-400 hover:text-neon-blue transition-colors duration-150"
				>
					연결 해제
				</button>
			</div>

			{/* 복사 시 알림 - 화면에 시각적 피드백 제공 */}
			{isCopied && (
				<div className="absolute top-0 right-0 bg-green-800/70 text-green-100 text-xs px-2 py-1 rounded m-2">
					주소가 복사되었습니다!
				</div>
			)}
		</div>
	);
}
