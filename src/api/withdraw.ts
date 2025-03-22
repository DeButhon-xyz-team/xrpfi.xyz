import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '@/api';
import { ApiResponse } from './index';

// 해지 가능한 스테이킹 정보 interface
export interface WithdrawableStaking {
	walletAddress: string;
	totalStakedAmount: number;
	withdrawableAmount: number;
	lockedAmount: number;
	earnedReward: number;
	pendingWithdrawals: PendingWithdrawal[];
}

// 진행 중인 해지 요청 interface
export interface PendingWithdrawal {
	requestId: string;
	amount: number;
	requestTimestamp: string;
	estimatedCompletionTime: string;
	status: 'pending' | 'processing' | 'completed' | 'failed';
}

// 해지 요청 interface
export interface WithdrawRequest {
	walletAddress: string;
	amount: number;
}

// 해지 응답 interface
export interface WithdrawResponse {
	requestId: string;
	txHash: string;
	walletAddress: string;
	amount: number;
	timestamp: string;
	estimatedCompletionTime: string;
	fee: number;
}

/**
 * 해지 가능한 스테이킹 정보 조회
 */
export const useGetWithdrawableStakingApi = (address?: string) => {
	const url = address ? `/withdraw/available/${address}` : '/withdraw/available';
	return useQuery<AxiosResponse<ApiResponse<WithdrawableStaking>>, AxiosError, WithdrawableStaking>({
		queryKey: [url],
		queryFn: () => api.get(url),
		select: (res) => res.data.data as WithdrawableStaking,
		enabled: !!address,
		staleTime: 5 * 60 * 1000, // 5분 동안 데이터 유지
		retry: 1,
		refetchOnWindowFocus: false,
	});
};

/**
 * 스테이킹 해지 요청
 */
export const useRequestWithdrawApi = () => {
	const url = '/withdraw/request';
	return useMutation<AxiosResponse<ApiResponse<WithdrawResponse>>, AxiosError, WithdrawRequest>({
		mutationFn: (data: WithdrawRequest) => api.post(url, data),
	});
};

/**
 * 진행 중인 해지 요청 상태 확인
 */
export const useGetWithdrawStatusApi = (requestId?: string) => {
	const url = requestId ? `/withdraw/status/${requestId}` : '/withdraw/status';
	return useQuery<AxiosResponse<ApiResponse<PendingWithdrawal>>, AxiosError, PendingWithdrawal>({
		queryKey: [url],
		queryFn: () => api.get(url),
		select: (res) => res.data.data as PendingWithdrawal,
		enabled: !!requestId,
		refetchInterval: 30000, // 30초마다 자동 갱신
		retry: 1,
	});
};
