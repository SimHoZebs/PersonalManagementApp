import { Del } from "../../pages/api/user/[userId]/[goalId]";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function handler(userId: string, goalId: string, taskId: number) {

  return await apiFunctionHelper<Del>(
    {
      method: "DELETE",
      url: `api/user/${userId}/${goalId}`,
      data: { taskId }
    }
  );
}