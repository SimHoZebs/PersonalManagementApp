import { NextApiRequest, NextApiResponse } from "next";
import userCollection, { UserSchema } from '../../../lib/schema/UserSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req

  switch (method) {
    case 'GET':
      try {
        let user: UserSchema | undefined;
        if (query.username != null) {
          user = await userCollection.findOne({ username: query.username })
        }
        else if (query.userId != null) {
          user = await userCollection.findOne({ _id: query.userId })
        }
        res.status(200).json({ res: user })
      }
      catch (error) {
        res.status(400).json({ error })
      }
      break;

    case 'POST':
      try {
        const user: UserSchema = await userCollection.create(new userCollection({ username: body.username }))
        res.status(200).json({ res: user })
      }
      catch (error) {
        res.status(400).json({ error })
      }
      break;
  }
}