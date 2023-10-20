import { Navbar } from "@/components/ui/Navbar"
import { TrailerPageViewContent } from "@/components/ui/TrailerPageViewContent"
import type { VFC } from "react"

export const TrailersPageView: VFC = () => {
  return (
    <div>
      <Navbar />
      <TrailerPageViewContent />
    </div>
  )
}
