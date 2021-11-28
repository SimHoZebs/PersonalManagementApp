import apiFunctionHelper from "../apiFunctionHelper";
import { Get } from "../../pages/api/user/[userId]/[listId]";

export default async function readList(userId: string, listId: string) {

  return await apiFunctionHelper<Get>({
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  });
}