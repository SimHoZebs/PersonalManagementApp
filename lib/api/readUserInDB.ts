import { AxiosResponse, AxiosRequestConfig } from 'axios';
import request from '../request'
import ApiRes from './ApiRes'

/**
 * @returns string:  if request successful
 * @returns null: if request successful but user does not exist
 */
interface ReadUserListIdRes extends ApiRes {
  res: string | null | undefined
}

/**
 * @description Checks if username exists in DB.
 * @returns undefined; if request failed
 * @returns null; if request successful but username does not exist
 * @returns User: UserSchema; if request successful and username exists
 */

export default async function readUserInDB(username: string) {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: `api/user/${username}`,
  };

  const res: AxiosResponse<ReadUserListIdRes> = await request(
    req
  );
  console.log(res.data.success)

  return res
}
