'use client';

import WormholeConnect, {
    type config,
  } from '@wormhole-foundation/wormhole-connect';
import {
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect/ntt';

const wormholeConfig: config.WormholeConnectConfig = {
  network: 'Mainnet',
  chains: ['Solana', 'Ethereum'],
  tokens: ['ASSDAQ'],
  ui: {
    title: 'ASSDAQ Wormhole NTT',
    defaultInputs: {
      fromChain: 'Solana',
      toChain: 'Ethereum'
    },
    walletConnectProjectId: '783b57fa9f912c0e22c9885b7ec51194', 
  },
  // TODO: use a private RPC for mainnet
    rpcs: {
			Solana: 'https://solana-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
			Ethereum: 'https://eth-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
	},
  	routes: [
    	...nttRoutes({
			tokens: {
				ASSDAQ: [
				{
					chain: 'Solana',
					manager: 'NTtqw55qyL2582gLjVoDTYKHTUwFbUAwgui8UN6nVrn',
					token: '7Tx8qTXSakpfaSFjdztPGQ9n2uyT1eUkYz7gYxxopump',
					transceiver: [
					{
						address: '8BFpjjxeEP4ZVEvf33nbsW1ZgRiMR6YMPrmYdp6EescY',
						type: 'wormhole',
					},
					],
				},
				{
					chain: 'Ethereum',
					manager: '0x3c100D5AfB0dDb41aC0D1e374040B8255b38f78a',
					token: '0xF4F53989d770458B659f8D094b8E31415F68A4Cf',
					transceiver: [
					{
						address: '0x1150B0cefAc880e488c6d386f0d9A5f6cF73C06B',
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
		ASSDAQethereum: {
				symbol: 'ASSDAQ',
				tokenId: {
					chain: 'Ethereum',
					address: '0xF4F53989d770458B659f8D094b8E31415F68A4Cf',
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