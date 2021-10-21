//misc
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//mui components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

//components
import Brand from "./Brand";

//api & schema
import { UserSchema } from "../schema/UserSchema";
import readUser from "../api/readUser";
import createUser from "../api/createUser";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState(" ");
  const [loginBtnIsDisabled, setLoginBtnIsDisabled] = useState(false);
  const router = useRouter();

  /**
   * attempts login and creates user if user does not exist.
   * @param e Optional; Only to prevent event default.
   * @Note Intentionally allowing button defaults, but I don't think it matters.
   */
  async function processLogin(
    e: React.FormEvent<HTMLFormElement> | undefined = undefined
  ) {
    e?.preventDefault();

    if (username === "") {
      setUsernameErrorMsg("Username can't be blank.");
      setLoginBtnIsDisabled(true);
      setUsernameError(true);
      return;
    }

    let user: UserSchema | string;
    const readUserRes = await readUser(username);
    if (readUserRes === null) {
      const createUserRes = await createUser(username);

      user = createUserRes;
    } else {
      user = readUserRes;
    }

    if (typeof user === "string") {
      console.log(user);
    } else {
      router.push({
        pathname: `/user/${user._id}`,
      });
    }
  }

  useEffect(() => {
    if (username.includes(" ")) {
      setUsernameErrorMsg("Username can't include spaces.");
      setLoginBtnIsDisabled(true);
      setUsernameError(true);
    } else {
      setUsernameErrorMsg(" ");
      setLoginBtnIsDisabled(false);
      setUsernameError(false);
    }
  }, [username]);

  return (
    <Backdrop open={true}>
      <Grid item xs={3} maxWidth="sm">
        <Paper elevation={8} sx={{ padding: 5 }}>
          <form onSubmit={(e) => processLogin(e)}>
            <Box
              flexDirection="column"
              alignItems="center"
              sx={{ display: "flex" }}
              rowGap={3}
            >
              <Brand />

              <TextField
                error={usernameError}
                helperText={usernameErrorMsg}
                autoComplete="off"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                label="Username"
                sx={{ transition: "all 0.3s ease-in-out" }}
              />

              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={loginBtnIsDisabled}
                onClick={() => processLogin()}
              >
                Log in
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Backdrop>
  );
};

export default LoginForm;
