(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Email = Package.email.Email;
var EmailInternals = Package.email.EmailInternals;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"rocketchat:mongo-config":{"server":{"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/rocketchat_mongo-config/server/index.js                                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
let tls;
module.link("tls", {
  default(v) {
    tls = v;
  }

}, 0);
let PassThrough;
module.link("stream", {
  PassThrough(v) {
    PassThrough = v;
  }

}, 1);
let EmailTest;
module.link("meteor/email", {
  EmailTest(v) {
    EmailTest = v;
  }

}, 2);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 3);
let HTTP;
module.link("meteor/http", {
  HTTP(v) {
    HTTP = v;
  }

}, 4);

if (!process.env.USE_NATIVE_OPLOG) {
  Package['disable-oplog'] = {};
} // Set default HTTP call timeout to 20s


const envTimeout = parseInt(process.env.HTTP_DEFAULT_TIMEOUT, 10);
const timeout = !isNaN(envTimeout) ? envTimeout : 20000;
const {
  call
} = HTTP;

HTTP.call = function _call(method, url) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let callback = arguments.length > 3 ? arguments[3] : undefined;
  const defaultTimeout = 'timeout' in options ? options : _objectSpread({}, options, {
    timeout
  });
  return call.call(HTTP, method, url, defaultTimeout, callback);
}; // FIX For TLS error see more here https://github.com/RocketChat/Rocket.Chat/issues/9316
// TODO: Remove after NodeJS fix it, more information
// https://github.com/nodejs/node/issues/16196
// https://github.com/nodejs/node/pull/16853
// This is fixed in Node 10, but this supports LTS versions


tls.DEFAULT_ECDH_CURVE = 'auto';

const mongoConnectionOptions = _objectSpread({}, !process.env.MONGO_URL.includes('retryWrites') && {
  retryWrites: false
});

const mongoOptionStr = process.env.MONGO_OPTIONS;

if (typeof mongoOptionStr !== 'undefined') {
  const mongoOptions = JSON.parse(mongoOptionStr);
  Object.assign(mongoConnectionOptions, mongoOptions);
}

if (Object.keys(mongoConnectionOptions).length > 0) {
  Mongo.setConnectionOptions(mongoConnectionOptions);
}

process.env.HTTP_FORWARDED_COUNT = process.env.HTTP_FORWARDED_COUNT || '1'; // Send emails to a "fake" stream instead of print them in console

if (process.env.NODE_ENV !== 'development' || process.env.TEST_MODE) {
  const stream = new PassThrough();
  EmailTest.overrideOutputStream(stream);
  stream.on('data', () => {});
  stream.on('end', () => {});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/rocketchat:mongo-config/server/index.js");

/* Exports */
Package._define("rocketchat:mongo-config", exports);

})();

