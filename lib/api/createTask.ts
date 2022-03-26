import apiFunctionHelper from "../apiFunctionHelper";
import { Body, Post } from "../../pages/api/user/[userId]";
import { TaskDoc } from "../types/task";

/**
 * Updates Goal's TaskArray by appending a new task to it.
 */
export default async function createTask(userId: string, task: TaskDoc) {

  return await apiFunctionHelper<Post, Body>({
    method: "post",
    url: `api/user/${userId}`,
    data: { task }
  }, "createTask");

}