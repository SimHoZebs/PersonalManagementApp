import { AxiosRequestConfig } from "axios";
import request from "../request";
import { UserSchema } from "../schema/UserSchema";
import NewApiRes from "./newApiRes";

export default async function updateSelectedListId(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  }

  const res: NewApiRes<UserSchema> = await request(req)
  return res
}