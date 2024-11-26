import type { Chain } from "@wormhole-foundation/wormhole-connect";

export interface TokenConfig {
	key: string;
	symbol: string;
	nativeChain: Chain;
	displayName: string;
	tokenId: {
		chain: Chain;
		address: string;
	};
	coinGeckoId: string;
	icon: string;
	decimals: number;
}

export interface UserTokenInput {
	symbol: string;
	manager: string;
	token: string;
	transceiver: string;
	sourceChain: Chain;
	destinationChains: Chain[];
	iconUrl: string;
	decimals: number;
	coinGeckoId: string;
	nttType: "Launch" | "Extended";
	erc20Address?: string;
	erc20Decimals?: number;
}
