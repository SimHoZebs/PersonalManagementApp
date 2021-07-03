import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import dbConnect from "../dbConnect";
import { useStyles } from "../styles/index";

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
  const itemListWrapperRef = useRef<HTMLDivElement | null>(null);
  const lastItemInGroupInputField = useRef<
    HTMLDivElement | HTMLCollection | undefined | null
  >(itemListWrapperRef.current?.children);

  useEffect(() => {
    const itemListWrapperChildren = itemListWrapperRef.current?.children;

    lastItemInGroupInputField.current =
      itemListWrapperChildren != undefined
        ? itemListWrapperChildren[
            itemListWrapperChildren.length - 1
          ].querySelector<HTMLDivElement>(".MuiInputBase-root")
        : undefined;

    lastItemInGroupInputField.current?.click();
  }, [itemList]);

  async function handleCreateItem() {
    const newItem: IItemSchema = { title: "", groups: [] };
    setItemList((prev) => [...prev, newItem]);
  }

  return (
    <Container className={styles.root}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Item list title</Typography>
        </Grid>

        <Grid ref={itemListWrapperRef} item container spacing={1}>
          {itemList.map((item, index) => (
            <Grid item key={index} xs={12}>
              <Item title={item.title} />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleCreateItem()}
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
