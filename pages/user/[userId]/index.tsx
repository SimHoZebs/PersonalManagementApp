import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import List from "../../../lib/components/List";
import { useRouter } from "next/router";

//API functions
import readUser from "../../../lib/api/readUser";
import createUser from "../../../lib/api/createUser";
import createList from "../../../lib/api/createList";
import addListToUser from "../../../lib/api/addListToUser";

//schema and interfaces
import { UserSchema } from "../../../lib/schema/UserSchema";
//get user data from login form
//fill page with user data

export default function UserDashboard() {
  const [user, setUser] = useState<UserSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  console.log(router.query);
  const [{ userId }, setUserId] = useState(router.query);

  console.log("Hello,", userId);
  async function addDefaultListToUser(user: any) {
    const createListRes = await createList(user.id, "default list").then(
      (res) => res?.data
    );
    if (createListRes.res._id === undefined) {
      console.log("error creating list, list id doesn't exist");
      console.log(createListRes.error);
      return;
    }
    const createdList = createListRes.res;

    const updateUserListArrayRes = await addListToUser(
      user.id,
      createdList.id
    ).then((res) => res.data);
    if (!updateUserListArrayRes.success) {
      console.log(updateUserListArrayRes.error);
    }
  }

  useEffect(() => {
    /**
     * Reads user data and creates new user if they don't exist.
     */
    async function initUserPage(userId: string) {
      let user: UserSchema;

      const readUserRes = await readUser(userId).then((res) => res.data);
      if (!readUserRes.success) {
        console.log(readUserRes.error);
        return;
      }

      if (readUserRes.res === null) {
        const createUserRes = await createUser(userId).then((res) => res?.data);
        if (!createUserRes.success) {
          console.log(createUserRes.error);
          return;
        }

        user = createUserRes.res;
      } else {
        user = readUserRes.res;
      }

      setUser(user);
    }

    if (typeof userId !== "string") {
      console.log("userId is not a string. It is ", userId);
      return;
    }
    initUserPage(userId);
    setIsLoading(false);
  }, [userId]);

  return isLoading ? (
    <Typography variant="h1">Loading</Typography>
  ) : (
    <Container sx={{ padding: "30px" }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Hello, {user?.username}</Typography>
        </Grid>

        {user?.listIdArray.map((listId, index) => (
          <List key={index} userId={user.id} listId={listId} />
        ))}
      </Grid>
    </Container>
  );
}
