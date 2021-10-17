import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Item from "./Item";
import { ItemSchema } from "../schema/ItemSchema";
import readList from "../api/readList";
import updateList from "../api/updateList";
import TextFieldInvisible from "./TextFieldInvisible";

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

  async function saveListName(listName: string) {
    const updateListRes = await updateList(
      props.userId,
      props.listId,
      "listName",
      listName
    );
    if (typeof updateListRes === "string") {
      console.log(updateListRes);
    }
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
    <Grid container spacing={1} direction="column">
      <Grid item container spacing={2}>
        <Grid item xs={9}>
          <TextFieldInvisible
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item alignSelf="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => saveListName(listName)}
          >
            Save
          </Button>
        </Grid>
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
