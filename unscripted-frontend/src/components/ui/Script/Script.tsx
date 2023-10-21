import { useUserContext } from "@/context/UserContext"
import { buyArtifact, getScript, stakeOnScript } from "@/services/Script"
import { Content } from "@unscripted/shared-types"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ScriptProps {}

export const Script: FC<ScriptProps> = () => {
  const router = useRouter()
  const { provider, signInInfo } = useUserContext()
  const [content, setContent] = useState([] as Content[])
  const [title, setTitle] = useState("")
  const [genres, setGenres] = useState([] as string[])
  const [rating, setRating] = useState(0)
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

  useEffect(() => {
    console.log({ router })
    if (router.query?.scriptId) {
      void (async () => {
        const scriptContent = await getScript(router.query.scriptId as string)
        console.log({ scriptContent })
        setTitle(scriptContent.title)
        setContent(scriptContent.content)
        setGenres(scriptContent.genres)
        setRating(scriptContent.rating || 0)
      })()
    }
  }, [router.query?.scriptId])

  if (!title) return <span className="loading loading-ring loading-lg"></span>

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
                {rating} staked tokens
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
      <div className="flex flex-row items-center space-x-4 w-full justify-end mt-8">
        <button
          className="btn btn-circle btn-outline w-36 md:p-4 "
          onClick={async () => {
            const res = await stakeOnScript(
              provider,
              router.query.scriptId as string,
              1
            )
            console.log({ res })
          }}
        >
          Stake
        </button>
        <button
          className="btn btn-circle btn-outline w-36 md:p-4 "
          onClick={async () => {
            const res = await buyArtifact(
              provider,
              router.query.scriptId as string,
              1
            )
            console.log({ res })
          }}
        >
          Buy
        </button>
      </div>
    </div>
  )
}
