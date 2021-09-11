import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "../request";
import ApiRes from "./ApiRes";

import { ItemSchema } from "../../schema/ItemSchema";

interface Res extends ApiRes {
  res: ItemSchema[]
}

export default async function readAllItem(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: `/api/user/${userId}/${listId}`,
  }

  const res: AxiosResponse<Res> = await request(req)

  return res
}