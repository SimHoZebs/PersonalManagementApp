import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Item from "./Item";
import { ItemSchema } from "../schema/ItemSchema";
import readList from "../api/readList";

interface Props {
  userId: string;
  listId: string;
}

const List = (props: Props) => {
  const [listName, setListName] = useState("");
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingItem, setCreatingItem] = useState(false);

  /**
   * @description Readies list to respond accoridngly to new item interaction.
   * @note For more info, check Item.tsx
   */
  function createItemBtn() {
    const newItem = {
      itemName: "",
      userId: props.userId,
      listId: props.listId,
    } as ItemSchema;

    setItemArray((prev) => [...prev, newItem]);
    setCreatingItem((prev) => true);
  }

  useEffect(() => {
    async function initList() {
      const readListRes = await readList(props.userId, props.listId);
      if (typeof readListRes === "string") {
        console.log(readListRes);
        return;
      }

      setItemArray((prev) => readListRes.itemArray);
      setListName(readListRes.listName);
    }

    initList();
  }, [props.userId, props.listId]);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography variant="h4">{listName}</Typography>
      </Grid>
      <Grid item container spacing={1}>
        {itemArray.length !== 0 ? (
          itemArray.map((item, index) => (
            <Grid item key={index} xs={12}>
              <Item
                item={item}
                index={index}
                setItemArray={setItemArray}
                listId={props.listId}
                setCreatingItem={setCreatingItem}
                isNewItem={
                  creatingItem && index === itemArray.length - 1 ? true : false
                }
              />
            </Grid>
          ))
        ) : (
          <Grid item>
            <Typography>There is no item in list</Typography>
          </Grid>
        )}
      </Grid>

      <Grid item container>
        <Button variant="text" color="primary" onClick={() => createItemBtn()}>
          Create Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default List;
