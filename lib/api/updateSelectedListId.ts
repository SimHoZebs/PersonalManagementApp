import { UserSchema } from "../schema/UserSchema";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function updateSelectedListId(userId: string, listId: string) {

  return await apiFunctionHelper<UserSchema>({
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { target: "selectedListId", listId },
    params: {}
  });
}