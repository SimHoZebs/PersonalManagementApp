import { UserSchema } from '../schema/UserSchema';
import apiFunctionHelper from '../apiFunctionHelper';

/**
 * Checks if user exists in DB.
 * @param userId user unique id
 * @returns string; Client or server error
 * @returns null; Request successful but username does not exist
 * @returns User: UserSchema; Request successful and username exists
 */
export default async function readUser(userId: string) {

  return await apiFunctionHelper<UserSchema | null>(
    {
      method: "GET",
      url: `api/user/`,
      params: { userId }
    },
  );
}