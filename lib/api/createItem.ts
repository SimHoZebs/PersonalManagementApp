import { AxiosRequestConfig } from "axios"
import request from "../request"
import { ItemSchema } from "../schema/ItemSchema"
import NewApiRes from "./newApiRes"

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

  const res: NewApiRes<ItemSchema[]> = await request(req)

  return res
}