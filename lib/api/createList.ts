import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ListSchema } from "../../schema/ListSchema";
import request from "../request";
import ApiRes from "./ApiRes";
import mongoose from "mongoose";


interface Res extends ApiRes {
  res: ListSchema;
}

export default async function createList(
  userId: mongoose.Schema.Types.ObjectId,
  listName: string
) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `api/user/${userId}`,
    data: { listName }
  }

  const res: AxiosResponse<Res> = await request(req)

  return res
}