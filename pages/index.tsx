import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import dbConnect from "../dbConnect";
import { useStyles } from "../styles/index";

//components
import Item from "../components/Item";
import { IGroupSchema } from "../schema/GroupSchema";
import { IItemSchema } from "../schema/ItemSchema";

interface props {
  groupList: IGroupSchema[];
  itemList: IItemSchema[];
}

export default function Home(props: props) {
  const styles = useStyles();
  const [itemList, setItemList] = useState(props.itemList);
  const [creatingNewItem, setCreatingNewItem] = useState(false);

  useEffect(() => {
    console.log("itemList updated", itemList);
  }, [itemList]);

  function handleNewItemBtn() {
    const newItem: IItemSchema = {
      title: "",
      groups: [],
    };

    setItemList((prev) => [...prev, newItem]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const DB_URI = process.env.DB_URI;

  if (DB_URI === undefined) {
    return { props: {} };
  }

  dbConnect(DB_URI);
  const itemListGetRes = await axios({
    method: "get",
    url: "http://localhost:3000/api/item",
  });

  const itemList = itemListGetRes.data.res;

  return {
    props: { itemList },
  };
};
