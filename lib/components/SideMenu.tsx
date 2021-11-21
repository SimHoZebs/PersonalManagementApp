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

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import isLoaded from "../isLoaded";
import readFirebaseConfig from "../api/connectToFirebase";
import { initializeApp } from "firebase/app";

interface Props {
  currListName: string | undefined;
}

const SideMenu = (props: Props) => {
  async function authentication() {
    try {
      const firebaseConfig = await readFirebaseConfig();
      if (typeof firebaseConfig === "string") {
        console.log(firebaseConfig);
        return;
      }
      const app = initializeApp(firebaseConfig);

      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token);
      console.log(user);
    } catch (error: any) {
      console.log(error);
    }
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

        <Button
          startIcon={<GoogleIcon />}
          variant="outlined"
          onClick={authentication}
        >
          Login
        </Button>
      </Container>
    </Paper>
  );
};

export default SideMenu;
