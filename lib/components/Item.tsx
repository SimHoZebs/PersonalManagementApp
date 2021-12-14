import { useState, useEffect, useRef } from "react";

//components
import CustomTextField from "./CustomTextField";
import StatusButton from "./StatusButton";
import SelectDateButton from "./SelectDateButton";
import PriorityButton from "./PriorityButton";
import MoreOptionsButton from "./MoreOptionsButton";

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
  const [itemTitle, setItemTitle] = useState(item.title);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  async function onBlur() {
    props.setCreatingItem((prev) => false);

    if (itemTitle === "") {
      //If item title is empty, do not save the item
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
        if (!(updatedItemArray instanceof Error)) {
          props.setItemArray(updatedItemArray);
        }
      }
    } else if (itemTitle !== item.title) {
      //if item title isn't empty and diff from the old one, save the item
      const updatedItemArray = props.isNewItem
        ? await createItem(item.userId, props.listId, itemTitle)
        : ((await updateItem(
            item.userId,
            props.listId,
            props.itemIndex,
            itemTitle
          )) as ItemSchema[] | Error);
      if (!(updatedItemArray instanceof Error)) {
        props.setItemArray(updatedItemArray);
      }
    }
  }

  async function deleteItemBtn() {
    const deleteItemRes = await deleteItem(
      item.userId,
      props.listId,
      props.itemIndex
    );
    if (!(deleteItemRes instanceof Error)) {
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
    <div className="p-2 flex items-center justify-between gap-x-3 bg-dark-400 rounded text-gray-200">
      <StatusButton />
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center">
          <CustomTextField
            ref={textFieldRef}
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            onBlur={onBlur}
          />
          <PriorityButton />
          <MoreOptionsButton />
        </div>
        <SelectDateButton />
      </div>
    </div>
  );
};

export default Item;
