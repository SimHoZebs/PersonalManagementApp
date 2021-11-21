import { UserSchema } from "../schema/UserSchema";
import apiFunctionHelper from "../apiFunctionHelper";

/**
 * adds listId to user's listIdArray.
 * @param userId 
 * @param listId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, listId: string) {

  return await apiFunctionHelper<UserSchema>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { listId }
  });

}