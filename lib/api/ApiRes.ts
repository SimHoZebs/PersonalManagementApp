import { AxiosResponse } from "axios";

export default interface ApiRes<T> extends AxiosResponse<unknown> {
  data: {
    res?: T;
    error?: unknown;
  }
}