import { FC } from "react"
import { ScriptCard } from "../ScriptCard"
import { useLatestScripts, useScriptsByHighestRating } from "@/services/Script"
import { Script } from "@unscripted/shared-types"
import { SmallScriptCard } from "../SmallScriptCard"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TopViewContentProps {}

export const TopViewContent: FC<TopViewContentProps> = () => {
  const { data: latestScripts } = useLatestScripts()
  const { data: highestRatedScripts } = useScriptsByHighestRating()

  console.log({ latestScripts, highestRatedScripts })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {latestScripts &&
          latestScripts.map((script: Script) => {
            return <ScriptCard key={script.id} />
          })}
      </div>
      <div className="flex flex-col gap-4">
        {highestRatedScripts &&
          highestRatedScripts.map((script: Script) => {
            return <SmallScriptCard key={script.id} />
          })}
      </div>
    </div>
  )
}
