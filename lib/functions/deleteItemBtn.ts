import deleteItem from "../api/deleteItem"
import { ItemSchema } from "../schema/ItemSchema"

export default async function deleteItemBtn(
  userId: string,
  listId: string,
  itemIndex: number,
  setItemArray: React.Dispatch<React.SetStateAction<ItemSchema[]>>
) {
  const deleteItemRes = await deleteItem(userId, listId, itemIndex)
  if (typeof deleteItemRes === "string") {
    console.log(deleteItemRes)
  } else {
    setItemArray(deleteItemRes)
  }
}
