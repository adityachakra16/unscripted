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
    <div className="flex flex-row gap-24 justify-between p-16 px-48">
      <div className="flex flex-1 flex-col gap-2">
        <div className="font-bold text-2xl">Latest</div>
        {latestScripts &&
          latestScripts.map((script: Script) => {
            return <ScriptCard key={script.id} script={script} />
          })}
      </div>
      <div className="border-r-2 border-gray-300 self-stretch my-4"></div>

      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl">Community Picks</div>
        {highestRatedScripts &&
          highestRatedScripts.map((script: Script) => {
            return <SmallScriptCard key={script.id} script={script} />
          })}
      </div>
    </div>
  )
}
