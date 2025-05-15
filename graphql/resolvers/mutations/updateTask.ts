import { TaskModel } from "../../../mongoose/TaskModel";

interface TaskInput {
  title?: string;
  description?: string;
}

export const updateTask = async (_: any, { id, input }: { id: string; input: TaskInput }) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error(`Task with id ${id} not found`);
  }

  return updatedTask;
};
