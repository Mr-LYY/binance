import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export const createDebouncer = (callback: (...args: any[]) => void, delay: number) => {
  let timer: TimeoutId | null = null;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
