import { NextApiRequest, NextApiResponse } from "next";
import IapiRes from "../../../interface/IApiRes";
import groupCollection from "../../../schema/GroupSchema"

export interface groupReq {
  method: 'get' | "GET"
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IapiRes>) {
  const { method, url, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const group = await groupCollection.findById(query.objectId);
        res.status(200).json({ res: group, success: true })
      }
      catch (error) {
        res.status(500).json({ error: error, success: false })
      }
  }
}