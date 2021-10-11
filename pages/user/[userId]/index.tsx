import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "../../../lib/components/List";
import { useRouter } from "next/router";

//API functions
import readUser from "../../../lib/api/readUser";
import createList from "../../../lib/api/createList";

//schema and interfaces
import { UserSchema } from "../../../lib/schema/UserSchema";
import addListId from "../../../lib/api/addListId";
import updateSelectedListId from "../../../lib/api/updateSelectedListId";
//get user data from login form
//fill page with user data

/**
 * displays user dashboard.
 *
 */
export default function Dashboard() {
  const [user, setUser] = useState<UserSchema | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    /**
     * creates a list and adds it to user. Sets that list as selected list.
     * @returns userSchema
     */
    async function addTempDefaults(userId: string) {
      const createListRes = await createList(userId, "default list");
      if (typeof createListRes === "string") {
        console.log(createListRes);
        return;
      }

      const addListRes = await addListId(userId, createListRes._id);
      if (typeof addListRes === "string") {
        console.log(addListRes);
        return;
      }

      const updateSelectedListIdRes = await updateSelectedListId(
        userId,
        createListRes._id
      );
      if (typeof updateSelectedListIdRes === "string") {
        console.log(updateSelectedListIdRes);
        return;
      }

      return updateSelectedListIdRes;
    }

    /**
     * Reads user data with given userId.
     */
    async function initUserPage(userId: string) {
      let user: UserSchema;

      const readUserRes = await readUser(null, userId);
      if (typeof readUserRes === "string") {
        console.log(readUserRes);
        return;
      }
      if (readUserRes === null) {
        console.log(`User with id ${userId} does not exist.`);
        return;
      }

      user = readUserRes;

      if (user.listIdArray.length === 0) {
        const addTempDefaultsRes = await addTempDefaults(userId);
        if (addTempDefaultsRes === undefined) {
          console.log("addTempDefaultsRes error");
          return;
        }
        user = addTempDefaultsRes;
      }

      setUser(user);
    }

    const userId = router.query.userId;
    if (typeof userId !== "string") {
      console.log("userId is not a string. It is ", userId);
      return;
    }
    initUserPage(userId);
    setIsLoading(false);
  }, [router.query.userId]);

  return isLoading ? (
    <Typography variant="h1">Loading</Typography>
  ) : (
    <Container sx={{ padding: "30px" }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Hello, {user?.username}</Typography>
        </Grid>
        {user !== undefined ? (
          <List userId={user?._id} listId={user?.selectedListId} />
        ) : (
          <Typography>user is undefined</Typography>
        )}
      </Grid>
    </Container>
  );
}
