import { AxiosRequestConfig } from "axios"
import request from "../request"
import { ItemSchema } from "../schema/ItemSchema"
import ApiRes from "./ApiRes"

/**
 * 
 * @param userId 
 * @param listId 
 * @param itemName 
 * @returns 
 */
export default async function createItem(userId: string, listId: string, itemName: string) {

  const req: AxiosRequestConfig = {
    method: "post",
    url: `/api/user/${userId}/${listId}`,
    data: { newItem: { itemName, labelIdArray: [], userId, listId } },
  }

  try {
    const res: ApiRes<ItemSchema[]> = await request(req)

    switch (res.data.res) {
      case undefined:
        return `createItem server error ${JSON.stringify(res.data.error)}`

      default:
        return res.data.res
    }
  }
  catch (error) {
    return `createItem client error ${JSON.stringify(error)}`
  }

}