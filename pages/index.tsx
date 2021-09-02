import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";

//components
import Item from "../components/Item";

//interfaces
import { FolderSchema } from "../schema/FolderSchema";
import { IItemModel } from "../schema/ItemSchema";
import { IGetRes, IGetReq } from "./api/item/index";
import { ReqAllFolder, ReqAllFolderRes } from "./api/folder";

interface IProps {}

export default function Home(props: IProps) {
  const [folderList, setFolderList] = useState<FolderSchema[]>([]);
  const [itemList, setItemList] = useState<IItemModel[]>([]);
  const [creatingNewItem, setCreatingNewItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initTodoApp() {
      let url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

      if (!url.includes("localhost")) {
        url = "https://" + url;
      }

      //Add: Log in user and get specific user's folder
      //For now, we'll get a general folder

      //init server
      const serverReq: IGetReq = { method: "get", url: url };
      const initServerRes: AxiosResponse<IGetRes> = await axios(serverReq);

      //stop running if API server fails to run for some odd reason
      if (!initServerRes.data.success) {
        console.log(initServerRes.data.error);
        console.log("Failed to get data from server");
        return;
      }

      //getting folder
      const folderReq: ReqAllFolder = { method: "GET", url: `${url}/folder` };
      const reqAllFolderRes: AxiosResponse<ReqAllFolderRes> = await axios(
        folderReq
      );

      const folderList = reqAllFolderRes.data.res;
      if (typeof folderList === "undefined") {
        console.log(reqAllFolderRes.data.error);
        return;
      }
      setFolderList(folderList);

      //getting item
      const itemURL = `${url}/item`;
      const req: IGetReq = { method: "get", url: itemURL };

      const itemListGetRes: AxiosResponse<IGetRes> = await axios(req);

      const itemList = itemListGetRes.data.res;
      if (typeof itemList === "undefined") {
        console.log(itemListGetRes.data.error);
      } else {
        setItemList(itemList);
      }
    }

    initTodoApp();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("itemList updated", itemList);
  }, [itemList]);

  function handleNewItemBtn() {
    const newItem: IItemModel = {
      title: "",
      groups: [],
    };

    setItemList((prev) => [...prev, newItem]);

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
          {itemList.map((item, index) => (
            <Grid item key={index} xs={12}>
              <Item
                item={item}
                index={index}
                setItemList={setItemList}
                setCreatingNewItem={setCreatingNewItem}
                isNewItem={
                  creatingNewItem && index === itemList.length - 1
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
