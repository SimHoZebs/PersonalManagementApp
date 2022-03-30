import { Body, Del } from "../../pages/api/user/[userId]";
import { ObjectId } from "mongodb";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function handler(userId: string, taskId: ObjectId) {

  return await apiFunctionHelper<Del, Body>(
    {
      method: "DELETE",
      url: `api/user/${userId}/`,
      data: { taskId }
    }, "deleteTask"
  );
}