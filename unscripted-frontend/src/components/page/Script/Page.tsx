import Head from "next/head"

import { ScriptPageView } from "./View"

import type { NextPage } from "next"

export const ScriptPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Unscripted</title>
        <meta name="description" content="Write page description here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScriptPageView />
    </>
  )
}
