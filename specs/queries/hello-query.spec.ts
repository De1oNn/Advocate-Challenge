import getAllTasks from '@/graphql/resolvers/queries/getAllTasks';
import getFinishedTasksLists from '@/graphql/resolvers/queries/getFinishedTasksLists';
import { helloQuery } from '@/graphql/resolvers/queries/hello-queries';
import { TaskModel } from '@/mongoose/TaskModel';
import mongoose from 'mongoose';

describe('Query tests', () => {
  beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || '');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await TaskModel.deleteMany({});
  });

  test('helloQuery returns greeting string', () => {
    expect(helloQuery()).toBe('This is hello Query');
  });

test('getAllTasks returns active tasks', async () => {
  await TaskModel.create([
    { title: 'Active Task 1', isDeleted: false },
    { title: 'Deleted Task', isDeleted: true },
  ]);

  const result = await getAllTasks();

  expect(Array.isArray(result)).toBe(true);
  expect(result.every(task => task.isDeleted === false)).toBe(true);
  expect(result.map(t => t.title)).toContain('Active Task 1');
});


  test('getFinishedTasksLists returns deleted tasks', async () => {
    await TaskModel.insertMany([
      { title: 'Active Task', isDeleted: false },
      { title: 'Deleted Task 1', isDeleted: true },
      { title: 'Deleted Task 2', isDeleted: true },
    ]);

    const count = await TaskModel.countDocuments({});
    expect(count).toBe(3);

    const result = await getFinishedTasksLists();

    expect(Array.isArray(result)).toBe(true);
    expect(result.every(task => task.isDeleted === true)).toBe(true);
    expect(result.map(t => t.title)).toContain('Deleted Task 1');
    expect(result.map(t => t.title)).toContain('Deleted Task 2');
    expect(result.map(t => t.title)).not.toContain('Active Task');
  });
});
