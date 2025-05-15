import getAllTasks from './queries/getAllTasks';
import getFinishedTasksLists from './queries/getFinishedTasksLists';
import { addTask } from './mutations/addTask';
import { updateTask } from './mutations/updateTask';
import { sayHello } from './mutations/say-hello';
import { helloQuery } from './queries/hello-queries';

const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTasksLists,
    helloQuery
  },
  Mutation: {
    addTask,
    updateTask,
    sayHello,
  }
};

export default resolvers;
