import { useState, useEffect, useRef } from "react";

//components
import DeleteIcon from "../icons/DeleteIcon";
import CustomTextField from "./CustomTextField";

//etc
import { ItemSchema } from "../schema/ItemSchema";
import { onBlur, deleteItemBtn } from "./Item.util";

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
  const [{ itemName, userId }, setItem] = useState<ItemSchema>(props.item);
  const [newItemName, setNewItemName] = useState(itemName);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  /**
   * When user clicks away from item textField.
   * Creates new item if it's new, or updates existing item.
   * Add or update item to list.
   */

  //automatic itemName textField focus on creation.
  //isNewItem boolean prevents existing items from being focused
  useEffect(() => {
    if (props.isNewItem) {
      const textFieldRootClass =
        textFieldRef.current?.querySelector<HTMLDivElement>(
          ".MuiInputBase-root"
        );

      textFieldRootClass?.click();
    }
  }, [props.isNewItem]);

  return (
    <div>
      <div className="p-3 flex items-center justify-between gap-x-1 bg-dark-700 rounded">
        <CustomTextField
          ref={textFieldRef}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onBlur={() => {
            onBlur(userId, itemName, newItemName, props);
          }}
        />

        <button
          className="hover:bg-dark-300 rounded-full p-2"
          onClick={() =>
            deleteItemBtn(
              userId,
              props.listId,
              props.itemIndex,
              props.setItemArray
            )
          }
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
