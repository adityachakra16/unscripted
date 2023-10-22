import {
  balanceOfRewardToken,
  getStakedAmount,
  getTotalStaked,
  totalClaimableRewards,
} from "@/services/Script"
import { User } from "@unscripted/shared-types"
import React, { useEffect } from "react"

interface UserContextType {
  user: User
  setUser: (user: User) => void
  provider: any
  setProvider: (provider: any) => void
  signInInfo: any
  setSignInInfo: (signInInfo: any) => void
  totalStaked: string
  setTotalStaked: (totalStaked: string) => void
  balance: string
  setBalance: (balance: string) => void
  claimableRewards: string
  setClaimableRewards: (claimableRewards: string) => void
}

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
)

export function useProviderUserContext() {
  const [user, setUser] = React.useState<User>({} as User)
  const [provider, setProvider] = React.useState<any>(null)
  const [signInInfo, setSignInInfo] = React.useState<any>(null)
  const [totalStaked, setTotalStaked] = React.useState<string>("0")
  const [balance, setBalance] = React.useState<string>("0")
  const [claimableRewards, setClaimableRewards] = React.useState<string>("0")

  useEffect(() => {
    console.log("hey")
    if (!provider || !signInInfo) return

    void (async () => {
      console.log({ signInInfo, provider })
      const reqs = await Promise.all([
        getTotalStaked(provider, signInInfo.eoa),
        balanceOfRewardToken(provider, signInInfo.eoa),
        totalClaimableRewards(provider, signInInfo.eoa),
      ])
      console.log({ reqs })
      setTotalStaked(reqs[0] || "Not Found")
      setBalance(reqs[1] || "Not Found")
      setClaimableRewards(reqs[2] || "Not Found")
    })()
  }, [signInInfo, provider])

  return {
    user,
    setUser,
    provider,
    setProvider,
    signInInfo,
    setSignInInfo,
    totalStaked,
    setTotalStaked,
    balance,
    setBalance,
    claimableRewards,
    setClaimableRewards,
  }
}

export const useUserContext = () => React.useContext(UserContext)
