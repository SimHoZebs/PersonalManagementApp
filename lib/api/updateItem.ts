import { ItemSchema } from '../schema/ItemSchema';
import apiFunctionHelper from '../apiFunctionHelper';

export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  return await apiFunctionHelper<ItemSchema[]>(
    {
      method: "PATCH",
      url: `api/user/${userId}/${listId}`,
      data: { itemIndex, newItemName },
    }
  );
}