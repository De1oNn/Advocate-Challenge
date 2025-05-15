import { TaskModel } from "../../../mongoose/TaskModel";

interface TaskInput {
  title: string;
  description?: string;
}

export const addTask = async (_: any, { input }: { input: TaskInput }) => {
  const newTask = new TaskModel({
    title: input.title,
    description: input.description || '',
    isDeleted: false,
  });

  await newTask.save();
  return newTask;
};
