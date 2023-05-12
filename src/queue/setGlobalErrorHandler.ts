import { isFunction } from '../utils';

// set global error handler
export let globalErrorHandler: CallableFunction | undefined;
export function setGlobalErrorHandler(errorHandler: CallableFunction): void {
  if (isFunction(errorHandler)) {
    globalErrorHandler = errorHandler;
  }
}
