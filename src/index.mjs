import dotenv from 'dotenv';
import assert from './assert';
export * from './transform';
import { forEachEntry, hasOwn } from './utils';

const processEnv = process.env; // eslint-disable-line no-process-env

if (processEnv.NODE_ENV !== 'production') {
  dotenv.config();
}

export const get = (name, transform, env = processEnv) => {
  assert(typeof transform === 'function',
    `Transformer must be a function for environment variable: ${name}`);
  let value;
  if (hasOwn(env, name)) {
    value = env[name];
    assert(typeof value === 'string', `Environment variables can only be strings: "${name}"`);
  }
  return transform(value, name);
};

export const config = (vars, env = processEnv) => {
  const output = {};
  forEachEntry(vars, (name, transform) => {
    output[name] = get(name, transform, env);
  });
  return output;
};
