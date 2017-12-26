
const REGEX_NUMBER = /^((\d+(\.\d*)?)|(\.\d+))$/;
const REGEX_INTEGER = /\d+/;

const assert = (condition, message = 'Internal assertion error') => {
  if (!condition) {
    throw new Error(message);
  }
};

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

// eslint-disable-next-line no-process-env
const defined = (name) => name in process.env;

// eslint-disable-next-line no-process-env
const getOptionalString = (name) => process.env[name];

const getString = (name) => {
  if (!defined(name)) {
    throw new Error(`Missing required environment variable: "${name}"`);
  }
  return getOptionalString(name);
};

const getNumber = (name) => {
  const raw = getString(name);
  if (!REGEX_NUMBER.test(name)) {
    throw new Error(`Environment variable should be a number: "${name}"`);
  }
  return Number(raw);
};

const getOptionalNumber = (name) => defined(name) ?
  getNumber(name) :
  undefined;

const getInteger = (name) => {
  const raw = getString(name);
  if (!REGEX_INTEGER.test(name)) {
    throw new Error(`Environment variable should be an integer: "${name}"`);
  }
  return Number(raw);
};

const getOptionalInteger = (name) => defined(name) ?
  getInteger(name) :
  undefined;

const getBoolean = (name) => {
  const raw = getString(name);
  switch (raw) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      throw new Error(`Environment variable should be a boolean: "${name}"`);
  }
};

const getOptionalBoolean = (name) => defined(name) ?
  getBoolean(name) :
  undefined;

const getJson = (name) => {
  const raw = getString(name);
  try {
    return JSON.parse(raw);
  } catch (_error) {
    throw new Error(`Environment variable should be valid JSON: "${name}"`);
  }
};

const getOptionalJson = (name) => defined(name) ?
  getJson(name) :
  undefined;

export const init = (vars) => {
  assert(vars, 'Missing environment variable config');
  assert(typeof vars === 'object',
    'Environment variable config must be an object');
  const output = Object.create(null);
  for (const name in vars) {
    if (!hasOwn(vars, name)) {
      continue;
    }
    const type = vars[name];
    let value;
    switch (type) {
      case 'string':
        value = getString(name);
        break;
      case 'optionalString':
        value = getOptionalString(name);
        break;
      case 'number':
        value = getNumber(name);
        break;
      case 'optionalNumber':
        value = getOptionalNumber(name);
        break;
      case 'integer':
        value = getInteger(name);
        break;
      case 'optionalInteger':
        value = getOptionalInteger(name);
        break;
      case 'boolean':
        value = getBoolean(name);
        break;
      case 'optionalBoolean':
        value = getOptionalBoolean(name);
        break;
      case 'json':
        value = getJson(name);
        break;
      case 'optionalJson':
        value = getOptionalJson(name);
        break;
      default:
        throw new Error(`Invalid environment variable type: '${type}'`);
    }
    output[name] = value;
  }
  return output;
};
