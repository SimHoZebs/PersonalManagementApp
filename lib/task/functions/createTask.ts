import apiFunctionHelper from "../../helper/apiFunctionHelper";
import { Body, Post } from "../../../pages/api/user/[userId]";
import { TaskDoc } from "../types";
import { ObjectId } from "mongodb";

/**
 * Updates Goal's TaskArray by appending a new task to it.
 */
export default async function createTask(userId: ObjectId, task: TaskDoc) {

  return await apiFunctionHelper<Post, Body>({
    method: "post",
    url: `api/user/${userId.toString()}`,
    data: { task }
  }, "createTask");

}