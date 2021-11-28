import { useState, useEffect, useRef } from "react";

//components
import DeleteIcon from "../icons/DeleteIcon";
import CustomTextField from "./CustomTextField";

//etc
import createItem from "../api/createItem";
import deleteItem from "../api/deleteItem";
import updateItem from "../api/updateItem";
import { ItemSchema } from "../schema/ItemSchema";

export interface Props {
  item: ItemSchema;
  itemIndex: number;
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>;
  setCreatingItem: React.Dispatch<React.SetStateAction<boolean>>;
  isNewItem: boolean;
  listId: string;
}

/**
 *@note isNewItem may seem unnecessary with creatingItem in List component, but it makes sure only last item of array behaves as a new item.
 * This is needed as existing items can behave like new items if user clicks away while creating new item.
 */
const Item = (props: Props) => {
  const item = props.item;
  const [itemName, setItemName] = useState(item.itemName);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  async function onBlur() {
    props.setCreatingItem((prev) => false);

    if (itemName === "") {
      //If new title is empty, do not save the item
      if (props.isNewItem) {
        props.setItemArray((prev) =>
          prev.filter((item, index) => index !== props.itemIndex)
        );
      } else {
        const updatedItemArray = await deleteItem(
          item.userId,
          props.listId,
          props.itemIndex
        );
        if (typeof updatedItemArray === "string") {
          console.log(updatedItemArray);
          return;
        }

        props.setItemArray(updatedItemArray);
      }
    } else if (itemName !== item.itemName) {
      //if new title isn't empty and it's diff from the old one, save the item
      const updatedItemArray = props.isNewItem
        ? await createItem(item.userId, props.listId, itemName)
        : await updateItem(
            item.userId,
            props.listId,
            props.itemIndex,
            itemName
          );
      if (typeof updatedItemArray === "string") {
        console.log(updatedItemArray);
        return;
      }

      props.setItemArray(updatedItemArray);
    }
  }

  async function deleteItemBtn() {
    const deleteItemRes = await deleteItem(
      item.userId,
      props.listId,
      props.itemIndex
    );
    if (typeof deleteItemRes === "string") {
      console.log(deleteItemRes);
    } else {
      props.setItemArray(deleteItemRes);
    }
  }

  /**
   * When user clicks away from item textField.
   * Creates new item if it's new, or updates existing item.
   * Add or update item to list.
   */

  //automatic itemName textField focus on creation.
  //isNewItem boolean prevents existing items from being focused
  useEffect(() => {
    if (props.isNewItem) {
      textFieldRef.current?.focus();
    }
  }, [props.isNewItem]);

  return (
    <div>
      <div className="p-3 flex items-center justify-between gap-x-1 bg-dark-700 rounded">
        <CustomTextField
          ref={textFieldRef}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onBlur={onBlur}
        />

        <button
          className="hover:bg-dark-300 rounded-full p-2"
          onClick={deleteItemBtn}
        >
          <div className="h-6 w-6">
            <DeleteIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Item;
