import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";

//components
import Item from "../components/Item";

//interfaces
import { ListSchema } from "../schema/ListSchema";
import { ItemSchema } from "../schema/ItemSchema";
import { ReqAllItemRes, ReqAllItem } from "./api/item/index";
import { ReqAllList, ReqAllListRes } from "./api/list/index";

interface IProps {}

export default function Home(props: IProps) {
  const [listArray, setListArray] = useState<ListSchema[]>([]);
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingNewItem, setCreatingNewItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initTodoApp() {
      let url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

      if (!url.includes("localhost")) {
        url = "https://" + url;
      }

      //Add: Log in user and get specific user's list
      //For now, we'll get a general list

      //init server
      const serverReq: ReqAllItem = { method: "get", url: url };
      const initServerRes: AxiosResponse<ReqAllItemRes> = await axios(serverReq);

      //stop running if API server fails to run for some odd reason
      if (!initServerRes.data.success) {
        console.log(initServerRes.data.error);
        console.log("Failed to get data from server");
        return;
      }

      //getting list
      const listReq: ReqAllList = { method: "GET", url: `${url}/list` };
      const reqAllListRes: AxiosResponse<ReqAllListRes> = await axios(listReq);

      const listArray = reqAllListRes.data.res;
      if (typeof listArray === "undefined") {
        console.log(reqAllListRes.data.error);
        return;
      }
      setListArray(listArray);

      //getting item
      const itemURL = `${url}/item`;
      const req: ReqAllItem = { method: "get", url: itemURL };

      const reqAllItemRes: AxiosResponse<ReqAllItemRes> = await axios(req);

      const itemArray = reqAllItemRes.data.res;
      if (typeof itemArray === "undefined") {
        console.log(reqAllItemRes.data.error);
      } else {
        setItemArray(itemArray);
      }
    }

    initTodoApp();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("itemArray updated", itemArray);
  }, [itemArray]);

  function handleNewItemBtn() {
    const newItem: ItemSchema = {
      title: "",
      groupIdArray: [],
    };

    setItemArray((prev) => [...prev, newItem]);

    setCreatingNewItem((prev) => true);
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
                setCreatingNewItem={setCreatingNewItem}
                isNewItem={
                  creatingNewItem && index === itemArray.length - 1
                    ? true
                    : false
                }
              />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleNewItemBtn()}
          >
            New Item
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
