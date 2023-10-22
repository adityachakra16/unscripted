import { Script } from "@unscripted/shared-types"
import { FC } from "react"
import Image from "next/image"
import { timeSince, trim } from "@/services/Utils"
import { useRouter } from "next/router"

interface ScriptCardProps {
  script: Script
}

export const ScriptCard: FC<ScriptCardProps> = ({ script }) => {
  const router = useRouter()
  return (
    <div
      className="card w-full bg-base-100 cursor-pointer hover:bg-base-200"
      onClick={() => router.push(`/script/${script.id}`)}
    >
      {script.imageUri && (
        <Image
          src={script.imageUri}
          alt="script_img"
          width={800}
          height={500}
          className="rounded-t-lg"
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{script.title}</h2>
        <div className="flex flex-row gap-2">
          {script.genres?.map((genre) => {
            return (
              <div key={genre} className="badge badge-secondary badge-outline">
                {genre}
              </div>
            )
          })}
        </div>
        {script.content?.length && <p>{trim(script.content[0].scene, 100)}</p>}

        {script.createdAt && (
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              {timeSince(script.createdAt)}
            </div>
          </div>
        )}
      </div>
      <div className="w-full border-b-2 border-base-200 "></div>
    </div>
  )
}
