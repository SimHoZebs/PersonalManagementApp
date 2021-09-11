import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserSchema } from '../schema/UserSchema'
import request from '../request'
import ApiRes from './ApiRes'

interface Res extends ApiRes {
  res: UserSchema
}

export default async function createList(
  userId: string,
  listName: string
) {
  const req: AxiosRequestConfig = {
    method: "POST",
    url: `/api/user/${userId}`,
    data: { listName }
  }

  const res: AxiosResponse<Res> = await request(req)

  return res
}