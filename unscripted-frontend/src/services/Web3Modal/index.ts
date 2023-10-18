import { Web3AuthConfig, Web3AuthModalPack } from "@safe-global/auth-kit"
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base"
import { Web3AuthOptions } from "@web3auth/modal"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"

export async function getWeb3Modal() {
  const options: Web3AuthOptions = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!,
    web3AuthNetwork: "testnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x13881",
      rpcTarget: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL,
    },
    uiConfig: {
      loginMethodsOrder: ["google", "facebook"],
      theme: "light",
    },
  }

  const modalConfig = {
    [WALLET_ADAPTERS.TORUS_EVM]: {
      label: "torus",
      showOnModal: false,
    },
    [WALLET_ADAPTERS.METAMASK]: {
      label: "metamask",
      showOnDesktop: true,
      showOnMobile: false,
    },
  }

  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: "none",
    },
    adapterSettings: {
      uxMode: "popup",
      whiteLabel: {
        name: "Safe",
      },
    },
  })

  const web3AuthConfig: Web3AuthConfig = {
    txServiceUrl: "https://safe-transaction-goerli.safe.global",
  }
  // Instantiate and initialize the pack
  const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig)
  await web3AuthModalPack.init({
    options,
    adapters: [openloginAdapter],
    modalConfig,
  })
  return web3AuthModalPack
}
