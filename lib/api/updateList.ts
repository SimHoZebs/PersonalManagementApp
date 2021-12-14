import apiFunctionHelper from '../apiFunctionHelper';
import { Patch } from '../../pages/api/user/[userId]/[listId]';

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
  prop: "listTitle" | "description",
  data: string
) {

  return await apiFunctionHelper<Patch>({
    method: 'PATCH',
    url: `api/user/${userId}/${listId}`,
    data: { prop, data },
    params: {}
  });
}