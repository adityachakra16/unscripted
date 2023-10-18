import { Database } from "@tableland/sdk"

// This table has schema: `counter INTEGER PRIMARY KEY`
export const scriptsTable = "scripts_80001_7886" // Our pre-defined health check table

interface HealthBot {
  counter: number
}

export const db: Database<HealthBot> = new Database()
