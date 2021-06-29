import React, { useState, useEffect } from "react";
import {
  Grid,
  Backdrop,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";
import useStyles from "../styles/ListItem";

//components
import ItemCard from "./ItemCard";

interface props {
  title: string;
}

const ListItem = (props: props) => {
  /*ListItem is the representation of an item in a list. Clicking it opens Item Card, which is described in its script.
   */
  const [itemCardOpen, setItemCardOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const styles = useStyles();

  return (
    <>
      <Grid item xs={12} className={styles.root}>
        <Card>
          <CardActionArea
            className={styles.actionArea}
            onClick={() => setItemCardOpen(true)}
          >
            <Typography>{title}</Typography>
          </CardActionArea>
        </Card>
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

export default ListItem;
