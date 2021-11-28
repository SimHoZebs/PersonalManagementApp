import apiFunctionHelper from "../apiFunctionHelper";
import { Patch } from "../../pages/api/user/[userId]";

/**
 * adds listId to user's listIdArray.
 * @param userId 
 * @param listId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, listId: string) {

  return await apiFunctionHelper<Patch>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { listId }
  });

}