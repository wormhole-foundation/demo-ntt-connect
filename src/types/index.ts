import { Chain } from '@wormhole-foundation/wormhole-connect';

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
  destinationChain: Chain;
  iconUrl: string;
  decimals: number;
  coinGeckoId: string;
} 