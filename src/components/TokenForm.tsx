import { useState, useEffect } from "react";
import type { Chain } from "@wormhole-foundation/wormhole-connect";
import type { UserTokenInput } from "../types";
import {
	getQueryParams,
	submitFormWithQueryParams,
} from "../utils/queryParams";

export function TokenForm() {
	const [tokenInput, setTokenInput] = useState<UserTokenInput>({
		symbol: "",
		manager: "",
		token: "",
		transceiver: "",
		sourceChain: "Sepolia",
		destinationChains: ["BaseSepolia"],
		iconUrl: "https://wormhole.com/token.png",
		decimals: 18,
		coinGeckoId: "wormhole",
		nttType: "Launch",
		erc20Address: "",
		erc20Decimals: 18,
	});

	const availableChains: Chain[] = [
		"Sepolia",
		"BaseSepolia",
		"ArbitrumSepolia",
		"OptimismSepolia",
	];

	useEffect(() => {
		const queryParams = getQueryParams();
		if (Object.keys(queryParams).length > 0) {
			setTokenInput((prev) => ({
				...prev,
				...queryParams,
			}));
		}
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Form validation is handled by HTML5 required attributes
		// If we reach here, the form is valid
		submitFormWithQueryParams(tokenInput);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setTokenInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddDestinationChain = () => {
		setTokenInput((prev) => ({
			...prev,
			destinationChains: [...prev.destinationChains, availableChains[0]],
		}));
	};

	const handleRemoveDestinationChain = (index: number) => {
		setTokenInput((prev) => ({
			...prev,
			destinationChains: prev.destinationChains.filter((_, i) => i !== index),
		}));
	};

	const handleDestinationChainChange = (index: number, value: Chain) => {
		setTokenInput((prev) => ({
			...prev,
			destinationChains: prev.destinationChains.map((chain, i) =>
				i === index ? value : chain,
			),
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="token-form">
			{/* NTT Configuration Section */}
			<div className="form-section">
				<h3>NTT Configuration</h3>
				<div>
					<label htmlFor="nttType">NTT Type</label>
					<select
						id="nttType"
						name="nttType"
						value={tokenInput.nttType}
						onChange={handleInputChange}
						required
					>
						<option value="Launch">Launch</option>
						<option value="Extended">Extended</option>
					</select>
				</div>

				{tokenInput.nttType === "Extended" && (
					<>
						<div>
							<label htmlFor="erc20Address">ERC20 Address</label>
							<input
								type="text"
								id="erc20Address"
								name="erc20Address"
								value={tokenInput.erc20Address || ""}
								onChange={handleInputChange}
								placeholder="0x..."
								required
							/>
						</div>
						<div>
							<label htmlFor="erc20Decimals">ERC20 Decimals</label>
							<input
								type="number"
								id="erc20Decimals"
								name="erc20Decimals"
								min="0"
								max="18"
								value={tokenInput.erc20Decimals || 18}
								onChange={handleInputChange}
								required
							/>
						</div>
					</>
				)}
			</div>

			{/* Chain Configuration Section */}
			<div className="form-section">
				<h3>Chain Configuration</h3>
				<div>
					<label htmlFor="sourceChain">Source Chain</label>
					<select
						id="sourceChain"
						name="sourceChain"
						value={tokenInput.sourceChain}
						onChange={handleInputChange}
						required
					>
						{availableChains.map((chain) => (
							<option key={chain} value={chain}>
								{chain}
							</option>
						))}
					</select>
				</div>

				<div className="destination-chains">
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label>Destination Chains</label>
					{tokenInput.destinationChains.map((chain, index) => (
						<div key={chain} className="destination-chain-row">
							<select
								value={chain}
								onChange={(e) =>
									handleDestinationChainChange(index, e.target.value as Chain)
								}
								required
							>
								{availableChains.map((chain) => (
									<option key={chain} value={chain}>
										{chain}
									</option>
								))}
							</select>
							{tokenInput.destinationChains.length > 1 && (
								<button
									type="button"
									onClick={() => handleRemoveDestinationChain(index)}
									className="remove-chain-btn"
								>
									Remove
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={handleAddDestinationChain}
						className="add-chain-btn"
					>
						Add Destination Chain
					</button>
				</div>
			</div>

			{/* Contract Addresses Section */}
			<div className="form-section">
				<h3>Contract Addresses</h3>
				<div>
					<label htmlFor="manager">Manager Address</label>
					<input
						type="text"
						id="manager"
						name="manager"
						value={tokenInput.manager}
						onChange={handleInputChange}
						placeholder="0x..."
						required
					/>
				</div>
				<div>
					<label htmlFor="token">Token Address</label>
					<input
						type="text"
						id="token"
						name="token"
						value={tokenInput.token}
						onChange={handleInputChange}
						placeholder="0x..."
						required
					/>
				</div>
				<div>
					<label htmlFor="transceiver">Transceiver Address</label>
					<input
						type="text"
						id="transceiver"
						name="transceiver"
						value={tokenInput.transceiver}
						onChange={handleInputChange}
						placeholder="0x..."
						required
					/>
				</div>
			</div>

			{/* Token Details Section */}
			<div className="form-section">
				<h3>Token Details</h3>
				<div>
					<label htmlFor="symbol">Token Symbol</label>
					<input
						type="text"
						id="symbol"
						name="symbol"
						value={tokenInput.symbol}
						onChange={handleInputChange}
						placeholder="e.g., USDC"
						required
					/>
				</div>
				<div>
					<label htmlFor="decimals">Token Decimals</label>
					<input
						type="number"
						id="decimals"
						name="decimals"
						min="0"
						max="18"
						value={tokenInput.decimals}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="coinGeckoId">CoinGecko ID</label>
					<input
						type="text"
						id="coinGeckoId"
						name="coinGeckoId"
						value={tokenInput.coinGeckoId}
						onChange={handleInputChange}
						placeholder="e.g., bitcoin"
						required
					/>
				</div>
				<div>
					<label htmlFor="iconUrl">Token Icon URL</label>
					<input
						type="url"
						id="iconUrl"
						name="iconUrl"
						value={tokenInput.iconUrl}
						onChange={handleInputChange}
						placeholder="https://example.com/token-icon.png"
					/>
				</div>
			</div>

			<button type="submit">Bridge Token</button>
		</form>
	);
}
