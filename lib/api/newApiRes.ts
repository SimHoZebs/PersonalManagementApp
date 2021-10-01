import { AxiosResponse } from "axios";

export default interface NewApiRes<T> extends AxiosResponse {
  data: {
    res?: T;
    error?: unknown;
    success: boolean;
  }
}