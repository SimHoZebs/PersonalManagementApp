import { NextApiRequest, NextApiResponse } from 'next';
import ApiRes from '../../../../../lib/api/ApiRes';
import listCollection, { ListSchema } from '../../../../../lib/schema/ListSchema'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body } = req;
  const { listId } = req.query

  switch (method) {
    case 'GET':
      try {
        const list: ListSchema = await listCollection.findOne({ listId })
        res.status(200).json({ success: true, res: list })
      }
      catch (error) {
        res.status(500).json({ success: false, error })
      }
      break;

    case "POST":
      try {
        const list: ListSchema = await listCollection.findOne({ listId })
        list.itemArray.push(body.newItem)
        list.save()
        res.status(201).json({ success: true, res: list.itemArray })
      } catch (error) {
        res.status(500).json({ error: error, success: false })
      }
      break;

    case "PATCH":
      try {
        const index = parseInt(body.itemIndex as string)

        const list: ListSchema = await listCollection.findOne({ listId })
        const targetItem = list.itemArray[index]
        targetItem.itemName = body.newItemName as string
        list.itemArray[index] = targetItem
        list.save()
        res.status(201).json({ success: true, res: list.itemArray })
      }
      catch (error) {
        res.status(500).json({ error: error, success: false })
      }
      break

    case 'DELETE':
      try {
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(500).json({ error: error, success: false })
      }
      break;
  }
}