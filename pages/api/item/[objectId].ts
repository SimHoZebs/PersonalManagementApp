import { NextApiRequest, NextApiResponse } from 'next';
import ItemSchema from '../../../schema/ItemSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, url, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ res: url })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case 'POST':
      try {
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case 'PATCH':
      try {
        const updatedItem = await ItemSchema.findOneAndUpdate({ _id: query.objectId }, { title: body.newTitle }, { new: true })
        res.status(200).json({ res: updatedItem })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case 'DELETE':
      try {
        res.status(200).json({ res: "delete successful" })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;
  }
}