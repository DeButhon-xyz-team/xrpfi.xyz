import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';
import { Info, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useToast } from '@/components/ui/ToastContainer';
import Modal from '@/components/ui/Modal';

// APR 연간 수익률 (관리자가 설정 가능한 값)
const APR = 6.5; // 6.5%

type TransactionStatus = 'idle' | 'confirming' | 'processing' | 'success' | 'error';

export default function StakePanel() {
	const { wallet, refreshBalance } = useWallet();
	const { showToast } = useToast();
	const [amount, setAmount] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [txStatus, setTxStatus] = useState<TransactionStatus>('idle');
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [txError, setTxError] = useState<string | null>(null);
	const [txHash, setTxHash] = useState<string | null>(null);

	// 입력값 변경 핸들러
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAmount(value);
		validateAmount(value);
	};

	// 금액 유효성 검증
	const validateAmount = (value: string) => {
		setError(null);

		if (!value || parseFloat(value) <= 0) {
			setError('0보다 큰 금액을 입력해주세요');
			return false;
		}

		const numValue = parseFloat(value);

		if (isNaN(numValue)) {
			setError('유효한 숫자를 입력해주세요');
			return false;
		}

		if (numValue < 1) {
			setError('최소 스테이킹 금액은 1 XRP입니다');
			return false;
		}

		if (wallet.balance && numValue > wallet.balance) {
			setError('보유 금액보다 큰 금액을 스테이킹할 수 없습니다');
			return false;
		}

		// XRP는 소수점 6자리까지만 허용
		if (value.includes('.') && value.split('.')[1].length > 6) {
			setError('XRP는 소수점 6자리까지만 입력 가능합니다');
			return false;
		}

		return true;
	};

	// 예상 일일 보상 계산
	const calculateDailyReward = () => {
		if (!amount || isNaN(parseFloat(amount))) return 0;

		const stakeAmount = parseFloat(amount);
		const annualReward = stakeAmount * (APR / 100);
		const dailyReward = annualReward / 365;

		return dailyReward.toFixed(4);
	};

	// 스테이킹 실행
	const executeStaking = async () => {
		if (!validateAmount(amount)) return;

		// 거래 모달 열기
		setTxStatus('confirming');
		setIsStatusModalOpen(true);
		setTxError(null);
		setTxHash(null);

		try {
			// 유저 확인 후 거래 진행
			setTimeout(() => {
				// 실제 구현에서는 XRPL SDK를 통한 트랜잭션 생성과 서명 로직이 필요합니다
				setTxStatus('processing');

				// 트랜잭션 처리 시뮬레이션 (5초)
				setTimeout(async () => {
					try {
						// 성공 시나리오 (90% 확률)
						if (Math.random() > 0.1) {
							setTxStatus('success');
							setTxHash('DEMO' + Math.random().toString(36).substring(2, 12).toUpperCase());

							// 잔액 새로고침
							await refreshBalance();
							showToast('success', `${amount} XRP 스테이킹이 성공적으로 처리되었습니다`);
						} else {
							// 실패 시나리오 (10% 확률)
							setTxStatus('error');
							setTxError('네트워크 혼잡으로 트랜잭션이 실패했습니다. 다시 시도해주세요.');
							showToast('error', '스테이킹 처리 중 오류가 발생했습니다');
						}
					} catch (error) {
						setTxStatus('error');
						setTxError('트랜잭션 처리 중 오류가 발생했습니다');
						showToast('error', '스테이킹 처리 중 오류가 발생했습니다');
					}
				}, 5000);
			}, 2000);
		} catch (error) {
			console.error('스테이킹 오류:', error);
			setTxStatus('error');
			setTxError('스테이킹 요청 중 오류가 발생했습니다');
		}
	};

	// 거래 상태 모달 닫기
	const handleCloseStatusModal = () => {
		// 성공 상태에서만 입력값 초기화
		if (txStatus === 'success') {
			setAmount('');
		}

		setIsStatusModalOpen(false);
		setTxStatus('idle');
	};

	return (
		<>
			<Card className="max-w-[768px] mx-auto">
				<h2 className="text-xl font-semibold mb-4">스테이킹 입력</h2>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-2">
						스테이킹 수량 (XRP)
						{wallet.connected && (
							<span className="text-xs text-gray-400 ml-2">보유량: {wallet.balance.toFixed(2)} XRP</span>
						)}
					</label>
					<input
						type="number"
						className={`w-full px-3 py-2 bg-dark-background border ${
							error ? 'border-red-500' : 'border-dark-border'
						} rounded-md focus:outline-none focus:ring-1 focus:ring-neon-purple`}
						placeholder="0.0"
						value={amount}
						onChange={handleAmountChange}
						disabled={!wallet.connected}
						min="10"
						max={wallet.balance || undefined}
						step="0.000001"
					/>
					{error && (
						<p className="text-red-500 text-xs mt-1 flex items-center">
							<AlertCircle className="h-3 w-3 mr-1" />
							{error}
						</p>
					)}
				</div>

				<div className="p-3 bg-dark-background/40 rounded-md mb-4">
					<p className="text-sm font-medium">
						예상 일일 보상: <span className="text-neon-green">{calculateDailyReward()} RLUSD</span>
					</p>
					<p className="text-sm font-medium">
						예상 연간 수익률: <span className="text-neon-green">{APR.toFixed(2)}%</span>
					</p>
				</div>

				<div className="mb-4 p-3 bg-dark-background/30 rounded-md flex items-start space-x-2">
					<Info className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
					<div className="text-xs text-gray-400">
						<p className="mb-1">스테이킹한 XRP는 해당 기간 동안 락업됩니다.</p>
						<p className="mb-1">최소 스테이킹 금액은 10 XRP입니다.</p>
						<p>보상은 매일 RLUSD 형태로 지급됩니다.</p>
					</div>
				</div>

				<Button
					className="w-full"
					onClick={executeStaking}
					disabled={!wallet.connected || !amount || !!error || parseFloat(amount) <= 0}
				>
					{wallet.connected ? '스테이킹 실행' : '지갑 연결 필요'}
				</Button>
			</Card>

			{/* 트랜잭션 상태 모달 */}
			<Modal
				isOpen={isStatusModalOpen}
				onClose={txStatus !== 'confirming' && txStatus !== 'processing' ? handleCloseStatusModal : () => {}}
				title="스테이킹 요청"
				size="sm"
			>
				<div className="space-y-4 text-center py-2">
					{txStatus === 'confirming' && (
						<>
							<div className="flex flex-col items-center space-y-3 py-4">
								<Info className="h-10 w-10 text-neon-blue" />
								<p className="font-medium">스테이킹 요청을 확인해주세요</p>
								<p className="text-sm text-gray-400">
									{amount} XRP를 스테이킹하고 {calculateDailyReward()} RLUSD의 일일 보상을 받습니다
								</p>
							</div>
							<div className="flex space-x-3">
								<Button variant="outline" className="flex-1" onClick={handleCloseStatusModal}>
									취소
								</Button>
								<Button className="flex-1" onClick={() => setTxStatus('processing')}>
									확인
								</Button>
							</div>
						</>
					)}

					{txStatus === 'processing' && (
						<div className="flex flex-col items-center space-y-3 py-4">
							<Loader className="h-10 w-10 text-neon-blue animate-spin" />
							<p className="font-medium">트랜잭션 처리 중</p>
							<p className="text-sm text-gray-400">
								XRPL 네트워크에서 트랜잭션이 처리되고 있습니다. 잠시만 기다려주세요...
							</p>
						</div>
					)}

					{txStatus === 'success' && (
						<>
							<div className="flex flex-col items-center space-y-3 py-4">
								<CheckCircle className="h-10 w-10 text-neon-green" />
								<p className="font-medium">스테이킹 성공!</p>
								<p className="text-sm text-gray-400">{amount} XRP가 성공적으로 스테이킹되었습니다</p>
								{txHash && <p className="text-xs font-mono bg-dark-background p-2 rounded-md">{txHash}</p>}
							</div>
							<Button className="w-full" onClick={handleCloseStatusModal}>
								확인
							</Button>
						</>
					)}

					{txStatus === 'error' && (
						<>
							<div className="flex flex-col items-center space-y-3 py-4">
								<AlertCircle className="h-10 w-10 text-red-500" />
								<p className="font-medium">스테이킹 실패</p>
								<p className="text-sm text-gray-400">{txError || '트랜잭션 처리 중 오류가 발생했습니다'}</p>
							</div>
							<Button className="w-full" onClick={handleCloseStatusModal}>
								확인
							</Button>
						</>
					)}
				</div>
			</Modal>
		</>
	);
}
