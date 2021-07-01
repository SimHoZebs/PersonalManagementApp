import React, { useState } from "react";
import { Grid, Typography, Button, Backdrop } from "@material-ui/core";
import axios from "axios";

//components
import useStyles from "../styles/Group";
import Item from "./Item";
import ItemCard from "./ItemCard";

interface props {}

const Group = (props: props) => {
  const styles = useStyles();
  const [createItemCardOpen, setCreateItemCardOpen] = useState(false);

  async function handleCreateItem() {
    setCreateItemCardOpen(true);
    // const itemId = getNewItemId();
  }

  async function getNewItemId() {
    const res = await axios({
      method: "POST",
      url: "localhost:3000/api",
      data: {
        title: "",
      },
    });
  }

  return (
    <>
      <Grid item>
        <Typography variant="h6">Item list group</Typography>
      </Grid>

      <Grid item container>
        <Grid item container spacing={1}>
          <Item title={"Example list item title"} />
          {/* {props.itemList.map((item: IItemSchema, index: number) => (
              <Grid item xs={12} key={index}>
                <Item title={item.title} />
              </Grid>
            ))} */}
        </Grid>
      </Grid>

      <Grid item container>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleCreateItem()}
        >
          New Item
        </Button>

        <Backdrop
          open={createItemCardOpen}
          onClick={() => setCreateItemCardOpen(false)}
          className={styles.backdrop}
        >
          <ItemCard title={""} />
        </Backdrop>
      </Grid>
    </>
  );
};

export default Group;
