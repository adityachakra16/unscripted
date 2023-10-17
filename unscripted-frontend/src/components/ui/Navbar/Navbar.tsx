import { FC, useEffect, useState } from "react"
import { ProfileDropdown } from "../ProfileDropdown"
import Image from "next/image"
import { useRouter } from "next/router"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const router = useRouter()
  const [active, setActive] = useState<"feed" | "trailers" | null>(null)

  useEffect(() => {
    if (router.pathname === "/feed" || router.pathname === "/") {
      setActive("feed")
    } else if (router.pathname === "/trailers") {
      setActive("trailers")
    }
  }, [router.pathname])

  console.log({ active, p: router.pathname })
  return (
    <div className="navbar border-b-2 bg-base-100 px-4">
      <div className="navbar-start w-2/3  gap-4">
        <a href="/" className="flex items-center space-x-2 mr-4">
          <Image
            src={
              "https://cdn.discordapp.com/attachments/1135592532374470689/1163740791571755049/Untitled_design__1_-removebg-preview.png?ex=6540ad11&is=652e3811&hm=02cbab3fea41ac17734ae252fe56b6aaa93207c0f03b758bf4464a8da3787175&"
            }
            width={150}
            height={80}
            alt="logo"
          />
        </a>
        <div className="tabs">
          <button
            className={`btn btn-circle  w-auto md:p-4 ${
              active === "feed" ? "btn-secondary" : "btn-ghost"
            }`}
            onClick={() => {
              router.push("/feed")
            }}
          >
            Feed
          </button>
          <button
            className={`btn btn-circle w-auto md:p-4 ${
              active === "trailers" ? "btn-secondary" : " btn-ghost"
            }`}
            onClick={() => {
              router.push("/trailers")
            }}
          >
            Trailer
          </button>
        </div>
      </div>
      <div className="navbar-end w-1/3">
        <div className="flex items-center space-x-4 w-full justify-end">
          <button
            className="btn btn-circle btn-primary w-auto md:p-4"
            onClick={() => {
              window.open(`${window.location.origin}/studio`)
            }}
          >
            Create
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  )
}
