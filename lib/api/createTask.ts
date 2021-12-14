import apiFunctionHelper from "../apiFunctionHelper";
import { Post } from "../../pages/api/user/[userId]/[goalId]";

/**
 * Updates List's TaskArray by appending a new task to it.
 */
export default async function createTask(userId: string, goalId: string, taskTitle: string) {

  return await apiFunctionHelper<Post>({
    method: "post",
    url: `api/user/${userId}/${goalId}`,
    data: {
      newTask: {
        title: taskTitle,
        labelIdArray: [],
        userId,
        goalId
      }
    },
  });

}