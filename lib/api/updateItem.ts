import { ItemSchema } from '../schema/ItemSchema';
import apiFunctionMiddleware from '../apiFunctionMiddleware';

export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  return await apiFunctionMiddleware<ItemSchema[]>(
    {
      method: "PATCH",
      url: `api/user/${userId}/${listId}`,
      data: { itemIndex, newItemName },
    }
  );
}