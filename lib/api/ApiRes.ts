import { AxiosResponse } from "axios";

export default interface ApiRes<T> extends AxiosResponse {
  data: {
    res?: T;
    error?: unknown;
  }
}