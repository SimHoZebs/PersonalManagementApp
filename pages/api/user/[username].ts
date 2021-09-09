import { AxiosRequestConfig } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import ApiRes from '../../../interface/ApiRes'
import userCollection, { UserSchema } from '../../../schema/UserSchema'

export interface ReadUserListId extends AxiosRequestConfig {
  method: "get" | "GET"
}

export interface CreateUser extends AxiosRequestConfig {
  method: "post" | "POST"
}

/**
 * @returns string:  if request successful
 * @returns null: if request successful but user does not exist
 */
export interface ReadUserListIdRes extends ApiRes {
  res: string | null | undefined
}

export interface CreateUserRes extends ApiRes {
  res: string | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, url, body, query, } = req

  switch (method) {
    case 'GET':
      try {
        const userObjID: UserSchema = await userCollection.findOne({ username: query.username })
        res.status(200).json({ success: true, res: userObjID })
      }
      catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break;
    case "POST":
      try {
        const user: UserSchema = await userCollection.create(new userCollection({ username: query.username }))
        res.status(200).json({ success: true, res: user })
      }
      catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break;
  }
}