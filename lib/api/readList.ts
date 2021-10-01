import { AxiosRequestConfig } from "axios"
import request from "../request"
import { ListSchema } from "../schema/ListSchema"
import NewApiRes from "./newApiRes"

export default async function readList(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  }

  try {
    const res: NewApiRes<ListSchema> = await request(req)

    return res.data.res !== undefined ? res.data.res : JSON.stringify(res.data.error)
  }
  catch (error) {
    return JSON.stringify(error)
  }


}