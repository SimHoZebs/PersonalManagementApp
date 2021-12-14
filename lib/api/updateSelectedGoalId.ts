import apiFunctionHelper from "../apiFunctionHelper";
import { Patch } from "../../pages/api/user/[userId]";

export default async function updateSelectedGoalId(userId: string, goalId: string) {

  return await apiFunctionHelper<Patch>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedGoalId", goalId },
    params: {}
  });
}