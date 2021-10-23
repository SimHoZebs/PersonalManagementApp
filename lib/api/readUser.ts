import { UserSchema } from '../schema/UserSchema';
import apiFunctionMiddleware from '../apiFunctionMiddleware';

/**
 * Checks if user exists in DB.
 * @param username Leave empty if userId is provided.
 * @param userId Leave empty if username is provided.
 * @returns string; Client or server error
 * @returns null; Request successful but username does not exist
 * @returns User: UserSchema; Request successful and username exists
 */
export default async function readUser(userId: string) {

  return await apiFunctionMiddleware<UserSchema | null>(
    {
      method: "GET",
      url: `api/user/`,
      params: { userId }
    },
  );
}