import resolvers from '../graphql/resolvers'; 

describe('Task resolvers', () => {
  let taskId: string;

  test('addTask creates a task', async () => {
    const result = await resolvers.Mutation.addTask(null, {
      input: { title: 'Test task', description: 'Test desc' },
    });
    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Test task');
    taskId = result.id;
  });

  test('updateTask updates the task', async () => {
    const result = await resolvers.Mutation.updateTask(null, {
      id: taskId,
      input: { title: 'Updated title' },
    });
    expect(result.title).toBe('Updated title');
  });

  test('getAllTasks returns active tasks', async () => {
    const result = await resolvers.Query.getAllTasks();
    expect(Array.isArray(result)).toBe(true);
    expect(result.some((task) => task.id === taskId)).toBe(true);
  });

  test('getFinishedTasksLists returns deleted tasks', async () => {
    const result = await resolvers.Query.getFinishedTasksLists();
    expect(Array.isArray(result)).toBe(true);
    expect(result.some((task) => task.isDeleted)).toBe(true);
  });
});
