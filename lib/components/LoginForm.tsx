//misc
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//mui components
import { Paper, Grid, TextField, Button, Backdrop, Box } from "@mui/material";

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

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [loginBtnIsDisabled, setLoginBtnIsDisabled] = useState(false);
  const router = useRouter();

  /**
   * checks if form fields are submitted with valid values.
   * @returns true if username and password are valid
   */
  function fieldsAreValid() {
    if (username && password) {
      return true;
    } else {
      setLoginBtnIsDisabled(true);
      if (username) {
        setPasswordErrorMsg("Password can't be blank.");
        setPasswordError(true);
      }
      if (password) {
        setUsernameErrorMsg("Username can't be blank.");
        setUsernameError(true);
      }
      return false;
    }
  }

  /**
   * attempts login and creates user if user does not exist.
   * @param e Optional; Only to prevent event default.
   * @Note Intentionally allowing button defaults, but I don't think it matters.
   */
  async function formSubmit(
    e: React.FormEvent<HTMLFormElement> | undefined = undefined
  ) {
    e?.preventDefault();

    if (!fieldsAreValid()) {
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
          <form onSubmit={(e) => formSubmit(e)}>
            <Box
              flexDirection="column"
              alignItems="center"
              display="flex"
              rowGap={3}
            >
              <Brand />

              <Box alignItems="center" display="flex" flexDirection="column">
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

                <TextField
                  error={passwordError}
                  helperText={passwordErrorMsg}
                  autoComplete="off"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  label="Password"
                  sx={{ transition: "all 0.3s ease-in-out" }}
                />
              </Box>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={loginBtnIsDisabled}
                onClick={() => formSubmit()}
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
