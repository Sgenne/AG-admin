/**
 *
 * @param statusCode
 * @returns true if the given status code indicates an error. I.e.
 *          if it is of form 4xx or 5xx.
 */
export const errorStatusCode = (statusCode: number) => {
  const firstNumber = Math.floor(statusCode / 100);

  return firstNumber === 4 || firstNumber === 5;
};
