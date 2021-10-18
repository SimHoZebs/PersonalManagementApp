import { UserSchema } from "../schema/UserSchema";
import apiFunctionMiddleware from "../apiFunctionMiddleware";

/**
 * adds listId to user's listIdArray.
 * @param userId 
 * @param listId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, listId: string) {

  return await apiFunctionMiddleware<UserSchema>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { listId }
  });

}