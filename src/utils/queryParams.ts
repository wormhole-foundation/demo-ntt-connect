import type { Chain } from "@wormhole-foundation/wormhole-connect";
import type { UserTokenInput } from "../types";

export function getQueryParams(): Partial<UserTokenInput> {
	const params = new URLSearchParams(window.location.search);
	const queryParams: Partial<UserTokenInput> = {};

	// Basic string params (excluding nttType since it needs special handling)
	const stringParams = [
		"symbol",
		"manager",
		"token",
		"transceiver",
		"iconUrl",
		"coinGeckoId",
		"erc20Address",
	] as const;
	for (const param of stringParams) {
		const value = params.get(param);
		if (value) {
			queryParams[param] = value as UserTokenInput[typeof param];
		}
	}

	// Handle nttType separately with validation
	const nttType = params.get("nttType");
	if (nttType === "Launch" || nttType === "Extended") {
		queryParams.nttType = nttType;
	}

	// Number params
	const numberParams = ["decimals", "erc20Decimals"] as const;
	for (const param of numberParams) {
		const value = params.get(param);
		if (value) {
			queryParams[param] = Number.parseInt(
				value,
				10,
			) as UserTokenInput[typeof param];
		}
	}

	// Chain params
	const sourceChain = params.get("sourceChain");
	if (sourceChain) {
		queryParams.sourceChain = sourceChain as Chain;
	}

	// Handle destination chains array
	const destinationChains = params.get("destinationChains");
	if (destinationChains) {
		const chains = destinationChains.split(",");
		if (chains.length > 0) {
			queryParams.destinationChains = chains.map((chain) => chain as Chain);
		}
	}

	return queryParams;
}

export function buildQueryUrl(input: Partial<UserTokenInput>): string {
	const params = new URLSearchParams();

	// Basic string params
	const stringParams = [
		"symbol",
		"manager",
		"token",
		"transceiver",
		"iconUrl",
		"coinGeckoId",
		"erc20Address",
	] as const;

	for (const param of stringParams) {
		if (input[param]) {
			params.set(param, input[param]!);
		}
	}

	// Handle nttType
	if (input.nttType) {
		params.set("nttType", input.nttType);
	}

	// Number params
	const numberParams = ["decimals", "erc20Decimals"] as const;
	for (const param of numberParams) {
		if (input[param] !== undefined) {
			params.set(param, input[param]!.toString());
		}
	}

	// Chain params
	if (input.sourceChain) {
		params.set("sourceChain", input.sourceChain);
	}

	// Handle destination chains array
	if (input.destinationChains?.length) {
		params.set("destinationChains", input.destinationChains.join(","));
	}

	return `${window.location.pathname}?${params.toString()}`;
}

export function submitFormWithQueryParams(
	input: Partial<UserTokenInput>,
): void {
	const newUrl = buildQueryUrl(input);
	window.location.href = newUrl;
}
