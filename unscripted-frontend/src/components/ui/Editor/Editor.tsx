import { FC, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { storeImage } from "@/services/Images"
import { publishScript } from "@/services/Script"
import { useUserContext } from "@/context/UserContext"

interface EditorProps {
  disabled: boolean
}

export const Editor: FC<EditorProps> = ({ disabled }) => {
  const { user, signInInfo } = useUserContext()
  const [content, setContent] = useState("")
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState("")
  const [title, setTitle] = useState("")

  const onSave = (content: string) => {
    console.log("saving content", content)
  }

  const onChange = (content: string) => {
    console.log("content changed", content)
  }

  const contentRef = useRef<HTMLTextAreaElement>(null) // ref for the content textarea
  const containerRef = useRef<HTMLDivElement>(null) // ref for the container div
  console.log({ user })
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

  return (
    <div className="flex flex-col px-64  justify-start pt-8 h-full">
      <div className="flex items-center space-x-4 w-full justify-end mb-8">
        <button
          className="btn btn-circle btn-primary w-36 md:p-4 "
          onClick={async () => {
            await publishScript(title, content)
          }}
        >
          Publish
        </button>
      </div>
      <textarea
        rows={2}
        id="scriptTitle"
        placeholder="Give it a title..."
        className="textarea textarea-lg border-none w-full focus:outline-none font-bold text-3xl"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <div className="flex flex-row items-start space-x-4 w-full justify-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline m-1">
            Character
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <textarea
          ref={contentRef}
          id="scriptContent"
          placeholder="Write a dialog..."
          className="textarea textarea-lg border-none w-full focus:outline-none text-xl h-auto"
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
