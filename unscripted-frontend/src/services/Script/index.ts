import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { getDb, scriptsTable } from "../Db"
import { ethers } from "ethers"
import {
  Content,
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
  content: Content[],
  genres: string[],
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
      genres,
      writer,
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

async function getLiquidStakingContract(web3Provider: any, scriptId: string) {
  console.log({ web3Provider })
  const provider = new ethers.providers.Web3Provider(web3Provider)
  console.log({ provider })
  const signer = provider.getSigner()
  console.log({ signer })
  const factory = new ethers.Contract(
    POLYGON_MUMBAI_LIQUID_STAKING_FACTORY_ADDRESS,
    liquidStakingFactoryAbi,
    signer
  )

  console.log({ factory })
  const liquidStakingAddress = await factory.artifactIdToStaking(scriptId)
  return new ethers.Contract(liquidStakingAddress, liquidStakingAbi, signer)
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
  const liquidStakingContract = await getLiquidStakingContract(
    provider,
    scriptId
  )
  const tx = await liquidStakingContract.stake(amount, {
    gasLimit: 1000000,
  })
  console.log({ tx })
  return tx
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
