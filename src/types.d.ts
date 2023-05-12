// executor function
interface TaskQueueExecutor {
  (state: object, payload: object, response?: object): void;
}

// TaskQueue
interface TaskQueueInterface {
  tasks: Array<TaskItemFunction>;
  onError?: CallableFunction;
  execute: TaskQueueExecutor;
}

// AsyncTaskQueue
interface AsyncTaskQueueInterface extends TaskQueueInterface {
  asyncTask: (payload: object) => Promise<any>;
  taskQueue: TaskQueueInterface;
}

// TaskQueueCollection
interface TaskQueueCollectionItem {
  type: string;
  queue: AsyncTaskQueue | TaskQueue;
}
type TaskQueueCollection = Array<TaskQueueCollectionItem> | Set<TaskQueueCollectionItem>;

// notify: get executor fucntion
type GetExecutorInCollection = (targetType: string, collection: TaskQueueCollection) => TaskQueueExecutor | void;

// dispatch: dispatch function
type Dispatcher = (type: string) => (payload: any) => any;
interface ReducerResult {
  dispatch: Dispatcher;
  [key: string]: any;
}
