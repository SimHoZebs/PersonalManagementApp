import { AxiosRequestConfig } from "axios";
import request from "../request";

import { ItemSchema } from "../schema/ItemSchema";
import NewApiRes from "./newApiRes";


export default async function readAllItem(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: `/api/user/${userId}/${listId}`,
  }

  const res: NewApiRes<ItemSchema[]> = await request(req)

  return res
}