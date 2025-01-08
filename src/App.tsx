import WormholeConnect, {
  WormholeConnectConfig,
  WormholeConnectTheme,
  nttRoutes,
} from "@wormhole-foundation/wormhole-connect";

const wormholeConfig: WormholeConnectConfig = {
  rpcs: {
    Ethereum: import.meta.env.VITE_PUBLIC_ETHEREUM_RPC_URL,
    Solana: import.meta.env.VITE_PUBLIC_SOLANA_RPC_URL,
  },
  network: "Mainnet",
  chains: ["Ethereum", "Solana"],
  tokens: ["BIOeth", "BIOsol"],
  ui: {
    title: "",
    defaultInputs: {
      fromChain: "Ethereum",
      toChain: "Solana",
    },
    showHamburgerMenu: false,
    walletConnectProjectId: "69c3c56dff9a59329d42b5c2f3bf20aa",
  },
  routes: [
    ...nttRoutes({
      tokens: {
        BIO_NTT: [
          {
            chain: "Ethereum",
            manager: "0x1783E7d1F498321D7E15044d769621E1beDc7F4C",
            token: "0xcb1592591996765Ec0eFc1f92599A19767ee5ffA",
            transceiver: [
              {
                address: "0x676Cd89c6B6f02d6975547fD7Da1d5A8dbc8a3E1",
                type: "wormhole",
              },
            ],
          },
          {
            chain: "Solana",
            manager: "ntt11hdA4n1PupHhLyT1fsjg4YF9agVz3CTuzLRQs1H",
            token: "bioJ9JTqW62MLz7UKHU69gtKhPpGi1BQhccj2kmSvUJ",
            transceiver: [
              {
                address: "5Yaf3N7MAEThp5FBBjUri8rv9mWxFEiJBjTKYYeKEi37",
                type: "wormhole",
              },
            ],
          },
        ],
      },
    }),
  ],
  tokensConfig: {
    BIOsol: {
      key: "BIOsol",
      symbol: "BIO",
      nativeChain: "Solana",
      displayName: "BIO",
      tokenId: {
        chain: "Solana",
        address: "bioJ9JTqW62MLz7UKHU69gtKhPpGi1BQhccj2kmSvUJ",
      },
      coinGeckoId: "bio-protocol",
      icon: "https://499247139-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F3ba2jNU6BPQUl4RXgHor%2Fuploads%2FnVRhDT0Cg1c1FtdQQOMd%2FToken%20Symbol%20BIO%20Round.svg?alt=media&token=58f7ce22-da87-4a8f-80eb-5a4df20659f6",
      decimals: 9,
    },
    BIOeth: {
      key: "BIOeth",
      symbol: "BIO",
      nativeChain: "Ethereum",
      displayName: "BIO",
      tokenId: {
        chain: "Ethereum",
        address: "0xcb1592591996765Ec0eFc1f92599A19767ee5ffA",
      },
      coinGeckoId: "bio-protocol",
      icon: "https://499247139-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F3ba2jNU6BPQUl4RXgHor%2Fuploads%2FnVRhDT0Cg1c1FtdQQOMd%2FToken%20Symbol%20BIO%20Round.svg?alt=media&token=58f7ce22-da87-4a8f-80eb-5a4df20659f6",
      decimals: 18,
    },

  },
};

function App() {
  const theme: WormholeConnectTheme = {
    mode: 'dark',
  };

  return (
    <div >
      <WormholeConnect config={wormholeConfig} theme={theme} />
    </div>
  )
}
export default App