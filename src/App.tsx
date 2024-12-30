import WormholeConnect, {
    WormholeConnectConfig,
    nttRoutes,
    WormholeConnectTheme,
  } from '@wormhole-foundation/wormhole-connect';
  
  const wormholeConfig: WormholeConnectConfig = {
    network: 'Testnet',
    chains: ['Sepolia', 'BaseSepolia'],
    tokens: ['TestSep', 'TestBase'],
    ui: {
      title: 'Wormhole NTT UI',
      defaultInputs: {
        fromChain: 'Sepolia',
        toChain: 'BaseSepolia'
      },
      showHamburgerMenu: false,
    },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: 'Sepolia',
              manager: '0x7331c4497f2D88739666aAeb99df71Da053943Fe',
              token: '0xA7Fd6143826f06D12381605fccE984dE89baD232',
              transceiver: [
                {
                  address: '0xfefF125C049bCe6230c38B1d17d7AC3f6FF37524',
                  type: 'wormhole',
                },
              ],
            },
            {
              chain: 'BaseSepolia',
              manager: '0x7331c4497f2D88739666aAeb99df71Da053943Fe',
              token: '0xA7Fd6143826f06D12381605fccE984dE89baD232',
              transceiver: [
                {
                  address: '0xfefF125C049bCe6230c38B1d17d7AC3f6FF37524',
                  type: 'wormhole',
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      TestSep: {
        key: 'TestSep',
        symbol: 'WANDER',
        nativeChain: 'Sepolia',
        displayName: 'WANDER',
        tokenId: {
          chain: 'Sepolia',
          address: '0xA7Fd6143826f06D12381605fccE984dE89baD232'
        },
        coinGeckoId: 'wormhole',
        icon: 'https://cms.wanderers.ai/assets/827e8d07-4afe-4062-8db7-b8a47f57b4e4.png',
        decimals: 18
      },
      TestBase: {
        key: 'TestBase',
        symbol: 'WANDER',
        nativeChain: 'BaseSepolia',
        displayName: 'WANDER',
        tokenId: {
          chain: 'BaseSepolia',
          address: '0xA7Fd6143826f06D12381605fccE984dE89baD232'
        },
        coinGeckoId: 'wormhole',
        icon: 'https://cms.wanderers.ai/assets/827e8d07-4afe-4062-8db7-b8a47f57b4e4.png',
        decimals: 18
      }
    }
  }
  
  function App() {
    const theme: WormholeConnectTheme = {
      mode: 'dark',
      primary: '#78c4b6',
    };

    return (
      <div>
        <WormholeConnect config={wormholeConfig} theme={theme} />
      </div>
    )
  }
  export default App