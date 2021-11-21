import { ItemSchema } from "../schema/ItemSchema";
import apiFunctionHelper from "../apiFunctionHelper";

/**
 * Updates List's ItemArray by appending a new item to it.
 */
export default async function createItem(userId: string, listId: string, itemName: string) {

  return await apiFunctionHelper<ItemSchema[]>({
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