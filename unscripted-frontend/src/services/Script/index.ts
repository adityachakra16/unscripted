import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { db, scriptsTable } from "../Db"

export async function getLatestScripts() {
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

export async function getScriptsByHighestRating() {
  const { results } = await db.prepare(`SELECT * FROM ${scriptsTable};`).all()
  return results
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

export async function createScript(script: any) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/scripts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(script),
  })
}

export async function publishScript(title: string, writer: string) {
  // Insert a row into the table
  const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${scriptsTable} (id, title, writer) VALUES (1, ${title}, ${writer});`
    )
    .bind(0, "Bobby Tables")
    .run()
  const res = await insert.txn?.wait()
  console.log({ res })
  return res
}
