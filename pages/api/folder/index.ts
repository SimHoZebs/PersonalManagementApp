import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosRequestConfig } from 'axios'
import IapiRes from '../../../interface/IApiRes';
import folderCollection, { FolderSchema as folderSchema } from '../../../schema/FolderSchema'

export interface ReqAllFolder extends AxiosRequestConfig {
  method: "get" | "GET"
}

export interface ReqAllFolderRes extends IapiRes {
  res: folderSchema[] | undefined
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IapiRes>) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const folderList = await folderCollection.find({})
        res.status(200).json({ res: folderList, success: true })
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