//mui components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import theme from "../styles/theme";

import Brand from "./Brand";

import { useRef } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  /**
   *  @desc attempts login and creates user if user does not exist.
   * @param e Optional. Only to prevent event default.
   * @Note Intentionally not preventing button defaults but I don't think it matters.
   */
  async function handleFormSubmit(
    e: React.FormEvent<HTMLFormElement> | undefined = undefined
  ) {
    e?.preventDefault();

    if (usernameRef.current === null) {
      console.log("usernameRef.current is null");
      return;
    }

    const username = usernameRef.current.value;
    router.push(`/user/${username}`);
  }

  return (
    <Backdrop open={true}>
      <Paper
        elevation={8}
        sx={{ paddingTop: theme.spacing(5), height: "400px" }}
      >
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Brand />
            </Grid>

            <Grid item sx={{ marginY: theme.spacing(6) }}>
              <TextField
                autoComplete="off"
                id="username"
                inputRef={usernameRef}
                variant="filled"
                label="Username"
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleFormSubmit()}
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
