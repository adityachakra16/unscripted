import { VFC } from "react"

import { Navbar } from "@/components/ui/Navbar"
import { TopViewContent } from "@/components/ui/TopViewContent"

export const TopPageView: VFC = () => {
  return (
    <div>
      <Navbar />
      <TopViewContent />
    </div>
  )
}
