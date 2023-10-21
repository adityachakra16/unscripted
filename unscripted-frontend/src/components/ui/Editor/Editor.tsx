import { useUserContext } from "@/context/UserContext"
import {
  buyArtifact,
  createScript,
  getScript,
  stakeOnScript,
} from "@/services/Script"
import { FC, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Modal from "../Modal"

interface EditorProps {
  readonly: boolean
}

export const Editor: FC<EditorProps> = ({ readonly }) => {
  const router = useRouter()
  const { provider, signInInfo } = useUserContext()
  const [content, setContent] = useState(
    [] as {
      character: string
      dialogue: string
    }[]
  )
  const [title, setTitle] = useState("")
  const [characters, setCharacters] = useState([] as string[])
  const [openCharacterModal, setOpenCharacterModal] = useState<number | null>(
    null
  )
  const [newCharacter, setNewCharacter] = useState("" as string)

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
    if (router.query?.scriptId) {
      void (async () => {
        const scriptContent = await getScript(router.query.scriptId as string)
        setTitle(scriptContent.title)
        setContent(scriptContent.content)
      })()
    }
  }, [router.query?.scriptId])

  console.log({ characters, content })
  return (
    <div className="flex flex-col px-64  justify-start pt-8 h-full">
      {!readonly && (
        <div className="flex items-center space-x-4 w-full justify-end mb-8">
          <button
            className="btn btn-circle btn-primary w-36 md:p-4 "
            onClick={async () => {
              await createScript(title, content, signInInfo.eoa)
            }}
          >
            Publish
          </button>
        </div>
      )}
      <textarea
        rows={2}
        id="scriptTitle"
        placeholder="Give it a title..."
        className="textarea textarea-lg border-none w-full focus:outline-none font-bold text-3xl"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        disabled={readonly}
      />

      {content?.length > 0 &&
        content.map((c, cIndex) => {
          return (
            <div
              key={cIndex}
              className="flex flex-row items-start space-x-4 w-full justify-start"
            >
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-outline m-1">
                  {c.character || "Add Character"}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {characters.map((character, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          console.log({ cIndex })
                          const newContent = [...content]
                          newContent[cIndex].character = character
                          setContent(newContent)
                        }}
                      >
                        <a>{character}</a>
                      </li>
                    )
                  })}
                  <li onClick={() => setOpenCharacterModal(cIndex)}>
                    <a>Add Character</a>
                  </li>
                </ul>
              </div>
              <textarea
                ref={contentRef}
                id="scriptContent"
                placeholder="Write a dialog..."
                className="textarea textarea-lg border-none w-full focus:outline-none text-xl h-auto"
                value={c.dialogue}
                onChange={(e) => {
                  const newContent = [...content]
                  newContent[cIndex].dialogue = e.target.value
                  setContent(newContent)
                }}
                disabled={readonly}
              />
            </div>
          )
        })}
      {content.length === 0 && (
        <div className="flex flex-row items-start space-x-4 w-full justify-start">
          <div className="dropdown">
            {characters.map((character, index) => {
              return (
                <label key={index} className="btn btn-outline m-1">
                  {character}
                </label>
              )
            })}
            <label
              className="btn btn-outline m-1 w-48"
              onClick={() => setOpenCharacterModal(0)}
            >
              Add Character
            </label>
          </div>
          <textarea
            ref={contentRef}
            id="scriptContent"
            placeholder="Write a dialog..."
            className="textarea textarea-lg border-none w-full focus:outline-none text-xl h-auto"
            value={""}
            onChange={(e) => {
              const newContent = [...content]
              newContent[0].dialogue = e.target.value
              setContent(newContent)
            }}
            disabled={readonly}
          />
        </div>
      )}
      {!readonly && (
        <div className="flex items-center space-x-4 w-full justify-end mt-8">
          <button
            className="btn btn-circle  btn-outlined w-36 md:p-4 "
            onClick={() => {
              setContent([
                ...content,
                {
                  character: "",
                  dialogue: "",
                },
              ])
            }}
          >
            Add Dialog
          </button>
        </div>
      )}
      {readonly && (
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
            Like
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
      )}

      {openCharacterModal !== null && (
        <Modal>
          {" "}
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Name your character</h1>
            <input
              type="text"
              className="input input-bordered"
              value={newCharacter}
              onChange={(e) => setNewCharacter(e.target.value)}
            />
            <button
              className="btn btn-secondary mt-4"
              onClick={() => {
                console.log({ openCharacterModal })
                setCharacters([...characters, newCharacter])
                if (content.length === 0) {
                  setContent([
                    {
                      character: newCharacter,
                      dialogue: "",
                    },
                  ])
                } else
                  setContent(
                    content.map((c, index) => {
                      if (index === openCharacterModal) {
                        c.character = newCharacter
                      }
                      return c
                    })
                  )
                setNewCharacter("")
                setOpenCharacterModal(null)
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
