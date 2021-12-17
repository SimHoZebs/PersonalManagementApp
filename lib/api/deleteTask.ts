import { Body, Del } from "../../pages/api/user/[userId]/[goalId]";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function handler(userId: string, goalId: string, taskId: string) {

  return await apiFunctionHelper<Del, Body>(
    {
      method: "DELETE",
      url: `api/user/${userId}/${goalId}`,
      data: { taskId }
    }
  );
}