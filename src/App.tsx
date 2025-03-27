import WormholeConnect, {
    WormholeConnectConfig,
    nttRoutes,
    WormholeConnectTheme,
  } from '@wormhole-foundation/wormhole-connect';
  
  const wormholeConfig: WormholeConnectConfig = {
    network: 'Testnet',
    chains: ['Solana', 'BaseSepolia'],
    tokens: ['WSVsol', 'WSVbase'],
    ui: {
      title: 'Wormhole NTT UI',
      defaultInputs: {
        fromChain: 'Solana',
        toChain: 'BaseSepolia'
      },
    },
    // TODO: use a private RPC for mainnet
    // rpcs: {
    //   Solana: 'https://mainnet.helius-rpc.com/?api-key=$KEY',
    // },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: 'Solana',
              manager: 'nMxHx1o8GUg2pv99y8JAQb5RyWNqDWixbxWCaBcurQx',
              token: '2vLDzr7hUpLFHQotmR8EPcMTWczZUwCK31aefAzumkmv',
              transceiver: [
                {
                  address: 'AjL3f9FMHJ8VkNUHZqLYxa5aFy3aTN6LUWMv4qmdf5PN',
                  type: 'wormhole',
                },
              ],
            },
            {
              chain: 'BaseSepolia',
              manager: '0xaE02Ff9C3781C5BA295c522fB469B87Dc5EE9205',
              token: '0xb8dccDA8C166172159F029eb003d5479687452bD',
              transceiver: [
                {
                  address: '0xF4Af1Eac8995766b54210b179A837E3D59a9F146',
                  type: 'wormhole',
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      WSVsol: {
        symbol: 'WSV',
        tokenId: {
          chain: 'Solana',
          address: '2vLDzr7hUpLFHQotmR8EPcMTWczZUwCK31aefAzumkmv'
        },
        icon: 'https://wormhole.com/token.png',
        decimals: 9
      },
      WSVbase: {
        symbol: 'WSV',
        tokenId: {
          chain: 'BaseSepolia',
          address: '0xb8dccDA8C166172159F029eb003d5479687452bD'
        },
        icon: 'https://wormhole.com/token.png',
        decimals: 9
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