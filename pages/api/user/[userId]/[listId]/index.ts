import { NextApiRequest, NextApiResponse } from 'next';
import ApiRes from '../../../../../lib/api/ApiRes';
import listCollection, { ListSchema } from '../../../../../schema/ListSchema'
import itemCollection, { ItemSchema } from '../../../../../schema/ItemSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const listArray: ListSchema[] = await listCollection.find({})
        res.status(200).json({ res: listArray, success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case "POST":
      try {
        const newItem: ItemSchema = await itemCollection.create(new itemCollection(body.newItem));
        res.status(201).json({ success: true, res: newItem })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'DELETE':
      try {
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;
  }
}