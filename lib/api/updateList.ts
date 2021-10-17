import { ListSchema } from '../schema/ListSchema';
import apiMiddleware from '../apiMiddleware';

/**
 * 
 * @param userId; target user id.
 * @param listId; target list id. 
 * @param prop; target prop in list. 
 * @param data 
 * @returns 
 */
export default async function updateList(
  userId: string,
  listId: string,
  prop: "listName" | "itemArray",
  data: string
) {

  return await apiMiddleware<ListSchema>({
    method: 'PATCH',
    url: `api/user/${userId}/${listId}`,
    data: { prop, data },
    params: {}
  });
}