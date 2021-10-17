import { UserSchema } from "../schema/UserSchema";
import apiMiddleware from "../apiMiddleware";

export default async function updateSelectedListId(userId: string, listId: string) {

  return await apiMiddleware<UserSchema>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  });
}