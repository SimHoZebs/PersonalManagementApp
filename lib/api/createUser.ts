import apiFunctionMiddleware from "../apiFunctionMiddleware";
import { UserSchema } from "../schema/UserSchema";

export default async function createUser(username: string) {

  return await apiFunctionMiddleware<UserSchema>({
    method: "POST",
    url: `api/user/`,
    data: { username },
  });
}