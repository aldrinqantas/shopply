/**
  Generate a number between 0 and max, including max
*/
export const generateRandomInteger = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

/**
  Find the first item by key to remove and return new array
*/
export const findAndRemove = (array: any[], key: string, value) => {
  const index = array.findIndex((obj) => obj[key] === value);
  return index >= 0 ? [...array.slice(0, index), ...array.slice(index + 1)] : array;
};
