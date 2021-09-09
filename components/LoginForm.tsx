//mui components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import theme from "../styles/theme";

import Brand from "./Brand";

import axios, { AxiosResponse } from "axios";
import {
  CreateUser,
  CreateUserRes,
  ReadUserListId,
  ReadUserListIdRes,
} from "../pages/api/user/[username]";
import { useRef } from "react";
import { useRouter } from "next/router";

let url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

if (!url.includes("localhost")) {
  url = "https://" + url;
}

const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  /**
   * @description Checks if username exists in DB.
   * @returns undefined; if request failed
   * @returns null; if request successful but username does not exist
   * @returns User: UserSchema; if request successful and username exists
   */
  async function readUserInDB(username: string) {
    if (typeof username !== "string") {
      console.log("username is not a string", typeof username);
      return;
    }

    const readUserListId: ReadUserListId = {
      method: "GET",
      url: `${url}/user/${username}`,
    };
    const readUserListIdRes: AxiosResponse<ReadUserListIdRes> = await axios(
      readUserListId
    );
    console.log(readUserListIdRes.data);

    return await readUserListIdRes.data;
  }

  async function createUser(username: string) {
    const createUserReq: CreateUser = {
      method: "POST",
      url: `${url}/user/${username}`,
    };

    return await axios(createUserReq);
  }

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

    const readUserInDBRes = await readUserInDB(username);

    if (readUserInDBRes === undefined) {
      console.log(
        "response is undefined. Looks like something went wrong during readUserInDB"
      );
    } else if (!readUserInDBRes.success) {
      //request unsuccessful
      console.log(readUserInDBRes.error);
    } else if (readUserInDBRes.res === null) {
      //user does not exist
      const createUserRes: AxiosResponse<CreateUserRes> = await createUser(
        username
      );

      if (!createUserRes.data.success) {
        console.log(createUserRes.data.error);
      } else {
        router.push(`/user/${username}`);
      }
    } else {
      //user exists
      router.push(`/user/${username}`);
    }
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
