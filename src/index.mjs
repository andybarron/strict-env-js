import assert from './assert';
export * from './transform';
import { forEachEntry, hasOwn } from './utils';

export const config = (vars, env = process.env) => { // eslint-disable-line no-process-env
  const output = {};
  forEachEntry(vars, (name, transform) => {
    assert(typeof transform === 'function',
      `Transformer must be a function for environment variable: ${name}`);
    let value;
    if (hasOwn(env, name)) {
      value = env[name];
      assert(typeof value === 'string', `Environment variables can only be strings: "${name}"`)
    }
    output[name] = transform(value, name);
  });
  return output;
};
