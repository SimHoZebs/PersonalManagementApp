import React, { useState, useRef } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import dbConnect from "../dbConnect";
import { useStyles } from "../styles/index";
import { Types } from "mongoose";

import Item from "../components/Item";
import { IGroupSchema } from "../schema/GroupSchema";
import { IItemSchema } from "../schema/ItemSchema";

interface props {
  groupList: IGroupSchema[];
  itemList: IItemSchema[];
  _objectId?: Types.ObjectId;
}

export default function Home(props: props) {
  const styles = useStyles();
  const [itemList, setItemList] = useState(props.itemList);
  const [creatingNewItem, setCreatingNewItem] = useState(false);

  function handleNewItemBtn() {
    console.log("handling new item button");
    const newItem: IItemSchema = {
      title: "",
      groups: [],
    };

    setItemList((prev) => [...prev, newItem]);

    console.log("setting createNewItem state to true");
    setCreatingNewItem((prev) => true);
  }

  return (
    <Container className={styles.root}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Item list title</Typography>
        </Grid>

        <Grid item container spacing={1}>
          {itemList.map((item, index) => (
            <Grid item key={index} xs={12}>
              <Item
                title={item.title}
                objectId={item._objectId}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  dbConnect();
  const itemListGetRes = await axios.get<{ res: IItemSchema[]; msg: string[] }>(
    "http://localhost:3000/api/item"
  );

  const itemList = itemListGetRes.data.res;

  return {
    props: { itemList },
  };
};
