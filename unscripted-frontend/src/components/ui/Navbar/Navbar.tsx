import { FC, useEffect, useState } from "react"
import { ProfileDropdown } from "../ProfileDropdown"
import Image from "next/image"
import { useRouter } from "next/router"
import { useUserProfile } from "@/services/User"
import { LoginModal } from "../LoginModal"
import Link from "next/link"
import { useUserContext } from "@/context/UserContext"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const router = useRouter()
  const [active, setActive] = useState<"feed" | "trailers" | null>(null)
  const { user } = useUserContext()

  useEffect(() => {
    if (router.pathname === "/feed" || router.pathname === "/") {
      setActive("feed")
    } else if (router.pathname === "/trailers") {
      setActive("trailers")
    }
  }, [router.pathname])

  console.log({ user })
  return (
    <div className="navbar border-b-2 bg-base-100 px-4">
      <div className="navbar-start w-2/3  gap-4">
        <div
          className="cursor-pointer flex items-center space-x-2 mr-4"
          onClick={() => router.push("/")}
        >
          <Image
            src={
              "https://ik.imagekit.io/brandamp/unscripted_logo.png?updatedAt=1697603173860"
            }
            width={150}
            height={80}
            alt="logo"
          />
        </div>
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
        {user?.verifierId ? (
          <div className="flex items-center space-x-4 w-full justify-end">
            <button
              className="btn btn-circle btn-primary w-auto md:p-4"
              onClick={() => {
                router.push("/create")
              }}
            >
              Create
            </button>
            <ProfileDropdown />
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </div>
  )
}
