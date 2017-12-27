
export const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const forEachEntry = (obj, f) => {
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    const value = obj[key];
    f(key, value);
  }
};
