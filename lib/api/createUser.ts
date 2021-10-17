import apiMiddleware from "../apiMiddleware";
import { UserSchema } from "../schema/UserSchema";

export default async function createUser(username: string) {

  return await apiMiddleware<UserSchema>({
    method: "POST",
    url: `api/user/`,
    data: { username },
  });
}