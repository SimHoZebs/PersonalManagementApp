import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import "windi.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title key="title">LifeOrb</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
