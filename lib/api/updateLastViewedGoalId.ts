import apiFunctionHelper from "../apiFunctionHelper";
import { Patch, Body } from "../../pages/api/user/[userId]";

export default async function updateLastViewedGoalId(userId: string, goalId: string) {

  return await apiFunctionHelper<Patch, Body>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "lastViewedGoalId", goalId },
    params: {}
  });
}