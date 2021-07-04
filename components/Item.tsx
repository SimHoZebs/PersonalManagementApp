import React, { useState, useEffect, MouseEvent, useRef } from "react";
import axios from "axios";
import { Grid, Backdrop, Paper, TextField } from "@material-ui/core";
import useStyles from "../styles/Item";
import { Types } from "mongoose";

//components
import ItemCard from "./ItemCard";
import { IItemSchema } from "../schema/ItemSchema";

interface props {
  title: string;
  index: number;
  setItemList: React.Dispatch<React.SetStateAction<IItemSchema[]>>;
  setCreatingNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
  objectId: Types.ObjectId | undefined;
}

/**
 *@description Representation of an item in a list. Clicking it opens Item Card.
 *@param props - title and setItemList
 */
const Item = (props: props) => {
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const textFieldRef = useRef<HTMLDivElement | null | undefined>(null);
  const styles = useStyles();

  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
  }

  async function handleOnBlur() {
    console.log("text field blured");
    props.setCreatingNewItem((prev) => false);

    if (title === "") {
      console.log("removing item");

      props.setItemList((prev) =>
        prev.filter((item, index) => index !== props.index)
      );
    } else {
      const newItem: IItemSchema = {
        title: title,
        groups: [],
      };

      //put request doesn't work yet!
      const res = props.isNewItem
        ? await axios.post("api/item", newItem)
        : await axios.put("api/item", newItem);

      props.setItemList((prev) => {
        prev[prev.length - 1] = res.data.res;
        return prev;
      });
    }
  }

  useEffect(() => {
    console.log(
      "isNewItem updated, useEffect runing on Item index ",
      props.index
    );

    if (props.isNewItem) {
      const textFieldRootClass =
        textFieldRef.current?.querySelector<HTMLDivElement>(
          ".MuiInputBase-root"
        );

      textFieldRootClass?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid item xs={12} className={styles.root}>
        <Paper
          className={styles.actionArea}
          onClick={() => setItemCardOpen(true)}
        >
          <TextField
            ref={textFieldRef}
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
