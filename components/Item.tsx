import React, { useState, useEffect, MouseEvent, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { Grid, Backdrop, Paper, TextField } from "@material-ui/core";

//components
import ItemCard from "./ItemCard";

//interfaces
import { ItemSchema } from "../schema/ItemSchema";
import { CreateItem, CreateItemRes } from "../pages/api/item";
import { UpdateItem, UpdateItemRes } from "../pages/api/item/[objectId]";

interface props {
  index: number;
  item: ItemSchema;
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>;
  setCreatingItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
}

/**
 *@description Representation of an item in a array. Clicking it opens Item Card.
 *@param props - title and setItemArray
 */
const Item = (props: props) => {
  const [{ title, _id }, setItem] = useState<ItemSchema>(props.item);
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("props.item updated", props.index);
    setItem(props.item);
  }, [props.index, props.item]);

  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
  }

  async function handleOnBlur() {
    props.setCreatingItem((prev) => false);

    if (newTitle === "") {
      //If new title is empty, do not save the item
      props.setItemArray((prev) =>
        prev.filter((item, index) => index !== props.index)
      );
    } else if (newTitle !== title) {
      //if new title isn't empty and it's diff from the old one, save the item
      const req: CreateItem | UpdateItem = props.isNewItem
        ? {
            method: "post",
            url: `/api/item`,
            data: { newItem: { title: newTitle, labelIdArray: [] } },
          }
        : {
            method: "patch",
            url: `api/item/${_id}`,
            data: { newTitle: newTitle },
          };

      const res: AxiosResponse<CreateItemRes | UpdateItemRes> = await axios(
        req
      );
      //is there more efficient way of setting a new array
      props.setItemArray((prev) => {
        console.log("itemarray updating...");
        const newArray = [...prev, res.data.res] as ItemSchema[];
        newArray.splice(newArray.length - 2, 1);
        return newArray;
      });
    }
  }

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
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
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
          <ItemCard title={title} />
        </Backdrop>
      </Grid>
    </>
  );
};

export default Item;
