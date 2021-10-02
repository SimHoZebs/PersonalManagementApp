import React, { useState, useEffect, MouseEvent, useRef } from "react";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

//components
import ItemCard from "./ItemCard";

//interfaces
import { ItemSchema } from "../schema/ItemSchema";
import createItem from "../api/createItem";
import updateItem from "../api/updateItem";

interface Props {
  item: ItemSchema;
  index: number;
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>;
  setCreatingItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
  listId: string;
}

/**
 *@note isNewItem may seem unnecessary with creatingItem in List component, but it makes sure only last item of array behaves as a new item.
 * This is needed as existing items can behave like new items if user clicks away while creating new item.
 */
const Item = (props: Props) => {
  const [{ itemName, userId, _id: itemId }, setItem] = useState<ItemSchema>(
    props.item
  );
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [newItemName, setNewItemName] = useState(itemName);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  /**
   * prevents click on textField from opening ItemCard
   */
  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
  }

  /**
   * When user clicks away from item textField.
   * Creates new item if it's new, or updates existing item.
   * Add or update item to list.
   */
  async function handleOnBlur() {
    props.setCreatingItem((prev) => false);

    if (newItemName === "") {
      //If new title is empty, do not save the item
      props.setItemArray((prev) =>
        prev.filter((item, index) => index !== props.index)
      );
    } else if (newItemName !== itemName) {
      //if new title isn't empty and it's diff from the old one, save the item
      const updatedItemArray = props.isNewItem
        ? await createItem(userId, props.listId, newItemName)
        : await updateItem(userId, props.listId, props.index, newItemName);

      props.setItemArray((prev) => {
        if (typeof updatedItemArray === "string") {
          console.log(updatedItemArray);
          return prev;
        }

        return [...updatedItemArray];
      });
    }
  }

  //automatic itemName textField focus on creation.
  //isNewItem boolean prevents existing items from being focused
  useEffect(() => {
    if (props.isNewItem) {
      const textFieldRootClass =
        textFieldRef.current?.querySelector<HTMLDivElement>(
          ".MuiInputBase-root"
        );

      textFieldRootClass?.click();
    }
  }, [props.isNewItem]);

  return (
    <>
      <Grid item xs={12} sx={{ padding: 0 }}>
        <Paper
          component="div"
          ref={paperRef}
          sx={{
            paddingX: "15px",
            paddingY: "20px",
          }}
          onClick={() => setItemCardOpen(true)}
        >
          <TextField
            ref={textFieldRef}
            variant="outlined"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Backdrop
          open={itemCardOpen}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          onClick={() => setItemCardOpen(false)}
        >
          <ItemCard title={itemName} />
        </Backdrop>
      </Grid>
    </>
  );
};

export default Item;
