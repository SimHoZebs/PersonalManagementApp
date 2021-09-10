import { AxiosRequestConfig, AxiosResponse } from "axios"
import mongoose from "mongoose"

import { ItemSchema } from "../../schema/ItemSchema"
import ApiRes from "./ApiRes"
import request from "../request"

interface CreateItemRes extends ApiRes {
  res: ItemSchema | undefined
}

export default async function createItem(
  userId: mongoose.Schema.Types.ObjectId,
  listId: mongoose.Schema.Types.ObjectId,
  itemName: string
) {

  const req: AxiosRequestConfig = {
    method: "post",
    url: `/api/user/${userId}/${listId}`,
    data: { newItem: { itemName: itemName, labelIdArray: [] } },
  }

  const res: AxiosResponse<CreateItemRes> = await request(req)

  return res
}