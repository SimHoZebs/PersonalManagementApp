import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UserSchema } from '../../schema/UserSchema';
import request from '../request'
import ApiRes from './ApiRes'

/**
 * @returns UserSchema:  if request successful
 * @returns null: if request successful but user does not exist
 */
interface Res extends ApiRes {
  res: UserSchema | null
}

/**
 * @description Checks if username exists in DB.
 * @returns undefined; if request failed
 * @returns null; if request successful but username does not exist
 * @returns User: UserSchema; if request successful and username exists
 */

export default async function readUser(username: string) {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: `/api/user/`,
    params: { username }
  };

  const res: AxiosResponse<Res> = await request(
    req
  );

  return res
}
