import { Navbar } from "@/components/ui/Navbar"
import { TopViewContent } from "@/components/ui/TopViewContent"
import type { VFC } from "react"

export const FeedPageView: VFC = () => {
  return (
    <div>
      <Navbar />
      <TopViewContent />
    </div>
  )
}
