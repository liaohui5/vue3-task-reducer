import { TaskQueue, createTaskQueue } from '..';

describe.only('taskQueue', () => {
  it('createTaskQueue: must be return a object instance of TaskQueue', () => {
    const t = createTaskQueue([]);
    expect(t instanceof TaskQueue).toBe(true);
  });

  it('execute:one by one execute task in all tasks', () => {
    let calls = 0;
    const fn = vitest.fn(() => {
      calls++;
    });

    const tasks = [fn, fn, fn];
    const taskQueue = createTaskQueue(tasks);
    taskQueue.execute({}, {});
    expect(calls).toBe(3);
  });

  it('should be call onError when task throw error and onError is callable', () => {
    let calls = 0;
    const fn = vitest.fn(() => {
      calls++;
    });
    const throwFn = () => {
      throw new Error('error');
    };
    const onError = vitest.fn();

    const tasks = [fn, fn, throwFn, fn, fn];
    const taskQueue = createTaskQueue(tasks, onError);
    taskQueue.execute({}, {});

    // must be call onError
    expect(onError).toBeCalled();

    // other tasks must be not execute
    expect(calls).toBe(2);
  });
});
