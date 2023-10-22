import router from "next/router"
import { sendRequest } from "../Request"
import { AuthKitSignInData } from "@safe-global/auth-kit"
import { getWeb3Modal } from "../Web3Modal"

export async function login(
  token: string,
  publicKey: string,
  signedInData: AuthKitSignInData
) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      appPubKey: publicKey,
      signedInData: signedInData,
    }),
    credentials: "include",
  })
}

export async function logout() {
  const web3AuthModalPack = await getWeb3Modal()
  if (!web3AuthModalPack) return
  await web3AuthModalPack.signOut()
  router.push("/")
}
