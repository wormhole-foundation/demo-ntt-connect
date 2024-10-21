import WormholeConnect, {
  WormholeConnectConfig,
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect';

const wormholeConfig: WormholeConnectConfig = {
  network: 'Testnet',
  isRouteSupportedHandler: async (td) => { if (td.route === 'AutomaticNtt' && td.fromChain === 'Solana') { return false; } return true; },
  chains: ['ArbitrumSepolia', 'Solana'], // from https://github.com/wormhole-foundation/wormhole-connect/blob/development/wormhole-connect/src/config/testnet/chains.ts#L170
  tokens: ['Warbsep', 'Wsol'],   // this will limit the available tokens that can be transferred to the other chain
  ui: {
    title: 'Wormhole Bridge',
    defaultInputs: {
      fromChain: 'ArbitrumSepolia',
      toChain: 'Solana'
    },
    showHamburgerMenu: false,
  },
  routes: [
    ...nttRoutes({
      tokens: {
        BRZ_NTT: [
          {
            chain: 'ArbitrumSepolia',
            manager: '0xeBdEFbC8111439449293A98f552a4BE57e2D5FAD',
            token: '0xF7cbc69c6259Cf06582EEDF9477D58a15Dc5332e',
            transceiver: [
              {
                address: '0xf5D15B2F36A34918bD18C9D1382B98B9C22a7d3e',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Solana',
            manager: 'NtTPyV3KBrW8YAnZbVhEMT2iqJrqnQTvfuoK3NQe5Rt',
            token: 'GCzVVsjMjkg8EpoidnFW9bqegwhbp1GWGpzuSfhH6fyB',
            transceiver: [
              {
                address: 'AQmPbngJJHmKcC482pVshfLeS3KP4iK5q863a2DhH992',
                type: 'wormhole',
              },
            ],
          },
        ],
      },
    }),
  ],
  tokensConfig: {
    Warbsep: {
      key: 'Warbsep',
      symbol: 'W',
      nativeChain: 'ArbitrumSepolia',  // will be shown as native only on this chain, otherwise as "Wormhole wrapped"
      displayName: 'W', // name that is displayed in the Route
      tokenId: {
        chain: 'ArbitrumSepolia',
        address: '0x5Eed9B952c110E47ddeC2843FF1f6B7C70131470'
      },
      coinGeckoId: 'wormhole', // coingecko api id
      icon: 'https://wormhole.com/token.png',
      decimals: 18
    },

    Wsol: {
      key: 'Wsol',
      symbol: 'W',
      nativeChain: 'Solana', 
      displayName: 'W', 
      tokenId: {
        chain: 'Solana',
        address: 'jw8kpdKGFxwrsRze3NzxvUQZBhUsY1bmioQYQtR6PP5'
      },
      coinGeckoId: 'wormhole',
      icon: 'https://wormhole.com/token.png',
      decimals: 9
    }
  }
}

function App() {
  return (
    <div>
      <WormholeConnect config={wormholeConfig} />
    </div>
  )
}


export default App