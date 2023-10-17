// useUserProfile.js
import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { User } from "@unscripted/shared-types"

async function fetchUserProfile(): Promise<User> {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
}

export function useUserProfile() {
  return useQuery("userProfile", fetchUserProfile)
}
