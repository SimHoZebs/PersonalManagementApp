import { Patch, Body } from "../../pages/api/user/[userId]/[goalId]";
import apiFunctionHelper from "../apiFunctionHelper";
import { TaskProps } from "../schema/TaskSchema";

export default async function updateTaskArray(userId: string, goalId: string, taskArray: TaskProps[]) {
  return await apiFunctionHelper<Patch, Body>({
    method: "PATCH",
    url: `api/user/${userId}/${goalId}`,
    data: { taskArray }
  }, "updateTaskArray");
}