import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import request from "../../lib/request";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";

//components
import Item from "../../components/Item";

//interfaces
import { ListSchema } from "../../schema/ListSchema";
import { ItemSchema } from "../../schema/ItemSchema";

//get user data from login form
//fill page with user data

export default function Home() {
  const [listArray, setListArray] = useState<ListSchema[]>([]);
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingItem, setCreatingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const [{ username }, setUsername] = useState(router.query);

  console.log("Hello,", username);

  useEffect(() => {
    //add things needed to be loaded
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    console.log("itemArray updated", itemArray);
  }, [itemArray]);

  function handleCreateItemBtn() {
    const newItem: ItemSchema = {
      title: "",
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
          <Typography variant="h4">Item list title</Typography>
        </Grid>

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
