import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

//Initialize server on load
//handles login.
//If log in was successful, redirects to the main page.

let url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

if (!url.includes("localhost")) {
  url = "https://" + url;
}

export default function Index() {
  useEffect(() => {
    //init server
    async function initServer() {
      const serverReq: AxiosRequestConfig = { method: "get", url: url };
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
