import request from "../request"
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiRes from "./ApiRes";

import { UserSchema } from "../schema/UserSchema";

interface Res extends ApiRes {
  res: UserSchema
}

export default async function createUser(username: string) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `/api/user/`,
    data: { username },
  };

  const res: AxiosResponse<Res> = await request(req)

  return res
}