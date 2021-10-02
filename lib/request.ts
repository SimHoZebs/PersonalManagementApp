import axios from "axios"

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL?.includes("local") ? "http://localhost:3000" : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
})

export default request