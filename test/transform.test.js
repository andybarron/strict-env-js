const transform = require('../src/transform');

const VAR_NAME = 'TEST_VAR';

describe('string', () => {
  it('should allow non-empty strings', () => {
    const str = 'Hello, world!';
    expect(transform.string(str, VAR_NAME)).toBe(str);
  });
  it('should reject empty strings', () => {
    expect(() => transform.string('', VAR_NAME)).toThrow();
  });
  it('should reject non-strings', () => {
    expect(() => transform.string(undefined, VAR_NAME)).toThrow();
    expect(() => transform.string(null, VAR_NAME)).toThrow();
    expect(() => transform.string(3, VAR_NAME)).toThrow();
    expect(() => transform.string(true, VAR_NAME)).toThrow();
  });
});

describe('number', () => {
  it('should allow valid numbers', () => {
    expect(transform.number('-2.5', VAR_NAME)).toBe(-2.5);
    expect(transform.number('.5', VAR_NAME)).toBe(0.5);
    expect(transform.number('3', VAR_NAME)).toBe(3);
    expect(transform.number('-900', VAR_NAME)).toBe(-900);
    expect(transform.number('1.', VAR_NAME)).toBe(1);
    expect(transform.number('00009', VAR_NAME)).toBe(9);
  });
  it('should reject non-number strings', () => {
    expect(() => transform.number('', VAR_NAME)).toThrow();
    expect(() => transform.number('-.', VAR_NAME)).toThrow();
    expect(() => transform.number('foo', VAR_NAME)).toThrow();
    expect(() => transform.number('--9', VAR_NAME)).toThrow();
    expect(() => transform.number('1..', VAR_NAME)).toThrow();
    expect(() => transform.number('.0.', VAR_NAME)).toThrow();
  });
  it('should reject non-strings', () => {
    expect(() => transform.number(undefined, VAR_NAME)).toThrow();
    expect(() => transform.number(null, VAR_NAME)).toThrow();
    expect(() => transform.number(3, VAR_NAME)).toThrow();
    expect(() => transform.number(true, VAR_NAME)).toThrow();
  });
});

describe('integer', () => {
  it('should allow valid integers', () => {
    expect(transform.integer('-2', VAR_NAME)).toBe(-2);
    expect(transform.integer('5', VAR_NAME)).toBe(5);
    expect(transform.integer('3', VAR_NAME)).toBe(3);
    expect(transform.integer('-900', VAR_NAME)).toBe(-900);
    expect(transform.integer('1', VAR_NAME)).toBe(1);
    expect(transform.integer('00009', VAR_NAME)).toBe(9);
  });
  it('should reject non-integer strings', () => {
    expect(() => transform.integer('', VAR_NAME)).toThrow();
    expect(() => transform.integer('-.', VAR_NAME)).toThrow();
    expect(() => transform.integer('foo', VAR_NAME)).toThrow();
    expect(() => transform.integer('--9', VAR_NAME)).toThrow();
    expect(() => transform.integer('1..', VAR_NAME)).toThrow();
    expect(() => transform.integer('.0.', VAR_NAME)).toThrow();
    expect(() => transform.integer('1.2', VAR_NAME)).toThrow();
    expect(() => transform.integer('-3.9', VAR_NAME)).toThrow();
    expect(() => transform.integer('1e7', VAR_NAME)).toThrow();
  });
  it('should reject non-strings', () => {
    expect(() => transform.integer(undefined, VAR_NAME)).toThrow();
    expect(() => transform.integer(null, VAR_NAME)).toThrow();
    expect(() => transform.integer(3, VAR_NAME)).toThrow();
    expect(() => transform.integer(true, VAR_NAME)).toThrow();
  });
});

