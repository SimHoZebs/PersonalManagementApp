import { ItemSchema } from "../schema/ItemSchema";
import apiMiddleware from "../apiMiddleware";

/**
 * Updates List's ItemArray by appending a new item to it.
 */
export default async function createItem(userId: string, listId: string, itemName: string) {

  return await apiMiddleware<ItemSchema[]>({
    method: "post",
    url: `api/user/${userId}/${listId}`,
    data: {
      newItem: {
        itemName,
        labelIdArray: [],
        userId,
        listId
      }
    },
  });

}