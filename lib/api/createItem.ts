import { AxiosRequestConfig, AxiosResponse } from "axios"
import { ItemSchema } from "../../schema/ItemSchema"
import ApiRes from "./ApiRes"
import request from "../request"

interface CreateItemRes extends ApiRes {
  res: ItemSchema | undefined
}

export default async function createItem(title: string) {

  const req: AxiosRequestConfig = {
    method: "post",
    url: `/api/item`,
    data: { newItem: { title: title, labelIdArray: [] } },
  }

  const res: AxiosResponse<CreateItemRes> = await request(req)

  return res
}