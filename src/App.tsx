import { useState, useEffect } from "react";
import WormholeConnect, {
	nttRoutes,
	type WormholeConnectConfig,
} from "@wormhole-foundation/wormhole-connect";
import { TokenForm } from "./components/TokenForm";
import type { UserTokenInput } from "./types";
import { getQueryParams } from "./utils/queryParams";
import { generateWormholeConfig } from "./utils/configGenerator";
import "./App.css";

const lockingModeCfg: WormholeConnectConfig = {
	network: "Testnet",
	chains: ["ArbitrumSepolia", "BaseSepolia"],
	tokens: ["MTArbitrumSepolia", "MTBaseSepolia"],
	ui: {
		title: "Wormhole NTT UI",
		defaultInputs: {
			fromChain: "ArbitrumSepolia",
			toChain: "BaseSepolia",
		},
		showHamburgerMenu: false,
	},
	routes: [
		...nttRoutes({
			tokens: {
				MT_NTT: [
					{
						chain: "ArbitrumSepolia",
						manager: "0x97b8E6B9287d1f39e00e8681b1A44dCa870D5749",
						token: "0x51712884084A525dD9CC2604004d775eb815a595",
						transceiver: [
							{
								address: "0x88383E0c643A24Ff458bFa685b5AD3b4bc90ABdB",
								type: "wormhole",
							},
						],
					},
					{
						chain: "BaseSepolia",
						manager: "0x97b8E6B9287d1f39e00e8681b1A44dCa870D5749",
						token: "0xBaD9009C960D16849af0E49c407F63586D07d384",
						transceiver: [
							{
								address: "0x88383E0c643A24Ff458bFa685b5AD3b4bc90ABdB",
								type: "wormhole",
							},
						],
					},
				],
			},
		}),
	],
	tokensConfig: {
		MTArbitrumSepolia: {
			key: "MTArbitrumSepolia",
			symbol: "MT",
			nativeChain: "ArbitrumSepolia",
			displayName: "MT",
			tokenId: {
				chain: "ArbitrumSepolia",
				address: "0x51712884084A525dD9CC2604004d775eb815a595",
			},
			coinGeckoId: "wormhole",
			icon: "https://wormhole.com/token.png",
			decimals: 18,
		},

		MTBaseSepolia: {
			key: "MTBaseSepolia",
			symbol: "MT",
			nativeChain: "BaseSepolia",
			displayName: "MT",
			tokenId: {
				chain: "BaseSepolia",
				address: "0xBaD9009C960D16849af0E49c407F63586D07d384",
			},
			coinGeckoId: "wormhole",
			icon: "https://wormhole.com/token.png",
			decimals: 18,
		},
	},
};

console.info({ lockingModeCfg });

function App() {
	const [config, setConfig] = useState<WormholeConnectConfig | null>(null);
	const [showForm, setShowForm] = useState(true);

	useEffect(() => {
		const queryParams = getQueryParams();
		const fullParams: UserTokenInput = {
			nttType: "Launch",
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			symbol: queryParams.symbol!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			manager: queryParams.manager!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			token: queryParams.token!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			transceiver: queryParams.transceiver!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			sourceChain: queryParams.sourceChain!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			destinationChains: queryParams.destinationChains!,
			iconUrl: queryParams.iconUrl || "https://wormhole.com/token.png",
			decimals: queryParams.decimals || 18,
			coinGeckoId: queryParams.coinGeckoId || "wormhole",
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			erc20Address: queryParams.erc20Address!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			erc20Decimals: queryParams.erc20Decimals!,
		};

		if (
			!fullParams.symbol ||
			!fullParams.manager ||
			!fullParams.token ||
			!fullParams.transceiver ||
			!fullParams.sourceChain ||
			!fullParams.destinationChains.length ||
			(fullParams.nttType === "Extended" && !fullParams.erc20Address)
		) {
			setShowForm(true);
			return;
		}

		handleTokenSubmit(fullParams);
		setShowForm(false);
	}, []);

	const handleTokenSubmit = (tokenInput: UserTokenInput) => {
		const newConfig = generateWormholeConfig(tokenInput);
		setConfig(newConfig);
	};

	return (
		<div className="container">
			{showForm ? (
				<TokenForm />
			) : (
				<div className="bridge-container">
					<button
						type="button"
						className="back-button"
						onClick={() => setShowForm(true)}
					>
						← Configure New Token
					</button>
					{config && (
						<WormholeConnect key={JSON.stringify(config)} config={config} />
					)}
				</div>
			)}
		</div>
	);
}

export default App;
