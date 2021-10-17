import { AxiosRequestConfig } from "axios";
import request from "../request";
import { ItemSchema } from "../schema/ItemSchema";
import correctRes from "../correctRes";

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
    url: `api/user/${userId}/${listId}`,
    data: { newItem: { itemName, labelIdArray: [], userId, listId } },
  };

  const res = await request(req);
  if ((correctRes(res))) {
    switch (res.data.res) {
      case undefined:
        return `createItem server error ${JSON.stringify(res.data.error)}`;

      default:
        return res.data.res as ItemSchema[];
    }
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}