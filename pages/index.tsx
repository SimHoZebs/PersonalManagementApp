import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { useStyles } from "../styles/index";

//components
import Item from "../components/Item";

//interfaces
import { IItemModel } from "../schema/ItemSchema";
import { IGetRes, IGetReq } from "./api/item/index";

interface IProps {}

export default function Home(props: IProps) {
  const styles = useStyles();
  const [itemList, setItemList] = useState<IItemModel[]>([]);
  const [creatingNewItem, setCreatingNewItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getItemList() {
      let url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/item`;

      if (!url.includes("localhost")) {
        url = "https://" + url;
      }

      const req: IGetReq = { method: "get", url: url };

      const itemListGetRes: AxiosResponse<IGetRes> = await axios(req);

      const itemList = itemListGetRes.data.res;
      console.log(itemListGetRes.data.error);
      setItemList(itemList);
    }

    getItemList();
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
    <Container className={styles.root}>
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
