/* eslint no-process-env: 0 */
const index = require('../src');

const ORIGINAL_ENV = Object.create(null);

for (const [key, value] of Object.entries(process.env)) {
  ORIGINAL_ENV[key] = value;
  delete process.env[key];
}

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
});

const ALL_EXPORTS = [
  'config',
  'string',
  'number',
  'integer',
  'boolean',
  'port',
  'json',
];

it('should provide all exports', () => {
  const members = Object.keys(index);
  expect(members.sort()).toEqual(ALL_EXPORTS.sort());
});

describe('config', () => {
  it('should read from process.env by default', () => {
    process.env.BANANA = 'banana';
    const config = index.config({
      BANANA: index.string,
    });
    expect(config).toEqual({ BANANA: 'banana' });
  });
  it('should read from custom object if specified', () => {
    const fakeEnv = { BANANA: 'peel' };
    const config = index.config({
      BANANA: index.string,
    }, fakeEnv);
    expect(config).toEqual({ BANANA: 'peel' });
  });
  it('should disallow non-string properties on custom objects', () => {
    expect(() => index.config({ BANANA: index.string }, { BANANA: 1 })).toThrow();
    expect(() => index.config({ BANANA: index.string }, { BANANA: null })).toThrow();
    expect(() => index.config({ BANANA: index.string }, { BANANA: undefined })).toThrow();
    expect(() => index.config({ BANANA: index.string }, { BANANA: true })).toThrow();
    expect(() => index.config({ BANANA: index.string }, { BANANA: {} })).toThrow();
    expect(() => index.config({ BANANA: index.string }, { BANANA: [] })).toThrow();
  });
  it('should not read prototype properties on custom objects', () => {
    const proto = { PROTO: 'oh noes' };
    const object = Object.create(proto);
    expect(() => index.config({ PROTO: index.string }, object)).toThrow();
  });
  it('should fail for non-function transformers', () => {
    const setings = {
      BANANA: 'i am not a function! :O',
    };
    expect(() => index.config(settings)).toThrow();
  });
});
