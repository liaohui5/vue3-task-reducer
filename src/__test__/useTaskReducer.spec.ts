import { createTaskQueue, useTaskReducer } from '..';

describe('useTaskReducer', () => {
  it('happy path', () => {
    const type = 'type_str';

    const initState = {
      count: 0,
    };

    // TODO: how to add typescript support for paramters object
    const setCountTask = (state: object, { payload }) => (state.count = payload);
    const collection: TaskQueueCollection = [
      {
        type,
        queue: createTaskQueue([setCountTask]),
      },
    ];

    const { count, dispatch } = useTaskReducer(initState, collection);

    const executor = dispatch(type);
    executor(5);
    expect(count.value).toBe(5);
  });
});
