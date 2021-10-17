import { AxiosRequestConfig } from "axios";
import request from "../request";
import { ListSchema } from "../schema/ListSchema";
import correctRes from "./correctRes";

export default async function readList(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: 'GET',
    url: `api/user/${userId}/${listId}`
  };

  const res = await request(req);

  if (correctRes(res)) {
    if (!res.data.res) {
      return `readList server error ${JSON.stringify(res.data.error)}`;
    }
    else {
      return res.data.res as ListSchema;
    }
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}