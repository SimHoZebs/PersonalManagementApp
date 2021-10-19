//misc
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//mui components
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import theme from "../theme";

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
      <Paper
        elevation={8}
        sx={{ paddingTop: theme.spacing(5), height: "400px" }}
      >
        <form onSubmit={(e) => processLogin(e)}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Brand />
            </Grid>

            <Grid item sx={{ marginY: theme.spacing(6) }}>
              <TextField
                error={usernameError}
                helperText={usernameErrorMsg}
                autoComplete="off"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="filled"
                label="Username"
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                size="large"
                disabled={loginBtnIsDisabled}
                onClick={() => processLogin()}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Backdrop>
  );
};

export default LoginForm;
