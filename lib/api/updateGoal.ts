import apiFunctionHelper from '../apiFunctionHelper';
import { Patch } from '../../pages/api/user/[userId]/[goalId]';

/**
 * 
 * @param userId; target user id.
 * @param goalId; target goal id. 
 * @param prop; target prop in goal. 
 * @param data 
 * @returns 
 */
export default async function updateList(
  userId: string,
  goalId: string,
  prop: "goalTitle" | "description",
  data: string
) {

  return await apiFunctionHelper<Patch>({
    method: 'PATCH',
    url: `api/user/${userId}/${goalId}`,
    data: { prop, data },
    params: {}
  });
}