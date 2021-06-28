import mongoose from "mongoose";

export const Task = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is empty'],
		unique: true,
		maxLength: [64, 'Title cannot be more than 64 characters']
	},
	desc: {
		type: String,
	},
	tag: {
		type: String
	}
})

//mongoose.models.NoteSchema looks for a model called Task in the mongoDB connection that has been established.

export default mongoose.models.Task || mongoose.model('Task', Task)