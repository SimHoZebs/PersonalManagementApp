import apiFunctionHelper from "../apiFunctionHelper";
import { Post } from "../../pages/api/user/[userId]/[listId]";

/**
 * Updates List's ItemArray by appending a new item to it.
 */
export default async function createItem(userId: string, listId: string, itemTitle: string) {

  return await apiFunctionHelper<Post>({
    method: "post",
    url: `api/user/${userId}/${listId}`,
    data: {
      newItem: {
        title: itemTitle,
        labelIdArray: [],
        userId,
        listId
      }
    },
  });

}