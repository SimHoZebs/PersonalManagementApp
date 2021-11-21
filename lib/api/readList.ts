import { ListSchema } from "../schema/ListSchema";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function readList(userId: string, listId: string) {

  return await apiFunctionHelper<ListSchema>({
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  });
}