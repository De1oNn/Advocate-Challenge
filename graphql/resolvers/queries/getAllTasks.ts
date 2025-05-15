import { TaskModel } from '../../../mongoose/TaskModel';

const getAllTasks = async () => {
  const tasks = await TaskModel.find({ isDeleted: false });
  return tasks;
};

export default getAllTasks;
