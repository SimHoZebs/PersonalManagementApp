import { UserSchema } from "../schema/UserSchema";
import apiMiddleware from "../apiMiddleware";

/**
 * adds listId to user's listIdArray.
 * @param userId 
 * @param listId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, listId: string) {

  return await apiMiddleware<UserSchema>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { listId }
  });

}