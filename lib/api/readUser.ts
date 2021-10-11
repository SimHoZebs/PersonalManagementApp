import { AxiosRequestConfig } from 'axios';
import { UserSchema } from '../schema/UserSchema';
import request from '../request'
import ApiRes from './ApiRes'

/**
 * @description Checks if user exists in DB.
 * @param username Leave empty if userId is provided.
 * @param userId Leave empty if username is provided.
 * @returns string; Client or server error
 * @returns null; Request successful but username does not exist
 * @returns User: UserSchema; Request successful and username exists
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
        return null
      default:
        return res.data.res
    }
  }
  catch (error) {
    return `readUser client error, ${JSON.stringify(error)}`
  }
}
