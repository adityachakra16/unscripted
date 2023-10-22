import { useUserContext } from "@/context/UserContext"
import {
  buyArtifact,
  getScript,
  getScriptOwner,
  getStakedAmount,
  stakeOnScript,
} from "@/services/Script"
import { Content } from "@unscripted/shared-types"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import { Loader } from "../Loader"
import { Onramp } from "../Onramp"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScriptProps {}

export const Script: FC<ScriptProps> = () => {
  const router = useRouter()
  const { provider, signInInfo } = useUserContext()
  const [content, setContent] = useState([] as Content[])
  const [title, setTitle] = useState("")
  const [genres, setGenres] = useState([] as string[])
  const [rating, setRating] = useState(0)
  const [cost, setCost] = useState(0)
  const [openStakeModal, setOpenStakeModal] = useState(false)
  const [openBuyModal, setOpenBuyModal] = useState(false)
  const [stakingAmount, setStakingAmount] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  const [staking, setStaking] = useState(false)
  const [buying, setBuying] = useState(false)

  const contentRef = useRef<HTMLTextAreaElement>(null) // ref for the content textarea

  useEffect(() => {
    const handleInput = () => {
      if (contentRef.current) {
        contentRef.current.style.height = "auto"
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
      }
    }

    // Attach event
    if (contentRef.current) {
      contentRef.current.addEventListener("input", handleInput)
    }

    // Cleanup
    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("input", handleInput)
      }
    }
  }, [])

  const updateScriptOwner = async () => {
    const scriptOwner = await getScriptOwner(
      provider,
      router.query.scriptId as string
    )
    if (signInInfo?.eoa === scriptOwner) {
      setIsOwner(true)
    }
  }

  useEffect(() => {
    console.log({ router })
    if (router.query?.scriptId && provider) {
      void (async () => {
        await updateScriptOwner()
        const scriptContent = await getScript(router.query.scriptId as string)
        console.log({ scriptContent })

        setTitle(scriptContent.title)
        setContent(scriptContent.content)
        setGenres(scriptContent.genres)
        setRating(scriptContent.rating || 1)
        setCost(scriptContent.askingPrice || 0)
      })()
    }
  }, [router.query?.scriptId, provider])

  if (!title)
    return (
      <div className="flex flex-col px-64  justify-start pt-8 h-full">
        <Loader mode="light" />
      </div>
    )

  return (
    <div className="flex flex-col px-64  justify-start pt-8 h-full">
      <textarea
        rows={2}
        id="scriptTitle"
        placeholder="Give it a title..."
        className="textarea textarea-lg border-none w-full focus:outline-none font-bold text-3xl"
        value={title}
      />

      <div className="flex flex-col gap-8 ml-8">
        <div className="flex flex-row items-center space-x-4 w-full justify-between">
          <div className="flex flex-row gap-2">
            {genres &&
              genres?.map((genre) => {
                return (
                  <div
                    key={genre}
                    className="badge badge-secondary badge-outline"
                  >
                    {genre}
                  </div>
                )
              })}
          </div>
          <div className="flex flex-row items-center space-x-4 w-full justify-end">
            {
              <div className="badge badge-secondary">
                {rating} staked ApeCoin
              </div>
            }
          </div>
        </div>
        {content?.length > 0 &&
          content.map((c, cIndex) => {
            return (
              <div
                key={cIndex}
                className="flex flex-col items-start space-x-4 w-full justify-start gap-8"
              >
                <div className="flex flex-row items-start w-full gap-4">
                  <div className="font-bold">Scene:</div>
                  <div className="">{c.scene}</div>
                </div>
                {c.dialogs.map((d, dIndex) => {
                  return (
                    <div
                      key={dIndex}
                      className="flex flex-row items-start space-x-4 w-full justify-start gap-4"
                    >
                      <div className="font-bold">{d.character}</div>
                      <div className="">{d.dialogue}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
      </div>
      {!isOwner && (
        <div className="flex flex-row items-center space-x-4 w-full justify-end mt-8">
          <button
            className="btn btn-circle btn-outline w-36 md:p-4 "
            onClick={() => {
              setStakingAmount(0)
              setOpenStakeModal(true)
            }}
          >
            Stake
          </button>
          <button
            className="btn btn-circle btn-outline btn-success w-48 md:p-4 "
            onClick={() => {
              setOpenBuyModal(true)
            }}
          >
            Buy for {cost} ApeCoin
          </button>
        </div>
      )}
      {openStakeModal && (
        <Modal>
          {" "}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center space-x-4 w-full justify-between">
              <h1 className="font-bold text-lg">
                How much would you like to stake?
              </h1>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setOpenStakeModal(false)
                }}
              >
                ✕
              </button>
            </div>
            <div className="flex flex-row items-center space-x-4 w-full">
              <input
                type="number"
                className="input input-bordered"
                value={stakingAmount}
                onChange={(e) => setStakingAmount(parseInt(e.target.value))}
              />
              <div className="font-bold text-lg">ApeCoin</div>
            </div>
            <button
              className="btn btn-circle w-full btn-secondary mt-4"
              onClick={async () => {
                setStaking(true)
                const res = await stakeOnScript(
                  provider,
                  router.query.scriptId as string,
                  stakingAmount
                )

                setStaking(false)
                setOpenStakeModal(false)
                setRating(stakingAmount)

                console.log({ res })
              }}
            >
              <div className="flex flex-row items-center">
                {" "}
                {staking && <Loader mode="dark" />}
                <div className="ml-2">Stake</div>
              </div>
            </button>
          </div>
        </Modal>
      )}
      {openBuyModal && (
        <Onramp
          handleClose={() => {
            setOpenBuyModal(false)
          }}
          cost={cost}
          updateScriptOwner={updateScriptOwner}
        />
      )}
    </div>
  )
}
