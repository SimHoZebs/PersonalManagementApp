import dbConnect from '../../lib/dbConnect'

import { AxiosRequestConfig } from 'axios'
import IapiRes from '../../interface/IApiRes'
import { NextApiRequest, NextApiResponse } from 'next';

export interface IGetReq extends AxiosRequestConfig {
  method: "get" | "GET"
}

export interface IGetRes extends IapiRes {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IapiRes>) {
  const { method, body } = req;

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ success: true })
      }
      catch (error) {
        res.status(500).json({ error: error, success: false })
      }
  }
}
