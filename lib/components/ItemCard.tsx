import React, { useState } from "react";
import {
  Backdrop,
  Card,
  Typography,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";

interface props {
  title: string;
}

const ItemCard = (props: props) => {
  const [title, setTitle] = useState(props.title);

  function handleDetailedCardClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Card
          sx={{ height: "85vh" }}
          onClick={(e) => handleDetailedCardClick(e)}
        >
          <Grid item xs={12} sx={{ padding: "15px" }} container>
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
