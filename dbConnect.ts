import mongoose from 'mongoose'

interface connection {
  isConnected?: number
}

const connection: connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  let db;

  if (process.env.DB_URI) {
    db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } else {
    throw new Error('DB_URI is not defined');
  }

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;