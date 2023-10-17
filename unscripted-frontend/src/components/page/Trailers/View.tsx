import { Navbar } from "@/components/ui/Navbar"
import type { VFC } from "react"

export const TrailersPageView: VFC = () => {
  return (
    <div>
      <Navbar />
      <TrailersPageView />
    </div>
  )
}
