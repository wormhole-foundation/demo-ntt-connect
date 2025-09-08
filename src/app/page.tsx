'use client';

import WormholeConnect, {
    type config,
  } from '@wormhole-foundation/wormhole-connect';
import {
  nttRoutes,
} from '@wormhole-foundation/wormhole-connect/ntt';
import RealClaimComponent from '../components/RealClaimComponent';

const wormholeConfig: config.WormholeConnectConfig = {
  network: 'Mainnet',
  chains: ['Ethereum', 'Seievm'],
  tokens: ['tBTC'],
  ui: {
    title: 'Wormhole NTT UI',
    defaultInputs: {
      fromChain: 'Ethereum',
      toChain: 'Seievm'
    },
    // walletConnectProjectId: '', 
  },
  // Add RPC configuration for Seievm chain
  rpcs: {
    Seievm: 'https://evm-rpc.sei-apis.com',
  },
  routes: [
    ...nttRoutes({
      tokens: {
        WSV_NTT: [
          {
            chain: 'Ethereum',
            manager: '0x79eb9aF995a443A102A19b41EDbB58d66e2921c7',
            token: '0x18084fbA666a33d37592fA2633fD49a74DD93a88',
            transceiver: [
              {
                address: '0x73D19b20B374bFE4105c2b0De55504512f0C2AA7',
                type: 'wormhole',
              },
            ],
          },
          {
            chain: 'Seievm',
            manager: '0xc10a0886d4Fe06bD61f41ee2855a2215375B82f0',
            token: '0xF9201c9192249066Aec049ae7951ae298BBEc767',
            transceiver: [
              {
                address: '0x83849F9c2EB47Ce0D59524a43CB101533bc1b6A6',
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
      symbol: 'tBTC',
      tokenId: {
        chain: 'Ethereum',
        address: '0x18084fbA666a33d37592fA2633fD49a74DD93a88'
      },
      icon: 'https://wormhole.com/token.png',
      decimals: 18
    },
    WSVbase: {
      symbol: 'tBTC',
      tokenId: {
        chain: 'Seievm',
        address: '0xF9201c9192249066Aec049ae7951ae298BBEc767'
      },
      icon: 'https://wormhole.com/token.png',
      decimals: 18
    }
  }
}

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
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