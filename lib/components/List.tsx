import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Item from "./Item";
import { ItemSchema } from "../schema/ItemSchema";
import readList from "../api/readList";
import { Typography } from "@material-ui/core";

interface Props {
  userId: string;
  listId: string;
}

export default function List({ userId, listId }: Props) {
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingItem, setCreatingItem] = useState(false);

  function createItemBtn() {
    const newItem = {
      itemName: "",
      userId,
      listId,
    } as ItemSchema;

    setItemArray((prev) => [...prev, newItem]);
    setCreatingItem((prev) => true);
  }

  useEffect(() => {
    async function initList() {
      const readListRes = await readList(userId, listId);
      if (typeof readListRes === "string") {
        console.log(readListRes);
        return;
      }

      setItemArray((prev) => readListRes.itemArray);
    }

    initList();
  }, [userId, listId]);

  return (
    <Grid container>
      <Grid item container spacing={1}>
        {itemArray.length !== 0 ? (
          itemArray.map((item, index) => (
            <Grid item key={index} xs={12}>
              <Item
                item={item}
                index={index}
                setItemArray={setItemArray}
                listId={listId}
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
}
