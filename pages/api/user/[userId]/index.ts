import { NextApiRequest, NextApiResponse } from 'next'
import ApiRes from '../../../../lib/api/ApiRes'
import userCollection, { UserSchema } from '../../../../schema/UserSchema'
import listCollection, { ListSchema } from '../../../../schema/ListSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body, query, } = req

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
        const list: ListSchema = await listCollection.create(new listCollection({ listName: query.listName }))
        res.status(201).json({ success: true, res: list })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'PATCH':
      try {
        let user: UserSchema = await userCollection.findOne({ _id: query.userId })
        user.listIdArray?.push(body.listId)
        await user.save()

        res.status(200).json({ success: true, res: user })
      }
      catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break;
  }
}