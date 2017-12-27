# strict-env
*Enforce 12-factor app environment variables in development or production*

[![NPM version](https://img.shields.io/npm/v/strict-env.svg)](https://www.npmjs.com/package/strict-env)
[![NPM downloads](https://img.shields.io/npm/dt/strict-env.svg)](https://www.npmjs.com/package/strict-env)
[![Build status][build-badge]][build-link]
[![Coverage status][coverage-badge]][coverage-link]

## Recommended usage

1. Create `.env` following [dotenv][dotenv-link] formatting. Make sure to add it to your
   `.gitignore` file. Recommended to commit dummy values in a file `example.env` as well.
2. `npm i -E strict-env`
3. In `config.js` (or similar):
```js
const env = require('strict-env');

// The `config` function expects a mapping of required environment variables
// names to transformer functions. The library provides transformers for common
// use cases, but you can easily provide your own.
module.exports = env.config({
  BOOLEAN: env.boolean, // Allowed values: 'true', 'false', '1', '0'
  INTEGER: env.integer,
  JSON: env.json, // Any valid input for `JSON.parse`
  NUMBER: env.number,
  PORT: env.port,
  STRING: env.string, // Non-empty string

  // Custom transformers must either return the transformed value or throw an
  // error. They are invoked with two parameters:
  // value - String value of environment variable, or `undefined` if not set.
  //         (This allows you to specify variables that are optional or have
  //         default values.)
  // name - String name of the target environment variable, for use in error
  //        messages.
  CUSTOM: (value, name) => {
    if (/\d+/.test(value)) {
      return Number(value);
    } else {
      const message = `Env. var. should be a non-negative integer: "${name}"`;
      throw new Error(message);
    }
  },
});
```
4. Use in other files:
```js
const config = require('./config');

console.info(config.STRING); // Guaranteed to be a non-empty string
console.info(config.CUSTOM); // Guaranteed to be a non-negative integer
// Etc.
```

## Compatibility
This library should work with node versions as old as 0.10, thanks to Rollup and
Babel. (Please file an issue if that is not the case.)

[build-badge]: https://travis-ci.org/AndyBarron/strict-env.svg?branch=master
[build-link]: https://travis-ci.org/AndyBarron/strict-env
[coverage-badge]: https://coveralls.io/repos/github/AndyBarron/strict-env/badge.svg?branch=master
[coverage-link]: https://coveralls.io/github/AndyBarron/strict-env?branch=master
[dotenv-link]: https://github.com/motdotla/dotenv
