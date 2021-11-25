import { useState, useEffect, useRef, useCallback } from "react";

//components
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Grid, Paper, TextField, IconButton } from "@mui/material";

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
  const textFieldRef = useRef<HTMLDivElement | null>(null);

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
    <Grid item xs={12} sx={{ padding: 0 }}>
      <Paper
        component="div"
        sx={{
          paddingX: 2,
          paddingY: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          columnGap: 1,
        }}
      >
        <TextField
          ref={textFieldRef}
          variant="outlined"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onBlur={() => {
            onBlur(userId, itemName, newItemName, props);
          }}
        />

        <IconButton
          onClick={() =>
            deleteItemBtn(
              userId,
              props.listId,
              props.itemIndex,
              props.setItemArray
            )
          }
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default Item;
