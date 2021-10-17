import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LoginForm from "../lib/components/LoginForm";
import { useState, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "../lib/request";
import correctRes from "../lib/correctRes";

//Initialize server on load
//handles login.
//If log in was successful, redirects to the main page.

export default function Login() {
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    async function initServer() {
      const serverReq: AxiosRequestConfig = { method: "get", url: "/api/" };
      const initServerRes: AxiosResponse = await request(serverReq);
      //stop running if API server fails to run for some odd reason
      if (correctRes(initServerRes)) {
        if (initServerRes.status !== 200) {
          console.log("server error", initServerRes.data.error);
          return;
        } else {
          console.log("server started");
        }
      } else {
        return `Client Error. res: ${JSON.stringify(serverReq, null, 2)}`;
      }
    }

    initServer();
    setServerReady(true);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          {serverReady ? (
            <LoginForm />
          ) : (
            <Typography>Server is loading...</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
