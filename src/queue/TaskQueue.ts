import { isFunction } from '../utils';

export class TaskQueue implements TaskQueueInterface {
  constructor(public tasks: Array<CallableFunction>, public onError?: CallableFunction) { }

  execute(state: object, payload: object, response?: object): void {
    try {
      let prevTaskResult = response;
      for (const task of this.tasks) {
        prevTaskResult = task(state, { payload, response, prevTaskResult });
      }
    } catch (e) {
      isFunction(this.onError) && this.onError!(e);
    }
  }
}
