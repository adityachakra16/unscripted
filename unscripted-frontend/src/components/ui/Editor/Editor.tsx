import { useUserContext } from "@/context/UserContext"
import { createScript } from "@/services/Script"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import { Content } from "@unscripted/shared-types"
import { GENRE_OPTIONS } from "@/services/Utils"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps {}

export const Editor: FC<EditorProps> = () => {
  const router = useRouter()
  const { provider, signInInfo } = useUserContext()
  const [content, setContent] = useState([
    {
      scene: "",
      dialogs: [
        {
          character: "",
          dialogue: "",
        },
      ],
    },
  ] as Content[])
  const [title, setTitle] = useState("")
  const [characters, setCharacters] = useState([] as string[])
  const [openCharacterModal, setOpenCharacterModal] = useState<number | null>(
    null
  )
  const [dialogIndex, setDialogIndex] = useState<number | null>(null)
  const [newCharacter, setNewCharacter] = useState("" as string)
  const [genres, setGenres] = useState([] as string[])
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

  console.log({ characters, content })
  return (
    <div className="flex flex-col px-64  justify-start pt-8 h-full">
      <div className="flex items-center space-x-4 w-full justify-end mb-8">
        <button
          className="btn btn-circle btn-primary w-36 md:p-4 "
          onClick={async () => {
            await createScript(title, content, genres, signInInfo.eoa)
          }}
        >
          Publish
        </button>
      </div>
      <textarea
        id="scriptTitle"
        placeholder="Give it a title..."
        className="textarea textarea-lg border-none w-full focus:outline-none font-bold text-3xl"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <div className="flex flex-row items-center space-x-4 w-full justify-start  ml-4 mb-8">
        {genres.map((genre) => {
          return (
            <div key={genre} className="badge badge-secondary">
              {genre}
            </div>
          )
        })}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline btn-xs m-1">
            Add Genre
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {GENRE_OPTIONS.map((genre, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setGenres([...genres, genre])
                  }}
                >
                  <a>{genre}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {content?.length > 0 &&
        content.map((c, cIndex) => {
          return (
            <div
              key={cIndex}
              className="flex flex-col items-start space-x-4 w-full justify-start"
            >
              <textarea
                ref={contentRef}
                id="scriptContent"
                placeholder="Write about the scene..."
                className="textarea textarea-lg border-none w-full focus:outline-none text-xl h-auto"
                value={c.scene}
                onChange={(e) => {
                  const newContent = [...content]
                  newContent[cIndex].scene = e.target.value
                  setContent(newContent)
                }}
              />
              {c.dialogs.map((d, dIndex) => {
                return (
                  <div
                    key={dIndex}
                    className="flex flex-row items-start space-x-4 w-full justify-start"
                  >
                    <div className="dropdown">
                      <label tabIndex={0} className="btn btn-outline m-1">
                        {d.character || "Add Character"}
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
                                const newContent = [...content]
                                newContent[cIndex].dialogs[dIndex].character =
                                  character
                                setContent(newContent)
                              }}
                            >
                              <a>{character}</a>
                            </li>
                          )
                        })}
                        <li
                          onClick={() => {
                            setDialogIndex(dIndex)
                            setOpenCharacterModal(cIndex)
                          }}
                        >
                          <a>Add Character</a>
                        </li>
                      </ul>
                    </div>
                    <textarea
                      ref={contentRef}
                      id="scriptContent"
                      placeholder="Write a dialog..."
                      className="textarea textarea-lg border-none w-full focus:outline-none text-xl h-auto"
                      value={d.dialogue}
                      onChange={(e) => {
                        const newContent = [...content]
                        newContent[cIndex].dialogs[dIndex].dialogue =
                          e.target.value
                        setContent(newContent)
                      }}
                    />
                  </div>
                )
              })}
              <div className="flex items-center space-x-4 w-full justify-end mt-8">
                <button
                  className="btn btn-circle btn-outline w-36 md:p-4 "
                  onClick={() => {
                    const newDialog = {
                      character: "",
                      dialogue: "",
                    }
                    const newContent = [...content]
                    newContent[cIndex].dialogs.push(newDialog)
                    setContent(newContent)
                  }}
                >
                  Add Dialog
                </button>
              </div>
            </div>
          )
        })}{" "}
      <div className="flex items-center space-x-4 w-full justify-center mt-16">
        <button
          className="btn btn-circle btn-outline w-64 md:p-4 "
          onClick={() => {
            const newScene = {
              scene: "",
              dialogs: [
                {
                  character: "",
                  dialogue: "",
                },
              ],
            }
            setContent([...content, newScene])
          }}
        >
          Add Scene
        </button>
      </div>
      {openCharacterModal !== null && (
        <Modal>
          {" "}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center space-x-4 w-full justify-between">
              <h1 className="font-bold text-lg">Name your character</h1>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setOpenCharacterModal(null)
                  setDialogIndex(null)
                }}
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              className="input input-bordered"
              value={newCharacter}
              onChange={(e) => setNewCharacter(e.target.value)}
            />
            <button
              className="btn btn-circle w-full btn-secondary mt-4"
              onClick={() => {
                console.log({ openCharacterModal })
                setCharacters([...characters, newCharacter])
                if (content.length === 0) {
                  const newScene = {
                    scene: "",
                    dialogs: [
                      {
                        character: newCharacter,
                        dialogue: "",
                      },
                    ],
                  }
                  setContent([...content, newScene])
                } else {
                  const newContent = [...content]
                  newContent[openCharacterModal].dialogs[
                    dialogIndex as number
                  ].character = newCharacter
                  setContent(newContent)
                }
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
