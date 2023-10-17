import Head from "next/head"

import { FeedPageView } from "./View"

import type { NextPage } from "next"

export const FeedPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Unscripted</title>
        <meta name="description" content="Write page description here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeedPageView />
    </>
  )
}
