import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '@/api';
import { ApiResponse } from './index';

// 예상 수익 계산 요청 interface
export interface EstimateRewardRequest {
	amount: number;
	term?: number; // 예상 기간 (일), 기본값 365일
}

// 예상 수익 계산 응답 interface
export interface EstimateRewardResponse {
	dailyReward: number;
	monthlyReward: number;
	yearlyReward: number;
	apr: number;
}

// 스테이킹 요청 interface
export interface StakeRequest {
	walletAddress: string;
	amount: number;
}

// 스테이킹 응답 interface
export interface StakeResponse {
	txHash: string;
	walletAddress: string;
	amount: number;
	timestamp: string;
	estimatedUnlockTime: string; // 예상 언락 가능 시간
}

/**
 * 스테이킹 예상 수익 계산 (Query)
 */
export const useGetEstimateRewardApi = (request: EstimateRewardRequest) => {
	const { amount, term = 365 } = request;
	const url = '/staking/estimate';
	return useQuery<AxiosResponse<ApiResponse<EstimateRewardResponse>>, AxiosError, EstimateRewardResponse>({
		queryKey: [url, amount, term],
		queryFn: () => api.get(url, { params: { amount, term } }),
		select: (res) => res.data.data as EstimateRewardResponse,
		enabled: amount > 0,
		staleTime: 5 * 60 * 1000, // 5분 동안 데이터 유지
		retry: 1,
	});
};

/**
 * 스테이킹 예상 수익 계산 (Mutation)
 */
export const useEstimateRewardApi = () => {
	const url = '/staking/estimate';
	return useMutation<AxiosResponse<ApiResponse<EstimateRewardResponse>>, AxiosError, EstimateRewardRequest>({
		mutationFn: (data: EstimateRewardRequest) => api.post(url, data),
	});
};

/**
 * 스테이킹 실행
 */
export const useExecuteStakeApi = () => {
	const url = '/staking/execute';
	return useMutation<AxiosResponse<ApiResponse<StakeResponse>>, AxiosError, StakeRequest>({
		mutationFn: (data: StakeRequest) => api.post(url, data),
	});
};

/**
 * 현재 스테이킹 APR 정보 가져오기
 */
export const useGetCurrentAprApi = () => {
	const url = '/staking/apr';
	return useQuery<AxiosResponse<ApiResponse<number>>, AxiosError, number>({
		queryKey: [url],
		queryFn: () => api.get(url),
		select: (res) => res.data.data as number,
		staleTime: 60 * 60 * 1000, // 1시간 동안 데이터 유지
		retry: 1,
		refetchOnWindowFocus: false,
	});
};
