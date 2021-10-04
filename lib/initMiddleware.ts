// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

import cors, { CorsOptions, CorsOptionsDelegate, CorsRequest } from "cors"
import { NextApiRequest, NextApiResponse } from "next"

function initMiddleware(middleware: typeof cors) {
  return (req: NextApiRequest, res: NextApiResponse, options?: CorsOptions | CorsOptionsDelegate) =>
    new Promise((resolve, reject) => {
      middleware(options)(req, res, (result: Error | unknown) => {
        return result instanceof Error ? reject(result) : resolve(result)
      })
    })
}

// - You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const NextCors = initMiddleware(cors)

export default NextCors