import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { addTask } from '@/graphql/resolvers/mutations/addTask';
import { updateTask } from '@/graphql/resolvers/mutations/updateTask';
import { sayHello } from '@/graphql/resolvers/mutations/say-hello';
import { TaskModel } from '@/mongoose/TaskModel';

dotenv.config(); 

const MONGODB_URI = process.env.MONGODB_URI || '';

beforeAll(async () => {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in environment variables');
  }
  await mongoose.connect(MONGODB_URI);
}, 20000); 

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await TaskModel.deleteMany({});
});

describe('Mutation tests', () => {
  test('sayHello returns greeting', () => {
    const result = sayHello({}, { name: 'World' });
    expect(result).toBe('This is hello Mutation World');
  });

  test('addTask creates a task', async () => {``
    const input = { title: 'Test Task', description: 'Test description' };
    const newTask = await addTask({}, { input });

    expect(newTask).toHaveProperty('_id');
    expect(newTask.title).toBe(input.title);
    expect(newTask.description).toBe(input.description);
    expect(newTask.isDeleted).toBe(false);
  });

  test('updateTask updates existing task', async () => {
    const task = new TaskModel({ title: 'Old title', description: 'desc' });
    await task.save();

    const updated = await updateTask({}, { id: task._id.toString(), input: { title: 'New title' } });

    expect(updated.title).toBe('New title');
    expect(updated.description).toBe('desc');
  });

  test('updateTask throws error for invalid id', async () => {
    await expect(
      updateTask({}, { id: '', input: { title: 'Will fail' } })
    ).rejects.toThrow(`Task with id not found`);
  });
});
