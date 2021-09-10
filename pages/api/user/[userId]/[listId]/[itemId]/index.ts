import { NextApiRequest, NextApiResponse } from 'next';
import ApiRes from '../../../../../../lib/api/ApiRes';
import ItemCollection, { ItemSchema } from '../../../../../../schema/ItemSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const itemArray: ItemSchema[] = await ItemCollection.find({})
        res.status(200).json({ res: itemArray, success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'PATCH':
      try {
        const updatedItem: ItemSchema = await ItemCollection.findOneAndUpdate({ _id: query.itemId }, { title: body.newTitle }, { new: true })
        res.status(200).json({ res: updatedItem, success: true });
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case "DELETE":
      try {
        const removedItem: ItemSchema = await ItemCollection.findByIdAndRemove(req.body._id)
        res.status(201).json({ success: true, res: removedItem })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;
  }
}