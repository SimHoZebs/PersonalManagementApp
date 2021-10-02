import { NextApiRequest, NextApiResponse } from 'next'
import userCollection, { UserSchema } from '../../../../lib/schema/UserSchema'
import listCollection, { ListSchema } from '../../../../lib/schema/ListSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req

  switch (method) {
    case 'GET':
      try {
        const listArray: ListSchema[] = await listCollection.find({})

        res.status(200).json({ res: listArray, })
      } catch (error) {
        res.status(400).json({ error })
      }
      break;

    case 'POST':
      try {
        const list: ListSchema = await listCollection.create(new listCollection({ listName: body.listName, userId: query.userId }))

        res.status(201).json({ res: list })
      } catch (error) {
        res.status(400).json({ error })
      }
      break;

    case 'PATCH':
      try {
        const user: UserSchema = await userCollection.findOne({ _id: query.userId })

        if (body.target === "selectedListId") {
          user.selectedListId = body.listId
        }
        else {
          user.listIdArray.push(body.listId)
        }

        await user.save()
        res.status(201).json({ res: user })
      } catch (error) {
        res.status(400).json({ error })
      }
      break;
  }
}