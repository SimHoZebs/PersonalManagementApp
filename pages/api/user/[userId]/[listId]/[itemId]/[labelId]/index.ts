import { NextApiRequest, NextApiResponse } from "next";
import labelCollection, { LabelSchema } from "../../../../../../../lib/schema/LabelSchema"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const label: LabelSchema = await labelCollection.findById(query.objectId);
        res.status(200).json({ res: label })
      }
      catch (error) {
        res.status(500).json({ error })
      }
      break;
  }
}