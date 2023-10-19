import { useUserContext } from "@/context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import { LoginModal } from "../LoginModal"
import { ProfileDropdown } from "../ProfileDropdown"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const router = useRouter()
  const { user } = useUserContext()

  return (
    <div className="navbar border-b-2 bg-base-100 px-4" id="navbar">
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
              ["/feed", "/"].includes(router.pathname)
                ? "btn-secondary"
                : "btn-ghost"
            }`}
            onClick={() => {
              router.push("/feed")
            }}
          >
            Home
          </button>
          <button
            className={`btn btn-circle w-auto md:p-4 ${
              router.pathname === "/trailers" ? "btn-secondary" : " btn-ghost"
            }`}
            onClick={() => {
              router.push("/trailers")
            }}
          >
            Explore
          </button>
        </div>
      </div>
      <div className="navbar-end w-1/3">
        {user?.verifierId ? (
          <div className="flex items-center space-x-4 w-full justify-end">
            {router.pathname !== "/create" && (
              <button
                className="btn btn-circle btn-primary w-auto md:p-4"
                onClick={() => {
                  router.push("/create")
                }}
              >
                Create
              </button>
            )}
            <ProfileDropdown />
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </div>
  )
}
