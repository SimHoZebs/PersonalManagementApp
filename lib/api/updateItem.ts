import { AxiosRequestConfig } from 'axios';
import { ItemSchema } from '../schema/ItemSchema';
import request from '../request';
import NewApiRes from './newApiRes';


export default async function updateItem(userId: string, listId: string, itemIndex: number, newItemName: string) {

  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}/${listId}`,
    data: { itemIndex, newItemName },
  };

  const res: NewApiRes<ItemSchema[]> = await request(req)

  return res
}