import React from "react";
import { Grid, Typography, Paper, Container } from "@material-ui/core";
import useStyles from "../styles/ListItem";

const ListItem = () => {
  const styles = useStyles();

  return (
    <Grid item xs={12} className={styles.root}>
      <Paper>
        <Container className={styles.content}>
          <Typography>List Item Title</Typography>
        </Container>
      </Paper>
    </Grid>
  );
};

export default ListItem;
