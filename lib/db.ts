import { MongoClient } from "mongodb";

if (!process.env.DB_URI) throw new Error('DB_URI is not defined');

export default new MongoClient(process.env.DB_URI).connect().then(res => res.db('app'));
