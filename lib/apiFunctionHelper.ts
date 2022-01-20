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

export default async function apiFunctionHelper<T, D = unknown>(req: AxiosRequestConfig<D>, msg: string = "") {
  if (msg) console.log(`
  ${msg}
  methods: ${req.method}
  url: ${req.url}
  query: ${JSON.stringify(req.params, null, 2)}
  body: ${JSON.stringify(req.data, null, 2)}`);
  ;

  try {
    const res = await request(req);
    if (correctRes(res)) {
      return res.data.res as T;
    }
    else {
      const error = new Error(JSON.stringify(res, null, 2));
      console.log(`Possibly client error, ${error}`);
      return error;
    }
  }
  catch (error) {
    console.log(`Possibly server error, ${error instanceof Error ? error.message : JSON.stringify(error, null, 2)}`);
    return error as Error;
  }
}