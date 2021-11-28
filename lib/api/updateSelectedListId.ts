import apiFunctionHelper from "../apiFunctionHelper";
import { Patch } from "../../pages/api/user/[userId]";

export default async function updateSelectedListId(userId: string, listId: string) {

  return await apiFunctionHelper<Patch>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  });
}