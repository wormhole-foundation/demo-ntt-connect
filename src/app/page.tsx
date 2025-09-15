'use client';

import WormholeConnect, {
    type config,
  } from '@wormhole-foundation/wormhole-connect';
import {
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect/ntt';

const wormholeConfig: config.WormholeConnectConfig = {
  network: 'Mainnet',
  chains: ['Solana', 'Base'],
  tokens: ['ASSDAQ'],
  ui: {
    title: 'ASSDAQ Wormhole NTT',
    defaultInputs: {
      fromChain: 'Solana',
      toChain: 'Base'
    },
    // walletConnectProjectId: '', 
  },
  // TODO: use a private RPC for mainnet
    rpcs: {
			Solana: 'https://solana-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
      Base: 'https://base-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
		},
  routes: [
    ...nttRoutes({
			tokens: {
				ASSDAQ: [
				{
					chain: 'Solana',
					manager: 'NttZfWTBkZwiy4JM9m3g2doDiDi5jdxEFedMP1FX4tE',
					token: '7Tx8qTXSakpfaSFjdztPGQ9n2uyT1eUkYz7gYxxopump',
					transceiver: [
					{
						address: 'D522vLiUqryB3L8E2sz7RcTNVbsPcmNPTmzSSGDSfs3a',
						type: 'wormhole',
					},
					],
				},
        {
					chain: 'Base',
					manager: '0xc59F83D2586Cab39FcE40D9c3cFF457255ce43D8',
					token: '0x2A47d3C2D31C36be715a8a90Ecb922A0b97107d9',
					transceiver: [
					{
						address: '0xC0d8056651e7acF4918B788dAe28D8Df72D24313',
						type: 'wormhole',
					},
					],
				},
				],
			},
			}),
  ],
  tokensConfig: {
    ASSDAQsol: {
				symbol: 'ASSDAQ',
				tokenId: {
					chain: 'Solana',
					address: '7Tx8qTXSakpfaSFjdztPGQ9n2uyT1eUkYz7gYxxopump',
				},
				icon: 'https://assdaq.win/logo.jpg',
				decimals: 6,
			},
      ASSDAQbase: {
				symbol: 'ASSDAQ',
				tokenId: {
					chain: 'Base',
					address: '0x2A47d3C2D31C36be715a8a90Ecb922A0b97107d9',
				},
				icon: 'https://assdaq.win/logo.jpg',
				decimals: 18,
			},
  }
}

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <WormholeConnect 
          config={wormholeConfig} 
          theme={{ mode: 'dark', primary: '#78c4b6' }} 
        />
      </div>
    </div>
  )
} 