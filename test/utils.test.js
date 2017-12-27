const utils = require('../src/utils');

describe('forEachEntry', () => {
  it('should skip non-own properties', () => {
    const proto = { prototype: true };
    const object = Object.create(proto);
    object.awesome = true;
    const fn = jest.fn();
    utils.forEachEntry(object, fn);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('awesome', true);
  });
});
