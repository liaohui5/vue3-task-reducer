import { reactive, toRefs } from '@vue/reactivity';
import { getExecutorInCollection } from './queue';
import { isFunction } from './utils';

export function useTaskReducer(initState: object, queues: TaskQueueCollection): ReducerResult {
  const state = reactive(initState);
  const dispatch: Dispatcher = (type: string) => (taskPayload) => {
    const executeor = getExecutorInCollection(type, queues);
    isFunction(executeor) && executeor!(state, taskPayload);
  };

  return {
    ...toRefs(state),
    dispatch,
  };
}
