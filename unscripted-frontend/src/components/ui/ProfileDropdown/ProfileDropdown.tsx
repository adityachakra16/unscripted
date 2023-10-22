import { useUserContext } from "@/context/UserContext"
import { logout } from "@/services/Auth"
import { claimAllRewards, unstakeAllTokens } from "@/services/Script"
import Image from "next/image"
import { FC, useState } from "react"
import { Loader } from "../Loader"
import Modal from "../Modal"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileDropdownProps {}

export const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { user, signInInfo, provider, totalStaked, claimableRewards, balance } =
    useUserContext()
  const [openClaimModal, setOpenClaimModal] = useState(false)
  const [unstaking, setUnstaking] = useState(false)
  const [claiming, setClaiming] = useState(false)

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
        <li onClick={() => setOpenClaimModal(true)}>
          <div className="flex flex-col items-start justify-start">
            <div className="">
              Balance:{" "}
              <span className="font-bold">
                {balance || "Not found"} ApeCoin
              </span>
            </div>
            <div className="">
              Total Staked:{" "}
              <span className="font-bold">
                {totalStaked || "Not found"} ApeCoin
              </span>
            </div>
            <div className="">
              Unclaimed Rewards:{" "}
              <span className="font-bold">
                {claimableRewards || "Not found"} ApeCoin
              </span>
            </div>
          </div>
        </li>
        <li onClick={async () => await logout()}>
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
            <div className="flex flex-row gap-16">
              <div className="flex flex-col gap-4 w-1/2">
                <div className="font-bold text-lg">
                  Balance: {balance} ApeCoin
                </div>
                <div className="font-bold text-lg">
                  Unclaimed Rewards: {claimableRewards} ApeCoin
                </div>

                <button
                  className="btn btn-circle w-full btn-secondary mt-4"
                  onClick={async () => {
                    setClaiming(true)
                    await claimAllRewards(provider, signInInfo?.eoa)
                    setClaiming(false)
                    setOpenClaimModal(false)
                  }}
                  disabled={parseInt(claimableRewards) === 0}
                >
                  <div className="flex flex-row items-center">
                    {" "}
                    {claiming && <Loader mode="dark" />}
                    <div className="ml-2">Claim Rewards</div>
                  </div>
                </button>
              </div>
              <div className="flex flex-col gap-4 w-1/2 justify-between">
                <div className="font-bold text-lg">
                  Total Staked: {totalStaked} ApeCoin
                </div>

                <button
                  className="btn btn-circle w-full btn-secondary mt-4"
                  onClick={async () => {
                    setUnstaking(true)
                    await unstakeAllTokens(provider, signInInfo?.eoa)
                    setUnstaking(false)
                    setOpenClaimModal(false)
                  }}
                  disabled={parseInt(totalStaked) === 0}
                >
                  <div className="flex flex-row items-center">
                    {" "}
                    {unstaking && <Loader mode="dark" />}
                    <div className="ml-2">Unstake Tokens</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
