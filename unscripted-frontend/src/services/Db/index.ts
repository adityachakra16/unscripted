import { Database } from "@tableland/sdk"
import { ethers } from "ethers"
import { getWeb3Modal } from "../Web3Modal"
import { ExternalProvider } from "@tableland/sdk/dist/esm/helpers"

// This table has schema: `counter INTEGER PRIMARY KEY`
export const scriptsTable = "scripts_80001_7886" // Our pre-defined health check table

export async function getDb() {
  const web3AuthModalPack = await getWeb3Modal()
  const provider = new ethers.providers.Web3Provider(
    web3AuthModalPack.getProvider() as ExternalProvider
  )
  console.log({ provider })
  const signer = provider.getSigner()

  console.log({ signer })
  return new Database({ signer })
}
