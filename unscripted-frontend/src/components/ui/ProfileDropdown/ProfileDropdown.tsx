import { FC } from "react"
import Image from "next/image"
import { useUserProfile } from "@/services/User"
import { logout } from "@/services/Auth"
import { useUserContext } from "@/context/UserContext"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileDropdownProps {}

export const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { user } = useUserContext()

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <div className="w-10 rounded-full">
          <Image
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,fb8c00,fdd835,ffb300`}
            width={40}
            height={40}
            alt="avatar"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu-sm dropdown-content menu rounded-box z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li onClick={() => logout()}>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}
