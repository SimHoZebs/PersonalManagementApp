import { Patch, Body } from "../../pages/api/user/[userId]";
import apiFunctionHelper from "../apiFunctionHelper";
import { TaskDoc } from "../types/task";

export default async function updateTask(userId: string, goalId: string, updatedTask: TaskDoc) {
  return await apiFunctionHelper<Patch, Body>({
    method: "PATCH",
    url: `api/user/${userId}/${goalId}`,
    data: { task: updatedTask }
  }, "updateTaskArray");
}