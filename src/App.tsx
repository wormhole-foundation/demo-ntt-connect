import WormholeConnect, {
  WormholeConnectConfig,
  WormholeConnectTheme,
  nttRoutes,
} from "@wormhole-foundation/wormhole-connect";

const wormholeConfig: WormholeConnectConfig = {
  rpcs: {
    Ethereum: import.meta.env.VITE_PUBLIC_ETHEREUM_RPC_URL,
    Solana: import.meta.env.VITE_PUBLIC_SOLANA_RPC_URL,
    Base: import.meta.env.VITE_PUBLIC_BASE_RPC_URL,
  },
  network: "Mainnet",
  chains: ["Ethereum", "Solana", "Base"],
  tokens: [
    "BIOeth",
    "BIOsol",
    "BIObase",
    "GROWeth",
    "GROWsol",
    "QBIOeth",
    "QBIOsol",
    "NEURONeth",
    "NEURONsol"
  ],
  ui: {
    title: "",
    defaultInputs: {
      fromChain: "Ethereum",
      toChain: "Solana",
    },
    showHamburgerMenu: false,
    walletConnectProjectId: "6c25fd4a06db11907122a8483f32fcce",
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
          {
            chain: "Base",
            manager: "0x9AfEbcA0d37661167AFD24481C39eBE2Ead89571",
            token: "0x226A2FA2556C48245E57cd1cbA4C6c9e67077DD2",
            transceiver: [
              {
                address: "0xcb75cC365abD9713b9A9B9613d90e9C359dd483F",
                type: "wormhole",
              },
            ],
          },
        ],
        GROW_NTT: [
          {
            chain: "Ethereum",
            manager: "0x24E85C241766E1e009388cdCe3B70096d2Fd6892",
            token: "0x761A3557184cbC07b7493da0661c41177b2f97fA",
            transceiver: [
              {
                address: "0x1cb452bEA141118f33ae076265d9302Fa1c7Fbf9",
                type: "wormhole",
              },
            ],
          },
          {
            chain: "Solana",
            manager: "nttgQT42hdZ1vNryzXwu2DzCVnxdDrAYyZnYs51gSSd",
            token: "growFDf9teg9gwVTTY3DgpPXU31qBrnbSQCqtY2vkR8",
            transceiver: [
              {
                address: "J5jVpK4ofWPRDiJofWtFccq2ftQqyUz7yseRAbgDv94u",
                type: "wormhole",
              },
            ],
          },
        ],
        QBIO_NTT: [
          {
            chain: "Ethereum",
            manager: "0xD56541B73402519Ffc6CA32596ed2A1179752184",
            token: "0x3E6A1b21bd267677Fa49BE6425aEbe2fc0f89bDE",
            transceiver: [
              {
                address: "0x7c0C6E331Fe8b7368f1497d42f4f26c575F949e2",
                type: "wormhole",
              },
            ],
          },
          {
            chain: "Solana",
            manager: "nttmCZuaoLZ2TEyuo1qytxUJwW9v5Um7bhUgY9zhS6M",
            token: "qbioCGDnUBGX5qcK1Fc4zg19GaQEPmxHFMPMZQm4LZ8",
            transceiver: [
              {
                address: "EmdPKjjXoMsJ6Seek97d51zfJ9Ji4HEjRM5XVQ3KekCG",
                type: "wormhole",
              },
            ],
          },
        ],
        NEURON_NTT: [
          {
            chain: "Ethereum",
            manager: "0x8461ADa5A8F4C7f6E165bFb7798452dDB4C419D4",
            token: "0xab814ce69E15F6B9660A3B184c0B0C97B9394A6b",
            transceiver: [
              {
                address: "0xfCBeCc84af209B46da56d0433C5e7A9D4d3e3b64",
                type: "wormhole",
              },
            ],
          },
          {
            chain: "Solana",
            manager: "NTT7seDbSws7fyMS1R8gf8ZFreQgAnNJiVi8n1fAQNf",
            token: "neuRodi6Saw2cwDpud7FyAcjzqPBJDtr3fDTXE2Fu4j",
            transceiver: [
              {
                address: "emZmj6HX93gSiJ9bsx9a8e7PXmDeUxwm3h1Kv6bgkXt",
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
    BIObase: {
      key: "BIObase",
      symbol: "BIO",
      nativeChain: "Base",
      displayName: "BIO",
      tokenId: {
        chain: "Base",
        address: "0x226A2FA2556C48245E57cd1cbA4C6c9e67077DD2",
      },
      coinGeckoId: "bio-protocol",
      icon: "https://499247139-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F3ba2jNU6BPQUl4RXgHor%2Fuploads%2FnVRhDT0Cg1c1FtdQQOMd%2FToken%20Symbol%20BIO%20Round.svg?alt=media&token=58f7ce22-da87-4a8f-80eb-5a4df20659f6",
      decimals: 18,
    },
    GROWeth: {
      key: "GROWeth",
      symbol: "GROW",
      nativeChain: "Ethereum",
      displayName: "GROW",
      tokenId: {
        chain: "Ethereum",
        address: "0x761A3557184cbC07b7493da0661c41177b2f97fA",
      },
      coinGeckoId: "valleydao",
      icon: "https://arweave.net/QsFe38-xJGwF8cQUJZbEIwpWuWgG2OTe15lcHibY9Y4",
      decimals: 18,
    },
    GROWsol: {
      key: "GROWsol",
      symbol: "GROW",
      nativeChain: "Solana",
      displayName: "GROW",
      tokenId: {
        chain: "Solana",
        address: "growFDf9teg9gwVTTY3DgpPXU31qBrnbSQCqtY2vkR8",
      },
      coinGeckoId: "valleydao",
      icon: "https://arweave.net/QsFe38-xJGwF8cQUJZbEIwpWuWgG2OTe15lcHibY9Y4",
      decimals: 9,
    },
    QBIOeth: {
      key: "QBIOeth",
      symbol: "QBIO",
      nativeChain: "Ethereum",
      displayName: "QBIO",
      tokenId: {
        chain: "Ethereum",
        address: "0x3E6A1b21bd267677Fa49BE6425aEbe2fc0f89bDE",
      },
      coinGeckoId: "quantum-biology-dao",
      icon: "https://arweave.net/5CrrqFd2y_-axdpwtNSvEMgxPksiRBBPTjVcKh1RsAM",
      decimals: 18,
    },
    QBIOsol: {
      key: "QBIOsol",
      symbol: "QBIO",
      nativeChain: "Solana",
      displayName: "QBIO",
      tokenId: {
        chain: "Solana",
        address: "qbioCGDnUBGX5qcK1Fc4zg19GaQEPmxHFMPMZQm4LZ8",
      },
      coinGeckoId: "quantum-biology-dao",
      icon: "https://arweave.net/5CrrqFd2y_-axdpwtNSvEMgxPksiRBBPTjVcKh1RsAM",
      decimals: 9,
    },
    NEURONeth: {
      key: "NEURONeth",
      symbol: "NEURON",
      nativeChain: "Ethereum",
      displayName: "NEURON",
      tokenId: {
        chain: "Ethereum",
        address: "0xab814ce69E15F6B9660A3B184c0B0C97B9394A6b",
      },
      coinGeckoId: "cerebrum-dao",
      icon: "https://bafybeic3v4mdmxk5tzsq7s5wcl4wryvwr74kqf6i63rblir2bylxbhtf2a.ipfs.w3s.link/neuron.png",
      decimals: 18,
    },
    NEURONsol: {
      key: "NEURONsol",
      symbol: "NEURON",
      nativeChain: "Solana",
      displayName: "NEURON",
      tokenId: {
        chain: "Solana",
        address: "neuRodi6Saw2cwDpud7FyAcjzqPBJDtr3fDTXE2Fu4j",
      },
      coinGeckoId: "cerebrum-dao",
      icon: "https://bafybeic3v4mdmxk5tzsq7s5wcl4wryvwr74kqf6i63rblir2bylxbhtf2a.ipfs.w3s.link/neuron.png",
      decimals: 9,
    },
  },
};

function App() {
  const theme: WormholeConnectTheme = {
    mode: "dark",
  };

  return (
    <div>
      <WormholeConnect config={wormholeConfig} theme={theme} />
    </div>
  );
}
export default App;
