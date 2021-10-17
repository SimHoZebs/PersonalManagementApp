import apiMiddleware from '../apiMiddleware';
import { ListSchema } from '../schema/ListSchema';

/**
 * Creates a new list for user.
 * @param userId 
 * @param listName 
 * @returns 
 */
export default async function createList(userId: string, listName: string) {

  return await apiMiddleware<ListSchema>(
    {
      method: "POST",
      url: `api/user/${userId}`,
      data: { listName }
    }
  );
}