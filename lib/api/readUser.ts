import { AxiosRequestConfig } from 'axios';
import { UserSchema } from '../schema/UserSchema';
import request from '../request'
import ApiRes from './ApiRes'

/**
 * @description Checks if username exists in DB.
 * @returns undefined; if request failed
 * @returns null; if request successful but username does not exist
 * @returns User: UserSchema; if request successful and username exists
 */

export default async function readUser(username: string | null = null, userId: string | null = null) {
  const req: AxiosRequestConfig = {
    method: "GET",
    url: `api/user/`,
    params: { username, userId }
  };

  try {
    const res: ApiRes<UserSchema | null> = await request(req);

    switch (res.data.res) {
      case undefined:
        return `readUser server error, ${JSON.stringify(res.data.error)}`
      case null:
        return `User ${username} does not exist in database`
      default:
        return res.data.res
    }
  }
  catch (error) {
    return `readUser client error, ${JSON.stringify(error)}`
  }
}
