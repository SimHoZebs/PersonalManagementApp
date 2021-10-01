import { AxiosRequestConfig } from "axios";
import request from "../request";
import { UserSchema } from "../schema/UserSchema";
import ApiRes from "./ApiRes";

export default async function updateSelectedListId(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  }

  try {
    const res: ApiRes<UserSchema> = await request(req)

    switch (res.data.res) {
      case undefined:
        return `updateSelectedListId server error ${JSON.stringify(res.data.error)}`;

      default:
        return res.data.res
    }
  }
  catch (error) {
    return `updateSelectedListId client error ${JSON.stringify(error)}`
  }
}