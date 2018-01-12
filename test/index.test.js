/* eslint no-process-env: 0 */

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

/* eslint-disable global-require */
const requireDotenv = () => require('dotenv');
const requireIndex = () => require('../src');
/* eslint-enable global-require */

const ORIGINAL_ENV = Object.create(null);

for (const key of Object.keys(process.env)) {
  ORIGINAL_ENV[key] = process.env[key];
}

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
  jest.resetModules();
});

const ALL_EXPORTS = [
  'get',
  'config',
  'string',
  'number',
  'integer',
  'boolean',
  'port',
  'json',
];

it('should provide all exports', () => {
  const index = requireIndex();
  const members = Object.keys(index);
  expect(members.sort()).toEqual(ALL_EXPORTS.sort());
});

describe('get', () => {
  it('should read from process.env by default', () => {
    const index = requireIndex();
    process.env.BANANA = 'banana';
    const value = index.get('BANANA', index.string);
    expect(value).toEqual('banana');
  });
  it('should read from custom object if specified', () => {
    const index = requireIndex();
    const fakeEnv = { BANANA: 'peel' };
    const value = index.get('BANANA', index.string, fakeEnv);
    expect(value).toEqual('peel');
  });
  it('should read from dotenv in non-production mode', () => {
    const dotenv = requireDotenv();
    requireIndex();
    expect(dotenv.config).toHaveBeenCalled();
  });
  it('should ignore dotenv in production mode', () => {
    process.env.NODE_ENV = 'production';
    const dotenv = requireDotenv();
    requireIndex();
    expect(dotenv.config).not.toHaveBeenCalled();
  });
  it('should disallow non-string properties on custom objects', () => {
    const index = requireIndex();
    expect(() => index.get('BANANA', index.string, { BANANA: 1 })).toThrow();
    expect(() => index.get('BANANA', index.string, { BANANA: null })).toThrow();
    expect(() => index.get('BANANA', index.string, { BANANA: undefined })).toThrow();
    expect(() => index.get('BANANA', index.string, { BANANA: true })).toThrow();
    expect(() => index.get('BANANA', index.string, { BANANA: {} })).toThrow();
    expect(() => index.get('BANANA', index.string, { BANANA: [] })).toThrow();
  });
  it('should not read prototype properties on custom objects', () => {
    const index = requireIndex();
    const proto = { PROTO: 'oh noes' };
    const object = Object.create(proto);
    expect(() => index.get('PROTO', index.string, object)).toThrow();
  });
  it('should fail for non-function transformers', () => {
    const index = requireIndex();
    expect(() => index.get('BANANA', 'i am not a function! :O')).toThrow();
  });
});

describe('config', () => {
  it('should read from process.env by default', () => {
    const index = requireIndex();
    process.env.BANANA = 'banana';
    const config = index.config({
      BANANA: index.string,
    });
    expect(config).toEqual({ BANANA: 'banana' });
  });
  it('should read from custom object if specified', () => {
    const index = requireIndex();
    const fakeEnv = { BANANA: 'peel' };
    const config = index.config({
      BANANA: index.string,
    }, fakeEnv);
    expect(config).toEqual({ BANANA: 'peel' });
  });
});
