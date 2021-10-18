import apiFunctionMiddleware from "../apiFunctionMiddleware";
import { ItemSchema } from "../schema/ItemSchema";

export default async function handler(userId: string, listId: string, itemIndex: number) {

  return await apiFunctionMiddleware<ItemSchema[]>(
    {
      method: "DELETE",
      url: `api/user/${userId}/${listId}`,
      data: { itemIndex }
    }
  );
}