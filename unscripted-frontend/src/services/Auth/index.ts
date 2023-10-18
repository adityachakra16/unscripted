import router from "next/router"
import { sendRequest } from "../Request"
import { AuthKitSignInData } from "@safe-global/auth-kit"

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

export function logout() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  router.push("/login")
}
