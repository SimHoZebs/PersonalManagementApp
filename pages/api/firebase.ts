import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointHelper from "../../lib/apiEndpointHelper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { status, response } = await apiEndpointHelper(req,
    async function get() {

      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      };

      // Initialize Firebase
      return firebaseConfig;
    }
  );

  res.status(status).json(response);
}