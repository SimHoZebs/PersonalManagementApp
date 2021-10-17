import { ItemSchema } from "../schema/ItemSchema";
import apiMiddleware from "../apiMiddleware";

/**
 * 
 * @param userId 
 * @param listId 
 * @param itemName 
 * @returns 
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