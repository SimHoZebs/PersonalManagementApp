import { Post } from "../../pages/api/user";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function createUser(userId: string, username: string) {

  return await apiFunctionHelper<Post>({
    method: "POST",
    url: `api/user/`,
    data: { userId, username },
  });
}