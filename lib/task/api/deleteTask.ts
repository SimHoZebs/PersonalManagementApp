import { Body, Del } from "../../../pages/api/user/[userId]";
import apiFunctionHelper from "../../helper/apiFunctionHelper";

export default async function handler(userId: string, taskIndex: number) {

  return await apiFunctionHelper<Del, Body>(
    {
      method: "DELETE",
      url: `api/user/${userId}/`,
      data: { taskIndex }
    }, "deleteTask"
  );
}