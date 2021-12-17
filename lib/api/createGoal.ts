import { Post, Body } from '../../pages/api/user/[userId]';
import apiFunctionHelper from '../apiFunctionHelper';

/**
 * Creates a new goal for user.
 * @param userId 
 * @param title 
 * @returns 
 */
export default async function createGoal(userId: string, title: string) {

  return await apiFunctionHelper<Post, Body>(
    {
      method: "POST",
      url: `api/user/${userId}`,
      data: { title }
    }
  );
}