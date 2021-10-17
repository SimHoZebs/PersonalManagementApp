import { AxiosRequestConfig } from 'axios';
import { ItemSchema } from '../schema/ItemSchema';
import request from '../request';
import correctRes from './correctRes';


export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}/${listId}`,
    data: { itemIndex, newItemName },
  };

  const res = await request(req);

  if (correctRes(res)) {
    switch (res.data.res) {
      case undefined:
        return `updateItem server error: ${JSON.stringify(res.data.error)}`;

      default:
        return res.data.res as ItemSchema[];
    }
  } else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }

}