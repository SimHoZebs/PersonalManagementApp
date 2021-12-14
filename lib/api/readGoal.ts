import apiFunctionHelper from "../apiFunctionHelper";
import { Get } from "../../pages/api/user/[userId]/[goalId]";

export default async function readList(userId: string, goalId: string) {

  return await apiFunctionHelper<Get>({
    method: 'GET',
    url: `api/user/${userId}/${goalId}`
  });
}