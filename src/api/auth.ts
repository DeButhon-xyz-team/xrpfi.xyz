import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api, CommonResType } from '@/api';
// type

// 로그인
type PostLoginDataType = {
	account_value: string;
	account_password: string;
	access_ip?: string;
	redirect_uri?: string;
};
type PostLoginResType = CommonResType<{
	auth_code: string;
	id_token: string; // 테섭용
}>;
export const useLoginApi = () => {
	const url = '/login';
	const queryClient = useQueryClient();
	return useMutation<AxiosResponse<PostLoginResType>, AxiosError, PostLoginDataType>({
		mutationFn: (data: PostLoginDataType) => api.post(url, data),
		onSuccess: (res) => {
			if (res.data.status === 'SUCCESS') {
				queryClient.clear();
				window.location.href = '/';
			} else {
				alert(res.data.message);
			}
		},
		onError: (err) => {
			console.error(err);
			alert('로그인 중 오류가 발생했습니다.');
		},
	});
};

// 로그아웃
export const useLogoutApi = () => {
	const url = '/logout';
	const queryClient = useQueryClient();
	return useMutation<AxiosResponse<CommonResType>, AxiosError>({
		mutationFn: () => api.post(url),
		onSettled: () => {
			queryClient.clear();
			window.location.href = '/login';
		},
	});
};

// 사용자 정보 조회
type UserInfoType = {
	userId: string;
	username: string;
	email: string;
	walletAddress: string;
};
type UserInfoResType = CommonResType<UserInfoType>;
export const useGetUserInfoApi = () => {
	const url = '/user/info';
	return useQuery<AxiosResponse<UserInfoResType>, AxiosError, UserInfoType>({
		queryKey: [url],
		queryFn: () => api.get(url),
		select: (res) => res.data.result,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};
