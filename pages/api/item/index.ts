import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosRequestConfig } from 'axios'
import ApiRes from '../../../interface/ApiRes';
import ItemCollection, { ItemSchema } from '../../../schema/ItemSchema'

export interface ReadAllItem extends AxiosRequestConfig {
  method: "get" | "GET"
}
export interface CreateItem extends AxiosRequestConfig {
  method: "post" | "POST"
  data: { newItem: ItemSchema }
}

export interface ReadAllItemRes extends ApiRes {
  res: ItemSchema[] | undefined
}

export interface CreateItemRes extends ApiRes {
  res: ItemSchema | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const itemArray: ItemSchema[] = await ItemCollection.find({})
        res.status(200).json({ res: itemArray, success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case "POST":
      try {
        const newItem: ItemSchema = await ItemCollection.create(new ItemCollection(body.newItem));
        res.status(201).json({ success: true, res: newItem })
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