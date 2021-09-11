import { NextApiRequest, NextApiResponse } from "next";
import ApiRes from "../../../lib/api/ApiRes";
import userCollection, { UserSchema } from '../../../schema/UserSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body, query } = req

  switch (method) {
    case 'GET':
      try {
        const user: UserSchema = await userCollection.findOne({ username: query.username })
        res.status(200).json({ success: true, res: user })
      }
      catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break;

    case 'POST':
      try {
        const user: UserSchema = await userCollection.create(new userCollection({ username: body.username }))
        res.status(200).json({ success: true, res: user })
      }
      catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break;
  }
}