import React, { useState } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import dbConnect from "../dbConnect";
import { useStyles } from "../styles/index";

import Group from "../components/Group";

interface props {
  groupList: any[];
}

export default function Home(props: props) {
  const styles = useStyles();
  const [groupList, setGroupList] = useState(props.groupList);

  console.log(props.groupList);

  return (
    <Container className={styles.root}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h4">Item list title</Typography>
        </Grid>

        <Group />
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  dbConnect();
  const groupListGetRes = await axios.get<{ res: any[]; msg: string[] }>(
    "http://localhost:3000/api/group"
  );

  const groupList = groupListGetRes.data.res;

  return {
    props: { groupList },
  };
};
