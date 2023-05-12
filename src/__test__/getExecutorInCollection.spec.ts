import { createTaskQueue, getExecutorInCollection } from '..';

describe('getExecutorInCollection', () => {
  it('call returned function must be run taskQueue of taskQueueCollection', () => {
    let calls = 0;
    const task = vitest.fn(() => {
      calls++;
    });
    const tasks = [task, task, task];

    const taskQueueCollection: TaskQueueCollection = [
      {
        type: 'hello',
        queue: createTaskQueue(tasks),
      },
      {
        type: 'world',
        queue: createTaskQueue([]),
      },
    ];

    const executor = getExecutorInCollection('hello', taskQueueCollection);
    executor!({}, {});

    expect(calls).toBe(3);
  });
});
