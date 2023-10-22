import { useUserContext } from "@/context/UserContext"
import { getWeb3Modal } from "@/services/Web3Modal"
import { FC, useEffect } from "react"

interface AutoLoginProps {
  className?: string
}

export const AutoLogin: FC<AutoLoginProps> = ({ children, className }) => {
  const { user, setUser, provider, setProvider, signInInfo, setSignInInfo } =
    useUserContext()

  useEffect(() => {
    const login = async () => {
      const web3AuthModalPack = await getWeb3Modal()
      const signedInData = await web3AuthModalPack.signIn()
      const provider = web3AuthModalPack.getProvider()
      const user = await web3AuthModalPack.getUserInfo()
      setUser(user)
      setProvider(provider)
      setSignInInfo(signedInData)
    }
    login()
  }, [])

  return <div className={className}>{children}</div>
}
