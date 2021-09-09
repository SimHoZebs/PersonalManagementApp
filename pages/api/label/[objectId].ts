import { NextApiRequest, NextApiResponse } from "next";
import ApiRes from "../../../lib/api/ApiRes";
import labelCollection, { LabelSchema } from "../../../schema/LabelSchema"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, url, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const label: LabelSchema = await labelCollection.findById(query.objectId);
        res.status(200).json({ res: label, success: true })
      }
      catch (error) {
        res.status(500).json({ error: error, success: false })
      }
      break;
  }
}