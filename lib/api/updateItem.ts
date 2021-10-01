import { AxiosRequestConfig } from 'axios';
import { ItemSchema } from '../schema/ItemSchema';
import request from '../request';
import ApiRes from './ApiRes';


export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}/${listId}`,
    data: { itemIndex, newItemName },
  };

  try {
    const res: ApiRes<ItemSchema[]> = await request(req)

    switch (res.data.res) {
      case undefined:
        return `updateItem server error: ${JSON.stringify(res.data.error)}`

      default:
        return res.data.res
    }
  }
  catch (error) {
    return `updateItem client error, ${JSON.stringify(error)}`
  }
}