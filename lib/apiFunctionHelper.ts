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

export default async function apiFunctionHelper<T>(req: AxiosRequestConfig) {

  const res = await request(req);

  if (correctRes(res)) {
    return res.data.error !== undefined
      ? `Server error, ${JSON.stringify(res.data, null, 2)}`
      : res.data.res as T;
  }
  else {
    return `Client Error. res: ${JSON.stringify(req, null, 2)}`;
  }
}