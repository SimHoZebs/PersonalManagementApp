import apiFunctionHelper from "../apiFunctionHelper";
import { Patch, Body } from "../../pages/api/user/[userId]";

/**
 * adds goalId to user's goalIdArray.
 * @param userId 
 * @param goalId 
 * @returns UserSchema
 */
export default async function addGoalId(userId: string, goalId: string) {

  return await apiFunctionHelper<Patch, Body>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { goalId }
  });

}