import mongoose from 'mongoose'

interface connection {
	isConnected?: number
}

const connection: connection = {};

async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	const db = await mongoose.connect("mongodb+srv://Zebs:alt159951@cluster0.1rwov.mongodb.net/todo-app?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

	connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;