import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            crossOrigin="true"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          />
        </Head>
        <body className="font-roboto text-light-50 bg-dark-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
