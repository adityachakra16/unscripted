import { FC, useState } from "react"
import Image from "next/image"
import { logout } from "@/services/Auth"
import { useUserContext } from "@/context/UserContext"
import Modal from "../Modal"
import { claimRewards, unstakeFromScript } from "@/services/Script"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileDropdownProps {}

export const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { user, signInInfo, provider } = useUserContext()
  const [openClaimModal, setOpenClaimModal] = useState(false)

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
        <li>
          <div className="flex flex-col items-start justify-start">
            <div className="">
              Total Earned: <span className="font-bold">0</span>
            </div>
            <div className="">
              Total Staked: <span className="font-bold">0</span>
            </div>
            <div className="">
              Unclaimed Rewards: <span className="font-bold">0</span>
            </div>
          </div>
        </li>
        <li onClick={() => logout()}>
          <a>Logout</a>
        </li>
      </ul>

      {openClaimModal && (
        <Modal>
          {" "}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center space-x-4 w-full justify-between">
              <h1 className="font-bold text-2xl">Your Finances</h1>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setOpenClaimModal(false)
                }}
              >
                ✕
              </button>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-4">
                <div className="font-bold text-lg">Total Earned: {}</div>
                <div className="font-bold text-lg">Unclaimed Rewards: {}</div>

                <button
                  className="btn btn-circle w-full btn-secondary mt-4"
                  onClick={async () => {
                    setOpenClaimModal(false)
                    await claimRewards(provider, signInInfo?.eoa, "")
                  }}
                >
                  Claim Rewards
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="font-bold text-lg">Total Staked: {}</div>

                <button
                  className="btn btn-circle w-full btn-secondary mt-4"
                  onClick={async () => {
                    setOpenClaimModal(false)
                  }}
                >
                  Unstake Tokens
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
