import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Item from "./Item";
import readAllItem from "../lib/api/readAllItem";
import { ItemSchema } from "../schema/ItemSchema";

interface Props {
  userId: string;
  listId: string;
}

export default function List(props: Props) {
  const [{ userId, listId }, setProps] = useState(props);
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingItem, setCreatingItem] = useState(false);

  function createItemBtn() {
    const newItem = {
      itemName: "",
      userId,
      listId,
      labelIdArray: [],
    } as ItemSchema;

    setItemArray((prev) => [...prev, newItem]);
    setCreatingItem((prev) => true);
  }

  useEffect(() => {
    async function initList() {
      const itemArrayRes = await readAllItem(userId, listId).then(
        (res) => res.data
      );
      if (!itemArrayRes.success) {
        console.log(itemArrayRes.error);
        return;
      }

      setItemArray((prev) => itemArrayRes.res);
    }

    initList();
  }, [userId, listId]);

  return (
    <Grid container>
      <Grid item container spacing={1}>
        {itemArray.map((item, index) => (
          <Grid item key={index} xs={12}>
            <Item
              item={item}
              index={index}
              setItemArray={setItemArray}
              setCreatingItem={setCreatingItem}
              isNewItem={
                creatingItem && index === itemArray.length - 1 ? true : false
              }
            />
          </Grid>
        ))}
      </Grid>

      <Grid item container>
        <Button variant="text" color="primary" onClick={() => createItemBtn()}>
          Create Item
        </Button>
      </Grid>
    </Grid>
  );
}
