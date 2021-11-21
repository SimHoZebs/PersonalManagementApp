import { UserSchema } from '../schema/UserSchema';
import apiFunctionHelper from '../apiFunctionHelper';

/**
 * Checks if user exists in DB.
 * @param username Leave empty if userId is provided.
 * @param userId Leave empty if username is provided.
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