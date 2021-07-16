import React, { useState, useEffect, MouseEvent, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { Grid, Backdrop, Paper, TextField } from "@material-ui/core";
import useStyles from "../styles/Item";

//components
import ItemCard from "./ItemCard";

//interfaces
import { IItemModel } from "../schema/ItemSchema";
import { IPostReq, IGetRes as IGetResItem } from "../pages/api/item";
import {
  IPatchReq,
  IGetRes as IGetResObjId,
} from "../pages/api/item/[objectId]";

interface props {
  index: number;
  item: IItemModel;
  setItemList: React.Dispatch<React.SetStateAction<IItemModel[]>>;
  setCreatingNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
}

/**
 *@description Representation of an item in a list. Clicking it opens Item Card.
 *@param props - title and setItemList
 */
const Item = (props: props) => {
  const [{ title, _id }, setItem] = useState<IItemModel>(props.item);
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef();
  const styles = useStyles();

  useEffect(() => {
    console.log("props.item updated", props.index);
    setItem(props.item);
  }, [props.index, props.item]);

  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
  }

  async function handleOnBlur() {
    props.setCreatingNewItem((prev) => false);

    if (newTitle === "") {
      //If new title is empty, do not save the item
      props.setItemList((prev) =>
        prev.filter((item, index) => index !== props.index)
      );
    } else if (newTitle !== title) {
      //if new title isn't empty and it's diff from the old one, save the item
      const req: IPostReq | IPatchReq = props.isNewItem
        ? {
            method: "post",
            url: `/api/item`,
            data: { newItem: { title: newTitle, groups: [] } },
          }
        : {
            method: "patch",
            url: `api/item/${_id}`,
            data: { newTitle: newTitle },
          };

      const res: AxiosResponse<IGetResItem | IGetResObjId> = await axios(req);

      //is there more efficient way of setting a new list
      props.setItemList((prev) => {
        console.log("itemlist updating...");
        const newList = [...prev, res.data.res] as IItemModel[];
        newList.splice(newList.length - 2, 1);
        return newList;
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
      <Grid item xs={12} className={styles.root}>
        <Paper
          ref={paperRef}
          className={styles.actionArea}
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
          className={styles.backdrop}
          onClick={() => setItemCardOpen(false)}
        >
          <ItemCard title={title} />
        </Backdrop>
      </Grid>
    </>
  );
};

export default Item;
