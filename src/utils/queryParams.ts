import { Chain } from '@wormhole-foundation/wormhole-connect';
import { UserTokenInput } from '../types';

export const getQueryParams = (): Partial<UserTokenInput> => {
  const params = new URLSearchParams(window.location.search);
  const queryParams: Partial<UserTokenInput> = {};

  const paramMap: Record<string, keyof UserTokenInput> = {
    symbol: 'symbol',
    manager: 'manager',
    token: 'token',
    transceiver: 'transceiver',
    sourceChain: 'sourceChain',
    destinationChain: 'destinationChain',
    iconUrl: 'iconUrl',
    decimals: 'decimals',
    coinGeckoId: 'coinGeckoId'
  };

  Object.entries(paramMap).forEach(([param, key]) => {
    const value = params.get(param);
    if (value) {
      if (key === 'decimals') {
        queryParams[key] = parseInt(value);
      } else if (key === 'sourceChain' || key === 'destinationChain') {
        const validChains: Chain[] = ['Sepolia', 'BaseSepolia', 'ArbitrumSepolia', 'OptimismSepolia'];
        if (validChains.includes(value as Chain)) {
          queryParams[key] = value as Chain;
        }
      } else {
        queryParams[key] = value;
      }
    }
  });

  return queryParams;
}; 