import { TaskModel } from '../../../mongoose/TaskModel';

const getFinishedTasksLists = async () => {
  const finishedTasks = await TaskModel.find({ isDeleted: true });
  return finishedTasks;
};

export default getFinishedTasksLists;
