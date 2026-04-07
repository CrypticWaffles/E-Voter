/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */


// Polyfill util.is* functions removed in Node.js v22+ (required by sails-disk/nedb)
const util = require('util');
if (!util.isArray)         { util.isArray         = Array.isArray; }
if (!util.isBoolean)       { util.isBoolean       = (v) => typeof v === 'boolean'; }
if (!util.isBuffer)        { util.isBuffer        = Buffer.isBuffer; }
if (!util.isDate)          { util.isDate          = (v) => v instanceof Date; }
if (!util.isError)         { util.isError         = (v) => v instanceof Error; }
if (!util.isFunction)      { util.isFunction      = (v) => typeof v === 'function'; }
if (!util.isNull)          { util.isNull          = (v) => v === null; }
if (!util.isNullOrUndefined){ util.isNullOrUndefined = (v) => v == null; }
if (!util.isNumber)        { util.isNumber        = (v) => typeof v === 'number'; }
if (!util.isObject)        { util.isObject        = (v) => typeof v === 'object' && v !== null; }
if (!util.isPrimitive)     { util.isPrimitive      = (v) => v === null || (typeof v !== 'object' && typeof v !== 'function'); }
if (!util.isRegExp)        { util.isRegExp        = (v) => v instanceof RegExp; }
if (!util.isString)        { util.isString        = (v) => typeof v === 'string'; }
if (!util.isSymbol)        { util.isSymbol        = (v) => typeof v === 'symbol'; }
if (!util.isUndefined)     { util.isUndefined     = (v) => v === undefined; }

// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);



// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
var sails;
var rc;
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}//-•


// Start server
sails.lift(rc('sails'));
