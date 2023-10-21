import { Editor } from "@/components/ui/Editor"
import { Navbar } from "@/components/ui/Navbar"
import type { VFC } from "react"

export const CreatePageView: VFC = () => {
  return (
    <div>
      <Navbar />
      <Editor readonly={false} />
    </div>
  )
}
