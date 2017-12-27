
export default (condition, message = 'Assertion failed') => {
  if (!condition) {
    throw new Error(message);
  }
};
