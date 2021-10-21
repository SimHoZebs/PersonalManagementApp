import Link from "next/link";

import { ListAltOutlined } from "@mui/icons-material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import React from "react";
import Brand from "./Brand";
import { useRouter } from "next/router";

interface Props {
  currListName: string;
}

const SideMenu = (props: Props) => {
  const router = useRouter();

  function logoutBtn() {
    router.push("/");
  }

  return (
    <Paper elevation={3} sx={{ height: "100vh", pt: 2, pb: 2 }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Container sx={{ pl: { xs: 0 }, pr: { xs: 0 } }}>
          <Container sx={{ pb: 3 }}>
            <Brand />
          </Container>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListAltOutlined />
                <ListItemText
                  primary={props.currListName}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Container>
        <Button
          variant="outlined"
          endIcon={<LogoutOutlined />}
          onClick={logoutBtn}
        >
          log out
        </Button>
      </Container>
    </Paper>
  );
};

export default SideMenu;
