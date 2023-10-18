import { User } from "@unscripted/shared-types"
import React from "react"

interface UserContextType {
  user: User
  setUser: (user: User) => void
  provider: any
  setProvider: (provider: any) => void
  signInInfo: any
  setSignInInfo: (signInInfo: any) => void
}

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType
)

export function useProviderUserContext() {
  const [user, setUser] = React.useState<User>({} as User)
  const [provider, setProvider] = React.useState<any>(null)
  const [signInInfo, setSignInInfo] = React.useState<any>(null)

  return {
    user,
    setUser,
    provider,
    setProvider,
    signInInfo,
    setSignInInfo,
  }
}

export const useUserContext = () => React.useContext(UserContext)
