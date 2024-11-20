import { WormholeConnectConfig, nttRoutes } from '@wormhole-foundation/wormhole-connect';
import { UserTokenInput, TokenConfig } from '../types';

export const generateWormholeConfig = (tokenInput: UserTokenInput): WormholeConnectConfig => {
  const { 
    symbol, 
    manager, 
    token: tokenAddress, 
    transceiver, 
    sourceChain, 
    destinationChain,
    iconUrl,
    decimals,
    coinGeckoId
  } = tokenInput;

  const tokensConfig: Record<string, TokenConfig> = {};
  const tokenKeys: string[] = [];

  [sourceChain, destinationChain].forEach((chain) => {
    const tokenKey = `${symbol}${chain}`;
    tokenKeys.push(tokenKey);
    tokensConfig[tokenKey] = {
      key: tokenKey,
      symbol,
      nativeChain: chain,
      displayName: symbol,
      tokenId: {
        chain,
        address: tokenAddress
      },
      coinGeckoId,
      icon: iconUrl,
      decimals
    };
  });

  return {
    network: 'Testnet',
    chains: [sourceChain, destinationChain],
    tokens: tokenKeys,
    ui: {
      title: 'Wormhole NTT UI',
      defaultInputs: {
        fromChain: sourceChain,
        toChain: destinationChain
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
              token: tokenAddress,
              transceiver: [
                {
                  address: transceiver,
                  type: 'wormhole' as const,
                },
              ],
            },
            {
              chain: destinationChain,
              manager,
              token: tokenAddress,
              transceiver: [
                {
                  address: transceiver,
                  type: 'wormhole' as const,
                },
              ],
            }
          ]
        }
      })
    ],
    tokensConfig
  };
}; 