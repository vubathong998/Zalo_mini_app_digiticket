function baseSum(array, iteratee) {
  let result;

  for (const value of array) {
    const current = iteratee(value);
    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }
  return result;
}
export const sumBy = (array, iteratee) => {
  return array != null && array.length ? baseSum(array, iteratee) : 0;
};

export default sumBy;
