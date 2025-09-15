'use client';

import WormholeConnect, {
    type config,
  } from '@wormhole-foundation/wormhole-connect';
import {
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect/ntt';

const wormholeConfig: config.WormholeConnectConfig = {
  network: 'Mainnet',
  chains: ['Solana', 'Bsc'],
  tokens: ['ASSDAQ'],
  ui: {
    title: 'ASSDAQ Wormhole NTT',
    defaultInputs: {
      fromChain: 'Solana',
      toChain: 'Bsc'
    },
    // walletConnectProjectId: '', 
  },
  // TODO: use a private RPC for mainnet
    rpcs: {
			Solana: 'https://solana-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
			Bsc: 'https://bnb-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
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
					chain: 'Bsc',
					manager: '0xC5ef16Ac420D24846a123fbeA74548DA18fC3735',
					token: '0x423A93E4FAEB739F1243CaF6f242711B399B048d',
					transceiver: [
					{
						address: '0x12B0a86Cc149C1C3CD9104C22BE3059Cb5D39b59',
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
			ASSDAQbsc: {
				symbol: 'ASSDAQ',
				tokenId: {
					chain: 'Bsc',
					address: '0x423A93E4FAEB739F1243CaF6f242711B399B048d',
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