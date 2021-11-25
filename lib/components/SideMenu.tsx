import { useRouter } from "next/router";
import { useCallback } from "react";

//components
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Paper,
  Skeleton,
} from "@mui/material";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Brand from "./Brand";

import isLoaded from "../isLoaded";
interface Props {
  currListName: string | undefined;
}

const SideMenu = (props: Props) => {
  const router = useRouter();
  const login = useCallback(async () => {
    const user = await (await import("../functions/authentication")).default();
    if (typeof user === "string") {
      console.log(user);
      return;
    }
    router.push(`/user/${user._id}`);
  }, [router]);

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
        disableGutters
      >
        <Container disableGutters>
          <Container sx={{ pb: 3 }}>
            <Brand />
          </Container>

          <List>
            <ListItem disablePadding>
              {isLoaded(props.currListName) ? (
                <ListItemButton sx={{ columnGap: 1 }}>
                  <ListAltOutlined />

                  <ListItemText
                    primary={props.currListName}
                    sx={{ textAlign: "left" }}
                  />
                </ListItemButton>
              ) : (
                <Skeleton variant="rectangular" width="100%" height={32} />
              )}
            </ListItem>
          </List>
        </Container>

        <Button startIcon={<GoogleIcon />} variant="outlined" onClick={login}>
          Login
        </Button>
      </Container>
    </Paper>
  );
};

export default SideMenu;
