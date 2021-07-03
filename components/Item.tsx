import React, { useState, useEffect, MouseEvent } from "react";
import { Grid, Backdrop, Paper, TextField } from "@material-ui/core";
import useStyles from "../styles/Item";

//components
import ItemCard from "./ItemCard";

interface props {
  title: string;
}

/**
 *@description Representation of an item in a list. Clicking it opens Item Card.
 *@param props - title and setItemList
 */
const Item = (props: props) => {
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const styles = useStyles();

  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
  }

  return (
    <>
      <Grid item xs={12} className={styles.root}>
        <Paper
          className={styles.actionArea}
          onClick={() => setItemCardOpen(true)}
        >
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={handleOnClick}
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
