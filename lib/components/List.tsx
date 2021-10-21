import React, { useEffect, useState } from "react";

// components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Item from "./Item";
import ListHeader from "./ListHeader";

//api & schemas
import { ItemSchema } from "../schema/ItemSchema";
import readList from "../api/readList";
import deleteItem from "../api/deleteItem";
import Container from "@mui/material/Container";

interface Props {
  userId: string;
  listId: string;
  currListName: string;
  setCurrListName: React.Dispatch<React.SetStateAction<string>>;
}

const List = (props: Props) => {
  const [itemArray, setItemArray] = useState<ItemSchema[]>([]);
  const [description, setDescription] = useState("");
  const [creatingItem, setCreatingItem] = useState(false);

  /**
   * Readies list to respond accoridngly to new item interaction.
   * @note For more info, check Item.tsx
   */
  function createItemBtn() {
    const newItem = {
      itemName: "",
      userId: props.userId,
      listId: props.listId,
    } as ItemSchema;

    setItemArray((prev) => [...prev, newItem]);
    setCreatingItem((prev) => true);
  }

  async function deleteItemBtn(itemIndex: number) {
    const deleteItemRes = await deleteItem(
      props.userId,
      props.listId,
      itemIndex
    );
    if (typeof deleteItemRes === "string") {
      console.log(deleteItemRes);
    } else {
      setItemArray(deleteItemRes);
    }
  }

  useEffect(() => {
    async function initList() {
      const readListRes = await readList(props.userId, props.listId);
      if (typeof readListRes === "string") {
        console.log(readListRes);
        return;
      }

      setItemArray((prev) => readListRes.itemArray);
      setDescription(readListRes.description);
      props.setCurrListName(readListRes.listName);
    }

    initList();
  }, [props.userId, props.listId]);

  return (
    <Container disableGutters>
      <ListHeader
        userId={props.userId}
        listId={props.listId}
        description={description}
        setDescription={setDescription}
        setCurrListName={props.setCurrListName}
        currListName={props.currListName}
      />

      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          alignItems: "flex-start",
        }}
      >
        {itemArray.length !== 0 ? (
          itemArray.map((item, index) => (
            <Item
              key={index}
              item={item}
              itemIndex={index}
              setItemArray={setItemArray}
              listId={props.listId}
              setCreatingItem={setCreatingItem}
              deleteItemBtn={deleteItemBtn}
              isNewItem={
                creatingItem && index === itemArray.length - 1 ? true : false
              }
            />
          ))
        ) : (
          <Typography>There is no item in list</Typography>
        )}

        <Button variant="text" color="primary" onClick={createItemBtn}>
          Create Item
        </Button>
      </Container>
    </Container>
  );
};

export default List;
