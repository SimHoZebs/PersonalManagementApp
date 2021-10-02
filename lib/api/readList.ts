import { AxiosRequestConfig } from "axios"
import request from "../request"
import { ListSchema } from "../schema/ListSchema"
import ApiRes from "./ApiRes"

export default async function readList(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  }

  try {
    const res: ApiRes<ListSchema> = await request(req)

    if (!res.data.res) {
      return `readList server error ${JSON.stringify(res.data.error)}`
    }
    else {
      return res.data.res
    }

  }
  catch (error) {
    return `readList client error ${JSON.stringify(error)}`
  }

}