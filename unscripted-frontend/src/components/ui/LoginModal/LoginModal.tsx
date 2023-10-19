import { useUserContext } from "@/context/UserContext"
import { getWeb3Modal } from "@/services/Web3Modal"
import { Web3AuthModalPack } from "@safe-global/auth-kit"
import { FC, useEffect, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginModalProps {}

export const LoginModal: FC<LoginModalProps> = () => {
  const { user, setUser, provider, setProvider, signInInfo, setSignInInfo } =
    useUserContext()
  const [web3AuthModalPack, setWeb3AuthModalPack] =
    useState<Web3AuthModalPack | null>(null)

  useEffect(() => {
    void (async () => {
      const web3AuthModalPack = await getWeb3Modal()
      setWeb3AuthModalPack(web3AuthModalPack)
    })()
  }, [])

  return (
    <button
      className="btn btn-circle btn-primary w-auto md:p-4"
      onClick={async () => {
        console.log("signing ...")
        if (!web3AuthModalPack) return
        const signedInData = await web3AuthModalPack.signIn()
        console.log({ signedInData })
        const provider = web3AuthModalPack.getProvider()
        const user = await web3AuthModalPack.getUserInfo()
        setUser(user)
        setProvider(provider)
        setSignInInfo(signedInData)
      }}
    >
      Login
    </button>
  )
}
