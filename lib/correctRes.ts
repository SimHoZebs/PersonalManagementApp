import { AxiosResponse } from "axios";

interface ApiRes extends AxiosResponse {
  data: {
    res: unknown;
    error?: unknown;
  };
}

export default function correctRes(res: AxiosResponse): res is ApiRes {
  return (res as ApiRes).data.res !== undefined;
}