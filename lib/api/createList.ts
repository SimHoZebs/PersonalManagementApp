import { Post } from '../../pages/api/user/[userId]';
import apiFunctionHelper from '../apiFunctionHelper';

/**
 * Creates a new list for user.
 * @param userId 
 * @param title 
 * @returns 
 */
export default async function createList(userId: string, title: string) {

  return await apiFunctionHelper<Post>(
    {
      method: "POST",
      url: `api/user/${userId}`,
      data: { title }
    }
  );
}