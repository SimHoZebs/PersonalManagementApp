import { Button, Container, Typography, Grid } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import dbConnect from "../dbConnect";
import { useStyles } from "../styles/index";

//components
import ListItem from "../components/ListItem";

interface props {
  taskList: Object;
}

export default function Home(props: props) {
  const styles = useStyles();
  console.log(props.taskList);

  return (
    <Container className={styles.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">To do list title</Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary">
            New Task
          </Button>
        </Grid>

        <Grid item>
          <Typography variant="h6">List group</Typography>
        </Grid>

        <Grid item>
          <Grid container spacing={1}>
            <ListItem />
            <ListItem />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  dbConnect();
  const res = await axios.get("http://localhost:3000/api");
  const taskList = res.data.taskList;

  return {
    props: { taskList },
  };
};
