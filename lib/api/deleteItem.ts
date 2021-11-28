import { Del } from "../../pages/api/user/[userId]/[listId]";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function handler(userId: string, listId: string, itemIndex: number) {

  return await apiFunctionHelper<Del>(
    {
      method: "DELETE",
      url: `api/user/${userId}/${listId}`,
      data: { itemIndex }
    }
  );
}