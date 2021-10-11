import axios from "axios"

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL === "http://localhost:3000"
    ? "http://localhost:3000"
    : `https://${process.env.URL}`,
})

export default request