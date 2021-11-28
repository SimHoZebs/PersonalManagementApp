import { useRef, useState, useContext } from "react";

//components
import { Skeleton, Typography, Container, IconButton } from "@mui/material";
import ModeEdit from "@mui/icons-material/ModeEdit";
import Save from "@mui/icons-material/Save";
import CustomTextField from "./CustomTextField";

//etc
import updateList from "../api/updateList";
import isLoaded from "../isLoaded";
import { UserContext } from "../../pages/user/[userId]";

interface Props {
  listId: string;
  currListName: string | undefined;
  description: string | undefined;
  setCurrListName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ListHeader = (props: Props) => {
  const user = useContext(UserContext);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  async function saveTitle() {
    if (isLoaded<string>(props.currListName)) {
      setEditingTitle(false);

      const updateListRes = await updateList(
        user?._id,
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
        user?._id,
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
    <>
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
            className="text-3xl"
            ref={titleRef}
            placeholder="Type List Name Here"
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
            ref={descRef}
            onFocus={editDesc}
            onBlur={saveDesc}
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />
        ) : (
          <Skeleton variant="text" width="100%" height={40} />
        )}
      </Container>
    </>
  );
};

export default ListHeader;
