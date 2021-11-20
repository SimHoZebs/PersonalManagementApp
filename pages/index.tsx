import { useRouter } from "next/router";
import React, { useEffect } from "react";

//components
import { Container, Typography } from "@mui/material";

//apis & schemas
import readUser from "../lib/api/readUser";
import createUser from "../lib/api/createUser";
import { UserSchema } from "../lib/schema/UserSchema";
import connectToDB from "../lib/api/connectToDB";

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
      const previewIdInLocalStorage = localStorage.getItem("userId");
      if (previewIdInLocalStorage) {
        const readUserRes = await readUser(previewIdInLocalStorage);
        if (typeof readUserRes === "string") {
          console.log(readUserRes);
          return;
        } else if (readUserRes === null) {
          const createUserRes = await createUser("preview");
          if (typeof createUserRes === "string") {
            return createUserRes;
          }

          localStorage.setItem("userId", createUserRes._id);
          user = createUserRes;
          return;
        }

        user = readUserRes;
      } else {
        const createUserRes = await createUser("preview");
        if (typeof createUserRes === "string") {
          return createUserRes;
        }
        user = createUserRes;
        localStorage.setItem("userId", createUserRes._id);
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
