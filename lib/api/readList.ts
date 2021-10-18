import { ListSchema } from "../schema/ListSchema";
import apiFunctionMiddleware from "../apiFunctionMiddleware";

export default async function readList(userId: string, listId: string) {

  return await apiFunctionMiddleware<ListSchema>({
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  });
}