import { createAsyncTaskQueue, AsyncTaskQueue } from '..';

describe('AsyncTaskQueue', () => {
  it('createAsyncTaskQueue:must be return an instance of AsyncTaskQueue object', () => {
    const asyncTask = () => Promise.resolve('hello');
    const asyncQueue = createAsyncTaskQueue(asyncTask, []);
    expect(asyncQueue instanceof AsyncTaskQueue).toBe(true);
  });

  it('execute: run async task first, then execute all tasks in taskQueue', async () => {
    let calls = 0;
    const task = vitest.fn(() => {
      calls++;
    });

    const tasks = [task, task, task];
    const fn = vitest.fn();

    function asyncTask() {
      fn();
      return Promise.resolve('task resolved');
    }

    const taskQueue = createAsyncTaskQueue(asyncTask, tasks);
    await taskQueue.execute({}, {});
    expect(fn).toBeCalled();
    expect(calls).toBe(3);
  });

  it('execute:should be call onError when asyncTask reject and onError is callable', async () => {
    const asyncTask = () => Promise.reject('async task rejected');
    const onError = vitest.fn();
    const asyncQueue = createAsyncTaskQueue(asyncTask, [], onError);
    await asyncQueue.execute({}, {});
    expect(onError).toBeCalled();
  });

  it('execute:should be call onError when taskQueue throw error and onError is callable', async () => {
    let calls = 0;
    const onError = vitest.fn();
    function asyncTask() {
      return Promise.resolve('async task resolved');
    }
    function throwFn(): void {
      throw new Error('err');
    }
    const fn = vitest.fn(() => calls++);
    const tasks = [fn, fn, throwFn, fn, fn];
    const asyncQueue = createAsyncTaskQueue(asyncTask, tasks, onError);
    await asyncQueue.execute({}, {});
    expect(onError).toBeCalled();
    expect(calls).toBe(2);
  });
});
