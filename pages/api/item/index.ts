import ItemSchema from '../../../schema/ItemSchema'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  console.log(body)

  switch (method) {
    case "GET":
      try {
        if (req.body._id !== undefined) {
          const item = await ItemSchema.findById(req.body._id);
          res.status(200).json(item);
        }
        else {
          const itemList = await ItemSchema.find({})
          res.status(200).json({ itemList: itemList })
        }
      } catch (error) {
        res.status(400).json({ error: error })
      }
      break;

    case "POST":
      try {
        const newItem = await ItemSchema.create({ title: body.title });
        res.status(201).json({ success: true, newTask: newItem })
      } catch (error) {
        res.status(400).json({ error: error })
      }
      break;

    case "DELETE":
      try {
        const removedItem = await ItemSchema.findByIdAndRemove(req.body._id)
        res.status(201).json({ success: true, removedItem: removedItem })
      } catch (error) {
        res.status(400).json({ error: error })
      }
      break;
  }
}