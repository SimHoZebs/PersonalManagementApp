import { AxiosRequestConfig } from 'axios'
import request from '../request'
import ApiRes from './ApiRes'
import { ListSchema } from '../schema/ListSchema'

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
    url: `api/user/${userId}`,
    data: { listName }
  }

  try {
    const res: ApiRes<ListSchema> = await request(req)

    switch (res.data.res) {
      case undefined:
        return `createList server error, ${JSON.stringify(res.data.error)}`

      default:
        return res.data.res
    }
  }
  catch (error) {
    return `createList client erorr, ${JSON.stringify(error)}`
  }
}