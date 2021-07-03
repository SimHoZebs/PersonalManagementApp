import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography, Button, Backdrop } from "@material-ui/core";
import axios from "axios";

//components
import useStyles from "../styles/Group";
import Item from "./Item";
import ItemCard from "./ItemCard";
import { IGroupSchema } from "../schema/GroupSchema";
import { IItemSchema } from "../schema/ItemSchema";

interface props {
  group: IGroupSchema;
}

const Group = (props: props) => {
  const styles = useStyles();
  const [createItemCardOpen, setCreateItemCardOpen] = useState(false);
  const [items, setItems] = useState<IItemSchema[]>([]);

  useEffect(() => {
    async function getItems() {
      let items: IItemSchema[] = [];
      console.log("fetching items");

      props.group.itemId.map(async (itemId) => {
        console.log("URL is ", `localhost:3000/api/item/${itemId}`);
        const item = await axios({
          method: "GET",
          url: `localhost:3000/api/item/${itemId}`,
        });
        items.push(item.data);
      });

      setItems(items);
    }
    getItems();
    console.log(items);
  }, []);

  return (
    <>
      <Grid item>
        <Typography variant="h6">{props.group.title}</Typography>
      </Grid>

      <Grid item container>
        <Grid item container spacing={1}>
          <Item title={"Example list item title"} />
        </Grid>
        {items.map((item, index) => (
          <Grid key={index} item container spacing={1}>
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
