import { TaskQueue } from './TaskQueue';
import { isFunction } from '../utils';
import { createTaskQueue } from '.';

export class AsyncTaskQueue implements AsyncTaskQueueInterface {
  public taskQueue: TaskQueue;
  constructor(
    public asyncTask: (payload: object) => Promise<any>,
    public tasks: Array<CallableFunction>,
    public onError?: CallableFunction
  ) {
    this.taskQueue = createTaskQueue(this.tasks, this.onError);
  }

  async execute(state: object, payload: object): Promise<void> {
    await this.asyncTask(payload)
      .then((response) => this.taskQueue.execute(state, payload, response))
      .catch((reason) => isFunction(this.onError) && this.onError!(reason));
  }
}
