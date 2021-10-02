import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface Props {
  title: string;
}

const ItemCard = (props: Props) => {
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
