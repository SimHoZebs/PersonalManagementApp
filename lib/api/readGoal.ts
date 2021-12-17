import apiFunctionHelper from "../apiFunctionHelper";
import { Get, Body } from "../../pages/api/user/[userId]/[goalId]";

export default async function readGoal(userId: string, goalId: string) {

  return await apiFunctionHelper<Get, Body>({
    method: 'GET',
    url: `api/user/${userId}/${goalId}`
  });
}