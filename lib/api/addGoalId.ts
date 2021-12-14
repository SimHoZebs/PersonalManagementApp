import apiFunctionHelper from "../apiFunctionHelper";
import { Patch } from "../../pages/api/user/[userId]";

/**
 * adds goalId to user's goalIdArray.
 * @param userId 
 * @param goalId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, goalId: string) {

  return await apiFunctionHelper<Patch>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { goalId }
  });

}