import { createTaskQueue, setGlobalErrorHandler } from '..';

describe('setGlobalErrorHandler', () => {
  it('happy path', () => {
    const globalOnError = vitest.fn();
    setGlobalErrorHandler(globalOnError);

    const throwFn = () => {
      throw new Error('error');
    };

    const q1 = createTaskQueue([throwFn]);
    q1.execute({}, {});
    expect(globalOnError).toBeCalled();
  });

  it('onError and setGlobalErrorHandler exists in the same time', () => {
    const globalOnError = vitest.fn();
    const onError = vitest.fn();
    const throwFn = () => {
      throw new Error('error');
    };

    setGlobalErrorHandler(globalOnError);
    const q1 = createTaskQueue([throwFn], onError);
    q1.execute({}, {});

    expect(globalOnError).not.toBeCalled();
    expect(onError).toBeCalled();
  });
});
