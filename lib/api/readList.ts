import { ListSchema } from "../schema/ListSchema";
import apiMiddleware from "../apiMiddleware";

export default async function readList(userId: string, listId: string) {

  return await apiMiddleware<ListSchema>({
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  });
}