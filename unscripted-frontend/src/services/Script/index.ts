import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { getDb, scriptsTable } from "../Db"
import { ethers } from "ethers"
import {
  POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
  Script,
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
    `${process.env.NEXT_PUBLIC_API_HOST}/scripts?orderBy=rating`,
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

export async function getScript(scriptId: string) {
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
  content: {
    character: string
    dialogue: string
  }[],
  writer: string
) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/scripts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      writer,
    }),
  })
}

export async function updateScript(
  title: string,
  content: {
    character: string
    dialogue: string
  }[],
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
      writer,
    }),
  })
}

async function getLiquidStakingContract(providerUri: string, scriptId: string) {
  const provider = new ethers.providers.JsonRpcProvider(providerUri)
  const signer = provider.getSigner()

  const factory = new ethers.Contract(
    POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
    liquidStakingFactoryAbi,
    signer
  )

  const liquidStakingAddress = await factory.artifactIdToStaking(scriptId)
  return new ethers.Contract(liquidStakingAddress, liquidStakingAbi, signer)
}

export async function stakeOnScript(
  provider: any,
  scriptId: string,
  amount: number
) {
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const tx = liquidStakingContract.stake(amount)
  await tx.wait()
}

export async function unstakeFromScript(
  provider: any,
  scriptId: string,
  amount: number
) {
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const tx = liquidStakingContract.unstake(amount)
  await tx.wait()
}

export async function buyArtifact(
  provider: any,
  scriptId: string,
  amount: number
) {
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const tx = liquidStakingContract.buyArtifact(amount)
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
