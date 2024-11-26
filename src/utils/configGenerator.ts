import type { WormholeConnectConfig } from "@wormhole-foundation/wormhole-connect";
import { nttRoutes } from "@wormhole-foundation/wormhole-connect";
import type { UserTokenInput, TokenConfig } from "../types";

export const generateWormholeConfig = (
	tokenInput: UserTokenInput,
): WormholeConnectConfig => {
	const {
		symbol,
		manager,
		token: tokenAddress,
		transceiver,
		sourceChain,
		destinationChains,
		iconUrl,
		decimals,
		coinGeckoId,
		nttType,
		erc20Address,
		erc20Decimals,
	} = tokenInput;

	console.log({ tokenInput });

	const allChains = [sourceChain, ...destinationChains];
	const tokens = allChains.map((chain) => `${symbol}${chain}`);

	if (nttType === "Extended" && !erc20Address) {
		throw new Error("ERC20 address is required for Extended NTT");
	}

	// Ensure decimals are always numbers
	const sourceDecimals = erc20Decimals ?? 18;
	const targetDecimals = decimals ?? 18;

	// Determine token address based on NTT type
	const sourceTokenAddress =
		nttType === "Launch" && erc20Address ? erc20Address : tokenAddress;
	const targetTokenAddress = tokenAddress;

	console.log({ sourceTokenAddress, targetTokenAddress });

	const config: WormholeConnectConfig = {
		network: "Testnet",
		chains: allChains,
		tokens: tokens,

		ui: {
			title: "Wormhole NTT UI",
			defaultInputs: {
				fromChain: sourceChain,
				toChain: destinationChains[0],
			},
			showHamburgerMenu: false,
		},
		routes: [
			...nttRoutes({
				tokens: {
					[`${symbol}_NTT`]: [
						{
							chain: sourceChain,
							manager,
							token: sourceTokenAddress,
							transceiver: [
								{
									address: transceiver,
									type: "wormhole" as const,
								},
							],
						},
						...destinationChains.map((chain) => ({
							chain,
							manager,
							token: targetTokenAddress,
							transceiver: [
								{
									address: transceiver,
									type: "wormhole" as const,
								},
							],
						})),
					],
				},
			}),
		],
		tokensConfig: {
			[tokens[0]]: {
				key: tokens[0],
				symbol,
				nativeChain: sourceChain,
				displayName: symbol,
				tokenId: {
					chain: sourceChain,
					address: sourceTokenAddress,
				},
				coinGeckoId,
				icon: iconUrl,
				decimals: sourceDecimals,
			},
			...tokens
				.slice(1)
				.reduce<Record<string, TokenConfig>>((acc, token, index) => {
					acc[token] = {
						key: token,
						symbol,
						nativeChain: allChains[index + 1],
						displayName: symbol,
						tokenId: {
							chain: allChains[index + 1],
							address: targetTokenAddress,
						},
						coinGeckoId,
						icon: iconUrl,
						decimals: targetDecimals,
					};
					return acc;
				}, {}),
		},
	};

	return config;
};
