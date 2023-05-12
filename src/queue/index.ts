import { AsyncTaskQueue } from './AsyncTaskQueue';
import { TaskQueue } from './TaskQueue';
import { globalErrorHandler } from './setGlobalErrorHandler';
import { isObject, isQueue } from '../utils';

export function createTaskQueue(tasks: Array<CallableFunction>, onError?: CallableFunction): TaskQueue {
  return new TaskQueue(tasks, onError || globalErrorHandler);
}

export function createAsyncTaskQueue(
  asyncTask: () => Promise<any>,
  tasks: Array<CallableFunction>,
  onError?: CallableFunction
): AsyncTaskQueue {
  return new AsyncTaskQueue(asyncTask, tasks, onError || globalErrorHandler);
}

export function createTaskQueueCollection(collectionObject: object): TaskQueueCollection {
  if (!isObject(collectionObject)) {
    throw new TypeError('[createTaskQueueCollection] collection object must be an object');
  }
  const collection: TaskQueueCollection = [];
  for (const [type, queue] of Object.entries(collectionObject)) {
    isQueue(queue) && collection.push({ type, queue });
  }
  return collection;
}

export const getExecutorInCollection: GetExecutorInCollection = (
  targetType: string,
  taskQueueCollection: TaskQueueCollection
): TaskQueueExecutor | void => {
  for (const { type, queue } of taskQueueCollection) {
    if (Object.is(type, targetType)) {
      return queue.execute.bind(queue);
    }
  }
};

export * from './TaskQueue';
export * from './AsyncTaskQueue';
export * from './setGlobalErrorHandler';
