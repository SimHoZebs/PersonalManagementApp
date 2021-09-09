import request from "../request"
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiRes from "./ApiRes";

import { UserSchema } from "../../schema/UserSchema";

interface CreateUser extends AxiosRequestConfig {
  method: "post" | "POST"
  url: string
  data: UserSchema
}

interface CreateUserRes extends ApiRes {
  res: string | undefined
}

export default async function createUser(username: string) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `api/user/`,
    data: { username: username },
  };

  const res: AxiosResponse<CreateUserRes> = await request(req)

  return res
}