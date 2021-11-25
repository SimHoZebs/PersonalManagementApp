import createItem from "../api/createItem";
import deleteItem from "../api/deleteItem";
import updateItem from "../api/updateItem";
import { ItemSchema } from "../schema/ItemSchema";
import { Props } from "./Item";

export async function onBlur(userId: string, itemName: string, newItemName: string, props: Props,) {
  props.setCreatingItem((prev) => false);

  if (newItemName === "") {
    //If new title is empty, do not save the item
    if (props.isNewItem) {
      props.setItemArray((prev) =>
        prev.filter((item, index) => index !== props.itemIndex)
      );
    } else {
      const updatedItemArray = await deleteItem(
        userId,
        props.listId,
        props.itemIndex
      );
      if (typeof updatedItemArray === "string") {
        console.log(updatedItemArray);
        return;
      }

      props.setItemArray(updatedItemArray);
    }
  } else if (newItemName !== itemName) {
    //if new title isn't empty and it's diff from the old one, save the item
    const updatedItemArray = props.isNewItem
      ? await createItem(userId, props.listId, newItemName)
      : await updateItem(userId, props.listId, props.itemIndex, newItemName);
    if (typeof updatedItemArray === "string") {
      console.log(updatedItemArray);
      return;
    }

    props.setItemArray(updatedItemArray);
  }
}

export async function deleteItemBtn(
  userId: string,
  listId: string,
  itemIndex: number,
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>
) {
  const deleteItemRes = await deleteItem(userId, listId, itemIndex);
  if (typeof deleteItemRes === "string") {
    console.log(deleteItemRes);
  } else {
    setItemArray(deleteItemRes);
  }
}
