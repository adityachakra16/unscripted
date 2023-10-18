// useUserProfile.js
import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { DetailedUser, User } from "@unscripted/shared-types"
import { getWeb3Modal } from "../Web3Modal"
import { ethers } from "ethers"

export async function fetchUserProfile(): Promise<User> {
  const web3AuthModalPack = (await getWeb3Modal()) as any
  const user = await web3AuthModalPack.getUserInfo()
  console.log({ user })
  return user
}

export async function fetchSigner(): Promise<any> {
  const web3AuthModalPack = (await getWeb3Modal()) as any
  const signer = await web3AuthModalPack.getSigner()
  console.log({ signer })
  return signer
}

export function useUserProfile() {
  return useQuery("userProfile", fetchUserProfile)
}
