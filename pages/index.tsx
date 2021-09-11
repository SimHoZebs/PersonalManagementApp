import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import LoginForm from "../lib/components/LoginForm";
import { useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

//Initialize server on load
//handles login.
//If log in was successful, redirects to the main page.

export default function Login() {
  useEffect(() => {
    async function initServer() {
      const serverReq: AxiosRequestConfig = { method: "get", url: "/api/" };
      const initServerRes: AxiosResponse = await axios(serverReq);

      //stop running if API server fails to run for some odd reason
      if (!initServerRes.data.success) {
        console.log(initServerRes.data.error);
        console.log("Failed to get data from server");
        return;
      }
    }

    initServer();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
}
