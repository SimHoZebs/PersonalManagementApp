import { UserSchema } from "../schema/UserSchema";
import apiFunctionMiddleware from "../apiFunctionMiddleware";

export default async function updateSelectedListId(userId: string, listId: string) {

  return await apiFunctionMiddleware<UserSchema>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  });
}