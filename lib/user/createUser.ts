import { ObjectId } from "mongodb";
import { Post, Body } from "../../pages/api/user";
import apiFunctionHelper from "../helper/apiFunctionHelper";

export default async function createUser(name: string, userId?: string | ObjectId) {

  return await apiFunctionHelper<Post, Body>({
    method: "POST",
    url: `api/user/`,
    data: { name, userId },
  }, "createUser");
}