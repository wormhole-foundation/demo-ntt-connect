import { useEffect, useState } from 'react';
import WormholeConnect, {
  Chain,
  WormholeConnectConfig,
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect';

interface TokenAddresses {
  manager: string;
  token: string;
  transceiver: string;
}

interface TokenData {
  addresses: TokenAddresses;
  chains: Chain[];
}

interface CustomTokens {
  [tokenSymbol: string]: TokenData;
}

interface TokenConfig {
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

interface TokensConfig {
  [key: string]: TokenConfig;
}

interface NttRouteConfig {
  chain: Chain;
  manager: string;
  token: string;
  transceiver: Array<{
    address: string;
    type: 'wormhole';
  }>;
}

interface NttConfigs {
  [key: string]: NttRouteConfig[];
}

// Helper function to create token configs
const createTokenConfig = (tokenSymbol: string, chain: Chain, tokenAddress: string): TokenConfig => ({
  key: `${tokenSymbol}${chain}`,
  symbol: tokenSymbol,
  nativeChain: chain,
  displayName: tokenSymbol,
  tokenId: {
    chain: chain,
    address: tokenAddress
  },
  coinGeckoId: 'wormhole',
  icon: 'https://wormhole.com/token.png',
  decimals: 18
});

function App() {
  const [config, setConfig] = useState<WormholeConnectConfig | null>(null);

  useEffect(() => {
    const fetchAndCreateConfig = async () => {
      try {
        const response = await fetch('/src/customTokens/customTokens.json');
        const customTokens: CustomTokens = await response.json();

        // Initialize configurations
        const tokensConfig: TokensConfig = {};
        const tokenKeys: string[] = [];
        const nttConfigs: NttConfigs = {};
        const allChains = new Set<Chain>();

        // Process each token in the JSON
        Object.entries(customTokens).forEach(([tokenSymbol, tokenData]) => {
          const { addresses, chains } = tokenData;

          // Add chains to the set of all chains
          chains.forEach(chain => allChains.add(chain));

          // Create token configurations for each chain
          chains.forEach((chain) => {
            const tokenKey = `${tokenSymbol}${chain}`;
            tokenKeys.push(tokenKey);
            tokensConfig[tokenKey] = createTokenConfig(tokenSymbol, chain, addresses.token);
          });

          // Create NTT route configuration for this token
          nttConfigs[`${tokenSymbol}_NTT`] = chains.map((chain) => ({
            chain,
            manager: addresses.manager,
            token: addresses.token,
            transceiver: [
              {
                address: addresses.transceiver,
                type: 'wormhole' as const,
              },
            ],
          }));
        });

        // Create the final config
        const wormholeConfig: WormholeConnectConfig = {
          network: 'Testnet',
          chains: Array.from(allChains),
          tokens: tokenKeys,
          ui: {
            title: 'Wormhole NTT UI',
            defaultInputs: {
              fromChain: Array.from(allChains)[0],
              toChain: Array.from(allChains)[1]
            },
            showHamburgerMenu: false,
          },
          routes: [...nttRoutes({ tokens: nttConfigs })],
          tokensConfig
        };

        setConfig(wormholeConfig);
      } catch (error) {
        console.error('Error loading configuration:', error);
      }
    };

    fetchAndCreateConfig();
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  console.log(config);

  return (
    <div>
      <WormholeConnect config={config} />
    </div>
  );
}

export default App;