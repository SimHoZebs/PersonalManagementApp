import apiFunctionHelper from '../apiFunctionHelper';
import { Get } from '../../pages/api/user';

/**
 * Checks if user exists in DB.
 * @param userId user unique id
 * @returns string; Client or server error
 * @returns null; Request successful but username does not exist
 * @returns User: UserSchema; Request successful and username exists
 */
export default async function readUser(userId: string) {

  return await apiFunctionHelper<Get>(
    {
      method: "GET",
      url: `api/user/`,
      params: { userId }
    },
  );
}