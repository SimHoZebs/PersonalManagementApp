import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LoginForm from "../lib/components/LoginForm";
import { useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import request from "../lib/request";
import ApiRes from "../lib/api/ApiRes";

//Initialize server on load
//handles login.
//If log in was successful, redirects to the main page.

export default function Login() {
  useEffect(() => {
    async function initServer() {
      const serverReq: AxiosRequestConfig = { method: "get", url: "/api/" };
      const initServerRes: ApiRes<never> = await request(serverReq);
      //stop running if API server fails to run for some odd reason
      if (initServerRes.status !== 200) {
        console.log("server error", initServerRes.data.error);
        return;
      } else {
        console.log("server started");
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
