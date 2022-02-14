import apiFunctionHelper from "../apiFunctionHelper";
import { Patch, Body } from "../../pages/api/user/[userId]";

/**
 * adds goalId and title to user's goalArray.
 * @param userId 
 * @param goalId 
 * @returns UserSchema
 */
export default async function addGoal(userId: string, goalId: string, goalTitle: string) {

  return await apiFunctionHelper<Patch, Body>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { goalId, goalTitle }
  });

}