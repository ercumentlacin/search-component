export const debounce = (callback: Function, wait: number) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: any[]) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(context, args);
    }, wait);
  };
};
