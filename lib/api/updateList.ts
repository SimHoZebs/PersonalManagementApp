import { AxiosRequestConfig } from 'axios';
import request from '../request';
import { ListSchema } from '../schema/ListSchema';
import correctRes from '../correctRes';

/**
 * 
 * @param userId; target user id.
 * @param listId; target list id. 
 * @param prop; target prop in list. 
 * @param data 
 * @returns 
 */
export default async function updateList(
  userId: string,
  listId: string,
  prop: "listName" | "itemArray",
  data: string
) {

  const req: AxiosRequestConfig = {
    method: 'PATCH',
    url: `api/user/${userId}/${listId}`,
    data: { prop, data },
    params: {}
  };

  const res = await request(req);

  if (correctRes(res)) {
    switch (res.data.res) {
      case undefined:
        return `updateList server error ${JSON.stringify(res.data.error)}`;

      default:
        return res.data.res as ListSchema;
    }
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}