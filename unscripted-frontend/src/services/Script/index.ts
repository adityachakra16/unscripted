import { useQuery } from "react-query"
import { sendRequest } from "../Request"
import { getDb, scriptsTable } from "../Db"

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
  const db = await getDb()
  const { results } = await db.prepare(`SELECT * FROM ${scriptsTable};`).all()
  console.log({ results })
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

export async function createScript(title: string, writer: string) {
  return await sendRequest(`${process.env.NEXT_PUBLIC_API_HOST}/scripts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      writer,
    }),
  })
}

export async function publishScript(title: string, writer: string) {
  // Insert a row into the table
  console.log({ title, writer })
  const db = await getDb()
  const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${scriptsTable} (id, title, writer) VALUES (?, ?, ?);`
    )
    .bind(0, title, writer)
    .run()
  console.log({ insert })
  const res = await insert.txn?.wait()
  console.log({ res })
  return res
}
