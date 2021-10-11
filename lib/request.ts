import axios from "axios"

const request = axios.create({
  baseURL: process.env.URL
})

export default request