import { useState } from "react";

//components
import Container from "@mui/material/Container";
import CustomTextField from "./CustomTextField";
import IconButton from "@mui/material/IconButton";
import updateList from "../api/updateList";
import Divider from "@mui/material/Divider";
import ModeEdit from "@mui/icons-material/ModeEdit";
import Save from "@mui/icons-material/Save";

interface Props {
  userId: string;
  listId: string;
  currListName: string;
  description: string;
  setCurrListName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ListHeader = (props: Props) => {
  //true for now for production
  const [isNameEditMode, setIsNameEditMode] = useState(true);

  async function saveListName() {
    // setIsNameEditMode(false);

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

  function editListName() {
    setIsNameEditMode(() => true);
    //click textField
  }

  return (
    <Container disableGutters sx={{ pt: 2, pb: 2 }}>
      <Container
        disableGutters
        sx={{ display: "flex", textAlign: "left", alignItems: "center" }}
      >
        {isNameEditMode ? (
          <IconButton onClick={saveListName}>
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={editListName}>
            <ModeEdit />
          </IconButton>
        )}
        <CustomTextField
          // disabled={!isNameEditMode}
          placeholder="Type List Name Here"
          typography="h3"
          value={props.currListName}
          onChange={(e) => props.setCurrListName(e.target.value)}
        />
      </Container>

      <CustomTextField
        placeholder="Add a description (description does not save yet!)"
        typography="subtitle"
        multiline
        fullWidth
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
      />
      <Divider />
    </Container>
  );
};

export default ListHeader;
