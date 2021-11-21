import apiFunctionHelper from "../apiFunctionHelper";
import { UserSchema } from "../schema/UserSchema";

export default async function createUser(userId: string, username: string) {

  return await apiFunctionHelper<UserSchema>({
    method: "POST",
    url: `api/user/`,
    data: { userId, username },
  });
}