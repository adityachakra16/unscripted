import { Editor } from "@/components/ui/Editor"
import { Navbar } from "@/components/ui/Navbar"
import { Script } from "@/components/ui/Script"
import type { VFC } from "react"

export const ScriptPageView: VFC = () => {
  return (
    <div>
      <Navbar />
      <Script />
    </div>
  )
}
