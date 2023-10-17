import router from "next/router"
import { sendRequest } from "../Request"

export async function login(email: string) {
  await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination: email }),
  })
}

export function logout() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  router.push("/login")
}