//# sourceURL=meteor://💻app/packages/rocketchat_mongo-config.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcm9ja2V0Y2hhdDptb25nby1jb25maWcvc2VydmVyL2luZGV4LmpzIl0sIm5hbWVzIjpbIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJsaW5rIiwiZGVmYXVsdCIsInYiLCJ0bHMiLCJQYXNzVGhyb3VnaCIsIkVtYWlsVGVzdCIsIk1vbmdvIiwiSFRUUCIsInByb2Nlc3MiLCJlbnYiLCJVU0VfTkFUSVZFX09QTE9HIiwiUGFja2FnZSIsImVudlRpbWVvdXQiLCJwYXJzZUludCIsIkhUVFBfREVGQVVMVF9USU1FT1VUIiwidGltZW91dCIsImlzTmFOIiwiY2FsbCIsIl9jYWxsIiwibWV0aG9kIiwidXJsIiwib3B0aW9ucyIsImNhbGxiYWNrIiwiZGVmYXVsdFRpbWVvdXQiLCJERUZBVUxUX0VDREhfQ1VSVkUiLCJtb25nb0Nvbm5lY3Rpb25PcHRpb25zIiwiTU9OR09fVVJMIiwiaW5jbHVkZXMiLCJyZXRyeVdyaXRlcyIsIm1vbmdvT3B0aW9uU3RyIiwiTU9OR09fT1BUSU9OUyIsIm1vbmdvT3B0aW9ucyIsIkpTT04iLCJwYXJzZSIsIk9iamVjdCIsImFzc2lnbiIsImtleXMiLCJsZW5ndGgiLCJzZXRDb25uZWN0aW9uT3B0aW9ucyIsIkhUVFBfRk9SV0FSREVEX0NPVU5UIiwiTk9ERV9FTlYiLCJURVNUX01PREUiLCJzdHJlYW0iLCJvdmVycmlkZU91dHB1dFN0cmVhbSIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFKOztBQUFrQkMsTUFBTSxDQUFDQyxJQUFQLENBQVksc0NBQVosRUFBbUQ7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0osaUJBQWEsR0FBQ0ksQ0FBZDtBQUFnQjs7QUFBNUIsQ0FBbkQsRUFBaUYsQ0FBakY7QUFBbEIsSUFBSUMsR0FBSjtBQUFRSixNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFaLEVBQWtCO0FBQUNDLFNBQU8s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O0FBQ0EsSUFBSS9CLE9BQU8sQ0FBQ0MsR0FBUixDQUFZK0IsUUFBWixLQUF5QixhQUF6QixJQUEwQ2hDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZ0MsU0FBMUQsRUFBcUU7QUFDcEUsUUFBTUMsTUFBTSxHQUFHLElBQUl0QyxXQUFKLEVBQWY7QUFDQUMsV0FBUyxDQUFDc0Msb0JBQVYsQ0FBK0JELE1BQS9CO0FBQ0FBLFFBQU0sQ0FBQ0UsRUFBUCxDQUFVLE1BQVYsRUFBa0IsTUFBTSxDQUFFLENBQTFCO0FBQ0FGLFFBQU0sQ0FBQ0UsRUFBUCxDQUFVLEtBQVYsRUFBaUIsTUFBTSxDQUFFLENBQXpCO0FBQ0EsQyIsImZpbGUiOiIvcGFja2FnZXMvcm9ja2V0Y2hhdF9tb25nby1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGxzIGZyb20gJ3Rscyc7XG5pbXBvcnQgeyBQYXNzVGhyb3VnaCB9IGZyb20gJ3N0cmVhbSc7XG5cbmltcG9ydCB7IEVtYWlsVGVzdCB9IGZyb20gJ21ldGVvci9lbWFpbCc7XG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgeyBIVFRQIH0gZnJvbSAnbWV0ZW9yL2h0dHAnO1xuXG5pZiAoIXByb2Nlc3MuZW52LlVTRV9OQVRJVkVfT1BMT0cpIHtcblx0UGFja2FnZVsnZGlzYWJsZS1vcGxvZyddID0ge307XG59XG5cbi8vIFNldCBkZWZhdWx0IEhUVFAgY2FsbCB0aW1lb3V0IHRvIDIwc1xuY29uc3QgZW52VGltZW91dCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LkhUVFBfREVGQVVMVF9USU1FT1VULCAxMCk7XG5jb25zdCB0aW1lb3V0ID0gIWlzTmFOKGVudlRpbWVvdXQpID8gZW52VGltZW91dCA6IDIwMDAwO1xuXG5jb25zdCB7IGNhbGwgfSA9IEhUVFA7XG5IVFRQLmNhbGwgPSBmdW5jdGlvbiBfY2FsbChtZXRob2QsIHVybCwgb3B0aW9ucyA9IHt9LCBjYWxsYmFjaykge1xuXHRjb25zdCBkZWZhdWx0VGltZW91dCA9ICd0aW1lb3V0JyBpbiBvcHRpb25zID8gb3B0aW9ucyA6IHsgLi4ub3B0aW9ucywgdGltZW91dCB9O1xuXG5cdHJldHVybiBjYWxsLmNhbGwoSFRUUCwgbWV0aG9kLCB1cmwsIGRlZmF1bHRUaW1lb3V0LCBjYWxsYmFjayk7XG59O1xuXG4vLyBGSVggRm9yIFRMUyBlcnJvciBzZWUgbW9yZSBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2NrZXRDaGF0L1JvY2tldC5DaGF0L2lzc3Vlcy85MzE2XG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgTm9kZUpTIGZpeCBpdCwgbW9yZSBpbmZvcm1hdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy8xNjE5NlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL3B1bGwvMTY4NTNcbi8vIFRoaXMgaXMgZml4ZWQgaW4gTm9kZSAxMCwgYnV0IHRoaXMgc3VwcG9ydHMgTFRTIHZlcnNpb25zXG50bHMuREVGQVVMVF9FQ0RIX0NVUlZFID0gJ2F1dG8nO1xuXG5jb25zdCBtb25nb0Nvbm5lY3Rpb25PcHRpb25zID0ge1xuXHQvLyBhZGQgcmV0cnlXcml0ZXM9ZmFsc2UgaWYgbm90IHByZXNlbnQgaW4gTU9OR09fVVJMXG5cdC4uLiFwcm9jZXNzLmVudi5NT05HT19VUkwuaW5jbHVkZXMoJ3JldHJ5V3JpdGVzJykgJiYgeyByZXRyeVdyaXRlczogZmFsc2UgfSxcbn07XG5cbmNvbnN0IG1vbmdvT3B0aW9uU3RyID0gcHJvY2Vzcy5lbnYuTU9OR09fT1BUSU9OUztcbmlmICh0eXBlb2YgbW9uZ29PcHRpb25TdHIgIT09ICd1bmRlZmluZWQnKSB7XG5cdGNvbnN0IG1vbmdvT3B0aW9ucyA9IEpTT04ucGFyc2UobW9uZ29PcHRpb25TdHIpO1xuXG5cdE9iamVjdC5hc3NpZ24obW9uZ29Db25uZWN0aW9uT3B0aW9ucywgbW9uZ29PcHRpb25zKTtcbn1cblxuaWYgKE9iamVjdC5rZXlzKG1vbmdvQ29ubmVjdGlvbk9wdGlvbnMpLmxlbmd0aCA+IDApIHtcblx0TW9uZ28uc2V0Q29ubmVjdGlvbk9wdGlvbnMobW9uZ29Db25uZWN0aW9uT3B0aW9ucyk7XG59XG5cbnByb2Nlc3MuZW52LkhUVFBfRk9SV0FSREVEX0NPVU5UID0gcHJvY2Vzcy5lbnYuSFRUUF9GT1JXQVJERURfQ09VTlQgfHwgJzEnO1xuXG4vLyBTZW5kIGVtYWlscyB0byBhIFwiZmFrZVwiIHN0cmVhbSBpbnN0ZWFkIG9mIHByaW50IHRoZW0gaW4gY29uc29sZVxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnIHx8IHByb2Nlc3MuZW52LlRFU1RfTU9ERSkge1xuXHRjb25zdCBzdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0RW1haWxUZXN0Lm92ZXJyaWRlT3V0cHV0U3RyZWFtKHN0cmVhbSk7XG5cdHN0cmVhbS5vbignZGF0YScsICgpID0+IHt9KTtcblx0c3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB7fSk7XG59XG4iXX0=
