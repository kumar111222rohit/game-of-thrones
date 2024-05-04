//  debounce function to delay the  filter  by time provided as delay
export function debounce(fn: any, delay: number) {
  let timerID: ReturnType<typeof setTimeout>;
  return function (...args: any) {
    const context = this;
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
