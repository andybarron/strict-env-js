
const REGEX_NUMBER = /^((\d+(\.\d*)?)|(\.\d+))$/;
const REGEX_INTEGER = /\d+/;

const assert = (condition, message = 'Internal assertion error') => {
  if (!condition) {
    throw new Error(message);
  }
};

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const getString = (name) => {
  if (!(name in process.env)) {
    throw new Error(`Missing required environment variable: "${name}"`);
  }
  return process.env[name];
};

const getOptionalString = (name) => process.env[name];

const getNumber = (name) => {
  const raw = getString(name);
  if (!REGEX_NUMBER.test(name)) {
    throw new Error(`Environment variable should be a number: "${name}"`);
  }
  return Number(raw);
};

const getOptionalNumber = (name) => name in process.env ?
  getNumber(name) :
  undefined;

const getInteger = (name) => {
  const raw = getString(name);
  if (!REGEX_INTEGER.test(name)) {
    throw new Error(`Environment variable should be an integer: "${name}"`);
  }
  return Number(raw);
};

const getOptionalInteger = (name) => name in process.env ?
  getInteger(name) :
  undefined;

const getBoolean = (name) => {
  const raw = getString(name);
  switch (raw) {
    case 'true':
      return true;
      break;
    case 'false':
      return false;
      break;
    default:
      throw new Error(`Environment variable should be a boolean: "${name}"`);
      break;
  }
};

const getOptionalBoolean = (name) => name in process.env ?
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

const getOptionalJson = (name) => name in process.env ?
  getJson(name) :
  undefined;

export const init = (vars, options) => {
  assert(vars, 'Missing environment variable config');
  assert(typeof vars === 'object',
    'Environment variable config must be an object');
  const output = {};
  for (const name in vars) {
    if (!hasOwn(vars, name)) { continue; }
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
}
