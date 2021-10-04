// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

import { CorsRequest } from "cors"

interface Res {
  statusCode?: number | undefined;
  setHeader(key: string, value: string): any;
  end(): any;
}

export default function initMiddleware(
  middleware: (
    arg: CorsRequest,
    res: Res,
    fn: (result: unknown) => void
  ) => void
) {
  return (req: CorsRequest, res: Res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}