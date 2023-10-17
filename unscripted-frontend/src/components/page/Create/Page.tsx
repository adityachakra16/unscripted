import Head from "next/head"

import { CreatePageView } from "./View"

import type { NextPage } from "next"

export const CreatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Unscripted</title>
        <meta name="description" content="Write page description here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreatePageView />
    </>
  )
}
