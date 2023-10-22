import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { getDb, scriptsTable } from "../Db"
import { ethers } from "ethers"
import {
  Content,
  POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
  POLYGON_MUMBAI_LIQUID_STAKING_TOKEN_ADDRESS,
  Script,
  erc20Abi,
  liquidStakingAbi,
  liquidStakingFactoryAbi,
} from "@unscripted/shared-types"

export async function getLatestScripts(): Promise<Script[]> {
  return await sendRequest(
    `${process.env.NEXT_PUBLIC_API_HOST}/scripts?orderBy=latest`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export function useLatestScripts() {
  return useQuery("latestScripts", getLatestScripts)
}

export async function getScriptsByHighestRating(): Promise<Script[]> {
  return await sendRequest(
    `${process.env.NEXT_PUBLIC_API_HOST}/scripts?orderBy=popular`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export function useScriptsByHighestRating() {
  return useQuery("scriptsByHighestRating", getScriptsByHighestRating)
}

export async function getScriptsByUser(userId: string) {
  return await sendRequest(
    `${process.env.NEXT_PUBLIC_API_HOST}/scripts/user/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export async function getScript(scriptId: string): Promise<Script> {
  return await sendRequest(
    `${process.env.NEXT_PUBLIC_API_HOST}/scripts/${scriptId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export async function createScript(
  title: string,
  content: Content[],
  genres: string[],
  writer: string,
  askingPrice: number
) {
  const askingPriceInWei = ethers.utils.parseUnits(askingPrice.toString(), 18)
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/scripts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      genres,
      writer,
      askingPrice: askingPriceInWei.toString(),
    }),
  })
}

export async function updateScript(
  title: string,
  content: Content[],
  genres: string[],
  writer: string
) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/scripts`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      genres,
      writer,
    }),
  })
}

async function getLiquidStakingFactoryContract(web3Provider: any) {
  const provider = new ethers.providers.Web3Provider(web3Provider)
  const signer = provider.getSigner()
  const factory = new ethers.Contract(
    POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
    liquidStakingFactoryAbi,
    signer
  )
  return factory
}

async function getLiquidStakingContract(web3Provider: any, scriptId: string) {
  const provider = new ethers.providers.Web3Provider(web3Provider)
  const signer = provider.getSigner()
  const factory = new ethers.Contract(
    POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
    liquidStakingFactoryAbi,
    signer
  )

  const liquidStakingAddress = await factory.artifactIdToStaking(scriptId)
  return new ethers.Contract(liquidStakingAddress, liquidStakingAbi, signer)
}

async function getRewardTokenContract(web3Provider: any) {
  const provider = new ethers.providers.Web3Provider(web3Provider)
  const signer = provider.getSigner()

  return new ethers.Contract(
    POLYGON_MUMBAI_LIQUID_STAKING_TOKEN_ADDRESS,
    erc20Abi,
    signer
  )
}

export async function approveToken(provider: any, scriptId: string) {
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  console.log({
    address: liquidStakingContract.address,
  })
  const rewardToken = await getRewardTokenContract(provider)
  console.log({ add: rewardToken.address })
  const tx = await rewardToken.approve(
    liquidStakingContract.address,
    ethers.constants.MaxUint256
  )
  console.log({ tx })
  await tx.wait()
}

export async function getScriptOwner(
  provider: any,
  scriptId: string
): Promise<string> {
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const owner = await liquidStakingContract.artifactOwner()
  return owner
}

export async function stakeOnScript(
  provider: any,
  scriptId: string,
  amount: number
) {
  console.log({
    scriptId,
    amount,
  })
  const approveTx = await approveToken(provider, scriptId)
  console.log({ approveTx })
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )

  const amountInWei = ethers.utils.parseUnits(amount.toString(), 18)

  const tx = await liquidStakingContract.stake(amountInWei, {
    gasLimit: 1000000,
  })
  console.log({ tx })
  return tx
}

export async function unstakeFromScript(
  provider: any,
  scriptId: string,
  address: string
) {
  const stakedAmount = await getStakedAmount(provider, scriptId, address)
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const tx = liquidStakingContract.unstake(stakedAmount)
  await tx.wait()
}

export async function buyArtifact(
  provider: any,
  scriptId: string,
  amount: number
) {
  const approveTx = await approveToken(provider, scriptId)

  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const amountInWei = ethers.utils.parseUnits(amount.toString(), 18)
  const tx = await liquidStakingContract.buyArtifact(amountInWei, {
    gasLimit: 1000000,
  })
  console.log({ tx })
  await tx.wait()
}

export async function claimRewards(provider: any, scriptId: string) {
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const tx = liquidStakingContract.claimRewards()
  await tx.wait()
}

export async function getStakedAmount(
  provider: any,
  scriptId: string,
  address: string
) {
  try {
    console.log({ scriptId })
    const liquidStakingContract = await getLiquidStakingContract(
      provider,
      scriptId
    )
    console.log({ liquidStakingContract, address })
    const stakedAmount = await liquidStakingContract.stakes(address)
    console.log({ stakedAmount })
    return stakedAmount.div(ethers.BigNumber.from(10).pow(18))
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getRewards(
  provider: any,
  scriptId: string,
  address: string
) {
  try {
    const liquidStakingContract = await getLiquidStakingContract(
      provider,
      scriptId
    )
    console.log({ liquidStakingContract })
    const totalRewardPool = await liquidStakingContract.totalRewardPool()
    const userStake = await liquidStakingContract.stakes(address)
    const totalStaked = await liquidStakingContract.totalStaked()
    const rewards = totalRewardPool.mul(userStake).div(totalStaked)
    return rewards
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function balanceOfRewardToken(
  provider: any,
  address: string
): Promise<string> {
  const rewardToken = await getRewardTokenContract(provider)
  const balance = await rewardToken.balanceOf(address)
  const balanceInEther = ethers.utils.formatUnits(balance, "ether")
  const roundedBalanceInEther = parseFloat(balanceInEther).toFixed(2)

  return roundedBalanceInEther
}

export async function getTotalStaked(
  web3Provider: any,
  address: string
): Promise<string> {
  const liquidStakingContractFactory = await getLiquidStakingFactoryContract(
    web3Provider
  )
  const lstContractAddresses =
    await liquidStakingContractFactory.getLiquidStakings()

  let totalStaked = ethers.BigNumber.from(0)
  for (const lstContractAddress of lstContractAddresses) {
    try {
      const provider = new ethers.providers.Web3Provider(web3Provider)
      const signer = provider.getSigner()

      const lstContract = new ethers.Contract(
        lstContractAddress,
        liquidStakingAbi,
        signer
      )
      const stakedAmount = await lstContract.stakes(address)
      totalStaked = totalStaked.add(stakedAmount)
    } catch (e) {
      console.log(e)
    }
  }
  console.log({ totalStaked })

  const totalStakedInEther = ethers.utils.formatUnits(totalStaked, "ether")
  const roundedTotalStakedInEther = parseFloat(totalStakedInEther).toFixed(2)

  return roundedTotalStakedInEther
}

export async function totalClaimableRewards(
  web3Provider: any,
  address: string
): Promise<string> {
  const liquidStakingContractFactory = await getLiquidStakingFactoryContract(
    web3Provider
  )

  const lstContracts = await liquidStakingContractFactory.getLiquidStakings()

  let totalClaimableRewards = ethers.BigNumber.from(0)
  for (const lstContractAddress of lstContracts) {
    try {
      const provider = new ethers.providers.Web3Provider(web3Provider)
      const signer = provider.getSigner()

      const lstContract = new ethers.Contract(
        lstContractAddress,
        liquidStakingAbi,
        signer
      )
      const totalRewardPool = await lstContract.totalRewardPool()
      const userStake = await lstContract.stakes(address)
      const totalStaked = await lstContract.totalStaked()
      console.log({ totalStaked })
      const rewards = totalRewardPool.mul(userStake).div(totalStaked)
      totalClaimableRewards = totalClaimableRewards.add(rewards)
    } catch (e) {
      console.log(e)
    }
  }

  const totalClaimableRewardsInEther = ethers.utils.formatUnits(
    totalClaimableRewards,
    "ether"
  )
  const roundedTotalClaimableRewards = parseFloat(
    totalClaimableRewardsInEther
  ).toFixed(2)

  return roundedTotalClaimableRewards
}

export async function claimAllRewards(web3Provider: any, address: string) {
  const liquidStakingContractFactory = await getLiquidStakingFactoryContract(
    web3Provider
  )

  const lstContracts = await liquidStakingContractFactory.getLiquidStakings()
  const promises = []
  for (const lstContractAddress of lstContracts) {
    try {
      const provider = new ethers.providers.Web3Provider(web3Provider)
      const signer = provider.getSigner()

      const lstContract = new ethers.Contract(
        lstContractAddress,
        liquidStakingAbi,
        signer
      )
      const totalRewardPool = await lstContract.totalRewardPool()
      const userStake = await lstContract.stakes(address)
      const totalStaked = await lstContract.totalStaked()
      console.log({ totalStaked })
      const rewards = totalRewardPool.mul(userStake).div(totalStaked)
      if (rewards.eq(0)) {
        continue
      }
      promises.push(lstContract.claimReward())
    } catch (e) {
      console.log(e)
    }
    console.log({ promises })
  }

  const res = await Promise.all(promises)
  console.log({ res })
  return res
}

export async function unstakeAllTokens(provider: any, address: string) {
  const liquidStakingContractFactory = await getLiquidStakingFactoryContract(
    provider
  )

  const lstContracts = await liquidStakingContractFactory.getLiquidStakings()

  for (const lstContract of lstContracts) {
    const stakedAmount = await getStakedAmount(provider, lstContract, address)
    if (stakedAmount.eq(0)) {
      continue
    }
    await unstakeFromScript(provider, lstContract, address)
  }
}
