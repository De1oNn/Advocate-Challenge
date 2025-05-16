import mongoose from 'mongoose';
import { TaskModel } from '../../../mongoose/TaskModel';

interface TaskInput {
  title?: string;
  description?: string;
}

export const updateTask = async (_: any, { id, input }: { id: string; input: TaskInput }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Task with id not found`);
  }

  const task = await TaskModel.findById(id);
  if (!task) {
    throw new Error(`Task with id not found`);
  }

  if (input.title !== undefined) task.title = input.title;
  if (input.description !== undefined) task.description = input.description;

  await task.save();
  return task;
};
