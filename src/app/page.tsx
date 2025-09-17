'use client';

import WormholeConnect, {
    type config,
  } from '@wormhole-foundation/wormhole-connect';
import {
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect/ntt';

const wormholeConfig: config.WormholeConnectConfig = {
  network: 'Mainnet',
  chains: ['Solana', 'Ethereum', 'Bsc', 'Base'],
  tokens: ['ASSDAQ'],
  ui: {
    title: 'ASSDAQ Wormhole NTT',
    defaultInputs: {
      fromChain: 'Solana',
      toChain: 'Ethereum'
    },
    // walletConnectProjectId: '', 
  },
  // TODO: use a private RPC for mainnet
    rpcs: {
			Solana: 'https://solana-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
			Base: 'https://base-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
			Bsc: 'https://bnb-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
			Ethereum: 'https://eth-mainnet.g.alchemy.com/v2/teJ8fphdkw5QEwQ0kANwCAEDKn5iGLVw',
	},
  	routes: [
    	...nttRoutes({
			tokens: {
				ASSDAQ: [
				{
					chain: 'Solana',
					manager: 'nTtqL6GRSGRRdkbPDsNcU5yseJWDKRUpCHyz1dWgP1G',
					token: '7Tx8qTXSakpfaSFjdztPGQ9n2uyT1eUkYz7gYxxopump',
					transceiver: [
					{
						address: '8mevnsXEVBRgFSPEhMVJKiJFMRwdv4irSMYaAnoF3puB',
						type: 'wormhole',
					},
					],
				},
				{
					chain: 'Base',
					manager: '0x181098Af37976C4beD8026bb2c5DC8a9d752102A',
					token: '0xdBF2B6Cc13deB203B52BFF5777d7541e6342ee31',
					transceiver: [
					{
						address: '0xBcB1AB67749D90D1Bf576f8F04EeF54ecCec5a61',
						type: 'wormhole',
					},
					],
				},
				{
					chain: 'Bsc',
					manager: '0x181098Af37976C4beD8026bb2c5DC8a9d752102A',
					token: '0xdBF2B6Cc13deB203B52BFF5777d7541e6342ee31',
					transceiver: [
					{
						address: '0xBcB1AB67749D90D1Bf576f8F04EeF54ecCec5a61',
						type: 'wormhole',
					},
					],
				},
				{
					chain: 'Ethereum',
					manager: '0x181098Af37976C4beD8026bb2c5DC8a9d752102A',
					token: '0xdBF2B6Cc13deB203B52BFF5777d7541e6342ee31',
					transceiver: [
					{
						address: '0xBcB1AB67749D90D1Bf576f8F04EeF54ecCec5a61',
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
					address: '0xdBF2B6Cc13deB203B52BFF5777d7541e6342ee31',
				},
				icon: 'https://assdaq.win/logo.jpg',
				decimals: 18,
	},
	ASSDAQbsc: {
				symbol: 'ASSDAQ',
				tokenId: {
					chain: 'Base',
					address: '0xdBF2B6Cc13deB203B52BFF5777d7541e6342ee31',
				},
				icon: 'https://assdaq.win/logo.jpg',
				decimals: 18,
	},
	ASSDAQethereum: {
				symbol: 'ASSDAQ',
				tokenId: {
					chain: 'Base',
					address: '0xdBF2B6Cc13deB203B52BFF5777d7541e6342ee31',
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