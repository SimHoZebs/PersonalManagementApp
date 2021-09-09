import { AxiosRequestConfig, AxiosResponse } from 'axios';
import mongoose from 'mongoose'
import { ItemSchema } from '../../schema/ItemSchema';
import ApiRes from './ApiRes';
import request from '../request';

interface UpdateItemRes extends ApiRes {
  res: ItemSchema;
}

export default async function updatedItem(_id: mongoose.Schema.Types.ObjectId | undefined, newTitle: string) {

  const req: AxiosRequestConfig = {
    method: "patch",
    url: `api/item/${_id}`,
    data: { newTitle: newTitle },
  };

  const res: AxiosResponse<UpdateItemRes> = await request(req)

  return res
}