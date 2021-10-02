import { NextApiRequest, NextApiResponse } from 'next';
import ItemCollection, { ItemSchema } from '../../../../../../lib/schema/ItemSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const itemArray: ItemSchema[] = await ItemCollection.find({})
        res.status(200).json({ res: itemArray, })
      } catch (error) {
        res.status(400).json({ error })
      }
      break;

    case 'PATCH':
      try {
        const updatedItem: ItemSchema = await ItemCollection.findOneAndUpdate({ _id: query.itemId }, { title: body.newItemName }, { new: true })
        res.status(200).json({ res: updatedItem, });
      } catch (error) {
        res.status(400).json({ error })
      }
      break;

    case "DELETE":
      try {
        const removedItem: ItemSchema = await ItemCollection.findByIdAndRemove(req.body.id)
        res.status(201).json({ res: removedItem })
      } catch (error) {
        res.status(400).json({ error })
      }
      break;
  }
}