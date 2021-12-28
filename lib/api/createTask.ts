import apiFunctionHelper from "../apiFunctionHelper";
import { Post, Body } from "../../pages/api/user/[userId]/[goalId]";
import { TaskProps } from "../schema/TaskSchema";

/**
 * Updates Goal's TaskArray by appending a new task to it.
 */
export default async function createTask(userId: string, goalId: string, task: TaskProps) {

  return await apiFunctionHelper<Post, Body>({
    method: "post",
    url: `api/user/${userId}/${goalId}`,
    data: { task }
  });

}