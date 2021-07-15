import ItemSchema from '../../../schema/ItemSchema'
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../dbConnect'

const DB_URI = process.env.DB_URI;

if (DB_URI !== undefined) {
  dbConnect(DB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  let msg = ""

  console.log(body)

  switch (method) {
    case "GET":
      try {
        const itemList = await ItemSchema.find({})
        res.status(200).json({ res: itemList, msg: msg })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case "POST":
      try {
        const newItem = await ItemSchema.create(new ItemSchema(body.newItem));
        res.status(201).json({ success: true, res: newItem })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case "DELETE":
      try {
        const removedItem = await ItemSchema.findByIdAndRemove(req.body._id)
        res.status(201).json({ success: true, removedItem: removedItem })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;
  }
}