import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from "next"

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

export default function corsMethods(methods: string | string[]) {
  return initMiddleware(
    Cors({
      methods: methods,
      origin: [`${process.env.NEXT_PUBLIC_VERCEL_URL}`]
    })
  )
}