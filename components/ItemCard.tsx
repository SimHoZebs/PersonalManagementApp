import React, { useState } from "react";
import {
  Backdrop,
  Card,
  Typography,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";

import useStyles from "../styles/ItemCard";

interface props {
  title: string;
}

const ItemCard = (props: props) => {
  const [title, setTitle] = useState(props.title);
  const styles = useStyles();

  function handleDetailedCardClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Card
          className={styles.card}
          onClick={(e) => handleDetailedCardClick(e)}
        >
          <Grid item xs={12} className={styles.cardContent} container>
            <TextField
              variant="outlined"
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ItemCard;