describe('boolean', () => {
  it('should allow valid booleans', () => {
    expect(transform.boolean('true', VAR_NAME)).toBe(true);
    expect(transform.boolean('True', VAR_NAME)).toBe(true);
    expect(transform.boolean('TRUE', VAR_NAME)).toBe(true);
    expect(transform.boolean('1', VAR_NAME)).toBe(true);
    expect(transform.boolean('false', VAR_NAME)).toBe(false);
    expect(transform.boolean('False', VAR_NAME)).toBe(false);
    expect(transform.boolean('FALSE', VAR_NAME)).toBe(false);
    expect(transform.boolean('0', VAR_NAME)).toBe(false);
  });
  it('should reject non-boolean strings', () => {
    expect(() => transform.boolean('t', VAR_NAME)).toThrow();
    expect(() => transform.boolean('f', VAR_NAME)).toThrow();
    expect(() => transform.boolean('yes', VAR_NAME)).toThrow();
    expect(() => transform.boolean('no', VAR_NAME)).toThrow();
  });
  it('should reject non-strings', () => {
    expect(() => transform.boolean(undefined, VAR_NAME)).toThrow();
    expect(() => transform.boolean(null, VAR_NAME)).toThrow();
    expect(() => transform.boolean(3, VAR_NAME)).toThrow();
    expect(() => transform.boolean(true, VAR_NAME)).toThrow();
  });
});

describe('port', () => {
  it('should allow valid ports', () => {
    expect(transform.port('1', VAR_NAME)).toBe(1);
    expect(transform.port('80', VAR_NAME)).toBe(80);
    expect(transform.port('3000', VAR_NAME)).toBe(3000);
    expect(transform.port('8080', VAR_NAME)).toBe(8080);
    expect(transform.port('30092', VAR_NAME)).toBe(30092);
    expect(transform.port('65535', VAR_NAME)).toBe(65535);
  });
  it('should reject non-port strings', () => {
    expect(() => transform.port('', VAR_NAME)).toThrow();
    expect(() => transform.port('foo', VAR_NAME)).toThrow();
    expect(() => transform.port('0', VAR_NAME)).toThrow();
    expect(() => transform.port('65536', VAR_NAME)).toThrow();
    expect(() => transform.port('-80', VAR_NAME)).toThrow();
    expect(() => transform.port('300.', VAR_NAME)).toThrow();
    expect(() => transform.port('90.1', VAR_NAME)).toThrow();
    expect(() => transform.port('1e7', VAR_NAME)).toThrow();
  });
  it('should reject non-strings', () => {
    expect(() => transform.port(undefined, VAR_NAME)).toThrow();
    expect(() => transform.port(null, VAR_NAME)).toThrow();
    expect(() => transform.port(3, VAR_NAME)).toThrow();
    expect(() => transform.port(true, VAR_NAME)).toThrow();
  });
});

describe('json', () => {
  it('should allow valid json', () => {
    expect(transform.json(JSON.stringify({ foo: 'bar' }), VAR_NAME)).toEqual({ foo: 'bar' });
    expect(transform.json(JSON.stringify(['foo', 'bar']), VAR_NAME)).toEqual(['foo', 'bar']);
    expect(transform.json(JSON.stringify(null), VAR_NAME)).toEqual(null);
    expect(transform.json(JSON.stringify(1), VAR_NAME)).toEqual(1);
    expect(transform.json(JSON.stringify('foo'), VAR_NAME)).toEqual('foo');
    expect(transform.json(JSON.stringify(false), VAR_NAME)).toEqual(false);
    expect(transform.json('1e7', VAR_NAME)).toEqual(1e7);
  });
  it('should reject non-json strings', () => {
    expect(() => transform.json('{foo:"bar"}', VAR_NAME)).toThrow();
    expect(() => transform.json("{'baz':'quux'}", VAR_NAME)).toThrow();
    expect(() => transform.json('{"trailingComma":true,}', VAR_NAME)).toThrow();
    expect(() => transform.json('"foo', VAR_NAME)).toThrow();
    expect(() => transform.json('bare', VAR_NAME)).toThrow();
  });
  it('should reject non-strings', () => {
    expect(() => transform.json(undefined, VAR_NAME)).toThrow();
    expect(() => transform.json(null, VAR_NAME)).toThrow();
    expect(() => transform.json(3, VAR_NAME)).toThrow();
    expect(() => transform.json(true, VAR_NAME)).toThrow();
  });
});
