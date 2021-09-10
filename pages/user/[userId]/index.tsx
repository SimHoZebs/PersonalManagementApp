import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { useRouter } from "next/router";

//components
import Item from "../../../components/Item";
import { ListSchema } from "../../../schema/ListSchema";
import { ItemSchema } from "../../../schema/ItemSchema";
import readUser from "../../../lib/api/readUser";
import createUser from "../../../lib/api/createUser";
import { UserSchema } from "../../../schema/UserSchema";
import createList from "../../../lib/api/createList";
import updateUserListArray from "../../../lib/api/updateUserListArray";

//get user data from login form
//fill page with user data

export default function Home() {
  const [listArray, setListArray] = useState<ListSchema[]>([]);
  const [user, setUser] = useState<UserSchema | null>(null);
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingItem, setCreatingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const [{ username }, setUsername] = useState(router.query);

  console.log("Hello,", username);
  async function AddListToUser(createdUser: any) {
    const createListRes = await createList(
      createdUser._id,
      "default list"
    ).then((res) => res?.data);
    if (createListRes.res._id === undefined) {
      console.log("error creating list, list id doesn't exist");
      console.log(createListRes.error);
      return;
    }
    const createdList = createListRes.res;

    const updateUserListArrayRes = await updateUserListArray(
      createdUser._id,
      createdList._id
    ).then((res) => res.data);
    if (!updateUserListArrayRes.success) {
      console.log(updateUserListArrayRes.error);
    }
  }

  useEffect(() => {
    /**
     * Loads user data and creates new user if they don't exist.
     */
    async function initUserPage(username: string) {
      let user: UserSchema;

      const readUserRes = await readUser(username).then((res) => res.data);
      if (!readUserRes.success) {
        console.log(readUserRes.error);
        return;
      }

      if (readUserRes.res === null) {
        const createUserRes = await createUser(username).then(
          (res) => res?.data
        );
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

    if (typeof username !== "string") {
      console.log("username is not a string. It is ", username);
      return;
    }
    initUserPage(username);
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    console.log("itemArray updated", itemArray);
  }, [itemArray]);

  function handleCreateItemBtn() {
    const newItem: ItemSchema = {
      itemName: "",
      labelIdArray: [],
    };

    setItemArray((prev) => [...prev, newItem]);

    setCreatingItem((prev) => true);
  }

  return isLoading ? (
    <Typography variant="h1">Loading</Typography>
  ) : (
    <Container sx={{ padding: "30px" }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4"></Typography>
        </Grid>

        {/*Need list component to load and display list*/}
        <Grid item container spacing={1}>
          {itemArray.map((item, index) => (
            <Grid item key={index} xs={12}>
              <Item
                item={item}
                index={index}
                setItemArray={setItemArray}
                setCreatingItem={setCreatingItem}
                isNewItem={
                  creatingItem && index === itemArray.length - 1 ? true : false
                }
              />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleCreateItemBtn()}
          >
            New Item
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
