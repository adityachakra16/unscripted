import Head from "next/head"

import { TrailersPageView } from "./View"

import type { NextPage } from "next"

export const TrailersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Unscripted</title>
        <meta name="description" content="Write page description here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TrailersPageView />
    </>
  )
}
