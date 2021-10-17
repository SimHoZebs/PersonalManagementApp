import { AxiosRequestConfig } from "axios";
import request from "../request";
import { UserSchema } from "../schema/UserSchema";
import correctRes from "../correctRes";

/**
 * adds listId to user's listIdArray.
 * @param userId 
 * @param listId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { listId }
  };

  const res = await request(req);

  if (correctRes(res)) {
    switch (res.data.res) {
      case undefined:
        return `addListId server error, ${JSON.stringify(res.data.error)}`;
      default:
        return res.data.res as UserSchema;
    }
  }
  else {
    return `Client Error. res: ${JSON.stringify(res, null, 2)}`;
  }
}