import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "../request";
import { ListSchema } from "../schema/ListSchema";
import ApiRes from "./ApiRes";

interface Res extends ApiRes {
  res: ListSchema[]
}

export default async function readAllList(userId: string) {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: `api/user/${userId}`
  }

  const res: AxiosResponse<Res> = await request(req);
}