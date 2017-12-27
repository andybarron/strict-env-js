import assert from './assert';
import { hasOwn } from './utils';

const BOOLEAN_MAP = {
  0: false, // eslint-disable-line no-magic-numbers
  1: true, // eslint-disable-line no-magic-numbers
  false: false,
  true: true,
};

const REGEX_INTEGER = /^-?\d+$/;

const createTransformer = ({ typeName, validator, mapper }) => {
  assert(typeName);
  assert(mapper);
  return (string, name) => {
    let valid = true;
    if (typeof string !== 'string') {
      valid = false;
    } else if (validator instanceof RegExp) {
      valid = validator.test(string);
    } else if (typeof validator === 'function') {
      valid = validator(string);
    }
    assert(valid, `Environment variable should be a valid ${typeName}: "${name}"`);
    return mapper(string);
  };
};

export const string = createTransformer({
  mapper: (value) => value,
  typeName: 'non-empty string',
  validator: (s) => s.length,
});

export const number = createTransformer({
  mapper: (value) => Number(value),
  typeName: 'number',
  validator: /^-?((\d+(\.\d*)?)|(\.\d+))$/,
});

export const integer = createTransformer({
  mapper: (value) => Number(value),
  typeName: 'integer',
  validator: REGEX_INTEGER,
});

export const boolean = createTransformer({
  mapper: (value) => BOOLEAN_MAP[value.toLowerCase()],
  typeName: 'boolean (true/false or 1/0)',
  validator: (s) => hasOwn(BOOLEAN_MAP, s.toLowerCase()),
});

export const port = createTransformer({
  mapper: (value) => Number(value),
  typeName: 'port number',
  validator: (s) => {
    if (!REGEX_INTEGER.test(s)) {
      return false;
    }
    const n = Number(s);
    return 1 <= n && n <= 65535; // eslint-disable-line no-magic-numbers
  },
});

export const json = createTransformer({
  mapper: (value) => JSON.parse(value),
  typeName: 'JSON value',
  validator: (s) => {
    try {
      JSON.parse(s);
      return true;
    } catch (_error) {
      return false;
    }
  },
});
