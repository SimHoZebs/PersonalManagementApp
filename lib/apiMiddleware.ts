import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "./request";

interface ApiRes extends AxiosResponse {
  data: {
    res: unknown;
    error?: unknown;
  };
}

function correctRes(res: AxiosResponse): res is ApiRes {
  return res.data !== undefined;
}

export default async function apiMiddleware<T>(req: AxiosRequestConfig, cases: { value: unknown, return: unknown; }[] = []) {

  const res = await request(req);

  if (correctRes(res)) {
    const conditionalResponseArray = [
      {
        value: undefined,
        return: `Server error, ${JSON.stringify(res.data.error)}`
      },
      ...cases
    ];

    conditionalResponseArray.forEach((check) => {
      if (res.data.res === check.value) {
        return check.return;
      }
    });
    return res.data.res as T;
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}