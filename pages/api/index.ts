import Task from '../../schema/todoSchema'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const taskList = await Task.find({})
				res.status(200).json({ taskList: taskList })
			} catch (error) {
				res.status(400).json({ error: error })
			}
			break;

		case "POST":
			try {
				const newTask = await Task.create(req.body);
				res.status(201).json({ success: true, newTask: newTask })
			} catch (error) {
				res.status(400).json({ error: error })
			}
			break;

		case "DELETE":
			try {
				const removedTask = await Task.findByIdAndRemove(req.body._id)
				res.status(201).json({ success: true, removedTask: removedTask })
			} catch (error) {
				res.status(400).json({ error: error })
			}
			break;
	}
}