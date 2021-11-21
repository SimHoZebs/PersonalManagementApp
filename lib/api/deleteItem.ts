import apiFunctionHelper from "../apiFunctionHelper";
import { ItemSchema } from "../schema/ItemSchema";

export default async function handler(userId: string, listId: string, itemIndex: number) {

  return await apiFunctionHelper<ItemSchema[]>(
    {
      method: "DELETE",
      url: `api/user/${userId}/${listId}`,
      data: { itemIndex }
    }
  );
}