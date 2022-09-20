export const wait = async (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const max = (...args: number[]): number => {
  if (args.length === 0) {
    throw new Error('Given array is empty!');
  }
  return args.reduce(
    (prev, current) => (prev > current ? prev : current),
    args[0],
  );
}

export const promiseWithTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error('Promise timed out'),
): Promise<T> => {
  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });

  // returns a race between timeout and the passed promise
  return Promise.race<T>([promise, timeout]);
};
