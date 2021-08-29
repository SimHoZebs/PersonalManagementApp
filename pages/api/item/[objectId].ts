import { NextApiRequest, NextApiResponse } from 'next';
import ItemModel, { IItemModel } from '../../../schema/ItemSchema';
import { AxiosRequestConfig } from 'axios';

//interfaces
import IapiRes from '../../../interface/IApiRes';

export interface IPatchReq extends AxiosRequestConfig {
  method: "patch" | "PATCH"
  data: { newTitle: string }
}

export interface IGetRes extends IapiRes {
  res: IItemModel;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IapiRes>) {
  const { method, url, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ res: url, success: true });
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'POST':
      try {
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'PATCH':
      try {
        const updatedItem = await ItemModel.findOneAndUpdate({ _id: query.objectId }, { title: body.newTitle }, { new: true })
        res.status(200).json({ res: updatedItem, success: true });
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;

    case 'DELETE':
      try {
        res.status(200).json({ res: "delete successful", success: true })
      } catch (error) {
        res.status(400).json({ error: error, success: false })
      }
      break;
  }
}