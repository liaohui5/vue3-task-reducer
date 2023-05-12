import { AsyncTaskQueue, TaskQueue } from "./queue";

/**
 * is function value or not
 */
export function isFunction(value: any): boolean {
  return Boolean(typeof value === 'function');
}
export const isCallable = isFunction;

/**
 * is object value or not
 */
export function isObject(value: any): boolean {
  return Boolean(value !== null && typeof value === 'object');
}

/**
 *is instanceof TaskQueue or AsyncTaskQueue or not
 */
export function isQueue(value: any): boolean {
  return Boolean(value instanceof TaskQueue || value instanceof AsyncTaskQueue);
}
