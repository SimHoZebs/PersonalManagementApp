import { Patch, Body } from "../../../pages/api/user/[userId]";
import apiFunctionHelper from "../../helper/apiFunctionHelper";
import { TaskDoc } from "../types";

export default async function updateTask(userId: string, goalId: string, updatedTask: TaskDoc) {
  return await apiFunctionHelper<Patch, Body>({
    method: "PATCH",
    url: `api/user/${userId}/${goalId}`,
    data: { task: updatedTask }
  }, "updateTaskArray");
}