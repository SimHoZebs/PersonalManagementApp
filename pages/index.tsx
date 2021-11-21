import { useRouter } from "next/router";
import React, { useEffect } from "react";

//components
import { Container, Typography } from "@mui/material";

//apis & schemas
import readUser from "../lib/api/readUser";
import createUser from "../lib/api/createUser";
import { UserSchema } from "../lib/schema/UserSchema";
import connectToDB from "../lib/api/connectToDB";

const PREVIEW_USERID = "preview";
const PREVIEW_USERNAME = "preview";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    /**
     * Makes connection with DB. Uses userId from localStorage to get user data. Creates a new one if it doesn't exist.
     */
    async function initApp() {
      const connectToDBRes = await connectToDB();
      if (typeof connectToDBRes === "string") {
        console.log(connectToDBRes);
        return;
      }

      let user: UserSchema;

      const readUserRes = await readUser(PREVIEW_USERID);
      if (typeof readUserRes === "string") {
        console.log(readUserRes);
        return;
      }

      if (readUserRes === null) {
        const createUserRes = await createUser(
          PREVIEW_USERID,
          PREVIEW_USERNAME
        );
        if (typeof createUserRes === "string") {
          console.log(createUserRes);
          return;
        }

        user = createUserRes;
      } else {
        user = readUserRes;
      }

      router.push({
        pathname: `/user/${user._id}`,
      });
    }

    initApp();
  }, [router]);

  return (
    <Container disableGutters>
      <Typography>Loading app...</Typography>
    </Container>
  );
}
