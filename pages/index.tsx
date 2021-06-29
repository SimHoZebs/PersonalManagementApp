import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Grid,
  Backdrop,
} from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import dbConnect from "../dbConnect";
import { useStyles } from "../styles/index";

//components
import Item from "../components/Item";
import ItemCard from "../components/ItemCard";

//interface
import IItemSchema from "../interface/IItemSchema";

interface props {
  itemList: IItemSchema[];
}

export default function Home(props: props) {
  const styles = useStyles();
  const [createItemCardOpen, setCreateItemCardOpen] = useState(false);

  function handleCreateItem() {
    setCreateItemCardOpen(true);
  }

  return (
    <Container className={styles.root}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Item list title</Typography>
        </Grid>

        <Grid item container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateItem()}
          >
            New Item
          </Button>

          <Backdrop
            open={createItemCardOpen}
            onClick={() => setCreateItemCardOpen(false)}
            className={styles.backdrop}
          >
            <ItemCard title={""} />
          </Backdrop>
        </Grid>

        <Grid item>
          <Typography variant="h6">Item list group</Typography>
        </Grid>

        <Grid item container>
          <Grid item container spacing={1}>
            <Item title={"Example list item title"} />
            {props.itemList.map((item: IItemSchema, index: number) => (
              <Grid item xs={12} key={index}>
                <Item title={item.title} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  dbConnect();
  const res = await axios.get("http://localhost:3000/api");
  const itemList = res.data.itemList;

  return {
    props: { itemList },
  };
};
