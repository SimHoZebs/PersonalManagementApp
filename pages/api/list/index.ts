import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosRequestConfig } from 'axios'
import ApiRes from '../../../interface/ApiRes';
import listCollection, { ListSchema } from '../../../schema/ListSchema'

export interface ReqAllList extends AxiosRequestConfig {
  method: "get" | "GET"
}

export interface ReqAllListRes extends ApiRes {
  res: ListSchema[] | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const listArray = await listCollection.find({})
        res.status(200).json({ res: listArray, success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'POST':
      try {
        res.status(201).json({ success: true })
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