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

  try {
    const res = await request(req);
    if (correctRes(res)) {
      return res.data.res as T;
    }
    else {
      return `Possibly client error, ${JSON.stringify(res, null, 2)}`;
    }
  }
  catch (error) {
    return `Possibly server error, ${error instanceof Error ? error.message : JSON.stringify(error, null, 2)}`;
  }
}