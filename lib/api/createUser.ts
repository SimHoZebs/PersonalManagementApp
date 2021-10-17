import request from "../request";
import { AxiosRequestConfig } from "axios";
import correctRes from "../correctRes";
import { UserSchema } from "../schema/UserSchema";

export default async function createUser(username: string) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `api/user/`,
    data: { username },
  };

  const res = await request(req);

  if (correctRes(res)) {
    return res.data.res !== undefined ? res.data.res as UserSchema : `createUser server error ${JSON.stringify(res.data.error)}`;
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}