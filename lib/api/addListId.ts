import { AxiosRequestConfig } from "axios"
import request from "../request"
import { UserSchema } from "../schema/UserSchema"
import NewApiRes from "./newApiRes"

/**
 * adds listId to user's listIdArray.
 * @param userId 
 * @param listId 
 * @returns UserSchema
 */
export default async function addListId(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `api/user/${userId}`,
    data: { listId }
  }

  const res: NewApiRes<UserSchema> = await request(req)

  return res
}