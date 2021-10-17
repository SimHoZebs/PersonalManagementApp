import { AxiosRequestConfig } from 'axios';
import request from '../request';
import correctRes from '../correctRes';
import { ListSchema } from '../schema/ListSchema';

/**
 * Creates a new list for user.
 * @param userId 
 * @param listName 
 * @returns 
 */
export default async function createList(
  userId: string,
  listName: string
) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `api/user/${userId}`,
    data: { listName }
  };

  const res = await request(req);

  if (correctRes(res)) {
    switch (res.data.res) {
      case undefined:
        return `createList server error, ${JSON.stringify(res.data.error)}`;

      default:
        return res.data.res as ListSchema;
    }
  } else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}