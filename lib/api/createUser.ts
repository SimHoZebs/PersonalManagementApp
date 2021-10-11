import request from "../request"
import { AxiosRequestConfig } from "axios";
import ApiRes from "./ApiRes";

import { UserSchema } from "../schema/UserSchema";

export default async function createUser(username: string) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `api/user/`,
    data: { username },
  };

  try {
    const res: ApiRes<UserSchema> = await request(req)

    return res.data.res !== undefined ? res.data.res : `createUser server error ${JSON.stringify(res.data.error)}`
  }
  catch (error) {
    return `createUser client error ${JSON.stringify(error)}`
  }

}