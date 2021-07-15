import mongoose from 'mongoose'

interface connection {
  isConnected?: number
}

const connection: connection = {};

async function dbConnect(URI: string) {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;