import { AxiosRequestConfig, AxiosResponse } from 'axios'
import mongoose from 'mongoose'
import { UserSchema } from '../../schema/UserSchema'
import request from '../request'
import ApiRes from './ApiRes'

interface Res extends ApiRes {
  res: UserSchema
}

export default async function updateUserListArray(
  userId: mongoose.Schema.Types.ObjectId,
  listId: mongoose.Schema.Types.ObjectId
) {
  const req: AxiosRequestConfig = {
    url: `/api/user/${userId}`,
    data: { listId }
  }

  const res: AxiosResponse<Res> = await request(req)

  return res
}