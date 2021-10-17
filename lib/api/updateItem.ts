import { ItemSchema } from '../schema/ItemSchema';
import apiMiddleware from '../apiMiddleware';


export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  return await apiMiddleware<ItemSchema[]>({
    method: "PATCH",
    url: `api/user/${userId}/${listId}`,
    data: { itemIndex, newItemName },
  });
}