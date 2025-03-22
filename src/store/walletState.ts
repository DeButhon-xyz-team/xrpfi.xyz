import { create } from 'zustand';

// 지갑 유형 정의
export type WalletType = 'xaman' | 'futurepass' | null;

// 지갑 상태 인터페이스
export interface WalletState {
	address: string | null;
	balance: number;
	connected: boolean;
	loading: boolean;
	type: WalletType;
}

interface WalletStore {
	wallet: WalletState;
	setWallet: (wallet: Partial<WalletState>) => void;
	resetWallet: () => void;
	getDisplayAddress: () => string;
}

const INITIAL_STATE: WalletState = {
	address: null,
	balance: 0,
	connected: false,
	loading: false,
	type: null,
};

export const useWalletStore = create<WalletStore>((set, get) => ({
	wallet: INITIAL_STATE,

	setWallet: (updates) =>
		set((state) => ({
			wallet: {
				...state.wallet,
				...updates,
			},
		})),

	resetWallet: () => set({ wallet: INITIAL_STATE }),

	getDisplayAddress: () => {
		const { address } = get().wallet;
		if (!address) return '';

		return address.length > 10 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
	},
}));
