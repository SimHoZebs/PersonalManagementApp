import { NextApiRequest, NextApiResponse } from 'next';
import ApiRes from '../../../../../lib/api/ApiRes';
import listCollection, { ListSchema } from '../../../../../schema/ListSchema'
import itemCollection, { ItemSchema } from '../../../../../schema/ItemSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body } = req;
  const { listId, userId } = req.query

  switch (method) {
    case 'GET':
      try {
        const allItem: ItemSchema[] = await itemCollection.find({ listId, userId })
        res.status(200).json({ success: true, res: allItem })
      }
      catch (error) {
        res.status(500).json({ success: false, error })
      }

    case "POST":
      try {
        const newItem: ItemSchema = await itemCollection.create(new itemCollection(body.newItem));
        res.status(201).json({ success: true, res: newItem })
      } catch (error) {
        res.status(500).json({ error: error, success: false })
      }
      break;

    case 'DELETE':
      try {
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(500).json({ error: error, success: false })
      }
      break;
  }
}