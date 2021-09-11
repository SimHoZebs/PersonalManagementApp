import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserSchema } from '../schema/UserSchema'
import request from '../request'
import ApiRes from './ApiRes'

interface Res extends ApiRes {
  res: UserSchema
}

/**
 * Updates user's listIdArray with a new list. 
 */
export default async function addListToUser(userId: string, listId: string) {
  const req: AxiosRequestConfig = {
    method: "PATCH",
    url: `/api/user/${userId}`,
    data: { listId }
  }

  const res: AxiosResponse<Res> = await request(req)

  return res
}