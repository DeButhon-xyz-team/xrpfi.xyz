import { Client } from 'xrpl';

// WalletConnect 설정
export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

// XRPL 노드 설정
const XRPL_NODE = 'wss://s.altnet.rippletest.net:51233'; // Testnet 사용

// XRPL 클라이언트 생성 함수
export async function createXRPLClient() {
	try {
		const client = new Client(XRPL_NODE);
		await client.connect();
		return client;
	} catch (error) {
		console.error('XRPL 클라이언트 연결 실패:', error);
		throw error;
	}
}

// 잔액 조회 함수
export async function getXRPBalance(address: string): Promise<number> {
	try {
		const client = await createXRPLClient();
		const { result } = await client.request({
			command: 'account_info',
			account: address,
			ledger_index: 'validated',
		});

		await client.disconnect();

		// XRP 잔액을 숫자로 변환 (drops에서 XRP로 변환, 1 XRP = 1,000,000 drops)
		return parseFloat(result.account_data.Balance) / 1000000;
	} catch (error) {
		console.error('XRP 잔액 조회 실패:', error);
		return 0;
	}
}

// Xaman(XUMM) 연결 정보
export const xamanConfig = {
	name: 'Xaman',
	description: 'XUMM 지갑으로 연결',
	chains: ['xrpl:testnet'], // 테스트넷 사용
};

// FuturePass 연결 정보 (MVP 최소 구현)
export const futurePassConfig = {
	name: 'FuturePass',
	description: 'FuturePass 지갑으로 연결',
	// The Root Network 연결 정보는 실제 연동 시 추가
};

// 지갑 연결 프로세스 공통 인터페이스
export interface WalletConnector {
	connect: () => Promise<{ address: string; type: 'xaman' | 'futurepass' }>;
	disconnect: () => Promise<void>;
	getBalance: (address: string) => Promise<number>;
}

// Xaman 지갑 연결 모의 구현 (실제 구현은 WalletConnect SDK 사용 필요)
export const XamanConnector: WalletConnector = {
	connect: async () => {
		// WalletConnect 연결 로직 (모의 구현)
		// 실제로는 WalletConnect SDK와 XUMM/Xaman 연동 구현 필요
		const mockAddress = 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh'; // 테스트용 주소
		return { address: mockAddress, type: 'xaman' };
	},
	disconnect: async () => {
		// 연결 해제 로직
		console.log('Xaman 지갑 연결 해제');
		return;
	},
	getBalance: getXRPBalance,
};

// FuturePass 지갑 연결 모의 구현 (최소 MVP)
export const FuturePassConnector: WalletConnector = {
	connect: async () => {
		// FuturePass 연결 로직 (모의 구현)
		const mockAddress = 'rLFNz6Y6pM9U4p2Diz8qvH7ZQUe8qzMnwF'; // 테스트용 주소
		return { address: mockAddress, type: 'futurepass' };
	},
	disconnect: async () => {
		// 연결 해제 로직
		console.log('FuturePass 지갑 연결 해제');
		return;
	},
	getBalance: getXRPBalance,
};
