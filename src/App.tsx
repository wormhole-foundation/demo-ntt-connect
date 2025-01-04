import WormholeConnect, {
    WormholeConnectConfig,
    nttRoutes,
    WormholeConnectTheme,
  } from '@wormhole-foundation/wormhole-connect';
  
  const wormholeConfig: WormholeConnectConfig = {
    network: 'Mainnet',
    chains: ['Ethereum', 'Base'],
    tokens: ['WMain', 'WBase'],
    ui: {
      title: 'Wormhole NTT UI',
      defaultInputs: {
        fromChain: 'Ethereum',
        toChain: 'Base'
      },
      showHamburgerMenu: false,
    },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: 'Ethereum',
              manager: '0xF6164E486caD82c3f8445389f93c306f5c26De1A',
              token: '0x25c31B1F93F846C7c8debfD05898F162740A4581',
              transceiver: [
                {
                  address: '0x09Da0832CDb0aaC7cFe3598057d41D47067D9D62',
                  type: 'wormhole',
                },
              ],
            },
            {
              chain: 'Base',
              manager: '0xD6d3f0d8a679c5ced453102AE7Eda3470CA8dd5a',
              token: '0xef0fd52e65DdcDc201E2055a94D2aBff6fF10a7a',
              transceiver: [
                {
                  address: '0x747786f58caED8D28e1a5095421e1b392087259C',
                  type: 'wormhole',
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      WMain: {
        key: 'WMain',
        symbol: 'WANDER',
        nativeChain: 'Ethereum',
        displayName: 'WANDER',
        tokenId: {
          chain: 'Ethereum',
          address: '0x25c31B1F93F846C7c8debfD05898F162740A4581'
        },
        coinGeckoId: 'wormhole',
        icon: 'https://cms.wanderers.ai/assets/827e8d07-4afe-4062-8db7-b8a47f57b4e4.png',
        decimals: 18
      },
      WBase: {
        key: 'WBase',
        symbol: 'WANDER',
        nativeChain: 'Base',
        displayName: 'WANDER',
        tokenId: {
          chain: 'Base',
          address: '0xef0fd52e65DdcDc201E2055a94D2aBff6fF10a7a'
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