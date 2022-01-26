import * as React from "react";
import Head from "next/head";
import { StoreProvider } from "easy-peasy";
import { AppProps } from "next/app";
import "windi.css";

import ContextMenu from "../lib/components/ContextMenu";
import globalState from "../lib/globalState";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title key="title">LifeOrb</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ContextMenu />
      <StoreProvider store={globalState}>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}
