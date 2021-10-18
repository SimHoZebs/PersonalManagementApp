import React, { useState, useEffect, MouseEvent, useRef } from "react";

//components
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import ItemCard from "./ItemCard";
import IconButton from "@mui/material/IconButton";

//api & schemas
import { ItemSchema } from "../schema/ItemSchema";
import createItem from "../api/createItem";
import updateItem from "../api/updateItem";
import deleteItem from "../api/deleteItem";

interface Props {
  item: ItemSchema;
  itemIndex: number;
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>;
  setCreatingItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
  listId: string;
  deleteItemBtn: (itemIndex: number) => Promise<void>;
}

/**
 *@note isNewItem may seem unnecessary with creatingItem in List component, but it makes sure only last item of array behaves as a new item.
 * This is needed as existing items can behave like new items if user clicks away while creating new item.
 */
const Item = (props: Props) => {
  const [{ itemName, userId, _id }, setItem] = useState<ItemSchema>(props.item);
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [newItemName, setNewItemName] = useState(itemName);
  const textFieldRef = useRef<HTMLDivElement | null>(null);

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
  async function onBlur() {
    props.setCreatingItem((prev) => false);

    if (newItemName === "") {
      //If new title is empty, do not save the item
      if (props.isNewItem) {
        props.setItemArray((prev) =>
          prev.filter((item, index) => index !== props.itemIndex)
        );
      } else {
        const updatedItemArray = await deleteItem(
          userId,
          props.listId,
          props.itemIndex
        );
        if (typeof updatedItemArray === "string") {
          console.log(updatedItemArray);
          return;
        }

        props.setItemArray(updatedItemArray);
      }
    } else if (newItemName !== itemName) {
      //if new title isn't empty and it's diff from the old one, save the item
      const updatedItemArray = props.isNewItem
        ? await createItem(userId, props.listId, newItemName)
        : await updateItem(userId, props.listId, props.itemIndex, newItemName);
      if (typeof updatedItemArray === "string") {
        console.log(updatedItemArray);
        return;
      }

      props.setItemArray(updatedItemArray);
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
          sx={{
            paddingX: "15px",
            paddingY: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => setItemCardOpen(true)}
        >
          <TextField
            ref={textFieldRef}
            variant="outlined"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onClick={handleOnClick}
            onBlur={onBlur}
          />

          <IconButton
            onClick={() => props.deleteItemBtn(props.itemIndex)}
            sx={{}}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
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
