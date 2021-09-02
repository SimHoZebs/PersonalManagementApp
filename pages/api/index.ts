import dbConnect from '../../lib/dbConnect'

import { AxiosRequestConfig } from 'axios'
import ApiRes from '../../interface/ApiRes'
import { NextApiRequest, NextApiResponse } from 'next';

export interface ReqInitServer extends AxiosRequestConfig {
  method: "get" | "GET"
}

export interface ReqInitServerRes extends ApiRes {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
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
