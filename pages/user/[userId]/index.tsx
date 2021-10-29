import React, { useEffect, useState } from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "../../../lib/components/List";
import { useRouter } from "next/router";
import isLoaded from "../../../lib/isLoaded";

//API functions
import readUser from "../../../lib/api/readUser";
import addListId from "../../../lib/api/addListId";
import createList from "../../../lib/api/createList";
import updateSelectedListId from "../../../lib/api/updateSelectedListId";

//schema and interfaces
import { UserSchema } from "../../../lib/schema/UserSchema";
import { ListSchema } from "../../../lib/schema/ListSchema";
import SideMenu from "../../../lib/components/SideMenu";
import { Skeleton } from "@mui/material";

/**
 * displays user dashboard.
 *
 */
export default function Dashboard() {
  const [user, setUser] = useState<UserSchema | undefined>();
  const [currListName, setCurrListName] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    /**
     * Creates a list and adds it to a user.
     * Sets that list as selected list.
     * @returns userSchema; The user the temp defaults were applied.
     * @returns string; if any error occurs.
     */

    async function addTempDefaults(userId: string) {
      let createdList: ListSchema;
      const createListRes = await createList(userId, "Welcome!");
      if (typeof createListRes === "string") {
        return createListRes;
      }
      createdList = createListRes;

      const addListIdRes = await addListId(userId, createdList._id);
      if (typeof addListIdRes === "string") {
        return addListIdRes;
      }

      const updateSelectedListIdRes = await updateSelectedListId(
        userId,
        createListRes._id
      );
      return updateSelectedListIdRes;
    }
    /**
     * Reads user data with given userId.
     */
    async function initUserPage() {
      const userId = router.query.userId;
      if (typeof userId !== "string") {
        return;
      }

      const readUserRes = await readUser(userId);
      if (typeof readUserRes === "string") {
        console.log(readUserRes);
        return;
      }
      if (readUserRes === null) {
        console.log(`User with id ${userId} does not exist.`);
        //route back to login screen?
        return;
      }

      let user = readUserRes;

      if (user.listIdArray.length === 0) {
        const addTempDefaultsRes = await addTempDefaults(userId);
        if (typeof addTempDefaultsRes === "string") {
          console.log(addTempDefaultsRes);
          return;
        }
        user = addTempDefaultsRes;
      }

      setUser(user);
    }

    initUserPage();
  }, [router.query.userId]);

  return (
    <>
      <Head>
        <title>Dashboard - AnotherToDoApp</title>
      </Head>
      <Grid container direction="row">
        <Grid item xs={3}>
          <SideMenu currListName={currListName} />
        </Grid>

        <Grid
          item
          xs={9}
          sx={{ display: "flex", flexDirection: "column", rowGap: 1, p: 1 }}
        >
          <Typography variant="caption">
            {isLoaded<UserSchema>(user) ? (
              `Hello, ${user?.username}`
            ) : (
              <Skeleton variant="text" width={80} height={14} />
            )}
          </Typography>
          {isLoaded<UserSchema>(user) ? (
            <List
              userId={user._id}
              listId={user.selectedListId}
              currListName={currListName}
              setCurrListName={setCurrListName}
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
