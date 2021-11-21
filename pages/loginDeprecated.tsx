import Head from "next/head";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LoginForm from "../lib/components/LoginForm";
import { useState, useEffect } from "react";
import apiFunctionHelper from "../lib/apiFunctionHelper";

//Initialize server on load
//handles login.
//If log in was successful, redirects to the main page.

export default function Login() {
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    async function initServer() {
      const res = await apiFunctionHelper<{}>({
        method: "get",
        url: "/api/",
      });
      console.log(typeof res === "string" ? res : "server started");
    }

    initServer();
    setServerReady(true);
  }, []);

  return (
    <>
      <Head>
        <title>Login - AnotherToDoApp</title>
      </Head>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          {serverReady ? (
            <LoginForm />
          ) : (
            <Typography>Server is loading...</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}
