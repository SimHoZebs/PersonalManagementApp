import { AxiosRequestConfig, AxiosResponse } from 'axios'
import request from '../request'
import ApiRes from './ApiRes'
import { ListSchema } from '../schema/ListSchema'

interface Res extends ApiRes {
  res: ListSchema
}

/**
 * Creates a new list for user.
 * @param userId 
 * @param listName 
 * @returns 
 */
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