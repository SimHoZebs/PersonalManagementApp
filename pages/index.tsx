import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LoginForm from "../lib/components/LoginForm";
import { useState, useEffect } from "react";
import apiMiddleware from "../lib/apiMiddleware";

//Initialize server on load
//handles login.
//If log in was successful, redirects to the main page.

export default function Login() {
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    async function initServer() {
      const res = apiMiddleware<{}>({
        method: "get",
        url: "/api/",
      });
      console.log(typeof res === "string" ? res : "server started");
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
