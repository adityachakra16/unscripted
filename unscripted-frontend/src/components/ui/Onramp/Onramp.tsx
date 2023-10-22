import { FC, useEffect, useRef, useState } from "react"
import { StripePack } from "@safe-global/onramp-kit"
import { useUserContext } from "@/context/UserContext"
import Modal from "../Modal"
import { buyArtifact } from "@/services/Script"
import { useRouter } from "next/router"
import { Loader } from "../Loader"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OnrampProps {
  handleClose: () => void
  cost: number
  updateScriptOwner: () => void
}

export const Onramp: FC<OnrampProps> = ({
  handleClose,
  cost,
  updateScriptOwner,
}) => {
  const { signInInfo, provider } = useUserContext()
  const router = useRouter()
  const [stripePack, setStripePack] = useState<StripePack | null>(null)
  const [onrampCompleted, setOnrampCompleted] = useState(false)
  const [onRamping, setOnRamping] = useState(false)
  const [buying, setBuying] = useState(false)
  const stripeRootRef = useRef<HTMLDivElement>(null)

  const sessionUpdatedHandler = (session: any) => {
    console.log({ session })
    if (session.payload.session.status === "fulfillment_complete") {
      console.log("fulfillment complete")
      setOnrampCompleted(true)
    }
  }

  useEffect(() => {
    void (async () => {
      const stripePack = new StripePack({
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        onRampBackendUrl: "https://aa-stripe.safe.global",
      })
      console.log({ stripePack })
      await stripePack.init()
      setStripePack(stripePack)
    })()
  }, [])

  useEffect(() => {
    console.log({ onrampCompleted })
    if (onrampCompleted) {
      console.log("onramp completed")
      void (async () => {
        setBuying(true)
        const res = await buyArtifact(
          provider,
          router.query.scriptId as string,
          cost
        )
        await updateScriptOwner()
        setBuying(false)
        handleClose()
      })()
    }
  }, [onrampCompleted])

  return (
    <Modal>
      {" "}
      <div
        className="flex stripe-root"
        id="stripe-root"
        ref={stripeRootRef}
      ></div>{" "}
      <div className="flex flex-col gap-4">
        {!onRamping && (
          <div className="flex flex-row items-center space-x-4 w-full justify-between">
            <h1 className="font-bold text-lg">
              Buy this script for {cost} ApeCoin?
            </h1>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                handleClose()
              }}
            >
              ✕
            </button>
          </div>
        )}
        {!onRamping && (
          <button
            className="btn btn-circle w-full btn-secondary mt-4"
            onClick={async () => {
              try {
                if (stripePack === null) return
                if (stripeRootRef.current) {
                  stripeRootRef.current.innerHTML = ""
                }
                setOnRamping(true)
                console.log({ stripePack })
                const sesh = await stripePack.open({
                  element: "#stripe-root",
                  theme: "light",
                  defaultOptions: {
                    transaction_details: {
                      wallet_address: signInInfo.eoa,
                      lock_wallet_address: true,
                      supported_destination_networks: ["ethereum", "polygon"],
                      supported_destination_currencies: ["usdc"],
                    },
                  },
                })

                console.log({ sesh })

                stripePack.subscribe(
                  "onramp_session_updated",
                  sessionUpdatedHandler
                )
              } catch (error) {
                console.log({ error })
              }
            }}
          >
            <div className="flex flex-row items-center">
              {" "}
              {buying && <Loader mode="dark" />}
              <div className="ml-2">Buy</div>
            </div>
          </button>
        )}
      </div>
    </Modal>
  )
}
