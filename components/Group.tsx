import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import axios from "axios";

//components
import { IGroupSchema } from "../schema/GroupSchema";
import { IItemModel } from "../schema/ItemSchema";

interface props {
  group: IGroupSchema;
}

const Group = (props: props) => {
  const [items, setItems] = useState<IItemModel[]>([]);

  useEffect(() => {
    async function getItems() {
      let items: IItemModel[] = [];

      props.group.itemId.map(async (itemId) => {
        const item = await axios({
          method: "GET",
          url: `localhost:3000/api/item/${itemId}`,
        });
        items.push(item.data);
      });

      setItems(items);
    }
    getItems();
  }, [props.group.itemId]);

  return (
    <>
      <Grid item>
        <Typography variant="h6">{props.group.title}</Typography>
      </Grid>

      <Grid item container>
        <Grid item container spacing={1}></Grid>
        {items.map((item, index) => (
          <Grid key={index} item container spacing={1}></Grid>
        ))}
      </Grid>

      <Grid item container>
        <Button variant="text" color="primary">
          New Item
        </Button>
      </Grid>
    </>
  );
};

export default Group;
