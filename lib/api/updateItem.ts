import { AxiosRequestConfig, AxiosResponse } from 'axios';
import mongoose from 'mongoose'
import { ItemSchema } from '../../schema/ItemSchema';
import ApiRes from './ApiRes';
import request from '../request';

interface Res extends ApiRes {
  res: ItemSchema;
}

export default async function updateItem(itemId: mongoose.Schema.Types.ObjectId | undefined, newTitle: string) {

  const req: AxiosRequestConfig = {
    method: "patch",
    url: `api/item/${itemId}`,
    data: { newTitle },
  };

  const res: AxiosResponse<Res> = await request(req)

  return res
}