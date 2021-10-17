import { AxiosRequestConfig } from "axios";
import request from "../request";
import { UserSchema } from "../schema/UserSchema";
import correctRes from "../correctRes";

export default async function updateSelectedListId(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  };

  const res = await request(req);

  if (correctRes(res)) {
    switch (res.data.res) {
      case undefined:
        return `updateSelectedListId server error ${JSON.stringify(res.data.error)}`;

      default:
        return res.data.res as UserSchema;
    }
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}