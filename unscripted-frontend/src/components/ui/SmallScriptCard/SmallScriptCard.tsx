import { timeSince, trim } from "@/services/Utils"
import { Script } from "@unscripted/shared-types"
import { useRouter } from "next/router"
import { FC } from "react"

interface SmallScriptCardProps {
  script: Script
}

export const SmallScriptCard: FC<SmallScriptCardProps> = ({ script }) => {
  const router = useRouter()
  return (
    <div
      className="card w-96 bg-base-100 cursor-pointer hover:bg-base-200"
      onClick={() => router.push(`/script/${script.id}`)}
    >
      <div className="card-body">
        <h2 className="card-title">{script.title}</h2>
        {script.genres?.map((genre) => {
          return (
            <div key={genre} className="badge badge-secondary">
              {genre}
            </div>
          )
        })}

        {script.scene?.length && <p>{trim(script.scene[0], 30)}</p>}

        {script.createdAt && (
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              {timeSince(script.createdAt)}
            </div>
          </div>
        )}
        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            {script.rating || 0} tokens staked
          </div>
        </div>
      </div>
      <div className="w-full border-b-2 border-base-200"></div>
    </div>
  )
}
