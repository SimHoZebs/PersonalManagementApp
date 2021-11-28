import apiFunctionHelper from '../apiFunctionHelper';
import { Patch } from '../../pages/api/user/[userId]/[listId]';

export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  return await apiFunctionHelper<Patch>(
    {
      method: "PATCH",
      url: `api/user/${userId}/${listId}`,
      data: { itemIndex, newItemName },
    }
  );
}