import React, { useEffect, useState } from "react";

// components
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Item from "./Item";
import TextFieldInvisible from "./TextFieldInvisible";

//api & schemas
import { ItemSchema } from "../schema/ItemSchema";
import readList from "../api/readList";
import updateList from "../api/updateList";
import deleteItem from "../api/deleteItem";

interface Props {
  userId: string;
  listId: string;
  currListName: string;
  setCurrListName: React.Dispatch<React.SetStateAction<string>>;
}

const List = (props: Props) => {
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [creatingItem, setCreatingItem] = useState(false);

  /**
   * Readies list to respond accoridngly to new item interaction.
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

  async function deleteItemBtn(itemIndex: number) {
    const deleteItemRes = await deleteItem(
      props.userId,
      props.listId,
      itemIndex
    );
    if (typeof deleteItemRes === "string") {
      console.log(deleteItemRes);
    } else {
      setItemArray(deleteItemRes);
    }
  }

  async function saveListName(listName: string) {
    const updateListRes = await updateList(
      props.userId,
      props.listId,
      "listName",
      props.currListName
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
      props.setCurrListName(readListRes.listName);
    }

    initList();
  }, [props.userId, props.listId]);

  return (
    <Grid item container spacing={1} direction="column">
      <Grid item container spacing={2}>
        <Grid item xs={9}>
          <TextFieldInvisible
            value={props.currListName}
            onChange={(e) => props.setCurrListName(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item alignSelf="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => saveListName(props.currListName)}
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
                itemIndex={index}
                setItemArray={setItemArray}
                listId={props.listId}
                setCreatingItem={setCreatingItem}
                deleteItemBtn={deleteItemBtn}
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
