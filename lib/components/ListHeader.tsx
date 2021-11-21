import { useRef, useState } from "react";
import isLoaded from "../isLoaded";

//components
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomTextField from "./CustomTextField";
import IconButton from "@mui/material/IconButton";
import updateList from "../api/updateList";
import ModeEdit from "@mui/icons-material/ModeEdit";
import Save from "@mui/icons-material/Save";

interface Props {
  userId: string;
  listId: string;
  currListName: string | undefined;
  description: string | undefined;
  setCurrListName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ListHeader = (props: Props) => {
  //true for now for production
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  async function saveTitle() {
    if (isLoaded<string>(props.currListName)) {
      setEditingTitle(false);

      const updateListRes = await updateList(
        props.userId,
        props.listId,
        "listName",
        props.currListName
      );
      if (typeof updateListRes === "string") {
        console.log(updateListRes);
      }
    }
  }

  function editTitle() {
    setEditingTitle(() => true);
    titleRef.current?.focus();
  }

  async function saveDesc() {
    if (isLoaded<string>(props.description)) {
      setEditingDesc(false);

      const updateListRes = await updateList(
        props.userId,
        props.listId,
        "description",
        props.description
      );

      if (typeof updateListRes === "string") {
        console.log(updateListRes);
      }
    }
  }

  async function editDesc() {
    setEditingDesc(() => true);
    descRef.current?.focus();
  }

  return (
    <Container disableGutters>
      <Container
        disableGutters
        sx={{ display: "flex", textAlign: "left", alignItems: "center" }}
      >
        {editingTitle ? (
          <IconButton onClick={saveTitle}>
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={editTitle}>
            <ModeEdit />
          </IconButton>
        )}

        {isLoaded<string>(props.currListName) ? (
          <CustomTextField
            inputRef={titleRef}
            placeholder="Type List Name Here"
            typography="h3"
            onFocus={editTitle}
            onBlur={saveTitle}
            value={props.currListName}
            onChange={(e) => props.setCurrListName(e.target.value)}
          />
        ) : (
          <Typography variant="h3">
            <Skeleton variant="text" width={600} />
          </Typography>
        )}
      </Container>

      <Container
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {editingDesc ? (
          <IconButton onClick={saveDesc}>
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={editDesc}>
            <ModeEdit />
          </IconButton>
        )}

        {isLoaded<string>(props.description) ? (
          <CustomTextField
            placeholder="Add a description"
            inputRef={descRef}
            onFocus={editDesc}
            onBlur={saveDesc}
            typography="subtitle"
            fullWidth
            multiline
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />
        ) : (
          <Skeleton variant="text" width="100%" height={40} />
        )}
      </Container>
    </Container>
  );
};

export default ListHeader;
