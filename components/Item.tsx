import React, { useState, useEffect, MouseEvent, useRef } from "react";
import { Grid, Backdrop, Paper, TextField } from "@material-ui/core";

//components
import ItemCard from "./ItemCard";

//interfaces
import { ItemSchema } from "../schema/ItemSchema";
import createItem from "../lib/api/createItem";
import updateItem from "../lib/api/updateItem";

interface Props {
  item: ItemSchema;
  index: number;
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>;
  setCreatingItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
}

/**
 *@note isNewItem may seem unnecessary with creatingItem in List component, but it makes sure only last item of array behaves as a new item.
 * This is needed as existing items can behave like new items if user clicks away while creating new item.
 */
const Item = (props: Props) => {
  const [{ itemName, userId, listId }, setItem] = useState<ItemSchema>(
    props.item
  );
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [newItemName, setNewItemName] = useState(itemName);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("props.item updated", props.index);
    setItem(props.item);
  }, [props.index, props.item]);

  /**
   * prevents click on textField from opening ItemCard
   */
  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
  }

  /**
   * When user clicks away from item textField.
   * Creates new item if it's new, or updates existing item.
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
      const res = props.isNewItem
        ? await createItem(userId, listId, newItemName)
        : await updateItem(userId, newItemName);

      //is there more efficient way of setting a new array
      props.setItemArray((prev) => {
        console.log("itemarray updating...");
        const newArray = [...prev, res.data.res] as ItemSchema[];
        newArray.splice(newArray.length - 2, 1);
        return newArray;
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
