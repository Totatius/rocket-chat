(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var DDPRateLimiter = Package['ddp-rate-limiter'].DDPRateLimiter;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var Hook = Package['callback-hook'].Hook;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Accounts, options, stampedLoginToken, handler, name, query, oldestValidDate, user;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-base":{"server_main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/accounts-base/server_main.js                                                                           //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
!function (module1) {
  module1.export({
    AccountsServer: () => AccountsServer
  });
  let AccountsServer;
  module1.link("./accounts_server.js", {
    AccountsServer(v) {
      AccountsServer = v;
    }

  }, 0);

  /**
   * @namespace Accounts
   * @summary The namespace for all server-side accounts-related methods.
   */
  Accounts = new AccountsServer(Meteor.server); // Users table. Don't use the normal autopublish, since we want to hide
  // some fields. Code to autopublish this is in accounts_server.js.
  // XXX Allow users to configure this collection name.

  /**
   * @summary A [Mongo.Collection](#collections) containing user documents.
   * @locus Anywhere
   * @type {Mongo.Collection}
   * @importFromPackage meteor
  */

  Meteor.users = Accounts.users;
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accounts_common.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/accounts-base/accounts_common.js                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
module.export({
  AccountsCommon: () => AccountsCommon,
  EXPIRE_TOKENS_INTERVAL_MS: () => EXPIRE_TOKENS_INTERVAL_MS,
  CONNECTION_CLOSE_DELAY_MS: () => CONNECTION_CLOSE_DELAY_MS
});

class AccountsCommon {
  constructor(options) {
    // Currently this is read directly by packages like accounts-password
    // and accounts-ui-unstyled.
    this._options = {}; // Note that setting this.connection = null causes this.users to be a
    // LocalCollection, which is not what we want.

    this.connection = undefined;

    this._initConnection(options || {}); // There is an allow call in accounts_server.js that restricts writes to
    // this collection.


    this.users = new Mongo.Collection("users", {
      _preventAutopublish: true,
      connection: this.connection
    }); // Callback exceptions are printed with Meteor._debug and ignored.

    this._onLoginHook = new Hook({
      bindEnvironment: false,
      debugPrintExceptions: "onLogin callback"
    });
    this._onLoginFailureHook = new Hook({
      bindEnvironment: false,
      debugPrintExceptions: "onLoginFailure callback"
    });
    this._onLogoutHook = new Hook({
      bindEnvironment: false,
      debugPrintExceptions: "onLogout callback"
    }); // Expose for testing.

    this.DEFAULT_LOGIN_EXPIRATION_DAYS = DEFAULT_LOGIN_EXPIRATION_DAYS;
    this.LOGIN_UNEXPIRING_TOKEN_DAYS = LOGIN_UNEXPIRING_TOKEN_DAYS; // Thrown when the user cancels the login process (eg, closes an oauth
    // popup, declines retina scan, etc)

    const lceName = 'Accounts.LoginCancelledError';
    this.LoginCancelledError = Meteor.makeErrorType(lceName, function (description) {
      this.message = description;
    });
    this.LoginCancelledError.prototype.name = lceName; // This is used to transmit specific subclass errors over the wire. We
    // should come up with a more generic way to do this (eg, with some sort of
    // symbolic error code rather than a number).

    this.LoginCancelledError.numericError = 0x8acdc2f; // loginServiceConfiguration and ConfigError are maintained for backwards compatibility

    Meteor.startup(() => {
      const {
        ServiceConfiguration
      } = Package['service-configuration'];
      this.loginServiceConfiguration = ServiceConfiguration.configurations;
      this.ConfigError = ServiceConfiguration.ConfigError;
    });
  }
  /**
   * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.
   * @locus Anywhere
   */


  userId() {
    throw new Error("userId method not implemented");
  } // merge the defaultFieldSelector with an existing options object


  _addDefaultFieldSelector() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // this will be the most common case for most people, so make it quick
    if (!this._options.defaultFieldSelector) return options; // if no field selector then just use defaultFieldSelector

    if (!options.fields) return _objectSpread({}, options, {
      fields: this._options.defaultFieldSelector
    }); // if empty field selector then the full user object is explicitly requested, so obey

    const keys = Object.keys(options.fields);
    if (!keys.length) return options; // if the requested fields are +ve then ignore defaultFieldSelector
    // assume they are all either +ve or -ve because Mongo doesn't like mixed

    if (!!options.fields[keys[0]]) return options; // The requested fields are -ve.
    // If the defaultFieldSelector is +ve then use requested fields, otherwise merge them

    const keys2 = Object.keys(this._options.defaultFieldSelector);
    return this._options.defaultFieldSelector[keys2[0]] ? options : _objectSpread({}, options, {
      fields: _objectSpread({}, options.fields, {}, this._options.defaultFieldSelector)
    });
  }
  /**
   * @summary Get the current user record, or `null` if no user is logged in. A reactive data source.
   * @locus Anywhere
   * @param {Object} [options]
   * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
   */


  user(options) {
    const userId = this.userId();
    return userId ? this.users.findOne(userId, this._addDefaultFieldSelector(options)) : null;
  } // Set up config for the accounts system. Call this on both the client
  // and the server.
  //
  // Note that this method gets overridden on AccountsServer.prototype, but
  // the overriding method calls the overridden method.
  //
  // XXX we should add some enforcement that this is called on both the
  // client and the server. Otherwise, a user can
  // 'forbidClientAccountCreation' only on the client and while it looks
  // like their app is secure, the server will still accept createUser
  // calls. https://github.com/meteor/meteor/issues/828
  //
  // @param options {Object} an object with fields:
  // - sendVerificationEmail {Boolean}
  //     Send email address verification emails to new users created from
  //     client signups.
  // - forbidClientAccountCreation {Boolean}
  //     Do not allow clients to create accounts directly.
  // - restrictCreationByEmailDomain {Function or String}
  //     Require created users to have an email matching the function or
  //     having the string as domain.
  // - loginExpirationInDays {Number}
  //     Number of days since login until a user is logged out (login token
  //     expires).
  // - passwordResetTokenExpirationInDays {Number}
  //     Number of days since password reset token creation until the
  //     token cannt be used any longer (password reset token expires).
  // - ambiguousErrorMessages {Boolean}
  //     Return ambiguous error messages from login failures to prevent
  //     user enumeration.
  // - bcryptRounds {Number}
  //     Allows override of number of bcrypt rounds (aka work factor) used
  //     to store passwords.

  /**
   * @summary Set global accounts options.
   * @locus Anywhere
   * @param {Object} options
   * @param {Boolean} options.sendVerificationEmail New users with an email address will receive an address verification email.
   * @param {Boolean} options.forbidClientAccountCreation Calls to [`createUser`](#accounts_createuser) from the client will be rejected. In addition, if you are using [accounts-ui](#accountsui), the "Create account" link will not be available.
   * @param {String | Function} options.restrictCreationByEmailDomain If set to a string, only allows new users if the domain part of their email address matches the string. If set to a function, only allows new users if the function returns true.  The function is passed the full email address of the proposed new user.  Works with password-based sign-in and external services that expose email addresses (Google, Facebook, GitHub). All existing users still can log in after enabling this option. Example: `Accounts.config({ restrictCreationByEmailDomain: 'school.edu' })`.
   * @param {Number} options.loginExpirationInDays The number of days from when a user logs in until their token expires and they are logged out. Defaults to 90. Set to `null` to disable login expiration.
   * @param {String} options.oauthSecretKey When using the `oauth-encryption` package, the 16 byte key using to encrypt sensitive account credentials in the database, encoded in base64.  This option may only be specifed on the server.  See packages/oauth-encryption/README.md for details.
   * @param {Number} options.passwordResetTokenExpirationInDays The number of days from when a link to reset password is sent until token expires and user can't reset password with the link anymore. Defaults to 3.
   * @param {Number} options.passwordEnrollTokenExpirationInDays The number of days from when a link to set inital password is sent until token expires and user can't set password with the link anymore. Defaults to 30.
   * @param {Boolean} options.ambiguousErrorMessages Return ambiguous error messages from login failures to prevent user enumeration. Defaults to false.
   * @param {MongoFieldSpecifier} options.defaultFieldSelector To exclude by default large custom fields from `Meteor.user()` and `Meteor.findUserBy...()` functions when called without a field selector, and all `onLogin`, `onLoginFailure` and `onLogout` callbacks.  Example: `Accounts.config({ defaultFieldSelector: { myBigArray: 0 }})`.
   */


  config(options) {
    // We don't want users to accidentally only call Accounts.config on the
    // client, where some of the options will have partial effects (eg removing
    // the "create account" button from accounts-ui if forbidClientAccountCreation
    // is set, or redirecting Google login to a specific-domain page) without
    // having their full effects.
    if (Meteor.isServer) {
      __meteor_runtime_config__.accountsConfigCalled = true;
    } else if (!__meteor_runtime_config__.accountsConfigCalled) {
      // XXX would be nice to "crash" the client and replace the UI with an error
      // message, but there's no trivial way to do this.
      Meteor._debug("Accounts.config was called on the client but not on the " + "server; some configuration options may not take effect.");
    } // We need to validate the oauthSecretKey option at the time
    // Accounts.config is called. We also deliberately don't store the
    // oauthSecretKey in Accounts._options.


    if (Object.prototype.hasOwnProperty.call(options, 'oauthSecretKey')) {
      if (Meteor.isClient) {
        throw new Error("The oauthSecretKey option may only be specified on the server");
      }

      if (!Package["oauth-encryption"]) {
        throw new Error("The oauth-encryption package must be loaded to set oauthSecretKey");
      }

      Package["oauth-encryption"].OAuthEncryption.loadKey(options.oauthSecretKey);
      options = _objectSpread({}, options);
      delete options.oauthSecretKey;
    } // validate option keys


    const VALID_KEYS = ["sendVerificationEmail", "forbidClientAccountCreation", "passwordEnrollTokenExpirationInDays", "restrictCreationByEmailDomain", "loginExpirationInDays", "passwordResetTokenExpirationInDays", "ambiguousErrorMessages", "bcryptRounds", "defaultFieldSelector"];
    Object.keys(options).forEach(key => {
      if (!VALID_KEYS.includes(key)) {
        throw new Error("Accounts.config: Invalid key: ".concat(key));
      }
    }); // set values in Accounts._options

    VALID_KEYS.forEach(key => {
      if (key in options) {
        if (key in this._options) {
          throw new Error("Can't set `".concat(key, "` more than once"));
        }

        this._options[key] = options[key];
      }
    });
  }
  /**
   * @summary Register a callback to be called after a login attempt succeeds.
   * @locus Anywhere
   * @param {Function} func The callback to be called when login is successful.
   *                        The callback receives a single object that
   *                        holds login details. This object contains the login
   *                        result type (password, resume, etc.) on both the
   *                        client and server. `onLogin` callbacks registered
   *                        on the server also receive extra data, such
   *                        as user details, connection information, etc.
   */


  onLogin(func) {
    let ret = this._onLoginHook.register(func); // call the just registered callback if already logged in


    this._startupCallback(ret.callback);

    return ret;
  }
  /**
   * @summary Register a callback to be called after a login attempt fails.
   * @locus Anywhere
   * @param {Function} func The callback to be called after the login has failed.
   */


  onLoginFailure(func) {
    return this._onLoginFailureHook.register(func);
  }
  /**
   * @summary Register a callback to be called after a logout attempt succeeds.
   * @locus Anywhere
   * @param {Function} func The callback to be called when logout is successful.
   */


  onLogout(func) {
    return this._onLogoutHook.register(func);
  }

  _initConnection(options) {
    if (!Meteor.isClient) {
      return;
    } // The connection used by the Accounts system. This is the connection
    // that will get logged in by Meteor.login(), and this is the
    // connection whose login state will be reflected by Meteor.userId().
    //
    // It would be much preferable for this to be in accounts_client.js,
    // but it has to be here because it's needed to create the
    // Meteor.users collection.


    if (options.connection) {
      this.connection = options.connection;
    } else if (options.ddpUrl) {
      this.connection = DDP.connect(options.ddpUrl);
    } else if (typeof __meteor_runtime_config__ !== "undefined" && __meteor_runtime_config__.ACCOUNTS_CONNECTION_URL) {
      // Temporary, internal hook to allow the server to point the client
      // to a different authentication server. This is for a very
      // particular use case that comes up when implementing a oauth
      // server. Unsupported and may go away at any point in time.
      //
      // We will eventually provide a general way to use account-base
      // against any DDP connection, not just one special one.
      this.connection = DDP.connect(__meteor_runtime_config__.ACCOUNTS_CONNECTION_URL);
    } else {
      this.connection = Meteor.connection;
    }
  }

  _getTokenLifetimeMs() {
    // When loginExpirationInDays is set to null, we'll use a really high
    // number of days (LOGIN_UNEXPIRABLE_TOKEN_DAYS) to simulate an
    // unexpiring token.
    const loginExpirationInDays = this._options.loginExpirationInDays === null ? LOGIN_UNEXPIRING_TOKEN_DAYS : this._options.loginExpirationInDays;
    return (loginExpirationInDays || DEFAULT_LOGIN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;
  }

  _getPasswordResetTokenLifetimeMs() {
    return (this._options.passwordResetTokenExpirationInDays || DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;
  }

  _getPasswordEnrollTokenLifetimeMs() {
    return (this._options.passwordEnrollTokenExpirationInDays || DEFAULT_PASSWORD_ENROLL_TOKEN_EXPIRATION_DAYS) * 24 * 60 * 60 * 1000;
  }

  _tokenExpiration(when) {
    // We pass when through the Date constructor for backwards compatibility;
    // `when` used to be a number.
    return new Date(new Date(when).getTime() + this._getTokenLifetimeMs());
  }

  _tokenExpiresSoon(when) {
    let minLifetimeMs = .1 * this._getTokenLifetimeMs();

    const minLifetimeCapMs = MIN_TOKEN_LIFETIME_CAP_SECS * 1000;

    if (minLifetimeMs > minLifetimeCapMs) {
      minLifetimeMs = minLifetimeCapMs;
    }

    return new Date() > new Date(when) - minLifetimeMs;
  } // No-op on the server, overridden on the client.


  _startupCallback(callback) {}

}

// Note that Accounts is defined separately in accounts_client.js and
// accounts_server.js.

/**
 * @summary Get the current user id, or `null` if no user is logged in. A reactive data source.
 * @locus Anywhere but publish functions
 * @importFromPackage meteor
 */
Meteor.userId = () => Accounts.userId();
/**
 * @summary Get the current user record, or `null` if no user is logged in. A reactive data source.
 * @locus Anywhere but publish functions
 * @importFromPackage meteor
 * @param {Object} [options]
 * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
 */


Meteor.user = options => Accounts.user(options); // how long (in days) until a login token expires


const DEFAULT_LOGIN_EXPIRATION_DAYS = 90; // how long (in days) until reset password token expires

const DEFAULT_PASSWORD_RESET_TOKEN_EXPIRATION_DAYS = 3; // how long (in days) until enrol password token expires

const DEFAULT_PASSWORD_ENROLL_TOKEN_EXPIRATION_DAYS = 30; // Clients don't try to auto-login with a token that is going to expire within
// .1 * DEFAULT_LOGIN_EXPIRATION_DAYS, capped at MIN_TOKEN_LIFETIME_CAP_SECS.
// Tries to avoid abrupt disconnects from expiring tokens.

const MIN_TOKEN_LIFETIME_CAP_SECS = 3600; // one hour
// how often (in milliseconds) we check for expired tokens

const EXPIRE_TOKENS_INTERVAL_MS = 600 * 1000;
const CONNECTION_CLOSE_DELAY_MS = 10 * 1000;
// A large number of expiration days (approximately 100 years worth) that is
// used when creating unexpiring tokens.
const LOGIN_UNEXPIRING_TOKEN_DAYS = 365 * 100;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accounts_server.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/accounts-base/accounts_server.js                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
let _objectWithoutProperties;

module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }

}, 0);

let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 1);
module.export({
  AccountsServer: () => AccountsServer
});
let crypto;
module.link("crypto", {
  default(v) {
    crypto = v;
  }

}, 0);
let AccountsCommon, EXPIRE_TOKENS_INTERVAL_MS, CONNECTION_CLOSE_DELAY_MS;
module.link("./accounts_common.js", {
  AccountsCommon(v) {
    AccountsCommon = v;
  },

  EXPIRE_TOKENS_INTERVAL_MS(v) {
    EXPIRE_TOKENS_INTERVAL_MS = v;
  },

  CONNECTION_CLOSE_DELAY_MS(v) {
    CONNECTION_CLOSE_DELAY_MS = v;
  }

}, 1);
const hasOwn = Object.prototype.hasOwnProperty;
/**
 * @summary Constructor for the `Accounts` namespace on the server.
 * @locus Server
 * @class AccountsServer
 * @extends AccountsCommon
 * @instancename accountsServer
 * @param {Object} server A server object such as `Meteor.server`.
 */

class AccountsServer extends AccountsCommon {
  // Note that this constructor is less likely to be instantiated multiple
  // times than the `AccountsClient` constructor, because a single server
  // can provide only one set of methods.
  constructor(server) {
    super();
    this._server = server || Meteor.server; // Set up the server's methods, as if by calling Meteor.methods.

    this._initServerMethods();

    this._initAccountDataHooks(); // If autopublish is on, publish these user fields. Login service
    // packages (eg accounts-google) add to these by calling
    // addAutopublishFields.  Notably, this isn't implemented with multiple
    // publishes since DDP only merges only across top-level fields, not
    // subfields (such as 'services.facebook.accessToken')


    this._autopublishFields = {
      loggedInUser: ['profile', 'username', 'emails'],
      otherUsers: ['profile', 'username']
    };

    this._initServerPublications(); // connectionId -> {connection, loginToken}


    this._accountData = {}; // connection id -> observe handle for the login token that this connection is
    // currently associated with, or a number. The number indicates that we are in
    // the process of setting up the observe (using a number instead of a single
    // sentinel allows multiple attempts to set up the observe to identify which
    // one was theirs).

    this._userObservesForConnections = {};
    this._nextUserObserveNumber = 1; // for the number described above.
    // list of all registered handlers.

    this._loginHandlers = [];
    setupUsersCollection(this.users);
    setupDefaultLoginHandlers(this);
    setExpireTokensInterval(this);
    this._validateLoginHook = new Hook({
      bindEnvironment: false
    });
    this._validateNewUserHooks = [defaultValidateNewUserHook.bind(this)];

    this._deleteSavedTokensForAllUsersOnStartup();

    this._skipCaseInsensitiveChecksForTest = {}; // XXX These should probably not actually be public?

    this.urls = {
      resetPassword: token => Meteor.absoluteUrl("#/reset-password/".concat(token)),
      verifyEmail: token => Meteor.absoluteUrl("#/verify-email/".concat(token)),
      enrollAccount: token => Meteor.absoluteUrl("#/enroll-account/".concat(token))
    };
    this.addDefaultRateLimit();
  } ///
  /// CURRENT USER
  ///
  // @override of "abstract" non-implementation in accounts_common.js


  userId() {
    // This function only works if called inside a method or a pubication.
    // Using any of the infomation from Meteor.user() in a method or
    // publish function will always use the value from when the function first
    // runs. This is likely not what the user expects. The way to make this work
    // in a method or publish function is to do Meteor.find(this.userId).observe
    // and recompute when the user record changes.
    const currentInvocation = DDP._CurrentMethodInvocation.get() || DDP._CurrentPublicationInvocation.get();

    if (!currentInvocation) throw new Error("Meteor.userId can only be invoked in method calls or publications.");
    return currentInvocation.userId;
  } ///
  /// LOGIN HOOKS
  ///

  /**
   * @summary Validate login attempts.
   * @locus Server
   * @param {Function} func Called whenever a login is attempted (either successful or unsuccessful).  A login can be aborted by returning a falsy value or throwing an exception.
   */


  validateLoginAttempt(func) {
    // Exceptions inside the hook callback are passed up to us.
    return this._validateLoginHook.register(func);
  }
  /**
   * @summary Set restrictions on new user creation.
   * @locus Server
   * @param {Function} func Called whenever a new user is created. Takes the new user object, and returns true to allow the creation or false to abort.
   */


  validateNewUser(func) {
    this._validateNewUserHooks.push(func);
  }
  /**
   * @summary Validate login from external service
   * @locus Server
   * @param {Function} func Called whenever login/user creation from external service is attempted. Login or user creation based on this login can be aborted by passing a falsy value or throwing an exception.
   */


  beforeExternalLogin(func) {
    if (this._beforeExternalLoginHook) {
      throw new Error("Can only call beforeExternalLogin once");
    }

    this._beforeExternalLoginHook = func;
  } ///
  /// CREATE USER HOOKS
  ///

  /**
   * @summary Customize new user creation.
   * @locus Server
   * @param {Function} func Called whenever a new user is created. Return the new user object, or throw an `Error` to abort the creation.
   */


  onCreateUser(func) {
    if (this._onCreateUserHook) {
      throw new Error("Can only call onCreateUser once");
    }

    this._onCreateUserHook = func;
  }
  /**
   * @summary Customize oauth user profile updates
   * @locus Server
   * @param {Function} func Called whenever a user is logged in via oauth. Return the profile object to be merged, or throw an `Error` to abort the creation.
   */


  onExternalLogin(func) {
    if (this._onExternalLoginHook) {
      throw new Error("Can only call onExternalLogin once");
    }

    this._onExternalLoginHook = func;
  }

  _validateLogin(connection, attempt) {
    this._validateLoginHook.each(callback => {
      let ret;

      try {
        ret = callback(cloneAttemptWithConnection(connection, attempt));
      } catch (e) {
        attempt.allowed = false; // XXX this means the last thrown error overrides previous error
        // messages. Maybe this is surprising to users and we should make
        // overriding errors more explicit. (see
        // https://github.com/meteor/meteor/issues/1960)

        attempt.error = e;
        return true;
      }

      if (!ret) {
        attempt.allowed = false; // don't override a specific error provided by a previous
        // validator or the initial attempt (eg "incorrect password").

        if (!attempt.error) attempt.error = new Meteor.Error(403, "Login forbidden");
      }

      return true;
    });
  }

  _successfulLogin(connection, attempt) {
    this._onLoginHook.each(callback => {
      callback(cloneAttemptWithConnection(connection, attempt));
      return true;
    });
  }

  _failedLogin(connection, attempt) {
    this._onLoginFailureHook.each(callback => {
      callback(cloneAttemptWithConnection(connection, attempt));
      return true;
    });
  }

  _successfulLogout(connection, userId) {
    // don't fetch the user object unless there are some callbacks registered
    let user;

    this._onLogoutHook.each(callback => {
      if (!user && userId) user = this.users.findOne(userId, {
        fields: this._options.defaultFieldSelector
      });
      callback({
        user,
        connection
      });
      return true;
    });
  }

  ///
  /// LOGIN METHODS
  ///
  // Login methods return to the client an object containing these
  // fields when the user was logged in successfully:
  //
  //   id: userId
  //   token: *
  //   tokenExpires: *
  //
  // tokenExpires is optional and intends to provide a hint to the
  // client as to when the token will expire. If not provided, the
  // client will call Accounts._tokenExpiration, passing it the date
  // that it received the token.
  //
  // The login method will throw an error back to the client if the user
  // failed to log in.
  //
  //
  // Login handlers and service specific login methods such as
  // `createUser` internally return a `result` object containing these
  // fields:
  //
  //   type:
  //     optional string; the service name, overrides the handler
  //     default if present.
  //
  //   error:
  //     exception; if the user is not allowed to login, the reason why.
  //
  //   userId:
  //     string; the user id of the user attempting to login (if
  //     known), required for an allowed login.
  //
  //   options:
  //     optional object merged into the result returned by the login
  //     method; used by HAMK from SRP.
  //
  //   stampedLoginToken:
  //     optional object with `token` and `when` indicating the login
  //     token is already present in the database, returned by the
  //     "resume" login handler.
  //
  // For convenience, login methods can also throw an exception, which
  // is converted into an {error} result.  However, if the id of the
  // user attempting the login is known, a {userId, error} result should
  // be returned instead since the user id is not captured when an
  // exception is thrown.
  //
  // This internal `result` object is automatically converted into the
  // public {id, token, tokenExpires} object returned to the client.
  // Try a login method, converting thrown exceptions into an {error}
  // result.  The `type` argument is a default, inserted into the result
  // object if not explicitly returned.
  //
  // Log in a user on a connection.
  //
  // We use the method invocation to set the user id on the connection,
  // not the connection object directly. setUserId is tied to methods to
  // enforce clear ordering of method application (using wait methods on
  // the client, and a no setUserId after unblock restriction on the
  // server)
  //
  // The `stampedLoginToken` parameter is optional.  When present, it
  // indicates that the login token has already been inserted into the
  // database and doesn't need to be inserted again.  (It's used by the
  // "resume" login handler).
  _loginUser(methodInvocation, userId, stampedLoginToken) {
    if (!stampedLoginToken) {
      stampedLoginToken = this._generateStampedLoginToken();

      this._insertLoginToken(userId, stampedLoginToken);
    } // This order (and the avoidance of yields) is important to make
    // sure that when publish functions are rerun, they see a
    // consistent view of the world: the userId is set and matches
    // the login token on the connection (not that there is
    // currently a public API for reading the login token on a
    // connection).


    Meteor._noYieldsAllowed(() => this._setLoginToken(userId, methodInvocation.connection, this._hashLoginToken(stampedLoginToken.token)));

    methodInvocation.setUserId(userId);
    return {
      id: userId,
      token: stampedLoginToken.token,
      tokenExpires: this._tokenExpiration(stampedLoginToken.when)
    };
  }

  // After a login method has completed, call the login hooks.  Note
  // that `attemptLogin` is called for *all* login attempts, even ones
  // which aren't successful (such as an invalid password, etc).
  //
  // If the login is allowed and isn't aborted by a validate login hook
  // callback, log in the user.
  //
  _attemptLogin(methodInvocation, methodName, methodArgs, result) {
    if (!result) throw new Error("result is required"); // XXX A programming error in a login handler can lead to this occuring, and
    // then we don't call onLogin or onLoginFailure callbacks. Should
    // tryLoginMethod catch this case and turn it into an error?

    if (!result.userId && !result.error) throw new Error("A login method must specify a userId or an error");
    let user;
    if (result.userId) user = this.users.findOne(result.userId, {
      fields: this._options.defaultFieldSelector
    });
    const attempt = {
      type: result.type || "unknown",
      allowed: !!(result.userId && !result.error),
      methodName: methodName,
      methodArguments: Array.from(methodArgs)
    };

    if (result.error) {
      attempt.error = result.error;
    }

    if (user) {
      attempt.user = user;
    } // _validateLogin may mutate `attempt` by adding an error and changing allowed
    // to false, but that's the only change it can make (and the user's callbacks
    // only get a clone of `attempt`).


    this._validateLogin(methodInvocation.connection, attempt);

    if (attempt.allowed) {
      const ret = _objectSpread({}, this._loginUser(methodInvocation, result.userId, result.stampedLoginToken), {}, result.options);

      ret.type = attempt.type;

      this._successfulLogin(methodInvocation.connection, attempt);

      return ret;
    } else {
      this._failedLogin(methodInvocation.connection, attempt);

      throw attempt.error;
    }
  }

  // All service specific login methods should go through this function.
  // Ensure that thrown exceptions are caught and that login hook
  // callbacks are still called.
  //
  _loginMethod(methodInvocation, methodName, methodArgs, type, fn) {
    return this._attemptLogin(methodInvocation, methodName, methodArgs, tryLoginMethod(type, fn));
  }

  // Report a login attempt failed outside the context of a normal login
  // method. This is for use in the case where there is a multi-step login
  // procedure (eg SRP based password login). If a method early in the
  // chain fails, it should call this function to report a failure. There
  // is no corresponding method for a successful login; methods that can
  // succeed at logging a user in should always be actual login methods
  // (using either Accounts._loginMethod or Accounts.registerLoginHandler).
  _reportLoginFailure(methodInvocation, methodName, methodArgs, result) {
    const attempt = {
      type: result.type || "unknown",
      allowed: false,
      error: result.error,
      methodName: methodName,
      methodArguments: Array.from(methodArgs)
    };

    if (result.userId) {
      attempt.user = this.users.findOne(result.userId, {
        fields: this._options.defaultFieldSelector
      });
    }

    this._validateLogin(methodInvocation.connection, attempt);

    this._failedLogin(methodInvocation.connection, attempt); // _validateLogin may mutate attempt to set a new error message. Return
    // the modified version.


    return attempt;
  }

  ///
  /// LOGIN HANDLERS
  ///
  // The main entry point for auth packages to hook in to login.
  //
  // A login handler is a login method which can return `undefined` to
  // indicate that the login request is not handled by this handler.
  //
  // @param name {String} Optional.  The service name, used by default
  // if a specific service name isn't returned in the result.
  //
  // @param handler {Function} A function that receives an options object
  // (as passed as an argument to the `login` method) and returns one of:
  // - `undefined`, meaning don't handle;
  // - a login method result object
  registerLoginHandler(name, handler) {
    if (!handler) {
      handler = name;
      name = null;
    }

    this._loginHandlers.push({
      name: name,
      handler: handler
    });
  }

  // Checks a user's credentials against all the registered login
  // handlers, and returns a login token if the credentials are valid. It
  // is like the login method, except that it doesn't set the logged-in
  // user on the connection. Throws a Meteor.Error if logging in fails,
  // including the case where none of the login handlers handled the login
  // request. Otherwise, returns {id: userId, token: *, tokenExpires: *}.
  //
  // For example, if you want to login with a plaintext password, `options` could be
  //   { user: { username: <username> }, password: <password> }, or
  //   { user: { email: <email> }, password: <password> }.
  // Try all of the registered login handlers until one of them doesn't
  // return `undefined`, meaning it handled this call to `login`. Return
  // that return value.
  _runLoginHandlers(methodInvocation, options) {
    for (let handler of this._loginHandlers) {
      const result = tryLoginMethod(handler.name, () => handler.handler.call(methodInvocation, options));

      if (result) {
        return result;
      }

      if (result !== undefined) {
        throw new Meteor.Error(400, "A login handler should return a result or undefined");
      }
    }

    return {
      type: null,
      error: new Meteor.Error(400, "Unrecognized options for login request")
    };
  }

  // Deletes the given loginToken from the database.
  //
  // For new-style hashed token, this will cause all connections
  // associated with the token to be closed.
  //
  // Any connections associated with old-style unhashed tokens will be
  // in the process of becoming associated with hashed tokens and then
  // they'll get closed.
  destroyToken(userId, loginToken) {
    this.users.update(userId, {
      $pull: {
        "services.resume.loginTokens": {
          $or: [{
            hashedToken: loginToken
          }, {
            token: loginToken
          }]
        }
      }
    });
  }

  _initServerMethods() {
    // The methods created in this function need to be created here so that
    // this variable is available in their scope.
    const accounts = this; // This object will be populated with methods and then passed to
    // accounts._server.methods further below.

    const methods = {}; // @returns {Object|null}
    //   If successful, returns {token: reconnectToken, id: userId}
    //   If unsuccessful (for example, if the user closed the oauth login popup),
    //     throws an error describing the reason

    methods.login = function (options) {
      // Login handlers should really also check whatever field they look at in
      // options, but we don't enforce it.
      check(options, Object);

      const result = accounts._runLoginHandlers(this, options);

      return accounts._attemptLogin(this, "login", arguments, result);
    };

    methods.logout = function () {
      const token = accounts._getLoginToken(this.connection.id);

      accounts._setLoginToken(this.userId, this.connection, null);

      if (token && this.userId) {
        accounts.destroyToken(this.userId, token);
      }

      accounts._successfulLogout(this.connection, this.userId);

      this.setUserId(null);
    }; // Delete all the current user's tokens and close all open connections logged
    // in as this user. Returns a fresh new login token that this client can
    // use. Tests set Accounts._noConnectionCloseDelayForTest to delete tokens
    // immediately instead of using a delay.
    //
    // XXX COMPAT WITH 0.7.2
    // This single `logoutOtherClients` method has been replaced with two
    // methods, one that you call to get a new token, and another that you
    // call to remove all tokens except your own. The new design allows
    // clients to know when other clients have actually been logged
    // out. (The `logoutOtherClients` method guarantees the caller that
    // the other clients will be logged out at some point, but makes no
    // guarantees about when.) This method is left in for backwards
    // compatibility, especially since application code might be calling
    // this method directly.
    //
    // @returns {Object} Object with token and tokenExpires keys.


    methods.logoutOtherClients = function () {
      const user = accounts.users.findOne(this.userId, {
        fields: {
          "services.resume.loginTokens": true
        }
      });

      if (user) {
        // Save the current tokens in the database to be deleted in
        // CONNECTION_CLOSE_DELAY_MS ms. This gives other connections in the
        // caller's browser time to find the fresh token in localStorage. We save
        // the tokens in the database in case we crash before actually deleting
        // them.
        const tokens = user.services.resume.loginTokens;

        const newToken = accounts._generateStampedLoginToken();

        accounts.users.update(this.userId, {
          $set: {
            "services.resume.loginTokensToDelete": tokens,
            "services.resume.haveLoginTokensToDelete": true
          },
          $push: {
            "services.resume.loginTokens": accounts._hashStampedToken(newToken)
          }
        });
        Meteor.setTimeout(() => {
          // The observe on Meteor.users will take care of closing the connections
          // associated with `tokens`.
          accounts._deleteSavedTokensForUser(this.userId, tokens);
        }, accounts._noConnectionCloseDelayForTest ? 0 : CONNECTION_CLOSE_DELAY_MS); // We do not set the login token on this connection, but instead the
        // observe closes the connection and the client will reconnect with the
        // new token.

        return {
          token: newToken.token,
          tokenExpires: accounts._tokenExpiration(newToken.when)
        };
      } else {
        throw new Meteor.Error("You are not logged in.");
      }
    }; // Generates a new login token with the same expiration as the
    // connection's current token and saves it to the database. Associates
    // the connection with this new token and returns it. Throws an error
    // if called on a connection that isn't logged in.
    //
    // @returns Object
    //   If successful, returns { token: <new token>, id: <user id>,
    //   tokenExpires: <expiration date> }.


    methods.getNewToken = function () {
      const user = accounts.users.findOne(this.userId, {
        fields: {
          "services.resume.loginTokens": 1
        }
      });

      if (!this.userId || !user) {
        throw new Meteor.Error("You are not logged in.");
      } // Be careful not to generate a new token that has a later
      // expiration than the curren token. Otherwise, a bad guy with a
      // stolen token could use this method to stop his stolen token from
      // ever expiring.


      const currentHashedToken = accounts._getLoginToken(this.connection.id);

      const currentStampedToken = user.services.resume.loginTokens.find(stampedToken => stampedToken.hashedToken === currentHashedToken);

      if (!currentStampedToken) {
        // safety belt: this should never happen
        throw new Meteor.Error("Invalid login token");
      }

      const newStampedToken = accounts._generateStampedLoginToken();

      newStampedToken.when = currentStampedToken.when;

      accounts._insertLoginToken(this.userId, newStampedToken);

      return accounts._loginUser(this, this.userId, newStampedToken);
    }; // Removes all tokens except the token associated with the current
    // connection. Throws an error if the connection is not logged
    // in. Returns nothing on success.


    methods.removeOtherTokens = function () {
      if (!this.userId) {
        throw new Meteor.Error("You are not logged in.");
      }

      const currentToken = accounts._getLoginToken(this.connection.id);

      accounts.users.update(this.userId, {
        $pull: {
          "services.resume.loginTokens": {
            hashedToken: {
              $ne: currentToken
            }
          }
        }
      });
    }; // Allow a one-time configuration for a login service. Modifications
    // to this collection are also allowed in insecure mode.


    methods.configureLoginService = options => {
      check(options, Match.ObjectIncluding({
        service: String
      })); // Don't let random users configure a service we haven't added yet (so
      // that when we do later add it, it's set up with their configuration
      // instead of ours).
      // XXX if service configuration is oauth-specific then this code should
      //     be in accounts-oauth; if it's not then the registry should be
      //     in this package

      if (!(accounts.oauth && accounts.oauth.serviceNames().includes(options.service))) {
        throw new Meteor.Error(403, "Service unknown");
      }

      const {
        ServiceConfiguration
      } = Package['service-configuration'];
      if (ServiceConfiguration.configurations.findOne({
        service: options.service
      })) throw new Meteor.Error(403, "Service ".concat(options.service, " already configured"));
      if (hasOwn.call(options, 'secret') && usingOAuthEncryption()) options.secret = OAuthEncryption.seal(options.secret);
      ServiceConfiguration.configurations.insert(options);
    };

    accounts._server.methods(methods);
  }

  _initAccountDataHooks() {
    this._server.onConnection(connection => {
      this._accountData[connection.id] = {
        connection: connection
      };
      connection.onClose(() => {
        this._removeTokenFromConnection(connection.id);

        delete this._accountData[connection.id];
      });
    });
  }

  _initServerPublications() {
    // Bring into lexical scope for publish callbacks that need `this`
    const {
      users,
      _autopublishFields
    } = this; // Publish all login service configuration fields other than secret.

    this._server.publish("meteor.loginServiceConfiguration", () => {
      const {
        ServiceConfiguration
      } = Package['service-configuration'];
      return ServiceConfiguration.configurations.find({}, {
        fields: {
          secret: 0
        }
      });
    }, {
      is_auto: true
    }); // not techincally autopublish, but stops the warning.
    // Publish the current user's record to the client.


    this._server.publish(null, function () {
      if (this.userId) {
        return users.find({
          _id: this.userId
        }, {
          fields: {
            profile: 1,
            username: 1,
            emails: 1
          }
        });
      } else {
        return null;
      }
    },
    /*suppress autopublish warning*/
    {
      is_auto: true
    }); // Use Meteor.startup to give other packages a chance to call
    // addAutopublishFields.


    Package.autopublish && Meteor.startup(() => {
      // ['profile', 'username'] -> {profile: 1, username: 1}
      const toFieldSelector = fields => fields.reduce((prev, field) => _objectSpread({}, prev, {
        [field]: 1
      }), {});

      this._server.publish(null, function () {
        if (this.userId) {
          return users.find({
            _id: this.userId
          }, {
            fields: toFieldSelector(_autopublishFields.loggedInUser)
          });
        } else {
          return null;
        }
      },
      /*suppress autopublish warning*/
      {
        is_auto: true
      }); // XXX this publish is neither dedup-able nor is it optimized by our special
      // treatment of queries on a specific _id. Therefore this will have O(n^2)
      // run-time performance every time a user document is changed (eg someone
      // logging in). If this is a problem, we can instead write a manual publish
      // function which filters out fields based on 'this.userId'.


      this._server.publish(null, function () {
        const selector = this.userId ? {
          _id: {
            $ne: this.userId
          }
        } : {};
        return users.find(selector, {
          fields: toFieldSelector(_autopublishFields.otherUsers)
        });
      },
      /*suppress autopublish warning*/
      {
        is_auto: true
      });
    });
  }

  // Add to the list of fields or subfields to be automatically
  // published if autopublish is on. Must be called from top-level
  // code (ie, before Meteor.startup hooks run).
  //
  // @param opts {Object} with:
  //   - forLoggedInUser {Array} Array of fields published to the logged-in user
  //   - forOtherUsers {Array} Array of fields published to users that aren't logged in
  addAutopublishFields(opts) {
    this._autopublishFields.loggedInUser.push.apply(this._autopublishFields.loggedInUser, opts.forLoggedInUser);

    this._autopublishFields.otherUsers.push.apply(this._autopublishFields.otherUsers, opts.forOtherUsers);
  }

  ///
  /// ACCOUNT DATA
  ///
  // HACK: This is used by 'meteor-accounts' to get the loginToken for a
  // connection. Maybe there should be a public way to do that.
  _getAccountData(connectionId, field) {
    const data = this._accountData[connectionId];
    return data && data[field];
  }

  _setAccountData(connectionId, field, value) {
    const data = this._accountData[connectionId]; // safety belt. shouldn't happen. accountData is set in onConnection,
    // we don't have a connectionId until it is set.

    if (!data) return;
    if (value === undefined) delete data[field];else data[field] = value;
  }

  ///
  /// RECONNECT TOKENS
  ///
  /// support reconnecting using a meteor login token
  _hashLoginToken(loginToken) {
    const hash = crypto.createHash('sha256');
    hash.update(loginToken);
    return hash.digest('base64');
  }

  // {token, when} => {hashedToken, when}
  _hashStampedToken(stampedToken) {
    const {
      token
    } = stampedToken,
          hashedStampedToken = _objectWithoutProperties(stampedToken, ["token"]);

    return _objectSpread({}, hashedStampedToken, {
      hashedToken: this._hashLoginToken(token)
    });
  }

  // Using $addToSet avoids getting an index error if another client
  // logging in simultaneously has already inserted the new hashed
  // token.
  _insertHashedLoginToken(userId, hashedToken, query) {
    query = query ? _objectSpread({}, query) : {};
    query._id = userId;
    this.users.update(query, {
      $addToSet: {
        "services.resume.loginTokens": hashedToken
      }
    });
  }

  // Exported for tests.
  _insertLoginToken(userId, stampedToken, query) {
    this._insertHashedLoginToken(userId, this._hashStampedToken(stampedToken), query);
  }

  _clearAllLoginTokens(userId) {
    this.users.update(userId, {
      $set: {
        'services.resume.loginTokens': []
      }
    });
  }

  // test hook
  _getUserObserve(connectionId) {
    return this._userObservesForConnections[connectionId];
  }

  // Clean up this connection's association with the token: that is, stop
  // the observe that we started when we associated the connection with
  // this token.
  _removeTokenFromConnection(connectionId) {
    if (hasOwn.call(this._userObservesForConnections, connectionId)) {
      const observe = this._userObservesForConnections[connectionId];

      if (typeof observe === 'number') {
        // We're in the process of setting up an observe for this connection. We
        // can't clean up that observe yet, but if we delete the placeholder for
        // this connection, then the observe will get cleaned up as soon as it has
        // been set up.
        delete this._userObservesForConnections[connectionId];
      } else {
        delete this._userObservesForConnections[connectionId];
        observe.stop();
      }
    }
  }

  _getLoginToken(connectionId) {
    return this._getAccountData(connectionId, 'loginToken');
  }

  // newToken is a hashed token.
  _setLoginToken(userId, connection, newToken) {
    this._removeTokenFromConnection(connection.id);

    this._setAccountData(connection.id, 'loginToken', newToken);

    if (newToken) {
      // Set up an observe for this token. If the token goes away, we need
      // to close the connection.  We defer the observe because there's
      // no need for it to be on the critical path for login; we just need
      // to ensure that the connection will get closed at some point if
      // the token gets deleted.
      //
      // Initially, we set the observe for this connection to a number; this
      // signifies to other code (which might run while we yield) that we are in
      // the process of setting up an observe for this connection. Once the
      // observe is ready to go, we replace the number with the real observe
      // handle (unless the placeholder has been deleted or replaced by a
      // different placehold number, signifying that the connection was closed
      // already -- in this case we just clean up the observe that we started).
      const myObserveNumber = ++this._nextUserObserveNumber;
      this._userObservesForConnections[connection.id] = myObserveNumber;
      Meteor.defer(() => {
        // If something else happened on this connection in the meantime (it got
        // closed, or another call to _setLoginToken happened), just do
        // nothing. We don't need to start an observe for an old connection or old
        // token.
        if (this._userObservesForConnections[connection.id] !== myObserveNumber) {
          return;
        }

        let foundMatchingUser; // Because we upgrade unhashed login tokens to hashed tokens at
        // login time, sessions will only be logged in with a hashed
        // token. Thus we only need to observe hashed tokens here.

        const observe = this.users.find({
          _id: userId,
          'services.resume.loginTokens.hashedToken': newToken
        }, {
          fields: {
            _id: 1
          }
        }).observeChanges({
          added: () => {
            foundMatchingUser = true;
          },
          removed: connection.close // The onClose callback for the connection takes care of
          // cleaning up the observe handle and any other state we have
          // lying around.

        }, {
          nonMutatingCallbacks: true
        }); // If the user ran another login or logout command we were waiting for the
        // defer or added to fire (ie, another call to _setLoginToken occurred),
        // then we let the later one win (start an observe, etc) and just stop our
        // observe now.
        //
        // Similarly, if the connection was already closed, then the onClose
        // callback would have called _removeTokenFromConnection and there won't
        // be an entry in _userObservesForConnections. We can stop the observe.

        if (this._userObservesForConnections[connection.id] !== myObserveNumber) {
          observe.stop();
          return;
        }

        this._userObservesForConnections[connection.id] = observe;

        if (!foundMatchingUser) {
          // We've set up an observe on the user associated with `newToken`,
          // so if the new token is removed from the database, we'll close
          // the connection. But the token might have already been deleted
          // before we set up the observe, which wouldn't have closed the
          // connection because the observe wasn't running yet.
          connection.close();
        }
      });
    }
  }

  // (Also used by Meteor Accounts server and tests).
  //
  _generateStampedLoginToken() {
    return {
      token: Random.secret(),
      when: new Date()
    };
  }

  ///
  /// TOKEN EXPIRATION
  ///
  // Deletes expired password reset tokens from the database.
  //
  // Exported for tests. Also, the arguments are only used by
  // tests. oldestValidDate is simulate expiring tokens without waiting
  // for them to actually expire. userId is used by tests to only expire
  // tokens for the test user.
  _expirePasswordResetTokens(oldestValidDate, userId) {
    const tokenLifetimeMs = this._getPasswordResetTokenLifetimeMs(); // when calling from a test with extra arguments, you must specify both!


    if (oldestValidDate && !userId || !oldestValidDate && userId) {
      throw new Error("Bad test. Must specify both oldestValidDate and userId.");
    }

    oldestValidDate = oldestValidDate || new Date(new Date() - tokenLifetimeMs);
    const tokenFilter = {
      $or: [{
        "services.password.reset.reason": "reset"
      }, {
        "services.password.reset.reason": {
          $exists: false
        }
      }]
    };
    expirePasswordToken(this, oldestValidDate, tokenFilter, userId);
  } // Deletes expired password enroll tokens from the database.
  //
  // Exported for tests. Also, the arguments are only used by
  // tests. oldestValidDate is simulate expiring tokens without waiting
  // for them to actually expire. userId is used by tests to only expire
  // tokens for the test user.


  _expirePasswordEnrollTokens(oldestValidDate, userId) {
    const tokenLifetimeMs = this._getPasswordEnrollTokenLifetimeMs(); // when calling from a test with extra arguments, you must specify both!


    if (oldestValidDate && !userId || !oldestValidDate && userId) {
      throw new Error("Bad test. Must specify both oldestValidDate and userId.");
    }

    oldestValidDate = oldestValidDate || new Date(new Date() - tokenLifetimeMs);
    const tokenFilter = {
      "services.password.reset.reason": "enroll"
    };
    expirePasswordToken(this, oldestValidDate, tokenFilter, userId);
  } // Deletes expired tokens from the database and closes all open connections
  // associated with these tokens.
  //
  // Exported for tests. Also, the arguments are only used by
  // tests. oldestValidDate is simulate expiring tokens without waiting
  // for them to actually expire. userId is used by tests to only expire
  // tokens for the test user.


  _expireTokens(oldestValidDate, userId) {
    const tokenLifetimeMs = this._getTokenLifetimeMs(); // when calling from a test with extra arguments, you must specify both!


    if (oldestValidDate && !userId || !oldestValidDate && userId) {
      throw new Error("Bad test. Must specify both oldestValidDate and userId.");
    }

    oldestValidDate = oldestValidDate || new Date(new Date() - tokenLifetimeMs);
    const userFilter = userId ? {
      _id: userId
    } : {}; // Backwards compatible with older versions of meteor that stored login token
    // timestamps as numbers.

    this.users.update(_objectSpread({}, userFilter, {
      $or: [{
        "services.resume.loginTokens.when": {
          $lt: oldestValidDate
        }
      }, {
        "services.resume.loginTokens.when": {
          $lt: +oldestValidDate
        }
      }]
    }), {
      $pull: {
        "services.resume.loginTokens": {
          $or: [{
            when: {
              $lt: oldestValidDate
            }
          }, {
            when: {
              $lt: +oldestValidDate
            }
          }]
        }
      }
    }, {
      multi: true
    }); // The observe on Meteor.users will take care of closing connections for
    // expired tokens.
  }

  // @override from accounts_common.js
  config(options) {
    // Call the overridden implementation of the method.
    const superResult = AccountsCommon.prototype.config.apply(this, arguments); // If the user set loginExpirationInDays to null, then we need to clear the
    // timer that periodically expires tokens.

    if (hasOwn.call(this._options, 'loginExpirationInDays') && this._options.loginExpirationInDays === null && this.expireTokenInterval) {
      Meteor.clearInterval(this.expireTokenInterval);
      this.expireTokenInterval = null;
    }

    return superResult;
  }

  // Called by accounts-password
  insertUserDoc(options, user) {
    // - clone user document, to protect from modification
    // - add createdAt timestamp
    // - prepare an _id, so that you can modify other collections (eg
    // create a first task for every new user)
    //
    // XXX If the onCreateUser or validateNewUser hooks fail, we might
    // end up having modified some other collection
    // inappropriately. The solution is probably to have onCreateUser
    // accept two callbacks - one that gets called before inserting
    // the user document (in which you can modify its contents), and
    // one that gets called after (in which you should change other
    // collections)
    user = _objectSpread({
      createdAt: new Date(),
      _id: Random.id()
    }, user);

    if (user.services) {
      Object.keys(user.services).forEach(service => pinEncryptedFieldsToUser(user.services[service], user._id));
    }

    let fullUser;

    if (this._onCreateUserHook) {
      fullUser = this._onCreateUserHook(options, user); // This is *not* part of the API. We need this because we can't isolate
      // the global server environment between tests, meaning we can't test
      // both having a create user hook set and not having one set.

      if (fullUser === 'TEST DEFAULT HOOK') fullUser = defaultCreateUserHook(options, user);
    } else {
      fullUser = defaultCreateUserHook(options, user);
    }

    this._validateNewUserHooks.forEach(hook => {
      if (!hook(fullUser)) throw new Meteor.Error(403, "User validation failed");
    });

    let userId;

    try {
      userId = this.users.insert(fullUser);
    } catch (e) {
      // XXX string parsing sucks, maybe
      // https://jira.mongodb.org/browse/SERVER-3069 will get fixed one day
      if (!e.errmsg) throw e;
      if (e.errmsg.includes('emails.address')) throw new Meteor.Error(403, "Email already exists.");
      if (e.errmsg.includes('username')) throw new Meteor.Error(403, "Username already exists.");
      throw e;
    }

    return userId;
  }

  // Helper function: returns false if email does not match company domain from
  // the configuration.
  _testEmailDomain(email) {
    const domain = this._options.restrictCreationByEmailDomain;
    return !domain || typeof domain === 'function' && domain(email) || typeof domain === 'string' && new RegExp("@".concat(Meteor._escapeRegExp(domain), "$"), 'i').test(email);
  }

  ///
  /// CLEAN UP FOR `logoutOtherClients`
  ///
  _deleteSavedTokensForUser(userId, tokensToDelete) {
    if (tokensToDelete) {
      this.users.update(userId, {
        $unset: {
          "services.resume.haveLoginTokensToDelete": 1,
          "services.resume.loginTokensToDelete": 1
        },
        $pullAll: {
          "services.resume.loginTokens": tokensToDelete
        }
      });
    }
  }

  _deleteSavedTokensForAllUsersOnStartup() {
    // If we find users who have saved tokens to delete on startup, delete
    // them now. It's possible that the server could have crashed and come
    // back up before new tokens are found in localStorage, but this
    // shouldn't happen very often. We shouldn't put a delay here because
    // that would give a lot of power to an attacker with a stolen login
    // token and the ability to crash the server.
    Meteor.startup(() => {
      this.users.find({
        "services.resume.haveLoginTokensToDelete": true
      }, {
        fields: {
          "services.resume.loginTokensToDelete": 1
        }
      }).forEach(user => {
        this._deleteSavedTokensForUser(user._id, user.services.resume.loginTokensToDelete);
      });
    });
  }

  ///
  /// MANAGING USER OBJECTS
  ///
  // Updates or creates a user after we authenticate with a 3rd party.
  //
  // @param serviceName {String} Service name (eg, twitter).
  // @param serviceData {Object} Data to store in the user's record
  //        under services[serviceName]. Must include an "id" field
  //        which is a unique identifier for the user in the service.
  // @param options {Object, optional} Other options to pass to insertUserDoc
  //        (eg, profile)
  // @returns {Object} Object with token and id keys, like the result
  //        of the "login" method.
  //
  updateOrCreateUserFromExternalService(serviceName, serviceData, options) {
    options = _objectSpread({}, options);

    if (serviceName === "password" || serviceName === "resume") {
      throw new Error("Can't use updateOrCreateUserFromExternalService with internal service " + serviceName);
    }

    if (!hasOwn.call(serviceData, 'id')) {
      throw new Error("Service data for service ".concat(serviceName, " must include id"));
    } // Look for a user with the appropriate service user id.


    const selector = {};
    const serviceIdKey = "services.".concat(serviceName, ".id"); // XXX Temporary special case for Twitter. (Issue #629)
    //   The serviceData.id will be a string representation of an integer.
    //   We want it to match either a stored string or int representation.
    //   This is to cater to earlier versions of Meteor storing twitter
    //   user IDs in number form, and recent versions storing them as strings.
    //   This can be removed once migration technology is in place, and twitter
    //   users stored with integer IDs have been migrated to string IDs.

    if (serviceName === "twitter" && !isNaN(serviceData.id)) {
      selector["$or"] = [{}, {}];
      selector["$or"][0][serviceIdKey] = serviceData.id;
      selector["$or"][1][serviceIdKey] = parseInt(serviceData.id, 10);
    } else {
      selector[serviceIdKey] = serviceData.id;
    }

    let user = this.users.findOne(selector, {
      fields: this._options.defaultFieldSelector
    }); // Before continuing, run user hook to see if we should continue

    if (this._beforeExternalLoginHook && !this._beforeExternalLoginHook(serviceName, serviceData, user)) {
      throw new Meteor.Error(403, "Login forbidden");
    } // When creating a new user we pass through all options. When updating an
    // existing user, by default we only process/pass through the serviceData
    // (eg, so that we keep an unexpired access token and don't cache old email
    // addresses in serviceData.email). The onExternalLogin hook can be used when
    // creating or updating a user, to modify or pass through more options as
    // needed.


    let opts = user ? {} : options;

    if (this._onExternalLoginHook) {
      opts = this._onExternalLoginHook(options, user);
    }

    if (user) {
      pinEncryptedFieldsToUser(serviceData, user._id);
      let setAttrs = {};
      Object.keys(serviceData).forEach(key => setAttrs["services.".concat(serviceName, ".").concat(key)] = serviceData[key]); // XXX Maybe we should re-use the selector above and notice if the update
      //     touches nothing?

      setAttrs = _objectSpread({}, setAttrs, {}, opts);
      this.users.update(user._id, {
        $set: setAttrs
      });
      return {
        type: serviceName,
        userId: user._id
      };
    } else {
      // Create a new user with the service data.
      user = {
        services: {}
      };
      user.services[serviceName] = serviceData;
      return {
        type: serviceName,
        userId: this.insertUserDoc(opts, user)
      };
    }
  }

  // Removes default rate limiting rule
  removeDefaultRateLimit() {
    const resp = DDPRateLimiter.removeRule(this.defaultRateLimiterRuleId);
    this.defaultRateLimiterRuleId = null;
    return resp;
  }

  // Add a default rule of limiting logins, creating new users and password reset
  // to 5 times every 10 seconds per connection.
  addDefaultRateLimit() {
    if (!this.defaultRateLimiterRuleId) {
      this.defaultRateLimiterRuleId = DDPRateLimiter.addRule({
        userId: null,
        clientAddress: null,
        type: 'method',
        name: name => ['login', 'createUser', 'resetPassword', 'forgotPassword'].includes(name),
        connectionId: connectionId => true
      }, 5, 10000);
    }
  }

}

// Give each login hook callback a fresh cloned copy of the attempt
// object, but don't clone the connection.
//
const cloneAttemptWithConnection = (connection, attempt) => {
  const clonedAttempt = EJSON.clone(attempt);
  clonedAttempt.connection = connection;
  return clonedAttempt;
};

const tryLoginMethod = (type, fn) => {
  let result;

  try {
    result = fn();
  } catch (e) {
    result = {
      error: e
    };
  }

  if (result && !result.type && type) result.type = type;
  return result;
};

const setupDefaultLoginHandlers = accounts => {
  accounts.registerLoginHandler("resume", function (options) {
    return defaultResumeLoginHandler.call(this, accounts, options);
  });
}; // Login handler for resume tokens.


const defaultResumeLoginHandler = (accounts, options) => {
  if (!options.resume) return undefined;
  check(options.resume, String);

  const hashedToken = accounts._hashLoginToken(options.resume); // First look for just the new-style hashed login token, to avoid
  // sending the unhashed token to the database in a query if we don't
  // need to.


  let user = accounts.users.findOne({
    "services.resume.loginTokens.hashedToken": hashedToken
  }, {
    fields: {
      "services.resume.loginTokens.$": 1
    }
  });

  if (!user) {
    // If we didn't find the hashed login token, try also looking for
    // the old-style unhashed token.  But we need to look for either
    // the old-style token OR the new-style token, because another
    // client connection logging in simultaneously might have already
    // converted the token.
    user = accounts.users.findOne({
      $or: [{
        "services.resume.loginTokens.hashedToken": hashedToken
      }, {
        "services.resume.loginTokens.token": options.resume
      }]
    }, // Note: Cannot use ...loginTokens.$ positional operator with $or query.
    {
      fields: {
        "services.resume.loginTokens": 1
      }
    });
  }

  if (!user) return {
    error: new Meteor.Error(403, "You've been logged out by the server. Please log in again.")
  }; // Find the token, which will either be an object with fields
  // {hashedToken, when} for a hashed token or {token, when} for an
  // unhashed token.

  let oldUnhashedStyleToken;
  let token = user.services.resume.loginTokens.find(token => token.hashedToken === hashedToken);

  if (token) {
    oldUnhashedStyleToken = false;
  } else {
    token = user.services.resume.loginTokens.find(token => token.token === options.resume);
    oldUnhashedStyleToken = true;
  }

  const tokenExpires = accounts._tokenExpiration(token.when);

  if (new Date() >= tokenExpires) return {
    userId: user._id,
    error: new Meteor.Error(403, "Your session has expired. Please log in again.")
  }; // Update to a hashed token when an unhashed token is encountered.

  if (oldUnhashedStyleToken) {
    // Only add the new hashed token if the old unhashed token still
    // exists (this avoids resurrecting the token if it was deleted
    // after we read it).  Using $addToSet avoids getting an index
    // error if another client logging in simultaneously has already
    // inserted the new hashed token.
    accounts.users.update({
      _id: user._id,
      "services.resume.loginTokens.token": options.resume
    }, {
      $addToSet: {
        "services.resume.loginTokens": {
          "hashedToken": hashedToken,
          "when": token.when
        }
      }
    }); // Remove the old token *after* adding the new, since otherwise
    // another client trying to login between our removing the old and
    // adding the new wouldn't find a token to login with.

    accounts.users.update(user._id, {
      $pull: {
        "services.resume.loginTokens": {
          "token": options.resume
        }
      }
    });
  }

  return {
    userId: user._id,
    stampedLoginToken: {
      token: options.resume,
      when: token.when
    }
  };
};

const expirePasswordToken = (accounts, oldestValidDate, tokenFilter, userId) => {
  const userFilter = userId ? {
    _id: userId
  } : {};
  const resetRangeOr = {
    $or: [{
      "services.password.reset.when": {
        $lt: oldestValidDate
      }
    }, {
      "services.password.reset.when": {
        $lt: +oldestValidDate
      }
    }]
  };
  const expireFilter = {
    $and: [tokenFilter, resetRangeOr]
  };
  accounts.users.update(_objectSpread({}, userFilter, {}, expireFilter), {
    $unset: {
      "services.password.reset": ""
    }
  }, {
    multi: true
  });
};

const setExpireTokensInterval = accounts => {
  accounts.expireTokenInterval = Meteor.setInterval(() => {
    accounts._expireTokens();

    accounts._expirePasswordResetTokens();

    accounts._expirePasswordEnrollTokens();
  }, EXPIRE_TOKENS_INTERVAL_MS);
}; ///
/// OAuth Encryption Support
///


const OAuthEncryption = Package["oauth-encryption"] && Package["oauth-encryption"].OAuthEncryption;

const usingOAuthEncryption = () => {
  return OAuthEncryption && OAuthEncryption.keyIsLoaded();
}; // OAuth service data is temporarily stored in the pending credentials
// collection during the oauth authentication process.  Sensitive data
// such as access tokens are encrypted without the user id because
// we don't know the user id yet.  We re-encrypt these fields with the
// user id included when storing the service data permanently in
// the users collection.
//


const pinEncryptedFieldsToUser = (serviceData, userId) => {
  Object.keys(serviceData).forEach(key => {
    let value = serviceData[key];
    if (OAuthEncryption && OAuthEncryption.isSealed(value)) value = OAuthEncryption.seal(OAuthEncryption.open(value), userId);
    serviceData[key] = value;
  });
}; // Encrypt unencrypted login service secrets when oauth-encryption is
// added.
//
// XXX For the oauthSecretKey to be available here at startup, the
// developer must call Accounts.config({oauthSecretKey: ...}) at load
// time, instead of in a Meteor.startup block, because the startup
// block in the app code will run after this accounts-base startup
// block.  Perhaps we need a post-startup callback?


Meteor.startup(() => {
  if (!usingOAuthEncryption()) {
    return;
  }

  const {
    ServiceConfiguration
  } = Package['service-configuration'];
  ServiceConfiguration.configurations.find({
    $and: [{
      secret: {
        $exists: true
      }
    }, {
      "secret.algorithm": {
        $exists: false
      }
    }]
  }).forEach(config => {
    ServiceConfiguration.configurations.update(config._id, {
      $set: {
        secret: OAuthEncryption.seal(config.secret)
      }
    });
  });
}); // XXX see comment on Accounts.createUser in passwords_server about adding a
// second "server options" argument.

const defaultCreateUserHook = (options, user) => {
  if (options.profile) user.profile = options.profile;
  return user;
}; // Validate new user's email or Google/Facebook/GitHub account's email


function defaultValidateNewUserHook(user) {
  const domain = this._options.restrictCreationByEmailDomain;

  if (!domain) {
    return true;
  }

  let emailIsGood = false;

  if (user.emails && user.emails.length > 0) {
    emailIsGood = user.emails.reduce((prev, email) => prev || this._testEmailDomain(email.address), false);
  } else if (user.services && Object.values(user.services).length > 0) {
    // Find any email of any service and check it
    emailIsGood = Object.values(user.services).reduce((prev, service) => service.email && this._testEmailDomain(service.email), false);
  }

  if (emailIsGood) {
    return true;
  }

  if (typeof domain === 'string') {
    throw new Meteor.Error(403, "@".concat(domain, " email required"));
  } else {
    throw new Meteor.Error(403, "Email doesn't match the criteria.");
  }
}

const setupUsersCollection = users => {
  ///
  /// RESTRICTING WRITES TO USER OBJECTS
  ///
  users.allow({
    // clients can modify the profile field of their own document, and
    // nothing else.
    update: (userId, user, fields, modifier) => {
      // make sure it is our record
      if (user._id !== userId) {
        return false;
      } // user can only modify the 'profile' field. sets to multiple
      // sub-keys (eg profile.foo and profile.bar) are merged into entry
      // in the fields list.


      if (fields.length !== 1 || fields[0] !== 'profile') {
        return false;
      }

      return true;
    },
    fetch: ['_id'] // we only look at _id.

  }); /// DEFAULT INDEXES ON USERS

  users._ensureIndex('username', {
    unique: true,
    sparse: true
  });

  users._ensureIndex('emails.address', {
    unique: true,
    sparse: true
  });

  users._ensureIndex('services.resume.loginTokens.hashedToken', {
    unique: true,
    sparse: true
  });

  users._ensureIndex('services.resume.loginTokens.token', {
    unique: true,
    sparse: true
  }); // For taking care of logoutOtherClients calls that crashed before the
  // tokens were deleted.


  users._ensureIndex('services.resume.haveLoginTokensToDelete', {
    sparse: true
  }); // For expiring login tokens


  users._ensureIndex("services.resume.loginTokens.when", {
    sparse: true
  }); // For expiring password tokens


  users._ensureIndex('services.password.reset.when', {
    sparse: true
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/accounts-base/server_main.js");

/* Exports */
Package._define("accounts-base", exports, {
  Accounts: Accounts
});

})();

//# sourceURL=meteor://💻app/packages/accounts-base.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtYmFzZS9zZXJ2ZXJfbWFpbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvYWNjb3VudHMtYmFzZS9hY2NvdW50c19jb21tb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2FjY291bnRzLWJhc2UvYWNjb3VudHNfc2VydmVyLmpzIl0sIm5hbWVzIjpbIm1vZHVsZTEiLCJleHBvcnQiLCJBY2NvdW50c1NlcnZlciIsImxpbmsiLCJ2IiwiQWNjb3VudHMiLCJNZXRlb3IiLCJzZXJ2ZXIiLCJ1c2VycyIsIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJkZWZhdWx0IiwiQWNjb3VudHNDb21tb24iLCJFWFBJUkVfVE9LRU5TX0lOVEVSVkFMX01TIiwiQ09OTkVDVElPTl9DTE9TRV9ERUxBWV9NUyIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiY29ubmVjdGlvbiIsInVuZGVmaW5lZCIsIl9pbml0Q29ubmVjdGlvbiIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsIl9wcmV2ZW50QXV0b3B1Ymxpc2giLCJfb25Mb2dpbkhvb2siLCJIb29rIiwiYmluZEVudmlyb25tZW50IiwiZGVidWdQcmludEV4Y2VwdGlvbnMiLCJfb25Mb2dpbkZhaWx1cmVIb29rIiwiX29uTG9nb3V0SG9vayIsIkRFRkFVTFRfTE9HSU5fRVhQSVJBVElPTl9EQVlTIiwiTE9HSU5fVU5FWFBJUklOR19UT0tFTl9EQVlTIiwibGNlTmFtZSIsIkxvZ2luQ2FuY2VsbGVkRXJyb3IiLCJtYWtlRXJyb3JUeXBlIiwiZGVzY3JpcHRpb24iLCJtZXNzYWdlIiwicHJvdG90eXBlIiwibmFtZSIsIm51bWVyaWNFcnJvciIsInN0YXJ0dXAiLCJTZXJ2aWNlQ29uZmlndXJhdGlvbiIsIlBhY2thZ2UiLCJsb2dpblNlcnZpY2VDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJDb25maWdFcnJvciIsInVzZXJJZCIsIkVycm9yIiwiX2FkZERlZmF1bHRGaWVsZFNlbGVjdG9yIiwiZGVmYXVsdEZpZWxkU2VsZWN0b3IiLCJmaWVsZHMiLCJrZXlzIiwiT2JqZWN0IiwibGVuZ3RoIiwia2V5czIiLCJ1c2VyIiwiZmluZE9uZSIsImNvbmZpZyIsImlzU2VydmVyIiwiX19tZXRlb3JfcnVudGltZV9jb25maWdfXyIsImFjY291bnRzQ29uZmlnQ2FsbGVkIiwiX2RlYnVnIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaXNDbGllbnQiLCJPQXV0aEVuY3J5cHRpb24iLCJsb2FkS2V5Iiwib2F1dGhTZWNyZXRLZXkiLCJWQUxJRF9LRVlTIiwiZm9yRWFjaCIsImtleSIsImluY2x1ZGVzIiwib25Mb2dpbiIsImZ1bmMiLCJyZXQiLCJyZWdpc3RlciIsIl9zdGFydHVwQ2FsbGJhY2siLCJjYWxsYmFjayIsIm9uTG9naW5GYWlsdXJlIiwib25Mb2dvdXQiLCJkZHBVcmwiLCJERFAiLCJjb25uZWN0IiwiQUNDT1VOVFNfQ09OTkVDVElPTl9VUkwiLCJfZ2V0VG9rZW5MaWZldGltZU1zIiwibG9naW5FeHBpcmF0aW9uSW5EYXlzIiwiX2dldFBhc3N3b3JkUmVzZXRUb2tlbkxpZmV0aW1lTXMiLCJwYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uSW5EYXlzIiwiREVGQVVMVF9QQVNTV09SRF9SRVNFVF9UT0tFTl9FWFBJUkFUSU9OX0RBWVMiLCJfZ2V0UGFzc3dvcmRFbnJvbGxUb2tlbkxpZmV0aW1lTXMiLCJwYXNzd29yZEVucm9sbFRva2VuRXhwaXJhdGlvbkluRGF5cyIsIkRFRkFVTFRfUEFTU1dPUkRfRU5ST0xMX1RPS0VOX0VYUElSQVRJT05fREFZUyIsIl90b2tlbkV4cGlyYXRpb24iLCJ3aGVuIiwiRGF0ZSIsImdldFRpbWUiLCJfdG9rZW5FeHBpcmVzU29vbiIsIm1pbkxpZmV0aW1lTXMiLCJtaW5MaWZldGltZUNhcE1zIiwiTUlOX1RPS0VOX0xJRkVUSU1FX0NBUF9TRUNTIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiY3J5cHRvIiwiaGFzT3duIiwiX3NlcnZlciIsIl9pbml0U2VydmVyTWV0aG9kcyIsIl9pbml0QWNjb3VudERhdGFIb29rcyIsIl9hdXRvcHVibGlzaEZpZWxkcyIsImxvZ2dlZEluVXNlciIsIm90aGVyVXNlcnMiLCJfaW5pdFNlcnZlclB1YmxpY2F0aW9ucyIsIl9hY2NvdW50RGF0YSIsIl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9ucyIsIl9uZXh0VXNlck9ic2VydmVOdW1iZXIiLCJfbG9naW5IYW5kbGVycyIsInNldHVwVXNlcnNDb2xsZWN0aW9uIiwic2V0dXBEZWZhdWx0TG9naW5IYW5kbGVycyIsInNldEV4cGlyZVRva2Vuc0ludGVydmFsIiwiX3ZhbGlkYXRlTG9naW5Ib29rIiwiX3ZhbGlkYXRlTmV3VXNlckhvb2tzIiwiZGVmYXVsdFZhbGlkYXRlTmV3VXNlckhvb2siLCJiaW5kIiwiX2RlbGV0ZVNhdmVkVG9rZW5zRm9yQWxsVXNlcnNPblN0YXJ0dXAiLCJfc2tpcENhc2VJbnNlbnNpdGl2ZUNoZWNrc0ZvclRlc3QiLCJ1cmxzIiwicmVzZXRQYXNzd29yZCIsInRva2VuIiwiYWJzb2x1dGVVcmwiLCJ2ZXJpZnlFbWFpbCIsImVucm9sbEFjY291bnQiLCJhZGREZWZhdWx0UmF0ZUxpbWl0IiwiY3VycmVudEludm9jYXRpb24iLCJfQ3VycmVudE1ldGhvZEludm9jYXRpb24iLCJnZXQiLCJfQ3VycmVudFB1YmxpY2F0aW9uSW52b2NhdGlvbiIsInZhbGlkYXRlTG9naW5BdHRlbXB0IiwidmFsaWRhdGVOZXdVc2VyIiwicHVzaCIsImJlZm9yZUV4dGVybmFsTG9naW4iLCJfYmVmb3JlRXh0ZXJuYWxMb2dpbkhvb2siLCJvbkNyZWF0ZVVzZXIiLCJfb25DcmVhdGVVc2VySG9vayIsIm9uRXh0ZXJuYWxMb2dpbiIsIl9vbkV4dGVybmFsTG9naW5Ib29rIiwiX3ZhbGlkYXRlTG9naW4iLCJhdHRlbXB0IiwiZWFjaCIsImNsb25lQXR0ZW1wdFdpdGhDb25uZWN0aW9uIiwiZSIsImFsbG93ZWQiLCJlcnJvciIsIl9zdWNjZXNzZnVsTG9naW4iLCJfZmFpbGVkTG9naW4iLCJfc3VjY2Vzc2Z1bExvZ291dCIsIl9sb2dpblVzZXIiLCJtZXRob2RJbnZvY2F0aW9uIiwic3RhbXBlZExvZ2luVG9rZW4iLCJfZ2VuZXJhdGVTdGFtcGVkTG9naW5Ub2tlbiIsIl9pbnNlcnRMb2dpblRva2VuIiwiX25vWWllbGRzQWxsb3dlZCIsIl9zZXRMb2dpblRva2VuIiwiX2hhc2hMb2dpblRva2VuIiwic2V0VXNlcklkIiwiaWQiLCJ0b2tlbkV4cGlyZXMiLCJfYXR0ZW1wdExvZ2luIiwibWV0aG9kTmFtZSIsIm1ldGhvZEFyZ3MiLCJyZXN1bHQiLCJ0eXBlIiwibWV0aG9kQXJndW1lbnRzIiwiQXJyYXkiLCJmcm9tIiwiX2xvZ2luTWV0aG9kIiwiZm4iLCJ0cnlMb2dpbk1ldGhvZCIsIl9yZXBvcnRMb2dpbkZhaWx1cmUiLCJyZWdpc3RlckxvZ2luSGFuZGxlciIsImhhbmRsZXIiLCJfcnVuTG9naW5IYW5kbGVycyIsImRlc3Ryb3lUb2tlbiIsImxvZ2luVG9rZW4iLCJ1cGRhdGUiLCIkcHVsbCIsIiRvciIsImhhc2hlZFRva2VuIiwiYWNjb3VudHMiLCJtZXRob2RzIiwibG9naW4iLCJjaGVjayIsImFyZ3VtZW50cyIsImxvZ291dCIsIl9nZXRMb2dpblRva2VuIiwibG9nb3V0T3RoZXJDbGllbnRzIiwidG9rZW5zIiwic2VydmljZXMiLCJyZXN1bWUiLCJsb2dpblRva2VucyIsIm5ld1Rva2VuIiwiJHNldCIsIiRwdXNoIiwiX2hhc2hTdGFtcGVkVG9rZW4iLCJzZXRUaW1lb3V0IiwiX2RlbGV0ZVNhdmVkVG9rZW5zRm9yVXNlciIsIl9ub0Nvbm5lY3Rpb25DbG9zZURlbGF5Rm9yVGVzdCIsImdldE5ld1Rva2VuIiwiY3VycmVudEhhc2hlZFRva2VuIiwiY3VycmVudFN0YW1wZWRUb2tlbiIsImZpbmQiLCJzdGFtcGVkVG9rZW4iLCJuZXdTdGFtcGVkVG9rZW4iLCJyZW1vdmVPdGhlclRva2VucyIsImN1cnJlbnRUb2tlbiIsIiRuZSIsImNvbmZpZ3VyZUxvZ2luU2VydmljZSIsIk1hdGNoIiwiT2JqZWN0SW5jbHVkaW5nIiwic2VydmljZSIsIlN0cmluZyIsIm9hdXRoIiwic2VydmljZU5hbWVzIiwidXNpbmdPQXV0aEVuY3J5cHRpb24iLCJzZWNyZXQiLCJzZWFsIiwiaW5zZXJ0Iiwib25Db25uZWN0aW9uIiwib25DbG9zZSIsIl9yZW1vdmVUb2tlbkZyb21Db25uZWN0aW9uIiwicHVibGlzaCIsImlzX2F1dG8iLCJfaWQiLCJwcm9maWxlIiwidXNlcm5hbWUiLCJlbWFpbHMiLCJhdXRvcHVibGlzaCIsInRvRmllbGRTZWxlY3RvciIsInJlZHVjZSIsInByZXYiLCJmaWVsZCIsInNlbGVjdG9yIiwiYWRkQXV0b3B1Ymxpc2hGaWVsZHMiLCJvcHRzIiwiYXBwbHkiLCJmb3JMb2dnZWRJblVzZXIiLCJmb3JPdGhlclVzZXJzIiwiX2dldEFjY291bnREYXRhIiwiY29ubmVjdGlvbklkIiwiZGF0YSIsIl9zZXRBY2NvdW50RGF0YSIsInZhbHVlIiwiaGFzaCIsImNyZWF0ZUhhc2giLCJkaWdlc3QiLCJoYXNoZWRTdGFtcGVkVG9rZW4iLCJfaW5zZXJ0SGFzaGVkTG9naW5Ub2tlbiIsInF1ZXJ5IiwiJGFkZFRvU2V0IiwiX2NsZWFyQWxsTG9naW5Ub2tlbnMiLCJfZ2V0VXNlck9ic2VydmUiLCJvYnNlcnZlIiwic3RvcCIsIm15T2JzZXJ2ZU51bWJlciIsImRlZmVyIiwiZm91bmRNYXRjaGluZ1VzZXIiLCJvYnNlcnZlQ2hhbmdlcyIsImFkZGVkIiwicmVtb3ZlZCIsImNsb3NlIiwibm9uTXV0YXRpbmdDYWxsYmFja3MiLCJSYW5kb20iLCJfZXhwaXJlUGFzc3dvcmRSZXNldFRva2VucyIsIm9sZGVzdFZhbGlkRGF0ZSIsInRva2VuTGlmZXRpbWVNcyIsInRva2VuRmlsdGVyIiwiJGV4aXN0cyIsImV4cGlyZVBhc3N3b3JkVG9rZW4iLCJfZXhwaXJlUGFzc3dvcmRFbnJvbGxUb2tlbnMiLCJfZXhwaXJlVG9rZW5zIiwidXNlckZpbHRlciIsIiRsdCIsIm11bHRpIiwic3VwZXJSZXN1bHQiLCJleHBpcmVUb2tlbkludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImluc2VydFVzZXJEb2MiLCJjcmVhdGVkQXQiLCJwaW5FbmNyeXB0ZWRGaWVsZHNUb1VzZXIiLCJmdWxsVXNlciIsImRlZmF1bHRDcmVhdGVVc2VySG9vayIsImhvb2siLCJlcnJtc2ciLCJfdGVzdEVtYWlsRG9tYWluIiwiZW1haWwiLCJkb21haW4iLCJyZXN0cmljdENyZWF0aW9uQnlFbWFpbERvbWFpbiIsIlJlZ0V4cCIsIl9lc2NhcGVSZWdFeHAiLCJ0ZXN0IiwidG9rZW5zVG9EZWxldGUiLCIkdW5zZXQiLCIkcHVsbEFsbCIsImxvZ2luVG9rZW5zVG9EZWxldGUiLCJ1cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIiwic2VydmljZU5hbWUiLCJzZXJ2aWNlRGF0YSIsInNlcnZpY2VJZEtleSIsImlzTmFOIiwicGFyc2VJbnQiLCJzZXRBdHRycyIsInJlbW92ZURlZmF1bHRSYXRlTGltaXQiLCJyZXNwIiwiRERQUmF0ZUxpbWl0ZXIiLCJyZW1vdmVSdWxlIiwiZGVmYXVsdFJhdGVMaW1pdGVyUnVsZUlkIiwiYWRkUnVsZSIsImNsaWVudEFkZHJlc3MiLCJjbG9uZWRBdHRlbXB0IiwiRUpTT04iLCJjbG9uZSIsImRlZmF1bHRSZXN1bWVMb2dpbkhhbmRsZXIiLCJvbGRVbmhhc2hlZFN0eWxlVG9rZW4iLCJyZXNldFJhbmdlT3IiLCJleHBpcmVGaWx0ZXIiLCIkYW5kIiwic2V0SW50ZXJ2YWwiLCJrZXlJc0xvYWRlZCIsImlzU2VhbGVkIiwib3BlbiIsImVtYWlsSXNHb29kIiwiYWRkcmVzcyIsInZhbHVlcyIsImFsbG93IiwibW9kaWZpZXIiLCJmZXRjaCIsIl9lbnN1cmVJbmRleCIsInVuaXF1ZSIsInNwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsU0FBTyxD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QUFFLENBQUMsS0FBRCxDQWxCRyxDQWtCSzs7QUFsQkwsR0FBWixFQUpvQyxDQXlCcEM7O0FBQ0FwVSxPQUFLLENBQUNxVSxZQUFOLENBQW1CLFVBQW5CLEVBQStCO0FBQUVDLFVBQU0sRUFBRSxJQUFWO0FBQWdCQyxVQUFNLEVBQUU7QUFBeEIsR0FBL0I7O0FBQ0F2VSxPQUFLLENBQUNxVSxZQUFOLENBQW1CLGdCQUFuQixFQUFxQztBQUFFQyxVQUFNLEVBQUUsSUFBVjtBQUFnQkMsVUFBTSxFQUFFO0FBQXhCLEdBQXJDOztBQUNBdlUsT0FBSyxDQUFDcVUsWUFBTixDQUFtQix5Q0FBbkIsRUFDRTtBQUFFQyxVQUFNLEVBQUUsSUFBVjtBQUFnQkMsVUFBTSxFQUFFO0FBQXhCLEdBREY7O0FBRUF2VSxPQUFLLENBQUNxVSxZQUFOLENBQW1CLG1DQUFuQixFQUNFO0FBQUVDLFVBQU0sRUFBRSxJQUFWO0FBQWdCQyxVQUFNLEVBQUU7QUFBeEIsR0FERixFQTlCb0MsQ0FnQ3BDO0FBQ0E7OztBQUNBdlUsT0FBSyxDQUFDcVUsWUFBTixDQUFtQix5Q0FBbkIsRUFDRTtBQUFFRSxVQUFNLEVBQUU7QUFBVixHQURGLEVBbENvQyxDQW9DcEM7OztBQUNBdlUsT0FBSyxDQUFDcVUsWUFBTixDQUFtQixrQ0FBbkIsRUFBdUQ7QUFBRUUsVUFBTSxFQUFFO0FBQVYsR0FBdkQsRUFyQ29DLENBc0NwQzs7O0FBQ0F2VSxPQUFLLENBQUNxVSxZQUFOLENBQW1CLDhCQUFuQixFQUFtRDtBQUFFRSxVQUFNLEVBQUU7QUFBVixHQUFuRDtBQUNELENBeENELEMiLCJmaWxlIjoiL3BhY2thZ2VzL2FjY291bnRzLWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2NvdW50c1NlcnZlciB9IGZyb20gXCIuL2FjY291bnRzX3NlcnZlci5qc1wiO1xuXG4vKipcbiAqIEBuYW1lc3BhY2UgQWNjb3VudHNcbiAqIEBzdW1tYXJ5IFRoZSBuYW1lc3BhY2UgZm9yIGFsbCBzZXJ2ZXItc2lkZSBhY2NvdW50cy1yZWxhdGVkIG1ldGhvZHMuXG4gKi9cbkFjY291bnRzID0gbmV3IEFjY291bnRzU2VydmVyKE1ldGVvci5zZXJ2ZXIpO1xuXG4vLyBVc2VycyB0YWJsZS4gRG9uJ3QgdXNlIHRoZSBub3JtYWwgYXV0b3B1Ymxpc2gsIHNpbmNlIHdlIHdhbnQgdG8gaGlkZVxuLy8gc29tZSBmaWVsZHMuIENvZGUgdG8gYXV0b3B1Ymxpc2ggdGhpcyBpcyBpbiBhY2NvdW50c19zZXJ2ZXIuanMuXG4vLyBYWFggQWxsb3cgdXNlcnMgdG8gY29uZmlndXJlIHRoaXMgY29sbGVjdGlvbiBuYW1lLlxuXG4vKipcbiAqIEBzdW1tYXJ5IEEgW01vbmdvLkNvbGxlY3Rpb25dKCNjb2xsZWN0aW9ucykgY29udGFpbmluZyB1c2VyIGRvY3VtZW50cy5cbiAqIEBsb2N1cyBBbnl3aGVyZVxuICogQHR5cGUge01vbmdvLkNvbGxlY3Rpb259XG4gKiBAaW1wb3J0RnJvbVBhY2thZ2UgbWV0ZW9yXG4qL1xuTWV0ZW9yLnVzZXJzID0gQWNjb3VudHMudXNlcnM7XG5cbmV4cG9ydCB7XG4gIC8vIFNpbmNlIHRoaXMgZmlsZSBpcyB0aGUgbWFpbiBtb2R1bGUgZm9yIHRoZSBzZXJ2ZXIgdmVyc2lvbiBvZiB0aGVcbiAgLy8gYWNjb3VudHMtYmFzZSBwYWNrYWdlLCBwcm9wZXJ0aWVzIG9mIG5vbi1lbnRyeS1wb2ludCBtb2R1bGVzIG5lZWQgdG9cbiAgLy8gYmUgcmUtZXhwb3J0ZWQgaW4gb3JkZXIgdG8gYmUgYWNjZXNzaWJsZSB0byBtb2R1bGVzIHRoYXQgaW1wb3J0IHRoZVxuICAvLyBhY2NvdW50cy1iYXNlIHBhY2thZ2UuXG4gIEFjY291bnRzU2VydmVyXG59O1xuIiwiLyoqXG4gKiBAc3VtbWFyeSBTdXBlci1jb25zdHJ1Y3RvciBmb3IgQWNjb3VudHNDbGllbnQgYW5kIEFjY291bnRzU2VydmVyLlxuICogQGxvY3VzIEFueXdoZXJlXG4gKiBAY2xhc3MgQWNjb3VudHNDb21tb25cbiAqIEBpbnN0YW5jZW5hbWUgYWNjb3VudHNDbGllbnRPclNlcnZlclxuICogQHBhcmFtIG9wdGlvbnMge09iamVjdH0gYW4gb2JqZWN0IHdpdGggZmllbGRzOlxuICogLSBjb25uZWN0aW9uIHtPYmplY3R9IE9wdGlvbmFsIEREUCBjb25uZWN0aW9uIHRvIHJldXNlLlxuICogLSBkZHBVcmwge1N0cmluZ30gT3B0aW9uYWwgVVJMIGZvciBjcmVhdGluZyBhIG5ldyBERFAgY29ubmVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEFjY291bnRzQ29tbW9uIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIC8vIEN1cnJlbnRseSB0aGlzIGlzIHJlYWQgZGlyZWN0bHkgYnkgcGFja2FnZXMgbGlrZSBhY2NvdW50cy1wYXNzd29yZFxuICAgIC8vIGFuZCBhY2NvdW50cy11aS11bnN0eWxlZC5cbiAgICB0aGlzLl9vcHRpb25zID0ge307XG5cbiAgICAvLyBOb3RlIHRoYXQgc2V0dGluZyB0aGlzLmNvbm5lY3Rpb24gPSBudWxsIGNhdXNlcyB0aGlzLnVzZXJzIHRvIGJlIGFcbiAgICAvLyBMb2NhbENvbGxlY3Rpb24sIHdoaWNoIGlzIG5vdCB3aGF0IHdlIHdhbnQuXG4gICAgdGhpcy5jb25uZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2luaXRDb25uZWN0aW9uKG9wdGlvbnMgfHwge30pO1xuXG4gICAgLy8gVGhlcmUgaXMgYW4gYWxsb3cgY2FsbCBpbiBhY2NvdW50c19zZXJ2ZXIuanMgdGhhdCByZXN0cmljdHMgd3JpdGVzIHRvXG4gICAgLy8gdGhpcyBjb2xsZWN0aW9uLlxuICAgIHRoaXMudXNlcnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbihcInVzZXJzXCIsIHtcbiAgICAgIF9wcmV2ZW50QXV0b3B1Ymxpc2g6IHRydWUsXG4gICAgICBjb25uZWN0aW9uOiB0aGlzLmNvbm5lY3Rpb25cbiAgICB9KTtcblxuICAgIC8vIENhbGxiYWNrIGV4Y2VwdGlvbnMgYXJlIHByaW50ZWQgd2l0aCBNZXRlb3IuX2RlYnVnIGFuZCBpZ25vcmVkLlxuICAgIHRoaXMuX29uTG9naW5Ib29rID0gbmV3IEhvb2soe1xuICAgICAgYmluZEVudmlyb25tZW50OiBmYWxzZSxcbiAgICAgIGRlYnVnUHJpbnRFeGNlcHRpb25zOiBcIm9uTG9naW4gY2FsbGJhY2tcIlxuICAgIH0pO1xuXG4gICAgdGhpcy5fb25Mb2dpbkZhaWx1cmVIb29rID0gbmV3IEhvb2soe1xuICAgICAgYmluZEVudmlyb25tZW50OiBmYWxzZSxcbiAgICAgIGRlYnVnUHJpbnRFeGNlcHRpb25zOiBcIm9uTG9naW5GYWlsdXJlIGNhbGxiYWNrXCJcbiAgICB9KTtcblxuICAgIHRoaXMuX29uTG9nb3V0SG9vayA9IG5ldyBIb29rKHtcbiAgICAgIGJpbmRFbnZpcm9ubWVudDogZmFsc2UsXG4gICAgICBkZWJ1Z1ByaW50RXhjZXB0aW9uczogXCJvbkxvZ291dCBjYWxsYmFja1wiXG4gICAgfSk7XG5cbiAgICAvLyBFeHBvc2UgZm9yIHRlc3RpbmcuXG4gICAgdGhpcy5ERUZBVUxUX0xPR0lOX0VYUElSQVRJT05fREFZUyA9IERFRkFVTFRfTE9HSU5fRVhQSVJBVElPTl9EQVlTO1xuICAgIHRoaXMuTE9HSU5fVU5FWFBJUklOR19UT0tFTl9EQVlTID0gTE9HSU5fVU5FWFBJUklOR19UT0tFTl9EQVlTO1xuXG4gICAgLy8gVGhyb3duIHdoZW4gdGhlIHVzZXIgY2FuY2VscyB0aGUgbG9naW4gcHJvY2VzcyAoZWcsIGNsb3NlcyBhbiBvYXV0aFxuICAgIC8vIHBvcHVwLCBkZWNsaW5lcyByZXRpbmEgc2NhbiwgZXRjKVxuICAgIGNvbnN0IGxjZU5hbWUgPSAnQWNjb3VudHMuTG9naW5DYW5jZWxsZWRFcnJvcic7XG4gICAgdGhpcy5Mb2dpbkNhbmNlbGxlZEVycm9yID0gTWV0ZW9yLm1ha2VFcnJvclR5cGUoXG4gICAgICBsY2VOYW1lLFxuICAgICAgZnVuY3Rpb24gKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5Mb2dpbkNhbmNlbGxlZEVycm9yLnByb3RvdHlwZS5uYW1lID0gbGNlTmFtZTtcblxuICAgIC8vIFRoaXMgaXMgdXNlZCB0byB0cmFuc21pdCBzcGVjaWZpYyBzdWJjbGFzcyBlcnJvcnMgb3ZlciB0aGUgd2lyZS4gV2VcbiAgICAvLyBzaG91bGQgY29tZSB1cCB3aXRoIGEgbW9yZSBnZW5lcmljIHdheSB0byBkbyB0aGlzIChlZywgd2l0aCBzb21lIHNvcnQgb2ZcbiAgICAvLyBzeW1ib2xpYyBlcnJvciBjb2RlIHJhdGhlciB0aGFuIGEgbnVtYmVyKS5cbiAgICB0aGlzLkxvZ2luQ2FuY2VsbGVkRXJyb3IubnVtZXJpY0Vycm9yID0gMHg4YWNkYzJmO1xuXG4gICAgLy8gbG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbiBhbmQgQ29uZmlnRXJyb3IgYXJlIG1haW50YWluZWQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAgICAgY29uc3QgeyBTZXJ2aWNlQ29uZmlndXJhdGlvbiB9ID0gUGFja2FnZVsnc2VydmljZS1jb25maWd1cmF0aW9uJ107XG4gICAgICB0aGlzLmxvZ2luU2VydmljZUNvbmZpZ3VyYXRpb24gPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucztcbiAgICAgIHRoaXMuQ29uZmlnRXJyb3IgPSBTZXJ2aWNlQ29uZmlndXJhdGlvbi5Db25maWdFcnJvcjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBHZXQgdGhlIGN1cnJlbnQgdXNlciBpZCwgb3IgYG51bGxgIGlmIG5vIHVzZXIgaXMgbG9nZ2VkIGluLiBBIHJlYWN0aXZlIGRhdGEgc291cmNlLlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICovXG4gIHVzZXJJZCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VySWQgbWV0aG9kIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIC8vIG1lcmdlIHRoZSBkZWZhdWx0RmllbGRTZWxlY3RvciB3aXRoIGFuIGV4aXN0aW5nIG9wdGlvbnMgb2JqZWN0XG4gIF9hZGREZWZhdWx0RmllbGRTZWxlY3RvcihvcHRpb25zID0ge30pIHtcbiAgICAvLyB0aGlzIHdpbGwgYmUgdGhlIG1vc3QgY29tbW9uIGNhc2UgZm9yIG1vc3QgcGVvcGxlLCBzbyBtYWtlIGl0IHF1aWNrXG4gICAgaWYgKCF0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yKSByZXR1cm4gb3B0aW9ucztcblxuICAgIC8vIGlmIG5vIGZpZWxkIHNlbGVjdG9yIHRoZW4ganVzdCB1c2UgZGVmYXVsdEZpZWxkU2VsZWN0b3JcbiAgICBpZiAoIW9wdGlvbnMuZmllbGRzKSByZXR1cm4ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGZpZWxkczogdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmllbGRTZWxlY3RvcixcbiAgICB9O1xuXG4gICAgLy8gaWYgZW1wdHkgZmllbGQgc2VsZWN0b3IgdGhlbiB0aGUgZnVsbCB1c2VyIG9iamVjdCBpcyBleHBsaWNpdGx5IHJlcXVlc3RlZCwgc28gb2JleVxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLmZpZWxkcyk7XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkgcmV0dXJuIG9wdGlvbnM7XG5cbiAgICAvLyBpZiB0aGUgcmVxdWVzdGVkIGZpZWxkcyBhcmUgK3ZlIHRoZW4gaWdub3JlIGRlZmF1bHRGaWVsZFNlbGVjdG9yXG4gICAgLy8gYXNzdW1lIHRoZXkgYXJlIGFsbCBlaXRoZXIgK3ZlIG9yIC12ZSBiZWNhdXNlIE1vbmdvIGRvZXNuJ3QgbGlrZSBtaXhlZFxuICAgIGlmICghIW9wdGlvbnMuZmllbGRzW2tleXNbMF1dKSByZXR1cm4gb3B0aW9ucztcblxuICAgIC8vIFRoZSByZXF1ZXN0ZWQgZmllbGRzIGFyZSAtdmUuXG4gICAgLy8gSWYgdGhlIGRlZmF1bHRGaWVsZFNlbGVjdG9yIGlzICt2ZSB0aGVuIHVzZSByZXF1ZXN0ZWQgZmllbGRzLCBvdGhlcndpc2UgbWVyZ2UgdGhlbVxuICAgIGNvbnN0IGtleXMyID0gT2JqZWN0LmtleXModGhpcy5fb3B0aW9ucy5kZWZhdWx0RmllbGRTZWxlY3Rvcik7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMuZGVmYXVsdEZpZWxkU2VsZWN0b3Jba2V5czJbMF1dID8gb3B0aW9ucyA6IHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBmaWVsZHM6IHtcbiAgICAgICAgLi4ub3B0aW9ucy5maWVsZHMsXG4gICAgICAgIC4uLnRoaXMuX29wdGlvbnMuZGVmYXVsdEZpZWxkU2VsZWN0b3IsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEdldCB0aGUgY3VycmVudCB1c2VyIHJlY29yZCwgb3IgYG51bGxgIGlmIG5vIHVzZXIgaXMgbG9nZ2VkIGluLiBBIHJlYWN0aXZlIGRhdGEgc291cmNlLlxuICAgKiBAbG9jdXMgQW55d2hlcmVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge01vbmdvRmllbGRTcGVjaWZpZXJ9IG9wdGlvbnMuZmllbGRzIERpY3Rpb25hcnkgb2YgZmllbGRzIHRvIHJldHVybiBvciBleGNsdWRlLlxuICAgKi9cbiAgdXNlcihvcHRpb25zKSB7XG4gICAgY29uc3QgdXNlcklkID0gdGhpcy51c2VySWQoKTtcbiAgICByZXR1cm4gdXNlcklkID8gdGhpcy51c2Vycy5maW5kT25lKHVzZXJJZCwgdGhpcy5fYWRkRGVmYXVsdEZpZWxkU2VsZWN0b3Iob3B0aW9ucykpIDogbnVsbDtcbiAgfVxuXG4gIC8vIFNldCB1cCBjb25maWcgZm9yIHRoZSBhY2NvdW50cyBzeXN0ZW0uIENhbGwgdGhpcyBvbiBib3RoIHRoZSBjbGllbnRcbiAgLy8gYW5kIHRoZSBzZXJ2ZXIuXG4gIC8vXG4gIC8vIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBnZXRzIG92ZXJyaWRkZW4gb24gQWNjb3VudHNTZXJ2ZXIucHJvdG90eXBlLCBidXRcbiAgLy8gdGhlIG92ZXJyaWRpbmcgbWV0aG9kIGNhbGxzIHRoZSBvdmVycmlkZGVuIG1ldGhvZC5cbiAgLy9cbiAgLy8gWFhYIHdlIHNob3VsZCBhZGQgc29tZSBlbmZvcmNlbWVudCB0aGF0IHRoaXMgaXMgY2FsbGVkIG9uIGJvdGggdGhlXG4gIC8vIGNsaWVudCBhbmQgdGhlIHNlcnZlci4gT3RoZXJ3aXNlLCBhIHVzZXIgY2FuXG4gIC8vICdmb3JiaWRDbGllbnRBY2NvdW50Q3JlYXRpb24nIG9ubHkgb24gdGhlIGNsaWVudCBhbmQgd2hpbGUgaXQgbG9va3NcbiAgLy8gbGlrZSB0aGVpciBhcHAgaXMgc2VjdXJlLCB0aGUgc2VydmVyIHdpbGwgc3RpbGwgYWNjZXB0IGNyZWF0ZVVzZXJcbiAgLy8gY2FsbHMuIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRlb3IvbWV0ZW9yL2lzc3Vlcy84MjhcbiAgLy9cbiAgLy8gQHBhcmFtIG9wdGlvbnMge09iamVjdH0gYW4gb2JqZWN0IHdpdGggZmllbGRzOlxuICAvLyAtIHNlbmRWZXJpZmljYXRpb25FbWFpbCB7Qm9vbGVhbn1cbiAgLy8gICAgIFNlbmQgZW1haWwgYWRkcmVzcyB2ZXJpZmljYXRpb24gZW1haWxzIHRvIG5ldyB1c2VycyBjcmVhdGVkIGZyb21cbiAgLy8gICAgIGNsaWVudCBzaWdudXBzLlxuICAvLyAtIGZvcmJpZENsaWVudEFjY291bnRDcmVhdGlvbiB7Qm9vbGVhbn1cbiAgLy8gICAgIERvIG5vdCBhbGxvdyBjbGllbnRzIHRvIGNyZWF0ZSBhY2NvdW50cyBkaXJlY3RseS5cbiAgLy8gLSByZXN0cmljdENyZWF0aW9uQnlFbWFpbERvbWFpbiB7RnVuY3Rpb24gb3IgU3RyaW5nfVxuICAvLyAgICAgUmVxdWlyZSBjcmVhdGVkIHVzZXJzIHRvIGhhdmUgYW4gZW1haWwgbWF0Y2hpbmcgdGhlIGZ1bmN0aW9uIG9yXG4gIC8vICAgICBoYXZpbmcgdGhlIHN0cmluZyBhcyBkb21haW4uXG4gIC8vIC0gbG9naW5FeHBpcmF0aW9uSW5EYXlzIHtOdW1iZXJ9XG4gIC8vICAgICBOdW1iZXIgb2YgZGF5cyBzaW5jZSBsb2dpbiB1bnRpbCBhIHVzZXIgaXMgbG9nZ2VkIG91dCAobG9naW4gdG9rZW5cbiAgLy8gICAgIGV4cGlyZXMpLlxuICAvLyAtIHBhc3N3b3JkUmVzZXRUb2tlbkV4cGlyYXRpb25JbkRheXMge051bWJlcn1cbiAgLy8gICAgIE51bWJlciBvZiBkYXlzIHNpbmNlIHBhc3N3b3JkIHJlc2V0IHRva2VuIGNyZWF0aW9uIHVudGlsIHRoZVxuICAvLyAgICAgdG9rZW4gY2FubnQgYmUgdXNlZCBhbnkgbG9uZ2VyIChwYXNzd29yZCByZXNldCB0b2tlbiBleHBpcmVzKS5cbiAgLy8gLSBhbWJpZ3VvdXNFcnJvck1lc3NhZ2VzIHtCb29sZWFufVxuICAvLyAgICAgUmV0dXJuIGFtYmlndW91cyBlcnJvciBtZXNzYWdlcyBmcm9tIGxvZ2luIGZhaWx1cmVzIHRvIHByZXZlbnRcbiAgLy8gICAgIHVzZXIgZW51bWVyYXRpb24uXG4gIC8vIC0gYmNyeXB0Um91bmRzIHtOdW1iZXJ9XG4gIC8vICAgICBBbGxvd3Mgb3ZlcnJpZGUgb2YgbnVtYmVyIG9mIGJjcnlwdCByb3VuZHMgKGFrYSB3b3JrIGZhY3RvcikgdXNlZFxuICAvLyAgICAgdG8gc3RvcmUgcGFzc3dvcmRzLlxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBTZXQgZ2xvYmFsIGFjY291bnRzIG9wdGlvbnMuXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuc2VuZFZlcmlmaWNhdGlvbkVtYWlsIE5ldyB1c2VycyB3aXRoIGFuIGVtYWlsIGFkZHJlc3Mgd2lsbCByZWNlaXZlIGFuIGFkZHJlc3MgdmVyaWZpY2F0aW9uIGVtYWlsLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZm9yYmlkQ2xpZW50QWNjb3VudENyZWF0aW9uIENhbGxzIHRvIFtgY3JlYXRlVXNlcmBdKCNhY2NvdW50c19jcmVhdGV1c2VyKSBmcm9tIHRoZSBjbGllbnQgd2lsbCBiZSByZWplY3RlZC4gSW4gYWRkaXRpb24sIGlmIHlvdSBhcmUgdXNpbmcgW2FjY291bnRzLXVpXSgjYWNjb3VudHN1aSksIHRoZSBcIkNyZWF0ZSBhY2NvdW50XCIgbGluayB3aWxsIG5vdCBiZSBhdmFpbGFibGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nIHwgRnVuY3Rpb259IG9wdGlvbnMucmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW4gSWYgc2V0IHRvIGEgc3RyaW5nLCBvbmx5IGFsbG93cyBuZXcgdXNlcnMgaWYgdGhlIGRvbWFpbiBwYXJ0IG9mIHRoZWlyIGVtYWlsIGFkZHJlc3MgbWF0Y2hlcyB0aGUgc3RyaW5nLiBJZiBzZXQgdG8gYSBmdW5jdGlvbiwgb25seSBhbGxvd3MgbmV3IHVzZXJzIGlmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUuICBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIHRoZSBmdWxsIGVtYWlsIGFkZHJlc3Mgb2YgdGhlIHByb3Bvc2VkIG5ldyB1c2VyLiAgV29ya3Mgd2l0aCBwYXNzd29yZC1iYXNlZCBzaWduLWluIGFuZCBleHRlcm5hbCBzZXJ2aWNlcyB0aGF0IGV4cG9zZSBlbWFpbCBhZGRyZXNzZXMgKEdvb2dsZSwgRmFjZWJvb2ssIEdpdEh1YikuIEFsbCBleGlzdGluZyB1c2VycyBzdGlsbCBjYW4gbG9nIGluIGFmdGVyIGVuYWJsaW5nIHRoaXMgb3B0aW9uLiBFeGFtcGxlOiBgQWNjb3VudHMuY29uZmlnKHsgcmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW46ICdzY2hvb2wuZWR1JyB9KWAuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmxvZ2luRXhwaXJhdGlvbkluRGF5cyBUaGUgbnVtYmVyIG9mIGRheXMgZnJvbSB3aGVuIGEgdXNlciBsb2dzIGluIHVudGlsIHRoZWlyIHRva2VuIGV4cGlyZXMgYW5kIHRoZXkgYXJlIGxvZ2dlZCBvdXQuIERlZmF1bHRzIHRvIDkwLiBTZXQgdG8gYG51bGxgIHRvIGRpc2FibGUgbG9naW4gZXhwaXJhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMub2F1dGhTZWNyZXRLZXkgV2hlbiB1c2luZyB0aGUgYG9hdXRoLWVuY3J5cHRpb25gIHBhY2thZ2UsIHRoZSAxNiBieXRlIGtleSB1c2luZyB0byBlbmNyeXB0IHNlbnNpdGl2ZSBhY2NvdW50IGNyZWRlbnRpYWxzIGluIHRoZSBkYXRhYmFzZSwgZW5jb2RlZCBpbiBiYXNlNjQuICBUaGlzIG9wdGlvbiBtYXkgb25seSBiZSBzcGVjaWZlZCBvbiB0aGUgc2VydmVyLiAgU2VlIHBhY2thZ2VzL29hdXRoLWVuY3J5cHRpb24vUkVBRE1FLm1kIGZvciBkZXRhaWxzLlxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5wYXNzd29yZFJlc2V0VG9rZW5FeHBpcmF0aW9uSW5EYXlzIFRoZSBudW1iZXIgb2YgZGF5cyBmcm9tIHdoZW4gYSBsaW5rIHRvIHJlc2V0IHBhc3N3b3JkIGlzIHNlbnQgdW50aWwgdG9rZW4gZXhwaXJlcyBhbmQgdXNlciBjYW4ndCByZXNldCBwYXNzd29yZCB3aXRoIHRoZSBsaW5rIGFueW1vcmUuIERlZmF1bHRzIHRvIDMuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnBhc3N3b3JkRW5yb2xsVG9rZW5FeHBpcmF0aW9uSW5EYXlzIFRoZSBudW1iZXIgb2YgZGF5cyBmcm9tIHdoZW4gYSBsaW5rIHRvIHNldCBpbml0YWwgcGFzc3dvcmQgaXMgc2VudCB1bnRpbCB0b2tlbiBleHBpcmVzIGFuZCB1c2VyIGNhbid0IHNldCBwYXNzd29yZCB3aXRoIHRoZSBsaW5rIGFueW1vcmUuIERlZmF1bHRzIHRvIDMwLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuYW1iaWd1b3VzRXJyb3JNZXNzYWdlcyBSZXR1cm4gYW1iaWd1b3VzIGVycm9yIG1lc3NhZ2VzIGZyb20gbG9naW4gZmFpbHVyZXMgdG8gcHJldmVudCB1c2VyIGVudW1lcmF0aW9uLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICogQHBhcmFtIHtNb25nb0ZpZWxkU3BlY2lmaWVyfSBvcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yIFRvIGV4Y2x1ZGUgYnkgZGVmYXVsdCBsYXJnZSBjdXN0b20gZmllbGRzIGZyb20gYE1ldGVvci51c2VyKClgIGFuZCBgTWV0ZW9yLmZpbmRVc2VyQnkuLi4oKWAgZnVuY3Rpb25zIHdoZW4gY2FsbGVkIHdpdGhvdXQgYSBmaWVsZCBzZWxlY3RvciwgYW5kIGFsbCBgb25Mb2dpbmAsIGBvbkxvZ2luRmFpbHVyZWAgYW5kIGBvbkxvZ291dGAgY2FsbGJhY2tzLiAgRXhhbXBsZTogYEFjY291bnRzLmNvbmZpZyh7IGRlZmF1bHRGaWVsZFNlbGVjdG9yOiB7IG15QmlnQXJyYXk6IDAgfX0pYC5cbiAgICovXG4gIGNvbmZpZyhvcHRpb25zKSB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB1c2VycyB0byBhY2NpZGVudGFsbHkgb25seSBjYWxsIEFjY291bnRzLmNvbmZpZyBvbiB0aGVcbiAgICAvLyBjbGllbnQsIHdoZXJlIHNvbWUgb2YgdGhlIG9wdGlvbnMgd2lsbCBoYXZlIHBhcnRpYWwgZWZmZWN0cyAoZWcgcmVtb3ZpbmdcbiAgICAvLyB0aGUgXCJjcmVhdGUgYWNjb3VudFwiIGJ1dHRvbiBmcm9tIGFjY291bnRzLXVpIGlmIGZvcmJpZENsaWVudEFjY291bnRDcmVhdGlvblxuICAgIC8vIGlzIHNldCwgb3IgcmVkaXJlY3RpbmcgR29vZ2xlIGxvZ2luIHRvIGEgc3BlY2lmaWMtZG9tYWluIHBhZ2UpIHdpdGhvdXRcbiAgICAvLyBoYXZpbmcgdGhlaXIgZnVsbCBlZmZlY3RzLlxuICAgIGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICAgIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uYWNjb3VudHNDb25maWdDYWxsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIV9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uYWNjb3VudHNDb25maWdDYWxsZWQpIHtcbiAgICAgIC8vIFhYWCB3b3VsZCBiZSBuaWNlIHRvIFwiY3Jhc2hcIiB0aGUgY2xpZW50IGFuZCByZXBsYWNlIHRoZSBVSSB3aXRoIGFuIGVycm9yXG4gICAgICAvLyBtZXNzYWdlLCBidXQgdGhlcmUncyBubyB0cml2aWFsIHdheSB0byBkbyB0aGlzLlxuICAgICAgTWV0ZW9yLl9kZWJ1ZyhcIkFjY291bnRzLmNvbmZpZyB3YXMgY2FsbGVkIG9uIHRoZSBjbGllbnQgYnV0IG5vdCBvbiB0aGUgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcInNlcnZlcjsgc29tZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgbWF5IG5vdCB0YWtlIGVmZmVjdC5cIik7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0byB2YWxpZGF0ZSB0aGUgb2F1dGhTZWNyZXRLZXkgb3B0aW9uIGF0IHRoZSB0aW1lXG4gICAgLy8gQWNjb3VudHMuY29uZmlnIGlzIGNhbGxlZC4gV2UgYWxzbyBkZWxpYmVyYXRlbHkgZG9uJ3Qgc3RvcmUgdGhlXG4gICAgLy8gb2F1dGhTZWNyZXRLZXkgaW4gQWNjb3VudHMuX29wdGlvbnMuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAnb2F1dGhTZWNyZXRLZXknKSkge1xuICAgICAgaWYgKE1ldGVvci5pc0NsaWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgb2F1dGhTZWNyZXRLZXkgb3B0aW9uIG1heSBvbmx5IGJlIHNwZWNpZmllZCBvbiB0aGUgc2VydmVyXCIpO1xuICAgICAgfVxuICAgICAgaWYgKCEgUGFja2FnZVtcIm9hdXRoLWVuY3J5cHRpb25cIl0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIG9hdXRoLWVuY3J5cHRpb24gcGFja2FnZSBtdXN0IGJlIGxvYWRlZCB0byBzZXQgb2F1dGhTZWNyZXRLZXlcIik7XG4gICAgICB9XG4gICAgICBQYWNrYWdlW1wib2F1dGgtZW5jcnlwdGlvblwiXS5PQXV0aEVuY3J5cHRpb24ubG9hZEtleShvcHRpb25zLm9hdXRoU2VjcmV0S2V5KTtcbiAgICAgIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgICAgIGRlbGV0ZSBvcHRpb25zLm9hdXRoU2VjcmV0S2V5O1xuICAgIH1cblxuICAgIC8vIHZhbGlkYXRlIG9wdGlvbiBrZXlzXG4gICAgY29uc3QgVkFMSURfS0VZUyA9IFtcInNlbmRWZXJpZmljYXRpb25FbWFpbFwiLCBcImZvcmJpZENsaWVudEFjY291bnRDcmVhdGlvblwiLCBcInBhc3N3b3JkRW5yb2xsVG9rZW5FeHBpcmF0aW9uSW5EYXlzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZXN0cmljdENyZWF0aW9uQnlFbWFpbERvbWFpblwiLCBcImxvZ2luRXhwaXJhdGlvbkluRGF5c1wiLCBcInBhc3N3b3JkUmVzZXRUb2tlbkV4cGlyYXRpb25JbkRheXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImFtYmlndW91c0Vycm9yTWVzc2FnZXNcIiwgXCJiY3J5cHRSb3VuZHNcIiwgXCJkZWZhdWx0RmllbGRTZWxlY3RvclwiXTtcblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghVkFMSURfS0VZUy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWNjb3VudHMuY29uZmlnOiBJbnZhbGlkIGtleTogJHtrZXl9YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdmFsdWVzIGluIEFjY291bnRzLl9vcHRpb25zXG4gICAgVkFMSURfS0VZUy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBzZXQgXFxgJHtrZXl9XFxgIG1vcmUgdGhhbiBvbmNlYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFmdGVyIGEgbG9naW4gYXR0ZW1wdCBzdWNjZWVkcy5cbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCB3aGVuIGxvZ2luIGlzIHN1Y2Nlc3NmdWwuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIHJlY2VpdmVzIGEgc2luZ2xlIG9iamVjdCB0aGF0XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgaG9sZHMgbG9naW4gZGV0YWlscy4gVGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGxvZ2luXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0IHR5cGUgKHBhc3N3b3JkLCByZXN1bWUsIGV0Yy4pIG9uIGJvdGggdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50IGFuZCBzZXJ2ZXIuIGBvbkxvZ2luYCBjYWxsYmFja3MgcmVnaXN0ZXJlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIG9uIHRoZSBzZXJ2ZXIgYWxzbyByZWNlaXZlIGV4dHJhIGRhdGEsIHN1Y2hcbiAgICogICAgICAgICAgICAgICAgICAgICAgICBhcyB1c2VyIGRldGFpbHMsIGNvbm5lY3Rpb24gaW5mb3JtYXRpb24sIGV0Yy5cbiAgICovXG4gIG9uTG9naW4oZnVuYykge1xuICAgIGxldCByZXQgPSB0aGlzLl9vbkxvZ2luSG9vay5yZWdpc3RlcihmdW5jKTtcbiAgICAvLyBjYWxsIHRoZSBqdXN0IHJlZ2lzdGVyZWQgY2FsbGJhY2sgaWYgYWxyZWFkeSBsb2dnZWQgaW5cbiAgICB0aGlzLl9zdGFydHVwQ2FsbGJhY2socmV0LmNhbGxiYWNrKTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFmdGVyIGEgbG9naW4gYXR0ZW1wdCBmYWlscy5cbiAgICogQGxvY3VzIEFueXdoZXJlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBhZnRlciB0aGUgbG9naW4gaGFzIGZhaWxlZC5cbiAgICovXG4gIG9uTG9naW5GYWlsdXJlKGZ1bmMpIHtcbiAgICByZXR1cm4gdGhpcy5fb25Mb2dpbkZhaWx1cmVIb29rLnJlZ2lzdGVyKGZ1bmMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFmdGVyIGEgbG9nb3V0IGF0dGVtcHQgc3VjY2VlZHMuXG4gICAqIEBsb2N1cyBBbnl3aGVyZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2hlbiBsb2dvdXQgaXMgc3VjY2Vzc2Z1bC5cbiAgICovXG4gIG9uTG9nb3V0KGZ1bmMpIHtcbiAgICByZXR1cm4gdGhpcy5fb25Mb2dvdXRIb29rLnJlZ2lzdGVyKGZ1bmMpO1xuICB9XG5cbiAgX2luaXRDb25uZWN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoISBNZXRlb3IuaXNDbGllbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGUgY29ubmVjdGlvbiB1c2VkIGJ5IHRoZSBBY2NvdW50cyBzeXN0ZW0uIFRoaXMgaXMgdGhlIGNvbm5lY3Rpb25cbiAgICAvLyB0aGF0IHdpbGwgZ2V0IGxvZ2dlZCBpbiBieSBNZXRlb3IubG9naW4oKSwgYW5kIHRoaXMgaXMgdGhlXG4gICAgLy8gY29ubmVjdGlvbiB3aG9zZSBsb2dpbiBzdGF0ZSB3aWxsIGJlIHJlZmxlY3RlZCBieSBNZXRlb3IudXNlcklkKCkuXG4gICAgLy9cbiAgICAvLyBJdCB3b3VsZCBiZSBtdWNoIHByZWZlcmFibGUgZm9yIHRoaXMgdG8gYmUgaW4gYWNjb3VudHNfY2xpZW50LmpzLFxuICAgIC8vIGJ1dCBpdCBoYXMgdG8gYmUgaGVyZSBiZWNhdXNlIGl0J3MgbmVlZGVkIHRvIGNyZWF0ZSB0aGVcbiAgICAvLyBNZXRlb3IudXNlcnMgY29sbGVjdGlvbi5cbiAgICBpZiAob3B0aW9ucy5jb25uZWN0aW9uKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBvcHRpb25zLmNvbm5lY3Rpb247XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmRkcFVybCkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uID0gRERQLmNvbm5lY3Qob3B0aW9ucy5kZHBVcmwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgIF9fbWV0ZW9yX3J1bnRpbWVfY29uZmlnX18uQUNDT1VOVFNfQ09OTkVDVElPTl9VUkwpIHtcbiAgICAgIC8vIFRlbXBvcmFyeSwgaW50ZXJuYWwgaG9vayB0byBhbGxvdyB0aGUgc2VydmVyIHRvIHBvaW50IHRoZSBjbGllbnRcbiAgICAgIC8vIHRvIGEgZGlmZmVyZW50IGF1dGhlbnRpY2F0aW9uIHNlcnZlci4gVGhpcyBpcyBmb3IgYSB2ZXJ5XG4gICAgICAvLyBwYXJ0aWN1bGFyIHVzZSBjYXNlIHRoYXQgY29tZXMgdXAgd2hlbiBpbXBsZW1lbnRpbmcgYSBvYXV0aFxuICAgICAgLy8gc2VydmVyLiBVbnN1cHBvcnRlZCBhbmQgbWF5IGdvIGF3YXkgYXQgYW55IHBvaW50IGluIHRpbWUuXG4gICAgICAvL1xuICAgICAgLy8gV2Ugd2lsbCBldmVudHVhbGx5IHByb3ZpZGUgYSBnZW5lcmFsIHdheSB0byB1c2UgYWNjb3VudC1iYXNlXG4gICAgICAvLyBhZ2FpbnN0IGFueSBERFAgY29ubmVjdGlvbiwgbm90IGp1c3Qgb25lIHNwZWNpYWwgb25lLlxuICAgICAgdGhpcy5jb25uZWN0aW9uID1cbiAgICAgICAgRERQLmNvbm5lY3QoX19tZXRlb3JfcnVudGltZV9jb25maWdfXy5BQ0NPVU5UU19DT05ORUNUSU9OX1VSTCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9IE1ldGVvci5jb25uZWN0aW9uO1xuICAgIH1cbiAgfVxuXG4gIF9nZXRUb2tlbkxpZmV0aW1lTXMoKSB7XG4gICAgLy8gV2hlbiBsb2dpbkV4cGlyYXRpb25JbkRheXMgaXMgc2V0IHRvIG51bGwsIHdlJ2xsIHVzZSBhIHJlYWxseSBoaWdoXG4gICAgLy8gbnVtYmVyIG9mIGRheXMgKExPR0lOX1VORVhQSVJBQkxFX1RPS0VOX0RBWVMpIHRvIHNpbXVsYXRlIGFuXG4gICAgLy8gdW5leHBpcmluZyB0b2tlbi5cbiAgICBjb25zdCBsb2dpbkV4cGlyYXRpb25JbkRheXMgPVxuICAgICAgKHRoaXMuX29wdGlvbnMubG9naW5FeHBpcmF0aW9uSW5EYXlzID09PSBudWxsKVxuICAgICAgICA/IExPR0lOX1VORVhQSVJJTkdfVE9LRU5fREFZU1xuICAgICAgICA6IHRoaXMuX29wdGlvbnMubG9naW5FeHBpcmF0aW9uSW5EYXlzO1xuICAgIHJldHVybiAobG9naW5FeHBpcmF0aW9uSW5EYXlzXG4gICAgICAgIHx8IERFRkFVTFRfTE9HSU5fRVhQSVJBVElPTl9EQVlTKSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gIH1cblxuICBfZ2V0UGFzc3dvcmRSZXNldFRva2VuTGlmZXRpbWVNcygpIHtcbiAgICByZXR1cm4gKHRoaXMuX29wdGlvbnMucGFzc3dvcmRSZXNldFRva2VuRXhwaXJhdGlvbkluRGF5cyB8fFxuICAgICAgICAgICAgREVGQVVMVF9QQVNTV09SRF9SRVNFVF9UT0tFTl9FWFBJUkFUSU9OX0RBWVMpICogMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgfVxuXG4gIF9nZXRQYXNzd29yZEVucm9sbFRva2VuTGlmZXRpbWVNcygpIHtcbiAgICByZXR1cm4gKHRoaXMuX29wdGlvbnMucGFzc3dvcmRFbnJvbGxUb2tlbkV4cGlyYXRpb25JbkRheXMgfHxcbiAgICAgICAgREVGQVVMVF9QQVNTV09SRF9FTlJPTExfVE9LRU5fRVhQSVJBVElPTl9EQVlTKSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gIH1cblxuICBfdG9rZW5FeHBpcmF0aW9uKHdoZW4pIHtcbiAgICAvLyBXZSBwYXNzIHdoZW4gdGhyb3VnaCB0aGUgRGF0ZSBjb25zdHJ1Y3RvciBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHk7XG4gICAgLy8gYHdoZW5gIHVzZWQgdG8gYmUgYSBudW1iZXIuXG4gICAgcmV0dXJuIG5ldyBEYXRlKChuZXcgRGF0ZSh3aGVuKSkuZ2V0VGltZSgpICsgdGhpcy5fZ2V0VG9rZW5MaWZldGltZU1zKCkpO1xuICB9XG5cbiAgX3Rva2VuRXhwaXJlc1Nvb24od2hlbikge1xuICAgIGxldCBtaW5MaWZldGltZU1zID0gLjEgKiB0aGlzLl9nZXRUb2tlbkxpZmV0aW1lTXMoKTtcbiAgICBjb25zdCBtaW5MaWZldGltZUNhcE1zID0gTUlOX1RPS0VOX0xJRkVUSU1FX0NBUF9TRUNTICogMTAwMDtcbiAgICBpZiAobWluTGlmZXRpbWVNcyA+IG1pbkxpZmV0aW1lQ2FwTXMpIHtcbiAgICAgIG1pbkxpZmV0aW1lTXMgPSBtaW5MaWZldGltZUNhcE1zO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoKSA+IChuZXcgRGF0ZSh3aGVuKSAtIG1pbkxpZmV0aW1lTXMpO1xuICB9XG5cbiAgLy8gTm8tb3Agb24gdGhlIHNlcnZlciwgb3ZlcnJpZGRlbiBvbiB0aGUgY2xpZW50LlxuICBfc3RhcnR1cENhbGxiYWNrKGNhbGxiYWNrKSB7fVxufVxuXG4vLyBOb3RlIHRoYXQgQWNjb3VudHMgaXMgZGVmaW5lZCBzZXBhcmF0ZWx5IGluIGFjY291bnRzX2NsaWVudC5qcyBhbmRcbi8vIGFjY291bnRzX3NlcnZlci5qcy5cblxuLyoqXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGN1cnJlbnQgdXNlciBpZCwgb3IgYG51bGxgIGlmIG5vIHVzZXIgaXMgbG9nZ2VkIGluLiBBIHJlYWN0aXZlIGRhdGEgc291cmNlLlxuICogQGxvY3VzIEFueXdoZXJlIGJ1dCBwdWJsaXNoIGZ1bmN0aW9uc1xuICogQGltcG9ydEZyb21QYWNrYWdlIG1ldGVvclxuICovXG5NZXRlb3IudXNlcklkID0gKCkgPT4gQWNjb3VudHMudXNlcklkKCk7XG5cbi8qKlxuICogQHN1bW1hcnkgR2V0IHRoZSBjdXJyZW50IHVzZXIgcmVjb3JkLCBvciBgbnVsbGAgaWYgbm8gdXNlciBpcyBsb2dnZWQgaW4uIEEgcmVhY3RpdmUgZGF0YSBzb3VyY2UuXG4gKiBAbG9jdXMgQW55d2hlcmUgYnV0IHB1Ymxpc2ggZnVuY3Rpb25zXG4gKiBAaW1wb3J0RnJvbVBhY2thZ2UgbWV0ZW9yXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge01vbmdvRmllbGRTcGVjaWZpZXJ9IG9wdGlvbnMuZmllbGRzIERpY3Rpb25hcnkgb2YgZmllbGRzIHRvIHJldHVybiBvciBleGNsdWRlLlxuICovXG5NZXRlb3IudXNlciA9IChvcHRpb25zKSA9PiBBY2NvdW50cy51c2VyKG9wdGlvbnMpO1xuXG4vLyBob3cgbG9uZyAoaW4gZGF5cykgdW50aWwgYSBsb2dpbiB0b2tlbiBleHBpcmVzXG5jb25zdCBERUZBVUxUX0xPR0lOX0VYUElSQVRJT05fREFZUyA9IDkwO1xuLy8gaG93IGxvbmcgKGluIGRheXMpIHVudGlsIHJlc2V0IHBhc3N3b3JkIHRva2VuIGV4cGlyZXNcbmNvbnN0IERFRkFVTFRfUEFTU1dPUkRfUkVTRVRfVE9LRU5fRVhQSVJBVElPTl9EQVlTID0gMztcbi8vIGhvdyBsb25nIChpbiBkYXlzKSB1bnRpbCBlbnJvbCBwYXNzd29yZCB0b2tlbiBleHBpcmVzXG5jb25zdCBERUZBVUxUX1BBU1NXT1JEX0VOUk9MTF9UT0tFTl9FWFBJUkFUSU9OX0RBWVMgPSAzMDtcbi8vIENsaWVudHMgZG9uJ3QgdHJ5IHRvIGF1dG8tbG9naW4gd2l0aCBhIHRva2VuIHRoYXQgaXMgZ29pbmcgdG8gZXhwaXJlIHdpdGhpblxuLy8gLjEgKiBERUZBVUxUX0xPR0lOX0VYUElSQVRJT05fREFZUywgY2FwcGVkIGF0IE1JTl9UT0tFTl9MSUZFVElNRV9DQVBfU0VDUy5cbi8vIFRyaWVzIHRvIGF2b2lkIGFicnVwdCBkaXNjb25uZWN0cyBmcm9tIGV4cGlyaW5nIHRva2Vucy5cbmNvbnN0IE1JTl9UT0tFTl9MSUZFVElNRV9DQVBfU0VDUyA9IDM2MDA7IC8vIG9uZSBob3VyXG4vLyBob3cgb2Z0ZW4gKGluIG1pbGxpc2Vjb25kcykgd2UgY2hlY2sgZm9yIGV4cGlyZWQgdG9rZW5zXG5leHBvcnQgY29uc3QgRVhQSVJFX1RPS0VOU19JTlRFUlZBTF9NUyA9IDYwMCAqIDEwMDA7IC8vIDEwIG1pbnV0ZXNcbi8vIGhvdyBsb25nIHdlIHdhaXQgYmVmb3JlIGxvZ2dpbmcgb3V0IGNsaWVudHMgd2hlbiBNZXRlb3IubG9nb3V0T3RoZXJDbGllbnRzIGlzXG4vLyBjYWxsZWRcbmV4cG9ydCBjb25zdCBDT05ORUNUSU9OX0NMT1NFX0RFTEFZX01TID0gMTAgKiAxMDAwO1xuLy8gQSBsYXJnZSBudW1iZXIgb2YgZXhwaXJhdGlvbiBkYXlzIChhcHByb3hpbWF0ZWx5IDEwMCB5ZWFycyB3b3J0aCkgdGhhdCBpc1xuLy8gdXNlZCB3aGVuIGNyZWF0aW5nIHVuZXhwaXJpbmcgdG9rZW5zLlxuY29uc3QgTE9HSU5fVU5FWFBJUklOR19UT0tFTl9EQVlTID0gMzY1ICogMTAwO1xuIiwiaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHtcbiAgQWNjb3VudHNDb21tb24sXG4gIEVYUElSRV9UT0tFTlNfSU5URVJWQUxfTVMsXG4gIENPTk5FQ1RJT05fQ0xPU0VfREVMQVlfTVNcbn0gZnJvbSAnLi9hY2NvdW50c19jb21tb24uanMnO1xuXG5jb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEBzdW1tYXJ5IENvbnN0cnVjdG9yIGZvciB0aGUgYEFjY291bnRzYCBuYW1lc3BhY2Ugb24gdGhlIHNlcnZlci5cbiAqIEBsb2N1cyBTZXJ2ZXJcbiAqIEBjbGFzcyBBY2NvdW50c1NlcnZlclxuICogQGV4dGVuZHMgQWNjb3VudHNDb21tb25cbiAqIEBpbnN0YW5jZW5hbWUgYWNjb3VudHNTZXJ2ZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJ2ZXIgQSBzZXJ2ZXIgb2JqZWN0IHN1Y2ggYXMgYE1ldGVvci5zZXJ2ZXJgLlxuICovXG5leHBvcnQgY2xhc3MgQWNjb3VudHNTZXJ2ZXIgZXh0ZW5kcyBBY2NvdW50c0NvbW1vbiB7XG4gIC8vIE5vdGUgdGhhdCB0aGlzIGNvbnN0cnVjdG9yIGlzIGxlc3MgbGlrZWx5IHRvIGJlIGluc3RhbnRpYXRlZCBtdWx0aXBsZVxuICAvLyB0aW1lcyB0aGFuIHRoZSBgQWNjb3VudHNDbGllbnRgIGNvbnN0cnVjdG9yLCBiZWNhdXNlIGEgc2luZ2xlIHNlcnZlclxuICAvLyBjYW4gcHJvdmlkZSBvbmx5IG9uZSBzZXQgb2YgbWV0aG9kcy5cbiAgY29uc3RydWN0b3Ioc2VydmVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCBNZXRlb3Iuc2VydmVyO1xuICAgIC8vIFNldCB1cCB0aGUgc2VydmVyJ3MgbWV0aG9kcywgYXMgaWYgYnkgY2FsbGluZyBNZXRlb3IubWV0aG9kcy5cbiAgICB0aGlzLl9pbml0U2VydmVyTWV0aG9kcygpO1xuXG4gICAgdGhpcy5faW5pdEFjY291bnREYXRhSG9va3MoKTtcblxuICAgIC8vIElmIGF1dG9wdWJsaXNoIGlzIG9uLCBwdWJsaXNoIHRoZXNlIHVzZXIgZmllbGRzLiBMb2dpbiBzZXJ2aWNlXG4gICAgLy8gcGFja2FnZXMgKGVnIGFjY291bnRzLWdvb2dsZSkgYWRkIHRvIHRoZXNlIGJ5IGNhbGxpbmdcbiAgICAvLyBhZGRBdXRvcHVibGlzaEZpZWxkcy4gIE5vdGFibHksIHRoaXMgaXNuJ3QgaW1wbGVtZW50ZWQgd2l0aCBtdWx0aXBsZVxuICAgIC8vIHB1Ymxpc2hlcyBzaW5jZSBERFAgb25seSBtZXJnZXMgb25seSBhY3Jvc3MgdG9wLWxldmVsIGZpZWxkcywgbm90XG4gICAgLy8gc3ViZmllbGRzIChzdWNoIGFzICdzZXJ2aWNlcy5mYWNlYm9vay5hY2Nlc3NUb2tlbicpXG4gICAgdGhpcy5fYXV0b3B1Ymxpc2hGaWVsZHMgPSB7XG4gICAgICBsb2dnZWRJblVzZXI6IFsncHJvZmlsZScsICd1c2VybmFtZScsICdlbWFpbHMnXSxcbiAgICAgIG90aGVyVXNlcnM6IFsncHJvZmlsZScsICd1c2VybmFtZSddXG4gICAgfTtcbiAgICB0aGlzLl9pbml0U2VydmVyUHVibGljYXRpb25zKCk7XG5cbiAgICAvLyBjb25uZWN0aW9uSWQgLT4ge2Nvbm5lY3Rpb24sIGxvZ2luVG9rZW59XG4gICAgdGhpcy5fYWNjb3VudERhdGEgPSB7fTtcblxuICAgIC8vIGNvbm5lY3Rpb24gaWQgLT4gb2JzZXJ2ZSBoYW5kbGUgZm9yIHRoZSBsb2dpbiB0b2tlbiB0aGF0IHRoaXMgY29ubmVjdGlvbiBpc1xuICAgIC8vIGN1cnJlbnRseSBhc3NvY2lhdGVkIHdpdGgsIG9yIGEgbnVtYmVyLiBUaGUgbnVtYmVyIGluZGljYXRlcyB0aGF0IHdlIGFyZSBpblxuICAgIC8vIHRoZSBwcm9jZXNzIG9mIHNldHRpbmcgdXAgdGhlIG9ic2VydmUgKHVzaW5nIGEgbnVtYmVyIGluc3RlYWQgb2YgYSBzaW5nbGVcbiAgICAvLyBzZW50aW5lbCBhbGxvd3MgbXVsdGlwbGUgYXR0ZW1wdHMgdG8gc2V0IHVwIHRoZSBvYnNlcnZlIHRvIGlkZW50aWZ5IHdoaWNoXG4gICAgLy8gb25lIHdhcyB0aGVpcnMpLlxuICAgIHRoaXMuX3VzZXJPYnNlcnZlc0ZvckNvbm5lY3Rpb25zID0ge307XG4gICAgdGhpcy5fbmV4dFVzZXJPYnNlcnZlTnVtYmVyID0gMTsgIC8vIGZvciB0aGUgbnVtYmVyIGRlc2NyaWJlZCBhYm92ZS5cblxuICAgIC8vIGxpc3Qgb2YgYWxsIHJlZ2lzdGVyZWQgaGFuZGxlcnMuXG4gICAgdGhpcy5fbG9naW5IYW5kbGVycyA9IFtdO1xuXG4gICAgc2V0dXBVc2Vyc0NvbGxlY3Rpb24odGhpcy51c2Vycyk7XG4gICAgc2V0dXBEZWZhdWx0TG9naW5IYW5kbGVycyh0aGlzKTtcbiAgICBzZXRFeHBpcmVUb2tlbnNJbnRlcnZhbCh0aGlzKTtcblxuICAgIHRoaXMuX3ZhbGlkYXRlTG9naW5Ib29rID0gbmV3IEhvb2soeyBiaW5kRW52aXJvbm1lbnQ6IGZhbHNlIH0pO1xuICAgIHRoaXMuX3ZhbGlkYXRlTmV3VXNlckhvb2tzID0gW1xuICAgICAgZGVmYXVsdFZhbGlkYXRlTmV3VXNlckhvb2suYmluZCh0aGlzKVxuICAgIF07XG5cbiAgICB0aGlzLl9kZWxldGVTYXZlZFRva2Vuc0ZvckFsbFVzZXJzT25TdGFydHVwKCk7XG5cbiAgICB0aGlzLl9za2lwQ2FzZUluc2Vuc2l0aXZlQ2hlY2tzRm9yVGVzdCA9IHt9O1xuXG4gICAgLy8gWFhYIFRoZXNlIHNob3VsZCBwcm9iYWJseSBub3QgYWN0dWFsbHkgYmUgcHVibGljP1xuICAgIHRoaXMudXJscyA9IHtcbiAgICAgIHJlc2V0UGFzc3dvcmQ6IHRva2VuID0+IE1ldGVvci5hYnNvbHV0ZVVybChgIy9yZXNldC1wYXNzd29yZC8ke3Rva2VufWApLFxuICAgICAgdmVyaWZ5RW1haWw6IHRva2VuID0+IE1ldGVvci5hYnNvbHV0ZVVybChgIy92ZXJpZnktZW1haWwvJHt0b2tlbn1gKSxcbiAgICAgIGVucm9sbEFjY291bnQ6IHRva2VuID0+IE1ldGVvci5hYnNvbHV0ZVVybChgIy9lbnJvbGwtYWNjb3VudC8ke3Rva2VufWApLFxuICAgIH07XG5cbiAgICB0aGlzLmFkZERlZmF1bHRSYXRlTGltaXQoKTtcbiAgfVxuXG4gIC8vL1xuICAvLy8gQ1VSUkVOVCBVU0VSXG4gIC8vL1xuXG4gIC8vIEBvdmVycmlkZSBvZiBcImFic3RyYWN0XCIgbm9uLWltcGxlbWVudGF0aW9uIGluIGFjY291bnRzX2NvbW1vbi5qc1xuICB1c2VySWQoKSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBvbmx5IHdvcmtzIGlmIGNhbGxlZCBpbnNpZGUgYSBtZXRob2Qgb3IgYSBwdWJpY2F0aW9uLlxuICAgIC8vIFVzaW5nIGFueSBvZiB0aGUgaW5mb21hdGlvbiBmcm9tIE1ldGVvci51c2VyKCkgaW4gYSBtZXRob2Qgb3JcbiAgICAvLyBwdWJsaXNoIGZ1bmN0aW9uIHdpbGwgYWx3YXlzIHVzZSB0aGUgdmFsdWUgZnJvbSB3aGVuIHRoZSBmdW5jdGlvbiBmaXJzdFxuICAgIC8vIHJ1bnMuIFRoaXMgaXMgbGlrZWx5IG5vdCB3aGF0IHRoZSB1c2VyIGV4cGVjdHMuIFRoZSB3YXkgdG8gbWFrZSB0aGlzIHdvcmtcbiAgICAvLyBpbiBhIG1ldGhvZCBvciBwdWJsaXNoIGZ1bmN0aW9uIGlzIHRvIGRvIE1ldGVvci5maW5kKHRoaXMudXNlcklkKS5vYnNlcnZlXG4gICAgLy8gYW5kIHJlY29tcHV0ZSB3aGVuIHRoZSB1c2VyIHJlY29yZCBjaGFuZ2VzLlxuICAgIGNvbnN0IGN1cnJlbnRJbnZvY2F0aW9uID0gRERQLl9DdXJyZW50TWV0aG9kSW52b2NhdGlvbi5nZXQoKSB8fCBERFAuX0N1cnJlbnRQdWJsaWNhdGlvbkludm9jYXRpb24uZ2V0KCk7XG4gICAgaWYgKCFjdXJyZW50SW52b2NhdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGVvci51c2VySWQgY2FuIG9ubHkgYmUgaW52b2tlZCBpbiBtZXRob2QgY2FsbHMgb3IgcHVibGljYXRpb25zLlwiKTtcbiAgICByZXR1cm4gY3VycmVudEludm9jYXRpb24udXNlcklkO1xuICB9XG5cbiAgLy8vXG4gIC8vLyBMT0dJTiBIT09LU1xuICAvLy9cblxuICAvKipcbiAgICogQHN1bW1hcnkgVmFsaWRhdGUgbG9naW4gYXR0ZW1wdHMuXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBDYWxsZWQgd2hlbmV2ZXIgYSBsb2dpbiBpcyBhdHRlbXB0ZWQgKGVpdGhlciBzdWNjZXNzZnVsIG9yIHVuc3VjY2Vzc2Z1bCkuICBBIGxvZ2luIGNhbiBiZSBhYm9ydGVkIGJ5IHJldHVybmluZyBhIGZhbHN5IHZhbHVlIG9yIHRocm93aW5nIGFuIGV4Y2VwdGlvbi5cbiAgICovXG4gIHZhbGlkYXRlTG9naW5BdHRlbXB0KGZ1bmMpIHtcbiAgICAvLyBFeGNlcHRpb25zIGluc2lkZSB0aGUgaG9vayBjYWxsYmFjayBhcmUgcGFzc2VkIHVwIHRvIHVzLlxuICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZUxvZ2luSG9vay5yZWdpc3RlcihmdW5jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBTZXQgcmVzdHJpY3Rpb25zIG9uIG5ldyB1c2VyIGNyZWF0aW9uLlxuICAgKiBAbG9jdXMgU2VydmVyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgQ2FsbGVkIHdoZW5ldmVyIGEgbmV3IHVzZXIgaXMgY3JlYXRlZC4gVGFrZXMgdGhlIG5ldyB1c2VyIG9iamVjdCwgYW5kIHJldHVybnMgdHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb3IgZmFsc2UgdG8gYWJvcnQuXG4gICAqL1xuICB2YWxpZGF0ZU5ld1VzZXIoZnVuYykge1xuICAgIHRoaXMuX3ZhbGlkYXRlTmV3VXNlckhvb2tzLnB1c2goZnVuYyk7XG4gIH1cblxuICAvKipcbiAgICogQHN1bW1hcnkgVmFsaWRhdGUgbG9naW4gZnJvbSBleHRlcm5hbCBzZXJ2aWNlXG4gICAqIEBsb2N1cyBTZXJ2ZXJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBDYWxsZWQgd2hlbmV2ZXIgbG9naW4vdXNlciBjcmVhdGlvbiBmcm9tIGV4dGVybmFsIHNlcnZpY2UgaXMgYXR0ZW1wdGVkLiBMb2dpbiBvciB1c2VyIGNyZWF0aW9uIGJhc2VkIG9uIHRoaXMgbG9naW4gY2FuIGJlIGFib3J0ZWQgYnkgcGFzc2luZyBhIGZhbHN5IHZhbHVlIG9yIHRocm93aW5nIGFuIGV4Y2VwdGlvbi5cbiAgICovXG4gIGJlZm9yZUV4dGVybmFsTG9naW4oZnVuYykge1xuICAgIGlmICh0aGlzLl9iZWZvcmVFeHRlcm5hbExvZ2luSG9vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgY2FsbCBiZWZvcmVFeHRlcm5hbExvZ2luIG9uY2VcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fYmVmb3JlRXh0ZXJuYWxMb2dpbkhvb2sgPSBmdW5jO1xuICB9XG5cbiAgLy8vXG4gIC8vLyBDUkVBVEUgVVNFUiBIT09LU1xuICAvLy9cblxuICAvKipcbiAgICogQHN1bW1hcnkgQ3VzdG9taXplIG5ldyB1c2VyIGNyZWF0aW9uLlxuICAgKiBAbG9jdXMgU2VydmVyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgQ2FsbGVkIHdoZW5ldmVyIGEgbmV3IHVzZXIgaXMgY3JlYXRlZC4gUmV0dXJuIHRoZSBuZXcgdXNlciBvYmplY3QsIG9yIHRocm93IGFuIGBFcnJvcmAgdG8gYWJvcnQgdGhlIGNyZWF0aW9uLlxuICAgKi9cbiAgb25DcmVhdGVVc2VyKGZ1bmMpIHtcbiAgICBpZiAodGhpcy5fb25DcmVhdGVVc2VySG9vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgY2FsbCBvbkNyZWF0ZVVzZXIgb25jZVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vbkNyZWF0ZVVzZXJIb29rID0gZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDdXN0b21pemUgb2F1dGggdXNlciBwcm9maWxlIHVwZGF0ZXNcbiAgICogQGxvY3VzIFNlcnZlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIENhbGxlZCB3aGVuZXZlciBhIHVzZXIgaXMgbG9nZ2VkIGluIHZpYSBvYXV0aC4gUmV0dXJuIHRoZSBwcm9maWxlIG9iamVjdCB0byBiZSBtZXJnZWQsIG9yIHRocm93IGFuIGBFcnJvcmAgdG8gYWJvcnQgdGhlIGNyZWF0aW9uLlxuICAgKi9cbiAgb25FeHRlcm5hbExvZ2luKGZ1bmMpIHtcbiAgICBpZiAodGhpcy5fb25FeHRlcm5hbExvZ2luSG9vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgY2FsbCBvbkV4dGVybmFsTG9naW4gb25jZVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vbkV4dGVybmFsTG9naW5Ib29rID0gZnVuYztcbiAgfVxuXG4gIF92YWxpZGF0ZUxvZ2luKGNvbm5lY3Rpb24sIGF0dGVtcHQpIHtcbiAgICB0aGlzLl92YWxpZGF0ZUxvZ2luSG9vay5lYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgIGxldCByZXQ7XG4gICAgICB0cnkge1xuICAgICAgICByZXQgPSBjYWxsYmFjayhjbG9uZUF0dGVtcHRXaXRoQ29ubmVjdGlvbihjb25uZWN0aW9uLCBhdHRlbXB0KSk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBhdHRlbXB0LmFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gWFhYIHRoaXMgbWVhbnMgdGhlIGxhc3QgdGhyb3duIGVycm9yIG92ZXJyaWRlcyBwcmV2aW91cyBlcnJvclxuICAgICAgICAvLyBtZXNzYWdlcy4gTWF5YmUgdGhpcyBpcyBzdXJwcmlzaW5nIHRvIHVzZXJzIGFuZCB3ZSBzaG91bGQgbWFrZVxuICAgICAgICAvLyBvdmVycmlkaW5nIGVycm9ycyBtb3JlIGV4cGxpY2l0LiAoc2VlXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tZXRlb3IvbWV0ZW9yL2lzc3Vlcy8xOTYwKVxuICAgICAgICBhdHRlbXB0LmVycm9yID0gZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoISByZXQpIHtcbiAgICAgICAgYXR0ZW1wdC5hbGxvd2VkID0gZmFsc2U7XG4gICAgICAgIC8vIGRvbid0IG92ZXJyaWRlIGEgc3BlY2lmaWMgZXJyb3IgcHJvdmlkZWQgYnkgYSBwcmV2aW91c1xuICAgICAgICAvLyB2YWxpZGF0b3Igb3IgdGhlIGluaXRpYWwgYXR0ZW1wdCAoZWcgXCJpbmNvcnJlY3QgcGFzc3dvcmRcIikuXG4gICAgICAgIGlmICghYXR0ZW1wdC5lcnJvcilcbiAgICAgICAgICBhdHRlbXB0LmVycm9yID0gbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiTG9naW4gZm9yYmlkZGVuXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgX3N1Y2Nlc3NmdWxMb2dpbihjb25uZWN0aW9uLCBhdHRlbXB0KSB7XG4gICAgdGhpcy5fb25Mb2dpbkhvb2suZWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBjYWxsYmFjayhjbG9uZUF0dGVtcHRXaXRoQ29ubmVjdGlvbihjb25uZWN0aW9uLCBhdHRlbXB0KSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBfZmFpbGVkTG9naW4oY29ubmVjdGlvbiwgYXR0ZW1wdCkge1xuICAgIHRoaXMuX29uTG9naW5GYWlsdXJlSG9vay5lYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgIGNhbGxiYWNrKGNsb25lQXR0ZW1wdFdpdGhDb25uZWN0aW9uKGNvbm5lY3Rpb24sIGF0dGVtcHQpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIF9zdWNjZXNzZnVsTG9nb3V0KGNvbm5lY3Rpb24sIHVzZXJJZCkge1xuICAgIC8vIGRvbid0IGZldGNoIHRoZSB1c2VyIG9iamVjdCB1bmxlc3MgdGhlcmUgYXJlIHNvbWUgY2FsbGJhY2tzIHJlZ2lzdGVyZWRcbiAgICBsZXQgdXNlcjtcbiAgICB0aGlzLl9vbkxvZ291dEhvb2suZWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBpZiAoIXVzZXIgJiYgdXNlcklkKSB1c2VyID0gdGhpcy51c2Vycy5maW5kT25lKHVzZXJJZCwge2ZpZWxkczogdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmllbGRTZWxlY3Rvcn0pO1xuICAgICAgY2FsbGJhY2soeyB1c2VyLCBjb25uZWN0aW9uIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8vXG4gIC8vLyBMT0dJTiBNRVRIT0RTXG4gIC8vL1xuXG4gIC8vIExvZ2luIG1ldGhvZHMgcmV0dXJuIHRvIHRoZSBjbGllbnQgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlc2VcbiAgLy8gZmllbGRzIHdoZW4gdGhlIHVzZXIgd2FzIGxvZ2dlZCBpbiBzdWNjZXNzZnVsbHk6XG4gIC8vXG4gIC8vICAgaWQ6IHVzZXJJZFxuICAvLyAgIHRva2VuOiAqXG4gIC8vICAgdG9rZW5FeHBpcmVzOiAqXG4gIC8vXG4gIC8vIHRva2VuRXhwaXJlcyBpcyBvcHRpb25hbCBhbmQgaW50ZW5kcyB0byBwcm92aWRlIGEgaGludCB0byB0aGVcbiAgLy8gY2xpZW50IGFzIHRvIHdoZW4gdGhlIHRva2VuIHdpbGwgZXhwaXJlLiBJZiBub3QgcHJvdmlkZWQsIHRoZVxuICAvLyBjbGllbnQgd2lsbCBjYWxsIEFjY291bnRzLl90b2tlbkV4cGlyYXRpb24sIHBhc3NpbmcgaXQgdGhlIGRhdGVcbiAgLy8gdGhhdCBpdCByZWNlaXZlZCB0aGUgdG9rZW4uXG4gIC8vXG4gIC8vIFRoZSBsb2dpbiBtZXRob2Qgd2lsbCB0aHJvdyBhbiBlcnJvciBiYWNrIHRvIHRoZSBjbGllbnQgaWYgdGhlIHVzZXJcbiAgLy8gZmFpbGVkIHRvIGxvZyBpbi5cbiAgLy9cbiAgLy9cbiAgLy8gTG9naW4gaGFuZGxlcnMgYW5kIHNlcnZpY2Ugc3BlY2lmaWMgbG9naW4gbWV0aG9kcyBzdWNoIGFzXG4gIC8vIGBjcmVhdGVVc2VyYCBpbnRlcm5hbGx5IHJldHVybiBhIGByZXN1bHRgIG9iamVjdCBjb250YWluaW5nIHRoZXNlXG4gIC8vIGZpZWxkczpcbiAgLy9cbiAgLy8gICB0eXBlOlxuICAvLyAgICAgb3B0aW9uYWwgc3RyaW5nOyB0aGUgc2VydmljZSBuYW1lLCBvdmVycmlkZXMgdGhlIGhhbmRsZXJcbiAgLy8gICAgIGRlZmF1bHQgaWYgcHJlc2VudC5cbiAgLy9cbiAgLy8gICBlcnJvcjpcbiAgLy8gICAgIGV4Y2VwdGlvbjsgaWYgdGhlIHVzZXIgaXMgbm90IGFsbG93ZWQgdG8gbG9naW4sIHRoZSByZWFzb24gd2h5LlxuICAvL1xuICAvLyAgIHVzZXJJZDpcbiAgLy8gICAgIHN0cmluZzsgdGhlIHVzZXIgaWQgb2YgdGhlIHVzZXIgYXR0ZW1wdGluZyB0byBsb2dpbiAoaWZcbiAgLy8gICAgIGtub3duKSwgcmVxdWlyZWQgZm9yIGFuIGFsbG93ZWQgbG9naW4uXG4gIC8vXG4gIC8vICAgb3B0aW9uczpcbiAgLy8gICAgIG9wdGlvbmFsIG9iamVjdCBtZXJnZWQgaW50byB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBsb2dpblxuICAvLyAgICAgbWV0aG9kOyB1c2VkIGJ5IEhBTUsgZnJvbSBTUlAuXG4gIC8vXG4gIC8vICAgc3RhbXBlZExvZ2luVG9rZW46XG4gIC8vICAgICBvcHRpb25hbCBvYmplY3Qgd2l0aCBgdG9rZW5gIGFuZCBgd2hlbmAgaW5kaWNhdGluZyB0aGUgbG9naW5cbiAgLy8gICAgIHRva2VuIGlzIGFscmVhZHkgcHJlc2VudCBpbiB0aGUgZGF0YWJhc2UsIHJldHVybmVkIGJ5IHRoZVxuICAvLyAgICAgXCJyZXN1bWVcIiBsb2dpbiBoYW5kbGVyLlxuICAvL1xuICAvLyBGb3IgY29udmVuaWVuY2UsIGxvZ2luIG1ldGhvZHMgY2FuIGFsc28gdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaFxuICAvLyBpcyBjb252ZXJ0ZWQgaW50byBhbiB7ZXJyb3J9IHJlc3VsdC4gIEhvd2V2ZXIsIGlmIHRoZSBpZCBvZiB0aGVcbiAgLy8gdXNlciBhdHRlbXB0aW5nIHRoZSBsb2dpbiBpcyBrbm93biwgYSB7dXNlcklkLCBlcnJvcn0gcmVzdWx0IHNob3VsZFxuICAvLyBiZSByZXR1cm5lZCBpbnN0ZWFkIHNpbmNlIHRoZSB1c2VyIGlkIGlzIG5vdCBjYXB0dXJlZCB3aGVuIGFuXG4gIC8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG4gIC8vXG4gIC8vIFRoaXMgaW50ZXJuYWwgYHJlc3VsdGAgb2JqZWN0IGlzIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGludG8gdGhlXG4gIC8vIHB1YmxpYyB7aWQsIHRva2VuLCB0b2tlbkV4cGlyZXN9IG9iamVjdCByZXR1cm5lZCB0byB0aGUgY2xpZW50LlxuXG4gIC8vIFRyeSBhIGxvZ2luIG1ldGhvZCwgY29udmVydGluZyB0aHJvd24gZXhjZXB0aW9ucyBpbnRvIGFuIHtlcnJvcn1cbiAgLy8gcmVzdWx0LiAgVGhlIGB0eXBlYCBhcmd1bWVudCBpcyBhIGRlZmF1bHQsIGluc2VydGVkIGludG8gdGhlIHJlc3VsdFxuICAvLyBvYmplY3QgaWYgbm90IGV4cGxpY2l0bHkgcmV0dXJuZWQuXG4gIC8vXG4gIC8vIExvZyBpbiBhIHVzZXIgb24gYSBjb25uZWN0aW9uLlxuICAvL1xuICAvLyBXZSB1c2UgdGhlIG1ldGhvZCBpbnZvY2F0aW9uIHRvIHNldCB0aGUgdXNlciBpZCBvbiB0aGUgY29ubmVjdGlvbixcbiAgLy8gbm90IHRoZSBjb25uZWN0aW9uIG9iamVjdCBkaXJlY3RseS4gc2V0VXNlcklkIGlzIHRpZWQgdG8gbWV0aG9kcyB0b1xuICAvLyBlbmZvcmNlIGNsZWFyIG9yZGVyaW5nIG9mIG1ldGhvZCBhcHBsaWNhdGlvbiAodXNpbmcgd2FpdCBtZXRob2RzIG9uXG4gIC8vIHRoZSBjbGllbnQsIGFuZCBhIG5vIHNldFVzZXJJZCBhZnRlciB1bmJsb2NrIHJlc3RyaWN0aW9uIG9uIHRoZVxuICAvLyBzZXJ2ZXIpXG4gIC8vXG4gIC8vIFRoZSBgc3RhbXBlZExvZ2luVG9rZW5gIHBhcmFtZXRlciBpcyBvcHRpb25hbC4gIFdoZW4gcHJlc2VudCwgaXRcbiAgLy8gaW5kaWNhdGVzIHRoYXQgdGhlIGxvZ2luIHRva2VuIGhhcyBhbHJlYWR5IGJlZW4gaW5zZXJ0ZWQgaW50byB0aGVcbiAgLy8gZGF0YWJhc2UgYW5kIGRvZXNuJ3QgbmVlZCB0byBiZSBpbnNlcnRlZCBhZ2Fpbi4gIChJdCdzIHVzZWQgYnkgdGhlXG4gIC8vIFwicmVzdW1lXCIgbG9naW4gaGFuZGxlcikuXG4gIF9sb2dpblVzZXIobWV0aG9kSW52b2NhdGlvbiwgdXNlcklkLCBzdGFtcGVkTG9naW5Ub2tlbikge1xuICAgIGlmICghIHN0YW1wZWRMb2dpblRva2VuKSB7XG4gICAgICBzdGFtcGVkTG9naW5Ub2tlbiA9IHRoaXMuX2dlbmVyYXRlU3RhbXBlZExvZ2luVG9rZW4oKTtcbiAgICAgIHRoaXMuX2luc2VydExvZ2luVG9rZW4odXNlcklkLCBzdGFtcGVkTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBvcmRlciAoYW5kIHRoZSBhdm9pZGFuY2Ugb2YgeWllbGRzKSBpcyBpbXBvcnRhbnQgdG8gbWFrZVxuICAgIC8vIHN1cmUgdGhhdCB3aGVuIHB1Ymxpc2ggZnVuY3Rpb25zIGFyZSByZXJ1biwgdGhleSBzZWUgYVxuICAgIC8vIGNvbnNpc3RlbnQgdmlldyBvZiB0aGUgd29ybGQ6IHRoZSB1c2VySWQgaXMgc2V0IGFuZCBtYXRjaGVzXG4gICAgLy8gdGhlIGxvZ2luIHRva2VuIG9uIHRoZSBjb25uZWN0aW9uIChub3QgdGhhdCB0aGVyZSBpc1xuICAgIC8vIGN1cnJlbnRseSBhIHB1YmxpYyBBUEkgZm9yIHJlYWRpbmcgdGhlIGxvZ2luIHRva2VuIG9uIGFcbiAgICAvLyBjb25uZWN0aW9uKS5cbiAgICBNZXRlb3IuX25vWWllbGRzQWxsb3dlZCgoKSA9PlxuICAgICAgdGhpcy5fc2V0TG9naW5Ub2tlbihcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sXG4gICAgICAgIHRoaXMuX2hhc2hMb2dpblRva2VuKHN0YW1wZWRMb2dpblRva2VuLnRva2VuKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBtZXRob2RJbnZvY2F0aW9uLnNldFVzZXJJZCh1c2VySWQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB1c2VySWQsXG4gICAgICB0b2tlbjogc3RhbXBlZExvZ2luVG9rZW4udG9rZW4sXG4gICAgICB0b2tlbkV4cGlyZXM6IHRoaXMuX3Rva2VuRXhwaXJhdGlvbihzdGFtcGVkTG9naW5Ub2tlbi53aGVuKVxuICAgIH07XG4gIH07XG5cbiAgLy8gQWZ0ZXIgYSBsb2dpbiBtZXRob2QgaGFzIGNvbXBsZXRlZCwgY2FsbCB0aGUgbG9naW4gaG9va3MuICBOb3RlXG4gIC8vIHRoYXQgYGF0dGVtcHRMb2dpbmAgaXMgY2FsbGVkIGZvciAqYWxsKiBsb2dpbiBhdHRlbXB0cywgZXZlbiBvbmVzXG4gIC8vIHdoaWNoIGFyZW4ndCBzdWNjZXNzZnVsIChzdWNoIGFzIGFuIGludmFsaWQgcGFzc3dvcmQsIGV0YykuXG4gIC8vXG4gIC8vIElmIHRoZSBsb2dpbiBpcyBhbGxvd2VkIGFuZCBpc24ndCBhYm9ydGVkIGJ5IGEgdmFsaWRhdGUgbG9naW4gaG9va1xuICAvLyBjYWxsYmFjaywgbG9nIGluIHRoZSB1c2VyLlxuICAvL1xuICBfYXR0ZW1wdExvZ2luKFxuICAgIG1ldGhvZEludm9jYXRpb24sXG4gICAgbWV0aG9kTmFtZSxcbiAgICBtZXRob2RBcmdzLFxuICAgIHJlc3VsdFxuICApIHtcbiAgICBpZiAoIXJlc3VsdClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInJlc3VsdCBpcyByZXF1aXJlZFwiKTtcblxuICAgIC8vIFhYWCBBIHByb2dyYW1taW5nIGVycm9yIGluIGEgbG9naW4gaGFuZGxlciBjYW4gbGVhZCB0byB0aGlzIG9jY3VyaW5nLCBhbmRcbiAgICAvLyB0aGVuIHdlIGRvbid0IGNhbGwgb25Mb2dpbiBvciBvbkxvZ2luRmFpbHVyZSBjYWxsYmFja3MuIFNob3VsZFxuICAgIC8vIHRyeUxvZ2luTWV0aG9kIGNhdGNoIHRoaXMgY2FzZSBhbmQgdHVybiBpdCBpbnRvIGFuIGVycm9yP1xuICAgIGlmICghcmVzdWx0LnVzZXJJZCAmJiAhcmVzdWx0LmVycm9yKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBsb2dpbiBtZXRob2QgbXVzdCBzcGVjaWZ5IGEgdXNlcklkIG9yIGFuIGVycm9yXCIpO1xuXG4gICAgbGV0IHVzZXI7XG4gICAgaWYgKHJlc3VsdC51c2VySWQpXG4gICAgICB1c2VyID0gdGhpcy51c2Vycy5maW5kT25lKHJlc3VsdC51c2VySWQsIHtmaWVsZHM6IHRoaXMuX29wdGlvbnMuZGVmYXVsdEZpZWxkU2VsZWN0b3J9KTtcblxuICAgIGNvbnN0IGF0dGVtcHQgPSB7XG4gICAgICB0eXBlOiByZXN1bHQudHlwZSB8fCBcInVua25vd25cIixcbiAgICAgIGFsbG93ZWQ6ICEhIChyZXN1bHQudXNlcklkICYmICFyZXN1bHQuZXJyb3IpLFxuICAgICAgbWV0aG9kTmFtZTogbWV0aG9kTmFtZSxcbiAgICAgIG1ldGhvZEFyZ3VtZW50czogQXJyYXkuZnJvbShtZXRob2RBcmdzKVxuICAgIH07XG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgYXR0ZW1wdC5lcnJvciA9IHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGF0dGVtcHQudXNlciA9IHVzZXI7XG4gICAgfVxuXG4gICAgLy8gX3ZhbGlkYXRlTG9naW4gbWF5IG11dGF0ZSBgYXR0ZW1wdGAgYnkgYWRkaW5nIGFuIGVycm9yIGFuZCBjaGFuZ2luZyBhbGxvd2VkXG4gICAgLy8gdG8gZmFsc2UsIGJ1dCB0aGF0J3MgdGhlIG9ubHkgY2hhbmdlIGl0IGNhbiBtYWtlIChhbmQgdGhlIHVzZXIncyBjYWxsYmFja3NcbiAgICAvLyBvbmx5IGdldCBhIGNsb25lIG9mIGBhdHRlbXB0YCkuXG4gICAgdGhpcy5fdmFsaWRhdGVMb2dpbihtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sIGF0dGVtcHQpO1xuXG4gICAgaWYgKGF0dGVtcHQuYWxsb3dlZCkge1xuICAgICAgY29uc3QgcmV0ID0ge1xuICAgICAgICAuLi50aGlzLl9sb2dpblVzZXIoXG4gICAgICAgICAgbWV0aG9kSW52b2NhdGlvbixcbiAgICAgICAgICByZXN1bHQudXNlcklkLFxuICAgICAgICAgIHJlc3VsdC5zdGFtcGVkTG9naW5Ub2tlblxuICAgICAgICApLFxuICAgICAgICAuLi5yZXN1bHQub3B0aW9uc1xuICAgICAgfTtcbiAgICAgIHJldC50eXBlID0gYXR0ZW1wdC50eXBlO1xuICAgICAgdGhpcy5fc3VjY2Vzc2Z1bExvZ2luKG1ldGhvZEludm9jYXRpb24uY29ubmVjdGlvbiwgYXR0ZW1wdCk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2ZhaWxlZExvZ2luKG1ldGhvZEludm9jYXRpb24uY29ubmVjdGlvbiwgYXR0ZW1wdCk7XG4gICAgICB0aHJvdyBhdHRlbXB0LmVycm9yO1xuICAgIH1cbiAgfTtcblxuICAvLyBBbGwgc2VydmljZSBzcGVjaWZpYyBsb2dpbiBtZXRob2RzIHNob3VsZCBnbyB0aHJvdWdoIHRoaXMgZnVuY3Rpb24uXG4gIC8vIEVuc3VyZSB0aGF0IHRocm93biBleGNlcHRpb25zIGFyZSBjYXVnaHQgYW5kIHRoYXQgbG9naW4gaG9va1xuICAvLyBjYWxsYmFja3MgYXJlIHN0aWxsIGNhbGxlZC5cbiAgLy9cbiAgX2xvZ2luTWV0aG9kKFxuICAgIG1ldGhvZEludm9jYXRpb24sXG4gICAgbWV0aG9kTmFtZSxcbiAgICBtZXRob2RBcmdzLFxuICAgIHR5cGUsXG4gICAgZm5cbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGVtcHRMb2dpbihcbiAgICAgIG1ldGhvZEludm9jYXRpb24sXG4gICAgICBtZXRob2ROYW1lLFxuICAgICAgbWV0aG9kQXJncyxcbiAgICAgIHRyeUxvZ2luTWV0aG9kKHR5cGUsIGZuKVxuICAgICk7XG4gIH07XG5cblxuICAvLyBSZXBvcnQgYSBsb2dpbiBhdHRlbXB0IGZhaWxlZCBvdXRzaWRlIHRoZSBjb250ZXh0IG9mIGEgbm9ybWFsIGxvZ2luXG4gIC8vIG1ldGhvZC4gVGhpcyBpcyBmb3IgdXNlIGluIHRoZSBjYXNlIHdoZXJlIHRoZXJlIGlzIGEgbXVsdGktc3RlcCBsb2dpblxuICAvLyBwcm9jZWR1cmUgKGVnIFNSUCBiYXNlZCBwYXNzd29yZCBsb2dpbikuIElmIGEgbWV0aG9kIGVhcmx5IGluIHRoZVxuICAvLyBjaGFpbiBmYWlscywgaXQgc2hvdWxkIGNhbGwgdGhpcyBmdW5jdGlvbiB0byByZXBvcnQgYSBmYWlsdXJlLiBUaGVyZVxuICAvLyBpcyBubyBjb3JyZXNwb25kaW5nIG1ldGhvZCBmb3IgYSBzdWNjZXNzZnVsIGxvZ2luOyBtZXRob2RzIHRoYXQgY2FuXG4gIC8vIHN1Y2NlZWQgYXQgbG9nZ2luZyBhIHVzZXIgaW4gc2hvdWxkIGFsd2F5cyBiZSBhY3R1YWwgbG9naW4gbWV0aG9kc1xuICAvLyAodXNpbmcgZWl0aGVyIEFjY291bnRzLl9sb2dpbk1ldGhvZCBvciBBY2NvdW50cy5yZWdpc3RlckxvZ2luSGFuZGxlcikuXG4gIF9yZXBvcnRMb2dpbkZhaWx1cmUoXG4gICAgbWV0aG9kSW52b2NhdGlvbixcbiAgICBtZXRob2ROYW1lLFxuICAgIG1ldGhvZEFyZ3MsXG4gICAgcmVzdWx0XG4gICkge1xuICAgIGNvbnN0IGF0dGVtcHQgPSB7XG4gICAgICB0eXBlOiByZXN1bHQudHlwZSB8fCBcInVua25vd25cIixcbiAgICAgIGFsbG93ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3I6IHJlc3VsdC5lcnJvcixcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICBtZXRob2RBcmd1bWVudHM6IEFycmF5LmZyb20obWV0aG9kQXJncylcbiAgICB9O1xuXG4gICAgaWYgKHJlc3VsdC51c2VySWQpIHtcbiAgICAgIGF0dGVtcHQudXNlciA9IHRoaXMudXNlcnMuZmluZE9uZShyZXN1bHQudXNlcklkLCB7ZmllbGRzOiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsaWRhdGVMb2dpbihtZXRob2RJbnZvY2F0aW9uLmNvbm5lY3Rpb24sIGF0dGVtcHQpO1xuICAgIHRoaXMuX2ZhaWxlZExvZ2luKG1ldGhvZEludm9jYXRpb24uY29ubmVjdGlvbiwgYXR0ZW1wdCk7XG5cbiAgICAvLyBfdmFsaWRhdGVMb2dpbiBtYXkgbXV0YXRlIGF0dGVtcHQgdG8gc2V0IGEgbmV3IGVycm9yIG1lc3NhZ2UuIFJldHVyblxuICAgIC8vIHRoZSBtb2RpZmllZCB2ZXJzaW9uLlxuICAgIHJldHVybiBhdHRlbXB0O1xuICB9O1xuXG4gIC8vL1xuICAvLy8gTE9HSU4gSEFORExFUlNcbiAgLy8vXG5cbiAgLy8gVGhlIG1haW4gZW50cnkgcG9pbnQgZm9yIGF1dGggcGFja2FnZXMgdG8gaG9vayBpbiB0byBsb2dpbi5cbiAgLy9cbiAgLy8gQSBsb2dpbiBoYW5kbGVyIGlzIGEgbG9naW4gbWV0aG9kIHdoaWNoIGNhbiByZXR1cm4gYHVuZGVmaW5lZGAgdG9cbiAgLy8gaW5kaWNhdGUgdGhhdCB0aGUgbG9naW4gcmVxdWVzdCBpcyBub3QgaGFuZGxlZCBieSB0aGlzIGhhbmRsZXIuXG4gIC8vXG4gIC8vIEBwYXJhbSBuYW1lIHtTdHJpbmd9IE9wdGlvbmFsLiAgVGhlIHNlcnZpY2UgbmFtZSwgdXNlZCBieSBkZWZhdWx0XG4gIC8vIGlmIGEgc3BlY2lmaWMgc2VydmljZSBuYW1lIGlzbid0IHJldHVybmVkIGluIHRoZSByZXN1bHQuXG4gIC8vXG4gIC8vIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIGFuIG9wdGlvbnMgb2JqZWN0XG4gIC8vIChhcyBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gdGhlIGBsb2dpbmAgbWV0aG9kKSBhbmQgcmV0dXJucyBvbmUgb2Y6XG4gIC8vIC0gYHVuZGVmaW5lZGAsIG1lYW5pbmcgZG9uJ3QgaGFuZGxlO1xuICAvLyAtIGEgbG9naW4gbWV0aG9kIHJlc3VsdCBvYmplY3RcblxuICByZWdpc3RlckxvZ2luSGFuZGxlcihuYW1lLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEgaGFuZGxlcikge1xuICAgICAgaGFuZGxlciA9IG5hbWU7XG4gICAgICBuYW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2dpbkhhbmRsZXJzLnB1c2goe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGhhbmRsZXI6IGhhbmRsZXJcbiAgICB9KTtcbiAgfTtcblxuXG4gIC8vIENoZWNrcyBhIHVzZXIncyBjcmVkZW50aWFscyBhZ2FpbnN0IGFsbCB0aGUgcmVnaXN0ZXJlZCBsb2dpblxuICAvLyBoYW5kbGVycywgYW5kIHJldHVybnMgYSBsb2dpbiB0b2tlbiBpZiB0aGUgY3JlZGVudGlhbHMgYXJlIHZhbGlkLiBJdFxuICAvLyBpcyBsaWtlIHRoZSBsb2dpbiBtZXRob2QsIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3Qgc2V0IHRoZSBsb2dnZWQtaW5cbiAgLy8gdXNlciBvbiB0aGUgY29ubmVjdGlvbi4gVGhyb3dzIGEgTWV0ZW9yLkVycm9yIGlmIGxvZ2dpbmcgaW4gZmFpbHMsXG4gIC8vIGluY2x1ZGluZyB0aGUgY2FzZSB3aGVyZSBub25lIG9mIHRoZSBsb2dpbiBoYW5kbGVycyBoYW5kbGVkIHRoZSBsb2dpblxuICAvLyByZXF1ZXN0LiBPdGhlcndpc2UsIHJldHVybnMge2lkOiB1c2VySWQsIHRva2VuOiAqLCB0b2tlbkV4cGlyZXM6ICp9LlxuICAvL1xuICAvLyBGb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgdG8gbG9naW4gd2l0aCBhIHBsYWludGV4dCBwYXNzd29yZCwgYG9wdGlvbnNgIGNvdWxkIGJlXG4gIC8vICAgeyB1c2VyOiB7IHVzZXJuYW1lOiA8dXNlcm5hbWU+IH0sIHBhc3N3b3JkOiA8cGFzc3dvcmQ+IH0sIG9yXG4gIC8vICAgeyB1c2VyOiB7IGVtYWlsOiA8ZW1haWw+IH0sIHBhc3N3b3JkOiA8cGFzc3dvcmQ+IH0uXG5cbiAgLy8gVHJ5IGFsbCBvZiB0aGUgcmVnaXN0ZXJlZCBsb2dpbiBoYW5kbGVycyB1bnRpbCBvbmUgb2YgdGhlbSBkb2Vzbid0XG4gIC8vIHJldHVybiBgdW5kZWZpbmVkYCwgbWVhbmluZyBpdCBoYW5kbGVkIHRoaXMgY2FsbCB0byBgbG9naW5gLiBSZXR1cm5cbiAgLy8gdGhhdCByZXR1cm4gdmFsdWUuXG4gIF9ydW5Mb2dpbkhhbmRsZXJzKG1ldGhvZEludm9jYXRpb24sIG9wdGlvbnMpIHtcbiAgICBmb3IgKGxldCBoYW5kbGVyIG9mIHRoaXMuX2xvZ2luSGFuZGxlcnMpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUxvZ2luTWV0aG9kKFxuICAgICAgICBoYW5kbGVyLm5hbWUsXG4gICAgICAgICgpID0+IGhhbmRsZXIuaGFuZGxlci5jYWxsKG1ldGhvZEludm9jYXRpb24sIG9wdGlvbnMpXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMCwgXCJBIGxvZ2luIGhhbmRsZXIgc2hvdWxkIHJldHVybiBhIHJlc3VsdCBvciB1bmRlZmluZWRcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IG51bGwsXG4gICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcig0MDAsIFwiVW5yZWNvZ25pemVkIG9wdGlvbnMgZm9yIGxvZ2luIHJlcXVlc3RcIilcbiAgICB9O1xuICB9O1xuXG4gIC8vIERlbGV0ZXMgdGhlIGdpdmVuIGxvZ2luVG9rZW4gZnJvbSB0aGUgZGF0YWJhc2UuXG4gIC8vXG4gIC8vIEZvciBuZXctc3R5bGUgaGFzaGVkIHRva2VuLCB0aGlzIHdpbGwgY2F1c2UgYWxsIGNvbm5lY3Rpb25zXG4gIC8vIGFzc29jaWF0ZWQgd2l0aCB0aGUgdG9rZW4gdG8gYmUgY2xvc2VkLlxuICAvL1xuICAvLyBBbnkgY29ubmVjdGlvbnMgYXNzb2NpYXRlZCB3aXRoIG9sZC1zdHlsZSB1bmhhc2hlZCB0b2tlbnMgd2lsbCBiZVxuICAvLyBpbiB0aGUgcHJvY2VzcyBvZiBiZWNvbWluZyBhc3NvY2lhdGVkIHdpdGggaGFzaGVkIHRva2VucyBhbmQgdGhlblxuICAvLyB0aGV5J2xsIGdldCBjbG9zZWQuXG4gIGRlc3Ryb3lUb2tlbih1c2VySWQsIGxvZ2luVG9rZW4pIHtcbiAgICB0aGlzLnVzZXJzLnVwZGF0ZSh1c2VySWQsIHtcbiAgICAgICRwdWxsOiB7XG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IHtcbiAgICAgICAgICAkb3I6IFtcbiAgICAgICAgICAgIHsgaGFzaGVkVG9rZW46IGxvZ2luVG9rZW4gfSxcbiAgICAgICAgICAgIHsgdG9rZW46IGxvZ2luVG9rZW4gfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9pbml0U2VydmVyTWV0aG9kcygpIHtcbiAgICAvLyBUaGUgbWV0aG9kcyBjcmVhdGVkIGluIHRoaXMgZnVuY3Rpb24gbmVlZCB0byBiZSBjcmVhdGVkIGhlcmUgc28gdGhhdFxuICAgIC8vIHRoaXMgdmFyaWFibGUgaXMgYXZhaWxhYmxlIGluIHRoZWlyIHNjb3BlLlxuICAgIGNvbnN0IGFjY291bnRzID0gdGhpcztcblxuXG4gICAgLy8gVGhpcyBvYmplY3Qgd2lsbCBiZSBwb3B1bGF0ZWQgd2l0aCBtZXRob2RzIGFuZCB0aGVuIHBhc3NlZCB0b1xuICAgIC8vIGFjY291bnRzLl9zZXJ2ZXIubWV0aG9kcyBmdXJ0aGVyIGJlbG93LlxuICAgIGNvbnN0IG1ldGhvZHMgPSB7fTtcblxuICAgIC8vIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAgICAvLyAgIElmIHN1Y2Nlc3NmdWwsIHJldHVybnMge3Rva2VuOiByZWNvbm5lY3RUb2tlbiwgaWQ6IHVzZXJJZH1cbiAgICAvLyAgIElmIHVuc3VjY2Vzc2Z1bCAoZm9yIGV4YW1wbGUsIGlmIHRoZSB1c2VyIGNsb3NlZCB0aGUgb2F1dGggbG9naW4gcG9wdXApLFxuICAgIC8vICAgICB0aHJvd3MgYW4gZXJyb3IgZGVzY3JpYmluZyB0aGUgcmVhc29uXG4gICAgbWV0aG9kcy5sb2dpbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAvLyBMb2dpbiBoYW5kbGVycyBzaG91bGQgcmVhbGx5IGFsc28gY2hlY2sgd2hhdGV2ZXIgZmllbGQgdGhleSBsb29rIGF0IGluXG4gICAgICAvLyBvcHRpb25zLCBidXQgd2UgZG9uJ3QgZW5mb3JjZSBpdC5cbiAgICAgIGNoZWNrKG9wdGlvbnMsIE9iamVjdCk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGFjY291bnRzLl9ydW5Mb2dpbkhhbmRsZXJzKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gYWNjb3VudHMuX2F0dGVtcHRMb2dpbih0aGlzLCBcImxvZ2luXCIsIGFyZ3VtZW50cywgcmVzdWx0KTtcbiAgICB9O1xuXG4gICAgbWV0aG9kcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGFjY291bnRzLl9nZXRMb2dpblRva2VuKHRoaXMuY29ubmVjdGlvbi5pZCk7XG4gICAgICBhY2NvdW50cy5fc2V0TG9naW5Ub2tlbih0aGlzLnVzZXJJZCwgdGhpcy5jb25uZWN0aW9uLCBudWxsKTtcbiAgICAgIGlmICh0b2tlbiAmJiB0aGlzLnVzZXJJZCkge1xuICAgICAgICBhY2NvdW50cy5kZXN0cm95VG9rZW4odGhpcy51c2VySWQsIHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGFjY291bnRzLl9zdWNjZXNzZnVsTG9nb3V0KHRoaXMuY29ubmVjdGlvbiwgdGhpcy51c2VySWQpO1xuICAgICAgdGhpcy5zZXRVc2VySWQobnVsbCk7XG4gICAgfTtcblxuICAgIC8vIERlbGV0ZSBhbGwgdGhlIGN1cnJlbnQgdXNlcidzIHRva2VucyBhbmQgY2xvc2UgYWxsIG9wZW4gY29ubmVjdGlvbnMgbG9nZ2VkXG4gICAgLy8gaW4gYXMgdGhpcyB1c2VyLiBSZXR1cm5zIGEgZnJlc2ggbmV3IGxvZ2luIHRva2VuIHRoYXQgdGhpcyBjbGllbnQgY2FuXG4gICAgLy8gdXNlLiBUZXN0cyBzZXQgQWNjb3VudHMuX25vQ29ubmVjdGlvbkNsb3NlRGVsYXlGb3JUZXN0IHRvIGRlbGV0ZSB0b2tlbnNcbiAgICAvLyBpbW1lZGlhdGVseSBpbnN0ZWFkIG9mIHVzaW5nIGEgZGVsYXkuXG4gICAgLy9cbiAgICAvLyBYWFggQ09NUEFUIFdJVEggMC43LjJcbiAgICAvLyBUaGlzIHNpbmdsZSBgbG9nb3V0T3RoZXJDbGllbnRzYCBtZXRob2QgaGFzIGJlZW4gcmVwbGFjZWQgd2l0aCB0d29cbiAgICAvLyBtZXRob2RzLCBvbmUgdGhhdCB5b3UgY2FsbCB0byBnZXQgYSBuZXcgdG9rZW4sIGFuZCBhbm90aGVyIHRoYXQgeW91XG4gICAgLy8gY2FsbCB0byByZW1vdmUgYWxsIHRva2VucyBleGNlcHQgeW91ciBvd24uIFRoZSBuZXcgZGVzaWduIGFsbG93c1xuICAgIC8vIGNsaWVudHMgdG8ga25vdyB3aGVuIG90aGVyIGNsaWVudHMgaGF2ZSBhY3R1YWxseSBiZWVuIGxvZ2dlZFxuICAgIC8vIG91dC4gKFRoZSBgbG9nb3V0T3RoZXJDbGllbnRzYCBtZXRob2QgZ3VhcmFudGVlcyB0aGUgY2FsbGVyIHRoYXRcbiAgICAvLyB0aGUgb3RoZXIgY2xpZW50cyB3aWxsIGJlIGxvZ2dlZCBvdXQgYXQgc29tZSBwb2ludCwgYnV0IG1ha2VzIG5vXG4gICAgLy8gZ3VhcmFudGVlcyBhYm91dCB3aGVuLikgVGhpcyBtZXRob2QgaXMgbGVmdCBpbiBmb3IgYmFja3dhcmRzXG4gICAgLy8gY29tcGF0aWJpbGl0eSwgZXNwZWNpYWxseSBzaW5jZSBhcHBsaWNhdGlvbiBjb2RlIG1pZ2h0IGJlIGNhbGxpbmdcbiAgICAvLyB0aGlzIG1ldGhvZCBkaXJlY3RseS5cbiAgICAvL1xuICAgIC8vIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIHRva2VuIGFuZCB0b2tlbkV4cGlyZXMga2V5cy5cbiAgICBtZXRob2RzLmxvZ291dE90aGVyQ2xpZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhY2NvdW50cy51c2Vycy5maW5kT25lKHRoaXMudXNlcklkLCB7XG4gICAgICAgIGZpZWxkczoge1xuICAgICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IHRva2VucyBpbiB0aGUgZGF0YWJhc2UgdG8gYmUgZGVsZXRlZCBpblxuICAgICAgICAvLyBDT05ORUNUSU9OX0NMT1NFX0RFTEFZX01TIG1zLiBUaGlzIGdpdmVzIG90aGVyIGNvbm5lY3Rpb25zIGluIHRoZVxuICAgICAgICAvLyBjYWxsZXIncyBicm93c2VyIHRpbWUgdG8gZmluZCB0aGUgZnJlc2ggdG9rZW4gaW4gbG9jYWxTdG9yYWdlLiBXZSBzYXZlXG4gICAgICAgIC8vIHRoZSB0b2tlbnMgaW4gdGhlIGRhdGFiYXNlIGluIGNhc2Ugd2UgY3Jhc2ggYmVmb3JlIGFjdHVhbGx5IGRlbGV0aW5nXG4gICAgICAgIC8vIHRoZW0uXG4gICAgICAgIGNvbnN0IHRva2VucyA9IHVzZXIuc2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zO1xuICAgICAgICBjb25zdCBuZXdUb2tlbiA9IGFjY291bnRzLl9nZW5lcmF0ZVN0YW1wZWRMb2dpblRva2VuKCk7XG4gICAgICAgIGFjY291bnRzLnVzZXJzLnVwZGF0ZSh0aGlzLnVzZXJJZCwge1xuICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zVG9EZWxldGVcIjogdG9rZW5zLFxuICAgICAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUuaGF2ZUxvZ2luVG9rZW5zVG9EZWxldGVcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgJHB1c2g6IHsgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjogYWNjb3VudHMuX2hhc2hTdGFtcGVkVG9rZW4obmV3VG9rZW4pIH1cbiAgICAgICAgfSk7XG4gICAgICAgIE1ldGVvci5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAvLyBUaGUgb2JzZXJ2ZSBvbiBNZXRlb3IudXNlcnMgd2lsbCB0YWtlIGNhcmUgb2YgY2xvc2luZyB0aGUgY29ubmVjdGlvbnNcbiAgICAgICAgICAvLyBhc3NvY2lhdGVkIHdpdGggYHRva2Vuc2AuXG4gICAgICAgICAgYWNjb3VudHMuX2RlbGV0ZVNhdmVkVG9rZW5zRm9yVXNlcih0aGlzLnVzZXJJZCwgdG9rZW5zKTtcbiAgICAgICAgfSwgYWNjb3VudHMuX25vQ29ubmVjdGlvbkNsb3NlRGVsYXlGb3JUZXN0ID8gMCA6XG4gICAgICAgICAgQ09OTkVDVElPTl9DTE9TRV9ERUxBWV9NUyk7XG4gICAgICAgIC8vIFdlIGRvIG5vdCBzZXQgdGhlIGxvZ2luIHRva2VuIG9uIHRoaXMgY29ubmVjdGlvbiwgYnV0IGluc3RlYWQgdGhlXG4gICAgICAgIC8vIG9ic2VydmUgY2xvc2VzIHRoZSBjb25uZWN0aW9uIGFuZCB0aGUgY2xpZW50IHdpbGwgcmVjb25uZWN0IHdpdGggdGhlXG4gICAgICAgIC8vIG5ldyB0b2tlbi5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbjogbmV3VG9rZW4udG9rZW4sXG4gICAgICAgICAgdG9rZW5FeHBpcmVzOiBhY2NvdW50cy5fdG9rZW5FeHBpcmF0aW9uKG5ld1Rva2VuLndoZW4pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKFwiWW91IGFyZSBub3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gR2VuZXJhdGVzIGEgbmV3IGxvZ2luIHRva2VuIHdpdGggdGhlIHNhbWUgZXhwaXJhdGlvbiBhcyB0aGVcbiAgICAvLyBjb25uZWN0aW9uJ3MgY3VycmVudCB0b2tlbiBhbmQgc2F2ZXMgaXQgdG8gdGhlIGRhdGFiYXNlLiBBc3NvY2lhdGVzXG4gICAgLy8gdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGlzIG5ldyB0b2tlbiBhbmQgcmV0dXJucyBpdC4gVGhyb3dzIGFuIGVycm9yXG4gICAgLy8gaWYgY2FsbGVkIG9uIGEgY29ubmVjdGlvbiB0aGF0IGlzbid0IGxvZ2dlZCBpbi5cbiAgICAvL1xuICAgIC8vIEByZXR1cm5zIE9iamVjdFxuICAgIC8vICAgSWYgc3VjY2Vzc2Z1bCwgcmV0dXJucyB7IHRva2VuOiA8bmV3IHRva2VuPiwgaWQ6IDx1c2VyIGlkPixcbiAgICAvLyAgIHRva2VuRXhwaXJlczogPGV4cGlyYXRpb24gZGF0ZT4gfS5cbiAgICBtZXRob2RzLmdldE5ld1Rva2VuID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdXNlciA9IGFjY291bnRzLnVzZXJzLmZpbmRPbmUodGhpcy51c2VySWQsIHtcbiAgICAgICAgZmllbGRzOiB7IFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IDEgfVxuICAgICAgfSk7XG4gICAgICBpZiAoISB0aGlzLnVzZXJJZCB8fCAhIHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIllvdSBhcmUgbm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICB9XG4gICAgICAvLyBCZSBjYXJlZnVsIG5vdCB0byBnZW5lcmF0ZSBhIG5ldyB0b2tlbiB0aGF0IGhhcyBhIGxhdGVyXG4gICAgICAvLyBleHBpcmF0aW9uIHRoYW4gdGhlIGN1cnJlbiB0b2tlbi4gT3RoZXJ3aXNlLCBhIGJhZCBndXkgd2l0aCBhXG4gICAgICAvLyBzdG9sZW4gdG9rZW4gY291bGQgdXNlIHRoaXMgbWV0aG9kIHRvIHN0b3AgaGlzIHN0b2xlbiB0b2tlbiBmcm9tXG4gICAgICAvLyBldmVyIGV4cGlyaW5nLlxuICAgICAgY29uc3QgY3VycmVudEhhc2hlZFRva2VuID0gYWNjb3VudHMuX2dldExvZ2luVG9rZW4odGhpcy5jb25uZWN0aW9uLmlkKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGFtcGVkVG9rZW4gPSB1c2VyLnNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy5maW5kKFxuICAgICAgICBzdGFtcGVkVG9rZW4gPT4gc3RhbXBlZFRva2VuLmhhc2hlZFRva2VuID09PSBjdXJyZW50SGFzaGVkVG9rZW5cbiAgICAgICk7XG4gICAgICBpZiAoISBjdXJyZW50U3RhbXBlZFRva2VuKSB7IC8vIHNhZmV0eSBiZWx0OiB0aGlzIHNob3VsZCBuZXZlciBoYXBwZW5cbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIkludmFsaWQgbG9naW4gdG9rZW5cIik7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdTdGFtcGVkVG9rZW4gPSBhY2NvdW50cy5fZ2VuZXJhdGVTdGFtcGVkTG9naW5Ub2tlbigpO1xuICAgICAgbmV3U3RhbXBlZFRva2VuLndoZW4gPSBjdXJyZW50U3RhbXBlZFRva2VuLndoZW47XG4gICAgICBhY2NvdW50cy5faW5zZXJ0TG9naW5Ub2tlbih0aGlzLnVzZXJJZCwgbmV3U3RhbXBlZFRva2VuKTtcbiAgICAgIHJldHVybiBhY2NvdW50cy5fbG9naW5Vc2VyKHRoaXMsIHRoaXMudXNlcklkLCBuZXdTdGFtcGVkVG9rZW4pO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmVzIGFsbCB0b2tlbnMgZXhjZXB0IHRoZSB0b2tlbiBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnRcbiAgICAvLyBjb25uZWN0aW9uLiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNvbm5lY3Rpb24gaXMgbm90IGxvZ2dlZFxuICAgIC8vIGluLiBSZXR1cm5zIG5vdGhpbmcgb24gc3VjY2Vzcy5cbiAgICBtZXRob2RzLnJlbW92ZU90aGVyVG9rZW5zID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEgdGhpcy51c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIllvdSBhcmUgbm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50VG9rZW4gPSBhY2NvdW50cy5fZ2V0TG9naW5Ub2tlbih0aGlzLmNvbm5lY3Rpb24uaWQpO1xuICAgICAgYWNjb3VudHMudXNlcnMudXBkYXRlKHRoaXMudXNlcklkLCB7XG4gICAgICAgICRwdWxsOiB7XG4gICAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjogeyBoYXNoZWRUb2tlbjogeyAkbmU6IGN1cnJlbnRUb2tlbiB9IH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEFsbG93IGEgb25lLXRpbWUgY29uZmlndXJhdGlvbiBmb3IgYSBsb2dpbiBzZXJ2aWNlLiBNb2RpZmljYXRpb25zXG4gICAgLy8gdG8gdGhpcyBjb2xsZWN0aW9uIGFyZSBhbHNvIGFsbG93ZWQgaW4gaW5zZWN1cmUgbW9kZS5cbiAgICBtZXRob2RzLmNvbmZpZ3VyZUxvZ2luU2VydmljZSA9IChvcHRpb25zKSA9PiB7XG4gICAgICBjaGVjayhvcHRpb25zLCBNYXRjaC5PYmplY3RJbmNsdWRpbmcoe3NlcnZpY2U6IFN0cmluZ30pKTtcbiAgICAgIC8vIERvbid0IGxldCByYW5kb20gdXNlcnMgY29uZmlndXJlIGEgc2VydmljZSB3ZSBoYXZlbid0IGFkZGVkIHlldCAoc29cbiAgICAgIC8vIHRoYXQgd2hlbiB3ZSBkbyBsYXRlciBhZGQgaXQsIGl0J3Mgc2V0IHVwIHdpdGggdGhlaXIgY29uZmlndXJhdGlvblxuICAgICAgLy8gaW5zdGVhZCBvZiBvdXJzKS5cbiAgICAgIC8vIFhYWCBpZiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gaXMgb2F1dGgtc3BlY2lmaWMgdGhlbiB0aGlzIGNvZGUgc2hvdWxkXG4gICAgICAvLyAgICAgYmUgaW4gYWNjb3VudHMtb2F1dGg7IGlmIGl0J3Mgbm90IHRoZW4gdGhlIHJlZ2lzdHJ5IHNob3VsZCBiZVxuICAgICAgLy8gICAgIGluIHRoaXMgcGFja2FnZVxuICAgICAgaWYgKCEoYWNjb3VudHMub2F1dGhcbiAgICAgICAgJiYgYWNjb3VudHMub2F1dGguc2VydmljZU5hbWVzKCkuaW5jbHVkZXMob3B0aW9ucy5zZXJ2aWNlKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiU2VydmljZSB1bmtub3duXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IFNlcnZpY2VDb25maWd1cmF0aW9uIH0gPSBQYWNrYWdlWydzZXJ2aWNlLWNvbmZpZ3VyYXRpb24nXTtcbiAgICAgIGlmIChTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5maW5kT25lKHtzZXJ2aWNlOiBvcHRpb25zLnNlcnZpY2V9KSlcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIGBTZXJ2aWNlICR7b3B0aW9ucy5zZXJ2aWNlfSBhbHJlYWR5IGNvbmZpZ3VyZWRgKTtcblxuICAgICAgaWYgKGhhc093bi5jYWxsKG9wdGlvbnMsICdzZWNyZXQnKSAmJiB1c2luZ09BdXRoRW5jcnlwdGlvbigpKVxuICAgICAgICBvcHRpb25zLnNlY3JldCA9IE9BdXRoRW5jcnlwdGlvbi5zZWFsKG9wdGlvbnMuc2VjcmV0KTtcblxuICAgICAgU2VydmljZUNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMuaW5zZXJ0KG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBhY2NvdW50cy5fc2VydmVyLm1ldGhvZHMobWV0aG9kcyk7XG4gIH07XG5cbiAgX2luaXRBY2NvdW50RGF0YUhvb2tzKCkge1xuICAgIHRoaXMuX3NlcnZlci5vbkNvbm5lY3Rpb24oY29ubmVjdGlvbiA9PiB7XG4gICAgICB0aGlzLl9hY2NvdW50RGF0YVtjb25uZWN0aW9uLmlkXSA9IHtcbiAgICAgICAgY29ubmVjdGlvbjogY29ubmVjdGlvblxuICAgICAgfTtcblxuICAgICAgY29ubmVjdGlvbi5vbkNsb3NlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlVG9rZW5Gcm9tQ29ubmVjdGlvbihjb25uZWN0aW9uLmlkKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2FjY291bnREYXRhW2Nvbm5lY3Rpb24uaWRdO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX2luaXRTZXJ2ZXJQdWJsaWNhdGlvbnMoKSB7XG4gICAgLy8gQnJpbmcgaW50byBsZXhpY2FsIHNjb3BlIGZvciBwdWJsaXNoIGNhbGxiYWNrcyB0aGF0IG5lZWQgYHRoaXNgXG4gICAgY29uc3QgeyB1c2VycywgX2F1dG9wdWJsaXNoRmllbGRzIH0gPSB0aGlzO1xuXG4gICAgLy8gUHVibGlzaCBhbGwgbG9naW4gc2VydmljZSBjb25maWd1cmF0aW9uIGZpZWxkcyBvdGhlciB0aGFuIHNlY3JldC5cbiAgICB0aGlzLl9zZXJ2ZXIucHVibGlzaChcIm1ldGVvci5sb2dpblNlcnZpY2VDb25maWd1cmF0aW9uXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgU2VydmljZUNvbmZpZ3VyYXRpb24gfSA9IFBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddO1xuICAgICAgcmV0dXJuIFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmQoe30sIHtmaWVsZHM6IHtzZWNyZXQ6IDB9fSk7XG4gICAgfSwge2lzX2F1dG86IHRydWV9KTsgLy8gbm90IHRlY2hpbmNhbGx5IGF1dG9wdWJsaXNoLCBidXQgc3RvcHMgdGhlIHdhcm5pbmcuXG5cbiAgICAvLyBQdWJsaXNoIHRoZSBjdXJyZW50IHVzZXIncyByZWNvcmQgdG8gdGhlIGNsaWVudC5cbiAgICB0aGlzLl9zZXJ2ZXIucHVibGlzaChudWxsLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy51c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJzLmZpbmQoe1xuICAgICAgICAgIF9pZDogdGhpcy51c2VySWRcbiAgICAgICAgfSwge1xuICAgICAgICAgIGZpZWxkczoge1xuICAgICAgICAgICAgcHJvZmlsZTogMSxcbiAgICAgICAgICAgIHVzZXJuYW1lOiAxLFxuICAgICAgICAgICAgZW1haWxzOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0sIC8qc3VwcHJlc3MgYXV0b3B1Ymxpc2ggd2FybmluZyove2lzX2F1dG86IHRydWV9KTtcblxuICAgIC8vIFVzZSBNZXRlb3Iuc3RhcnR1cCB0byBnaXZlIG90aGVyIHBhY2thZ2VzIGEgY2hhbmNlIHRvIGNhbGxcbiAgICAvLyBhZGRBdXRvcHVibGlzaEZpZWxkcy5cbiAgICBQYWNrYWdlLmF1dG9wdWJsaXNoICYmIE1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgICAgIC8vIFsncHJvZmlsZScsICd1c2VybmFtZSddIC0+IHtwcm9maWxlOiAxLCB1c2VybmFtZTogMX1cbiAgICAgIGNvbnN0IHRvRmllbGRTZWxlY3RvciA9IGZpZWxkcyA9PiBmaWVsZHMucmVkdWNlKChwcmV2LCBmaWVsZCkgPT4gKFxuICAgICAgICAgIHsgLi4ucHJldiwgW2ZpZWxkXTogMSB9KSxcbiAgICAgICAge31cbiAgICAgICk7XG4gICAgICB0aGlzLl9zZXJ2ZXIucHVibGlzaChudWxsLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJJZCkge1xuICAgICAgICAgIHJldHVybiB1c2Vycy5maW5kKHsgX2lkOiB0aGlzLnVzZXJJZCB9LCB7XG4gICAgICAgICAgICBmaWVsZHM6IHRvRmllbGRTZWxlY3RvcihfYXV0b3B1Ymxpc2hGaWVsZHMubG9nZ2VkSW5Vc2VyKSxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9LCAvKnN1cHByZXNzIGF1dG9wdWJsaXNoIHdhcm5pbmcqL3tpc19hdXRvOiB0cnVlfSk7XG5cbiAgICAgIC8vIFhYWCB0aGlzIHB1Ymxpc2ggaXMgbmVpdGhlciBkZWR1cC1hYmxlIG5vciBpcyBpdCBvcHRpbWl6ZWQgYnkgb3VyIHNwZWNpYWxcbiAgICAgIC8vIHRyZWF0bWVudCBvZiBxdWVyaWVzIG9uIGEgc3BlY2lmaWMgX2lkLiBUaGVyZWZvcmUgdGhpcyB3aWxsIGhhdmUgTyhuXjIpXG4gICAgICAvLyBydW4tdGltZSBwZXJmb3JtYW5jZSBldmVyeSB0aW1lIGEgdXNlciBkb2N1bWVudCBpcyBjaGFuZ2VkIChlZyBzb21lb25lXG4gICAgICAvLyBsb2dnaW5nIGluKS4gSWYgdGhpcyBpcyBhIHByb2JsZW0sIHdlIGNhbiBpbnN0ZWFkIHdyaXRlIGEgbWFudWFsIHB1Ymxpc2hcbiAgICAgIC8vIGZ1bmN0aW9uIHdoaWNoIGZpbHRlcnMgb3V0IGZpZWxkcyBiYXNlZCBvbiAndGhpcy51c2VySWQnLlxuICAgICAgdGhpcy5fc2VydmVyLnB1Ymxpc2gobnVsbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMudXNlcklkID8geyBfaWQ6IHsgJG5lOiB0aGlzLnVzZXJJZCB9IH0gOiB7fTtcbiAgICAgICAgcmV0dXJuIHVzZXJzLmZpbmQoc2VsZWN0b3IsIHtcbiAgICAgICAgICBmaWVsZHM6IHRvRmllbGRTZWxlY3RvcihfYXV0b3B1Ymxpc2hGaWVsZHMub3RoZXJVc2VycyksXG4gICAgICAgIH0pXG4gICAgICB9LCAvKnN1cHByZXNzIGF1dG9wdWJsaXNoIHdhcm5pbmcqL3tpc19hdXRvOiB0cnVlfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGZpZWxkcyBvciBzdWJmaWVsZHMgdG8gYmUgYXV0b21hdGljYWxseVxuICAvLyBwdWJsaXNoZWQgaWYgYXV0b3B1Ymxpc2ggaXMgb24uIE11c3QgYmUgY2FsbGVkIGZyb20gdG9wLWxldmVsXG4gIC8vIGNvZGUgKGllLCBiZWZvcmUgTWV0ZW9yLnN0YXJ0dXAgaG9va3MgcnVuKS5cbiAgLy9cbiAgLy8gQHBhcmFtIG9wdHMge09iamVjdH0gd2l0aDpcbiAgLy8gICAtIGZvckxvZ2dlZEluVXNlciB7QXJyYXl9IEFycmF5IG9mIGZpZWxkcyBwdWJsaXNoZWQgdG8gdGhlIGxvZ2dlZC1pbiB1c2VyXG4gIC8vICAgLSBmb3JPdGhlclVzZXJzIHtBcnJheX0gQXJyYXkgb2YgZmllbGRzIHB1Ymxpc2hlZCB0byB1c2VycyB0aGF0IGFyZW4ndCBsb2dnZWQgaW5cbiAgYWRkQXV0b3B1Ymxpc2hGaWVsZHMob3B0cykge1xuICAgIHRoaXMuX2F1dG9wdWJsaXNoRmllbGRzLmxvZ2dlZEluVXNlci5wdXNoLmFwcGx5KFxuICAgICAgdGhpcy5fYXV0b3B1Ymxpc2hGaWVsZHMubG9nZ2VkSW5Vc2VyLCBvcHRzLmZvckxvZ2dlZEluVXNlcik7XG4gICAgdGhpcy5fYXV0b3B1Ymxpc2hGaWVsZHMub3RoZXJVc2Vycy5wdXNoLmFwcGx5KFxuICAgICAgdGhpcy5fYXV0b3B1Ymxpc2hGaWVsZHMub3RoZXJVc2Vycywgb3B0cy5mb3JPdGhlclVzZXJzKTtcbiAgfTtcblxuICAvLy9cbiAgLy8vIEFDQ09VTlQgREFUQVxuICAvLy9cblxuICAvLyBIQUNLOiBUaGlzIGlzIHVzZWQgYnkgJ21ldGVvci1hY2NvdW50cycgdG8gZ2V0IHRoZSBsb2dpblRva2VuIGZvciBhXG4gIC8vIGNvbm5lY3Rpb24uIE1heWJlIHRoZXJlIHNob3VsZCBiZSBhIHB1YmxpYyB3YXkgdG8gZG8gdGhhdC5cbiAgX2dldEFjY291bnREYXRhKGNvbm5lY3Rpb25JZCwgZmllbGQpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5fYWNjb3VudERhdGFbY29ubmVjdGlvbklkXTtcbiAgICByZXR1cm4gZGF0YSAmJiBkYXRhW2ZpZWxkXTtcbiAgfTtcblxuICBfc2V0QWNjb3VudERhdGEoY29ubmVjdGlvbklkLCBmaWVsZCwgdmFsdWUpIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5fYWNjb3VudERhdGFbY29ubmVjdGlvbklkXTtcblxuICAgIC8vIHNhZmV0eSBiZWx0LiBzaG91bGRuJ3QgaGFwcGVuLiBhY2NvdW50RGF0YSBpcyBzZXQgaW4gb25Db25uZWN0aW9uLFxuICAgIC8vIHdlIGRvbid0IGhhdmUgYSBjb25uZWN0aW9uSWQgdW50aWwgaXQgaXMgc2V0LlxuICAgIGlmICghZGF0YSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgZGVsZXRlIGRhdGFbZmllbGRdO1xuICAgIGVsc2VcbiAgICAgIGRhdGFbZmllbGRdID0gdmFsdWU7XG4gIH07XG5cbiAgLy8vXG4gIC8vLyBSRUNPTk5FQ1QgVE9LRU5TXG4gIC8vL1xuICAvLy8gc3VwcG9ydCByZWNvbm5lY3RpbmcgdXNpbmcgYSBtZXRlb3IgbG9naW4gdG9rZW5cblxuICBfaGFzaExvZ2luVG9rZW4obG9naW5Ub2tlbikge1xuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2Jyk7XG4gICAgaGFzaC51cGRhdGUobG9naW5Ub2tlbik7XG4gICAgcmV0dXJuIGhhc2guZGlnZXN0KCdiYXNlNjQnKTtcbiAgfTtcblxuICAvLyB7dG9rZW4sIHdoZW59ID0+IHtoYXNoZWRUb2tlbiwgd2hlbn1cbiAgX2hhc2hTdGFtcGVkVG9rZW4oc3RhbXBlZFRva2VuKSB7XG4gICAgY29uc3QgeyB0b2tlbiwgLi4uaGFzaGVkU3RhbXBlZFRva2VuIH0gPSBzdGFtcGVkVG9rZW47XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmhhc2hlZFN0YW1wZWRUb2tlbixcbiAgICAgIGhhc2hlZFRva2VuOiB0aGlzLl9oYXNoTG9naW5Ub2tlbih0b2tlbilcbiAgICB9O1xuICB9O1xuXG4gIC8vIFVzaW5nICRhZGRUb1NldCBhdm9pZHMgZ2V0dGluZyBhbiBpbmRleCBlcnJvciBpZiBhbm90aGVyIGNsaWVudFxuICAvLyBsb2dnaW5nIGluIHNpbXVsdGFuZW91c2x5IGhhcyBhbHJlYWR5IGluc2VydGVkIHRoZSBuZXcgaGFzaGVkXG4gIC8vIHRva2VuLlxuICBfaW5zZXJ0SGFzaGVkTG9naW5Ub2tlbih1c2VySWQsIGhhc2hlZFRva2VuLCBxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcXVlcnkgPyB7IC4uLnF1ZXJ5IH0gOiB7fTtcbiAgICBxdWVyeS5faWQgPSB1c2VySWQ7XG4gICAgdGhpcy51c2Vycy51cGRhdGUocXVlcnksIHtcbiAgICAgICRhZGRUb1NldDoge1xuICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiBoYXNoZWRUb2tlblxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIEV4cG9ydGVkIGZvciB0ZXN0cy5cbiAgX2luc2VydExvZ2luVG9rZW4odXNlcklkLCBzdGFtcGVkVG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5faW5zZXJ0SGFzaGVkTG9naW5Ub2tlbihcbiAgICAgIHVzZXJJZCxcbiAgICAgIHRoaXMuX2hhc2hTdGFtcGVkVG9rZW4oc3RhbXBlZFRva2VuKSxcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgfTtcblxuICBfY2xlYXJBbGxMb2dpblRva2Vucyh1c2VySWQpIHtcbiAgICB0aGlzLnVzZXJzLnVwZGF0ZSh1c2VySWQsIHtcbiAgICAgICRzZXQ6IHtcbiAgICAgICAgJ3NlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucyc6IFtdXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gdGVzdCBob29rXG4gIF9nZXRVc2VyT2JzZXJ2ZShjb25uZWN0aW9uSWQpIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbklkXTtcbiAgfTtcblxuICAvLyBDbGVhbiB1cCB0aGlzIGNvbm5lY3Rpb24ncyBhc3NvY2lhdGlvbiB3aXRoIHRoZSB0b2tlbjogdGhhdCBpcywgc3RvcFxuICAvLyB0aGUgb2JzZXJ2ZSB0aGF0IHdlIHN0YXJ0ZWQgd2hlbiB3ZSBhc3NvY2lhdGVkIHRoZSBjb25uZWN0aW9uIHdpdGhcbiAgLy8gdGhpcyB0b2tlbi5cbiAgX3JlbW92ZVRva2VuRnJvbUNvbm5lY3Rpb24oY29ubmVjdGlvbklkKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKHRoaXMuX3VzZXJPYnNlcnZlc0ZvckNvbm5lY3Rpb25zLCBjb25uZWN0aW9uSWQpKSB7XG4gICAgICBjb25zdCBvYnNlcnZlID0gdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbklkXTtcbiAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gV2UncmUgaW4gdGhlIHByb2Nlc3Mgb2Ygc2V0dGluZyB1cCBhbiBvYnNlcnZlIGZvciB0aGlzIGNvbm5lY3Rpb24uIFdlXG4gICAgICAgIC8vIGNhbid0IGNsZWFuIHVwIHRoYXQgb2JzZXJ2ZSB5ZXQsIGJ1dCBpZiB3ZSBkZWxldGUgdGhlIHBsYWNlaG9sZGVyIGZvclxuICAgICAgICAvLyB0aGlzIGNvbm5lY3Rpb24sIHRoZW4gdGhlIG9ic2VydmUgd2lsbCBnZXQgY2xlYW5lZCB1cCBhcyBzb29uIGFzIGl0IGhhc1xuICAgICAgICAvLyBiZWVuIHNldCB1cC5cbiAgICAgICAgZGVsZXRlIHRoaXMuX3VzZXJPYnNlcnZlc0ZvckNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25JZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbklkXTtcbiAgICAgICAgb2JzZXJ2ZS5zdG9wKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9nZXRMb2dpblRva2VuKGNvbm5lY3Rpb25JZCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRBY2NvdW50RGF0YShjb25uZWN0aW9uSWQsICdsb2dpblRva2VuJyk7XG4gIH07XG5cbiAgLy8gbmV3VG9rZW4gaXMgYSBoYXNoZWQgdG9rZW4uXG4gIF9zZXRMb2dpblRva2VuKHVzZXJJZCwgY29ubmVjdGlvbiwgbmV3VG9rZW4pIHtcbiAgICB0aGlzLl9yZW1vdmVUb2tlbkZyb21Db25uZWN0aW9uKGNvbm5lY3Rpb24uaWQpO1xuICAgIHRoaXMuX3NldEFjY291bnREYXRhKGNvbm5lY3Rpb24uaWQsICdsb2dpblRva2VuJywgbmV3VG9rZW4pO1xuXG4gICAgaWYgKG5ld1Rva2VuKSB7XG4gICAgICAvLyBTZXQgdXAgYW4gb2JzZXJ2ZSBmb3IgdGhpcyB0b2tlbi4gSWYgdGhlIHRva2VuIGdvZXMgYXdheSwgd2UgbmVlZFxuICAgICAgLy8gdG8gY2xvc2UgdGhlIGNvbm5lY3Rpb24uICBXZSBkZWZlciB0aGUgb2JzZXJ2ZSBiZWNhdXNlIHRoZXJlJ3NcbiAgICAgIC8vIG5vIG5lZWQgZm9yIGl0IHRvIGJlIG9uIHRoZSBjcml0aWNhbCBwYXRoIGZvciBsb2dpbjsgd2UganVzdCBuZWVkXG4gICAgICAvLyB0byBlbnN1cmUgdGhhdCB0aGUgY29ubmVjdGlvbiB3aWxsIGdldCBjbG9zZWQgYXQgc29tZSBwb2ludCBpZlxuICAgICAgLy8gdGhlIHRva2VuIGdldHMgZGVsZXRlZC5cbiAgICAgIC8vXG4gICAgICAvLyBJbml0aWFsbHksIHdlIHNldCB0aGUgb2JzZXJ2ZSBmb3IgdGhpcyBjb25uZWN0aW9uIHRvIGEgbnVtYmVyOyB0aGlzXG4gICAgICAvLyBzaWduaWZpZXMgdG8gb3RoZXIgY29kZSAod2hpY2ggbWlnaHQgcnVuIHdoaWxlIHdlIHlpZWxkKSB0aGF0IHdlIGFyZSBpblxuICAgICAgLy8gdGhlIHByb2Nlc3Mgb2Ygc2V0dGluZyB1cCBhbiBvYnNlcnZlIGZvciB0aGlzIGNvbm5lY3Rpb24uIE9uY2UgdGhlXG4gICAgICAvLyBvYnNlcnZlIGlzIHJlYWR5IHRvIGdvLCB3ZSByZXBsYWNlIHRoZSBudW1iZXIgd2l0aCB0aGUgcmVhbCBvYnNlcnZlXG4gICAgICAvLyBoYW5kbGUgKHVubGVzcyB0aGUgcGxhY2Vob2xkZXIgaGFzIGJlZW4gZGVsZXRlZCBvciByZXBsYWNlZCBieSBhXG4gICAgICAvLyBkaWZmZXJlbnQgcGxhY2Vob2xkIG51bWJlciwgc2lnbmlmeWluZyB0aGF0IHRoZSBjb25uZWN0aW9uIHdhcyBjbG9zZWRcbiAgICAgIC8vIGFscmVhZHkgLS0gaW4gdGhpcyBjYXNlIHdlIGp1c3QgY2xlYW4gdXAgdGhlIG9ic2VydmUgdGhhdCB3ZSBzdGFydGVkKS5cbiAgICAgIGNvbnN0IG15T2JzZXJ2ZU51bWJlciA9ICsrdGhpcy5fbmV4dFVzZXJPYnNlcnZlTnVtYmVyO1xuICAgICAgdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbi5pZF0gPSBteU9ic2VydmVOdW1iZXI7XG4gICAgICBNZXRlb3IuZGVmZXIoKCkgPT4ge1xuICAgICAgICAvLyBJZiBzb21ldGhpbmcgZWxzZSBoYXBwZW5lZCBvbiB0aGlzIGNvbm5lY3Rpb24gaW4gdGhlIG1lYW50aW1lIChpdCBnb3RcbiAgICAgICAgLy8gY2xvc2VkLCBvciBhbm90aGVyIGNhbGwgdG8gX3NldExvZ2luVG9rZW4gaGFwcGVuZWQpLCBqdXN0IGRvXG4gICAgICAgIC8vIG5vdGhpbmcuIFdlIGRvbid0IG5lZWQgdG8gc3RhcnQgYW4gb2JzZXJ2ZSBmb3IgYW4gb2xkIGNvbm5lY3Rpb24gb3Igb2xkXG4gICAgICAgIC8vIHRva2VuLlxuICAgICAgICBpZiAodGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbi5pZF0gIT09IG15T2JzZXJ2ZU51bWJlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZE1hdGNoaW5nVXNlcjtcbiAgICAgICAgLy8gQmVjYXVzZSB3ZSB1cGdyYWRlIHVuaGFzaGVkIGxvZ2luIHRva2VucyB0byBoYXNoZWQgdG9rZW5zIGF0XG4gICAgICAgIC8vIGxvZ2luIHRpbWUsIHNlc3Npb25zIHdpbGwgb25seSBiZSBsb2dnZWQgaW4gd2l0aCBhIGhhc2hlZFxuICAgICAgICAvLyB0b2tlbi4gVGh1cyB3ZSBvbmx5IG5lZWQgdG8gb2JzZXJ2ZSBoYXNoZWQgdG9rZW5zIGhlcmUuXG4gICAgICAgIGNvbnN0IG9ic2VydmUgPSB0aGlzLnVzZXJzLmZpbmQoe1xuICAgICAgICAgIF9pZDogdXNlcklkLFxuICAgICAgICAgICdzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuaGFzaGVkVG9rZW4nOiBuZXdUb2tlblxuICAgICAgICB9LCB7IGZpZWxkczogeyBfaWQ6IDEgfSB9KS5vYnNlcnZlQ2hhbmdlcyh7XG4gICAgICAgICAgYWRkZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIGZvdW5kTWF0Y2hpbmdVc2VyID0gdHJ1ZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZWQ6IGNvbm5lY3Rpb24uY2xvc2UsXG4gICAgICAgICAgLy8gVGhlIG9uQ2xvc2UgY2FsbGJhY2sgZm9yIHRoZSBjb25uZWN0aW9uIHRha2VzIGNhcmUgb2ZcbiAgICAgICAgICAvLyBjbGVhbmluZyB1cCB0aGUgb2JzZXJ2ZSBoYW5kbGUgYW5kIGFueSBvdGhlciBzdGF0ZSB3ZSBoYXZlXG4gICAgICAgICAgLy8gbHlpbmcgYXJvdW5kLlxuICAgICAgICB9LCB7IG5vbk11dGF0aW5nQ2FsbGJhY2tzOiB0cnVlIH0pO1xuXG4gICAgICAgIC8vIElmIHRoZSB1c2VyIHJhbiBhbm90aGVyIGxvZ2luIG9yIGxvZ291dCBjb21tYW5kIHdlIHdlcmUgd2FpdGluZyBmb3IgdGhlXG4gICAgICAgIC8vIGRlZmVyIG9yIGFkZGVkIHRvIGZpcmUgKGllLCBhbm90aGVyIGNhbGwgdG8gX3NldExvZ2luVG9rZW4gb2NjdXJyZWQpLFxuICAgICAgICAvLyB0aGVuIHdlIGxldCB0aGUgbGF0ZXIgb25lIHdpbiAoc3RhcnQgYW4gb2JzZXJ2ZSwgZXRjKSBhbmQganVzdCBzdG9wIG91clxuICAgICAgICAvLyBvYnNlcnZlIG5vdy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2ltaWxhcmx5LCBpZiB0aGUgY29ubmVjdGlvbiB3YXMgYWxyZWFkeSBjbG9zZWQsIHRoZW4gdGhlIG9uQ2xvc2VcbiAgICAgICAgLy8gY2FsbGJhY2sgd291bGQgaGF2ZSBjYWxsZWQgX3JlbW92ZVRva2VuRnJvbUNvbm5lY3Rpb24gYW5kIHRoZXJlIHdvbid0XG4gICAgICAgIC8vIGJlIGFuIGVudHJ5IGluIF91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9ucy4gV2UgY2FuIHN0b3AgdGhlIG9ic2VydmUuXG4gICAgICAgIGlmICh0aGlzLl91c2VyT2JzZXJ2ZXNGb3JDb25uZWN0aW9uc1tjb25uZWN0aW9uLmlkXSAhPT0gbXlPYnNlcnZlTnVtYmVyKSB7XG4gICAgICAgICAgb2JzZXJ2ZS5zdG9wKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXNlck9ic2VydmVzRm9yQ29ubmVjdGlvbnNbY29ubmVjdGlvbi5pZF0gPSBvYnNlcnZlO1xuXG4gICAgICAgIGlmICghIGZvdW5kTWF0Y2hpbmdVc2VyKSB7XG4gICAgICAgICAgLy8gV2UndmUgc2V0IHVwIGFuIG9ic2VydmUgb24gdGhlIHVzZXIgYXNzb2NpYXRlZCB3aXRoIGBuZXdUb2tlbmAsXG4gICAgICAgICAgLy8gc28gaWYgdGhlIG5ldyB0b2tlbiBpcyByZW1vdmVkIGZyb20gdGhlIGRhdGFiYXNlLCB3ZSdsbCBjbG9zZVxuICAgICAgICAgIC8vIHRoZSBjb25uZWN0aW9uLiBCdXQgdGhlIHRva2VuIG1pZ2h0IGhhdmUgYWxyZWFkeSBiZWVuIGRlbGV0ZWRcbiAgICAgICAgICAvLyBiZWZvcmUgd2Ugc2V0IHVwIHRoZSBvYnNlcnZlLCB3aGljaCB3b3VsZG4ndCBoYXZlIGNsb3NlZCB0aGVcbiAgICAgICAgICAvLyBjb25uZWN0aW9uIGJlY2F1c2UgdGhlIG9ic2VydmUgd2Fzbid0IHJ1bm5pbmcgeWV0LlxuICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIChBbHNvIHVzZWQgYnkgTWV0ZW9yIEFjY291bnRzIHNlcnZlciBhbmQgdGVzdHMpLlxuICAvL1xuICBfZ2VuZXJhdGVTdGFtcGVkTG9naW5Ub2tlbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW46IFJhbmRvbS5zZWNyZXQoKSxcbiAgICAgIHdoZW46IG5ldyBEYXRlXG4gICAgfTtcbiAgfTtcblxuICAvLy9cbiAgLy8vIFRPS0VOIEVYUElSQVRJT05cbiAgLy8vXG5cbiAgLy8gRGVsZXRlcyBleHBpcmVkIHBhc3N3b3JkIHJlc2V0IHRva2VucyBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgLy9cbiAgLy8gRXhwb3J0ZWQgZm9yIHRlc3RzLiBBbHNvLCB0aGUgYXJndW1lbnRzIGFyZSBvbmx5IHVzZWQgYnlcbiAgLy8gdGVzdHMuIG9sZGVzdFZhbGlkRGF0ZSBpcyBzaW11bGF0ZSBleHBpcmluZyB0b2tlbnMgd2l0aG91dCB3YWl0aW5nXG4gIC8vIGZvciB0aGVtIHRvIGFjdHVhbGx5IGV4cGlyZS4gdXNlcklkIGlzIHVzZWQgYnkgdGVzdHMgdG8gb25seSBleHBpcmVcbiAgLy8gdG9rZW5zIGZvciB0aGUgdGVzdCB1c2VyLlxuICBfZXhwaXJlUGFzc3dvcmRSZXNldFRva2VucyhvbGRlc3RWYWxpZERhdGUsIHVzZXJJZCkge1xuICAgIGNvbnN0IHRva2VuTGlmZXRpbWVNcyA9IHRoaXMuX2dldFBhc3N3b3JkUmVzZXRUb2tlbkxpZmV0aW1lTXMoKTtcblxuICAgIC8vIHdoZW4gY2FsbGluZyBmcm9tIGEgdGVzdCB3aXRoIGV4dHJhIGFyZ3VtZW50cywgeW91IG11c3Qgc3BlY2lmeSBib3RoIVxuICAgIGlmICgob2xkZXN0VmFsaWREYXRlICYmICF1c2VySWQpIHx8ICghb2xkZXN0VmFsaWREYXRlICYmIHVzZXJJZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCB0ZXN0LiBNdXN0IHNwZWNpZnkgYm90aCBvbGRlc3RWYWxpZERhdGUgYW5kIHVzZXJJZC5cIik7XG4gICAgfVxuXG4gICAgb2xkZXN0VmFsaWREYXRlID0gb2xkZXN0VmFsaWREYXRlIHx8XG4gICAgICAobmV3IERhdGUobmV3IERhdGUoKSAtIHRva2VuTGlmZXRpbWVNcykpO1xuXG4gICAgY29uc3QgdG9rZW5GaWx0ZXIgPSB7XG4gICAgICAkb3I6IFtcbiAgICAgICAgeyBcInNlcnZpY2VzLnBhc3N3b3JkLnJlc2V0LnJlYXNvblwiOiBcInJlc2V0XCJ9LFxuICAgICAgICB7IFwic2VydmljZXMucGFzc3dvcmQucmVzZXQucmVhc29uXCI6IHskZXhpc3RzOiBmYWxzZX19XG4gICAgICBdXG4gICAgfTtcblxuICAgIGV4cGlyZVBhc3N3b3JkVG9rZW4odGhpcywgb2xkZXN0VmFsaWREYXRlLCB0b2tlbkZpbHRlciwgdXNlcklkKTtcbiAgfVxuXG4gIC8vIERlbGV0ZXMgZXhwaXJlZCBwYXNzd29yZCBlbnJvbGwgdG9rZW5zIGZyb20gdGhlIGRhdGFiYXNlLlxuICAvL1xuICAvLyBFeHBvcnRlZCBmb3IgdGVzdHMuIEFsc28sIHRoZSBhcmd1bWVudHMgYXJlIG9ubHkgdXNlZCBieVxuICAvLyB0ZXN0cy4gb2xkZXN0VmFsaWREYXRlIGlzIHNpbXVsYXRlIGV4cGlyaW5nIHRva2VucyB3aXRob3V0IHdhaXRpbmdcbiAgLy8gZm9yIHRoZW0gdG8gYWN0dWFsbHkgZXhwaXJlLiB1c2VySWQgaXMgdXNlZCBieSB0ZXN0cyB0byBvbmx5IGV4cGlyZVxuICAvLyB0b2tlbnMgZm9yIHRoZSB0ZXN0IHVzZXIuXG4gIF9leHBpcmVQYXNzd29yZEVucm9sbFRva2VucyhvbGRlc3RWYWxpZERhdGUsIHVzZXJJZCkge1xuICAgIGNvbnN0IHRva2VuTGlmZXRpbWVNcyA9IHRoaXMuX2dldFBhc3N3b3JkRW5yb2xsVG9rZW5MaWZldGltZU1zKCk7XG5cbiAgICAvLyB3aGVuIGNhbGxpbmcgZnJvbSBhIHRlc3Qgd2l0aCBleHRyYSBhcmd1bWVudHMsIHlvdSBtdXN0IHNwZWNpZnkgYm90aCFcbiAgICBpZiAoKG9sZGVzdFZhbGlkRGF0ZSAmJiAhdXNlcklkKSB8fCAoIW9sZGVzdFZhbGlkRGF0ZSAmJiB1c2VySWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgdGVzdC4gTXVzdCBzcGVjaWZ5IGJvdGggb2xkZXN0VmFsaWREYXRlIGFuZCB1c2VySWQuXCIpO1xuICAgIH1cblxuICAgIG9sZGVzdFZhbGlkRGF0ZSA9IG9sZGVzdFZhbGlkRGF0ZSB8fFxuICAgICAgKG5ldyBEYXRlKG5ldyBEYXRlKCkgLSB0b2tlbkxpZmV0aW1lTXMpKTtcblxuICAgIGNvbnN0IHRva2VuRmlsdGVyID0ge1xuICAgICAgXCJzZXJ2aWNlcy5wYXNzd29yZC5yZXNldC5yZWFzb25cIjogXCJlbnJvbGxcIlxuICAgIH07XG5cbiAgICBleHBpcmVQYXNzd29yZFRva2VuKHRoaXMsIG9sZGVzdFZhbGlkRGF0ZSwgdG9rZW5GaWx0ZXIsIHVzZXJJZCk7XG4gIH1cblxuICAvLyBEZWxldGVzIGV4cGlyZWQgdG9rZW5zIGZyb20gdGhlIGRhdGFiYXNlIGFuZCBjbG9zZXMgYWxsIG9wZW4gY29ubmVjdGlvbnNcbiAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoZXNlIHRva2Vucy5cbiAgLy9cbiAgLy8gRXhwb3J0ZWQgZm9yIHRlc3RzLiBBbHNvLCB0aGUgYXJndW1lbnRzIGFyZSBvbmx5IHVzZWQgYnlcbiAgLy8gdGVzdHMuIG9sZGVzdFZhbGlkRGF0ZSBpcyBzaW11bGF0ZSBleHBpcmluZyB0b2tlbnMgd2l0aG91dCB3YWl0aW5nXG4gIC8vIGZvciB0aGVtIHRvIGFjdHVhbGx5IGV4cGlyZS4gdXNlcklkIGlzIHVzZWQgYnkgdGVzdHMgdG8gb25seSBleHBpcmVcbiAgLy8gdG9rZW5zIGZvciB0aGUgdGVzdCB1c2VyLlxuICBfZXhwaXJlVG9rZW5zKG9sZGVzdFZhbGlkRGF0ZSwgdXNlcklkKSB7XG4gICAgY29uc3QgdG9rZW5MaWZldGltZU1zID0gdGhpcy5fZ2V0VG9rZW5MaWZldGltZU1zKCk7XG5cbiAgICAvLyB3aGVuIGNhbGxpbmcgZnJvbSBhIHRlc3Qgd2l0aCBleHRyYSBhcmd1bWVudHMsIHlvdSBtdXN0IHNwZWNpZnkgYm90aCFcbiAgICBpZiAoKG9sZGVzdFZhbGlkRGF0ZSAmJiAhdXNlcklkKSB8fCAoIW9sZGVzdFZhbGlkRGF0ZSAmJiB1c2VySWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgdGVzdC4gTXVzdCBzcGVjaWZ5IGJvdGggb2xkZXN0VmFsaWREYXRlIGFuZCB1c2VySWQuXCIpO1xuICAgIH1cblxuICAgIG9sZGVzdFZhbGlkRGF0ZSA9IG9sZGVzdFZhbGlkRGF0ZSB8fFxuICAgICAgKG5ldyBEYXRlKG5ldyBEYXRlKCkgLSB0b2tlbkxpZmV0aW1lTXMpKTtcbiAgICBjb25zdCB1c2VyRmlsdGVyID0gdXNlcklkID8ge19pZDogdXNlcklkfSA6IHt9O1xuXG5cbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoIG9sZGVyIHZlcnNpb25zIG9mIG1ldGVvciB0aGF0IHN0b3JlZCBsb2dpbiB0b2tlblxuICAgIC8vIHRpbWVzdGFtcHMgYXMgbnVtYmVycy5cbiAgICB0aGlzLnVzZXJzLnVwZGF0ZSh7IC4uLnVzZXJGaWx0ZXIsXG4gICAgICAkb3I6IFtcbiAgICAgICAgeyBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy53aGVuXCI6IHsgJGx0OiBvbGRlc3RWYWxpZERhdGUgfSB9LFxuICAgICAgICB7IFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLndoZW5cIjogeyAkbHQ6ICtvbGRlc3RWYWxpZERhdGUgfSB9XG4gICAgICBdXG4gICAgfSwge1xuICAgICAgJHB1bGw6IHtcbiAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnNcIjoge1xuICAgICAgICAgICRvcjogW1xuICAgICAgICAgICAgeyB3aGVuOiB7ICRsdDogb2xkZXN0VmFsaWREYXRlIH0gfSxcbiAgICAgICAgICAgIHsgd2hlbjogeyAkbHQ6ICtvbGRlc3RWYWxpZERhdGUgfSB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgeyBtdWx0aTogdHJ1ZSB9KTtcbiAgICAvLyBUaGUgb2JzZXJ2ZSBvbiBNZXRlb3IudXNlcnMgd2lsbCB0YWtlIGNhcmUgb2YgY2xvc2luZyBjb25uZWN0aW9ucyBmb3JcbiAgICAvLyBleHBpcmVkIHRva2Vucy5cbiAgfTtcblxuICAvLyBAb3ZlcnJpZGUgZnJvbSBhY2NvdW50c19jb21tb24uanNcbiAgY29uZmlnKG9wdGlvbnMpIHtcbiAgICAvLyBDYWxsIHRoZSBvdmVycmlkZGVuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBtZXRob2QuXG4gICAgY29uc3Qgc3VwZXJSZXN1bHQgPSBBY2NvdW50c0NvbW1vbi5wcm90b3R5cGUuY29uZmlnLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBJZiB0aGUgdXNlciBzZXQgbG9naW5FeHBpcmF0aW9uSW5EYXlzIHRvIG51bGwsIHRoZW4gd2UgbmVlZCB0byBjbGVhciB0aGVcbiAgICAvLyB0aW1lciB0aGF0IHBlcmlvZGljYWxseSBleHBpcmVzIHRva2Vucy5cbiAgICBpZiAoaGFzT3duLmNhbGwodGhpcy5fb3B0aW9ucywgJ2xvZ2luRXhwaXJhdGlvbkluRGF5cycpICYmXG4gICAgICB0aGlzLl9vcHRpb25zLmxvZ2luRXhwaXJhdGlvbkluRGF5cyA9PT0gbnVsbCAmJlxuICAgICAgdGhpcy5leHBpcmVUb2tlbkludGVydmFsKSB7XG4gICAgICBNZXRlb3IuY2xlYXJJbnRlcnZhbCh0aGlzLmV4cGlyZVRva2VuSW50ZXJ2YWwpO1xuICAgICAgdGhpcy5leHBpcmVUb2tlbkludGVydmFsID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXJSZXN1bHQ7XG4gIH07XG5cbiAgLy8gQ2FsbGVkIGJ5IGFjY291bnRzLXBhc3N3b3JkXG4gIGluc2VydFVzZXJEb2Mob3B0aW9ucywgdXNlcikge1xuICAgIC8vIC0gY2xvbmUgdXNlciBkb2N1bWVudCwgdG8gcHJvdGVjdCBmcm9tIG1vZGlmaWNhdGlvblxuICAgIC8vIC0gYWRkIGNyZWF0ZWRBdCB0aW1lc3RhbXBcbiAgICAvLyAtIHByZXBhcmUgYW4gX2lkLCBzbyB0aGF0IHlvdSBjYW4gbW9kaWZ5IG90aGVyIGNvbGxlY3Rpb25zIChlZ1xuICAgIC8vIGNyZWF0ZSBhIGZpcnN0IHRhc2sgZm9yIGV2ZXJ5IG5ldyB1c2VyKVxuICAgIC8vXG4gICAgLy8gWFhYIElmIHRoZSBvbkNyZWF0ZVVzZXIgb3IgdmFsaWRhdGVOZXdVc2VyIGhvb2tzIGZhaWwsIHdlIG1pZ2h0XG4gICAgLy8gZW5kIHVwIGhhdmluZyBtb2RpZmllZCBzb21lIG90aGVyIGNvbGxlY3Rpb25cbiAgICAvLyBpbmFwcHJvcHJpYXRlbHkuIFRoZSBzb2x1dGlvbiBpcyBwcm9iYWJseSB0byBoYXZlIG9uQ3JlYXRlVXNlclxuICAgIC8vIGFjY2VwdCB0d28gY2FsbGJhY2tzIC0gb25lIHRoYXQgZ2V0cyBjYWxsZWQgYmVmb3JlIGluc2VydGluZ1xuICAgIC8vIHRoZSB1c2VyIGRvY3VtZW50IChpbiB3aGljaCB5b3UgY2FuIG1vZGlmeSBpdHMgY29udGVudHMpLCBhbmRcbiAgICAvLyBvbmUgdGhhdCBnZXRzIGNhbGxlZCBhZnRlciAoaW4gd2hpY2ggeW91IHNob3VsZCBjaGFuZ2Ugb3RoZXJcbiAgICAvLyBjb2xsZWN0aW9ucylcbiAgICB1c2VyID0ge1xuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgX2lkOiBSYW5kb20uaWQoKSxcbiAgICAgIC4uLnVzZXIsXG4gICAgfTtcblxuICAgIGlmICh1c2VyLnNlcnZpY2VzKSB7XG4gICAgICBPYmplY3Qua2V5cyh1c2VyLnNlcnZpY2VzKS5mb3JFYWNoKHNlcnZpY2UgPT5cbiAgICAgICAgcGluRW5jcnlwdGVkRmllbGRzVG9Vc2VyKHVzZXIuc2VydmljZXNbc2VydmljZV0sIHVzZXIuX2lkKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgZnVsbFVzZXI7XG4gICAgaWYgKHRoaXMuX29uQ3JlYXRlVXNlckhvb2spIHtcbiAgICAgIGZ1bGxVc2VyID0gdGhpcy5fb25DcmVhdGVVc2VySG9vayhvcHRpb25zLCB1c2VyKTtcblxuICAgICAgLy8gVGhpcyBpcyAqbm90KiBwYXJ0IG9mIHRoZSBBUEkuIFdlIG5lZWQgdGhpcyBiZWNhdXNlIHdlIGNhbid0IGlzb2xhdGVcbiAgICAgIC8vIHRoZSBnbG9iYWwgc2VydmVyIGVudmlyb25tZW50IGJldHdlZW4gdGVzdHMsIG1lYW5pbmcgd2UgY2FuJ3QgdGVzdFxuICAgICAgLy8gYm90aCBoYXZpbmcgYSBjcmVhdGUgdXNlciBob29rIHNldCBhbmQgbm90IGhhdmluZyBvbmUgc2V0LlxuICAgICAgaWYgKGZ1bGxVc2VyID09PSAnVEVTVCBERUZBVUxUIEhPT0snKVxuICAgICAgICBmdWxsVXNlciA9IGRlZmF1bHRDcmVhdGVVc2VySG9vayhvcHRpb25zLCB1c2VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsbFVzZXIgPSBkZWZhdWx0Q3JlYXRlVXNlckhvb2sob3B0aW9ucywgdXNlcik7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsaWRhdGVOZXdVc2VySG9va3MuZm9yRWFjaChob29rID0+IHtcbiAgICAgIGlmICghIGhvb2soZnVsbFVzZXIpKVxuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJVc2VyIHZhbGlkYXRpb24gZmFpbGVkXCIpO1xuICAgIH0pO1xuXG4gICAgbGV0IHVzZXJJZDtcbiAgICB0cnkge1xuICAgICAgdXNlcklkID0gdGhpcy51c2Vycy5pbnNlcnQoZnVsbFVzZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFhYWCBzdHJpbmcgcGFyc2luZyBzdWNrcywgbWF5YmVcbiAgICAgIC8vIGh0dHBzOi8vamlyYS5tb25nb2RiLm9yZy9icm93c2UvU0VSVkVSLTMwNjkgd2lsbCBnZXQgZml4ZWQgb25lIGRheVxuICAgICAgaWYgKCFlLmVycm1zZykgdGhyb3cgZTtcbiAgICAgIGlmIChlLmVycm1zZy5pbmNsdWRlcygnZW1haWxzLmFkZHJlc3MnKSlcbiAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiRW1haWwgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgaWYgKGUuZXJybXNnLmluY2x1ZGVzKCd1c2VybmFtZScpKVxuICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJVc2VybmFtZSBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICByZXR1cm4gdXNlcklkO1xuICB9O1xuXG4gIC8vIEhlbHBlciBmdW5jdGlvbjogcmV0dXJucyBmYWxzZSBpZiBlbWFpbCBkb2VzIG5vdCBtYXRjaCBjb21wYW55IGRvbWFpbiBmcm9tXG4gIC8vIHRoZSBjb25maWd1cmF0aW9uLlxuICBfdGVzdEVtYWlsRG9tYWluKGVtYWlsKSB7XG4gICAgY29uc3QgZG9tYWluID0gdGhpcy5fb3B0aW9ucy5yZXN0cmljdENyZWF0aW9uQnlFbWFpbERvbWFpbjtcblxuICAgIHJldHVybiAhZG9tYWluIHx8XG4gICAgICAodHlwZW9mIGRvbWFpbiA9PT0gJ2Z1bmN0aW9uJyAmJiBkb21haW4oZW1haWwpKSB8fFxuICAgICAgKHR5cGVvZiBkb21haW4gPT09ICdzdHJpbmcnICYmXG4gICAgICAgIChuZXcgUmVnRXhwKGBAJHtNZXRlb3IuX2VzY2FwZVJlZ0V4cChkb21haW4pfSRgLCAnaScpKS50ZXN0KGVtYWlsKSk7XG4gIH07XG5cbiAgLy8vXG4gIC8vLyBDTEVBTiBVUCBGT1IgYGxvZ291dE90aGVyQ2xpZW50c2BcbiAgLy8vXG5cbiAgX2RlbGV0ZVNhdmVkVG9rZW5zRm9yVXNlcih1c2VySWQsIHRva2Vuc1RvRGVsZXRlKSB7XG4gICAgaWYgKHRva2Vuc1RvRGVsZXRlKSB7XG4gICAgICB0aGlzLnVzZXJzLnVwZGF0ZSh1c2VySWQsIHtcbiAgICAgICAgJHVuc2V0OiB7XG4gICAgICAgICAgXCJzZXJ2aWNlcy5yZXN1bWUuaGF2ZUxvZ2luVG9rZW5zVG9EZWxldGVcIjogMSxcbiAgICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1RvRGVsZXRlXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgJHB1bGxBbGw6IHtcbiAgICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiB0b2tlbnNUb0RlbGV0ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX2RlbGV0ZVNhdmVkVG9rZW5zRm9yQWxsVXNlcnNPblN0YXJ0dXAoKSB7XG4gICAgLy8gSWYgd2UgZmluZCB1c2VycyB3aG8gaGF2ZSBzYXZlZCB0b2tlbnMgdG8gZGVsZXRlIG9uIHN0YXJ0dXAsIGRlbGV0ZVxuICAgIC8vIHRoZW0gbm93LiBJdCdzIHBvc3NpYmxlIHRoYXQgdGhlIHNlcnZlciBjb3VsZCBoYXZlIGNyYXNoZWQgYW5kIGNvbWVcbiAgICAvLyBiYWNrIHVwIGJlZm9yZSBuZXcgdG9rZW5zIGFyZSBmb3VuZCBpbiBsb2NhbFN0b3JhZ2UsIGJ1dCB0aGlzXG4gICAgLy8gc2hvdWxkbid0IGhhcHBlbiB2ZXJ5IG9mdGVuLiBXZSBzaG91bGRuJ3QgcHV0IGEgZGVsYXkgaGVyZSBiZWNhdXNlXG4gICAgLy8gdGhhdCB3b3VsZCBnaXZlIGEgbG90IG9mIHBvd2VyIHRvIGFuIGF0dGFja2VyIHdpdGggYSBzdG9sZW4gbG9naW5cbiAgICAvLyB0b2tlbiBhbmQgdGhlIGFiaWxpdHkgdG8gY3Jhc2ggdGhlIHNlcnZlci5cbiAgICBNZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gICAgICB0aGlzLnVzZXJzLmZpbmQoe1xuICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5oYXZlTG9naW5Ub2tlbnNUb0RlbGV0ZVwiOiB0cnVlXG4gICAgICB9LCB7ZmllbGRzOiB7XG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zVG9EZWxldGVcIjogMVxuICAgICAgfX0pLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgIHRoaXMuX2RlbGV0ZVNhdmVkVG9rZW5zRm9yVXNlcihcbiAgICAgICAgICB1c2VyLl9pZCxcbiAgICAgICAgICB1c2VyLnNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1RvRGVsZXRlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLy9cbiAgLy8vIE1BTkFHSU5HIFVTRVIgT0JKRUNUU1xuICAvLy9cblxuICAvLyBVcGRhdGVzIG9yIGNyZWF0ZXMgYSB1c2VyIGFmdGVyIHdlIGF1dGhlbnRpY2F0ZSB3aXRoIGEgM3JkIHBhcnR5LlxuICAvL1xuICAvLyBAcGFyYW0gc2VydmljZU5hbWUge1N0cmluZ30gU2VydmljZSBuYW1lIChlZywgdHdpdHRlcikuXG4gIC8vIEBwYXJhbSBzZXJ2aWNlRGF0YSB7T2JqZWN0fSBEYXRhIHRvIHN0b3JlIGluIHRoZSB1c2VyJ3MgcmVjb3JkXG4gIC8vICAgICAgICB1bmRlciBzZXJ2aWNlc1tzZXJ2aWNlTmFtZV0uIE11c3QgaW5jbHVkZSBhbiBcImlkXCIgZmllbGRcbiAgLy8gICAgICAgIHdoaWNoIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyIGluIHRoZSBzZXJ2aWNlLlxuICAvLyBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0LCBvcHRpb25hbH0gT3RoZXIgb3B0aW9ucyB0byBwYXNzIHRvIGluc2VydFVzZXJEb2NcbiAgLy8gICAgICAgIChlZywgcHJvZmlsZSlcbiAgLy8gQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggdG9rZW4gYW5kIGlkIGtleXMsIGxpa2UgdGhlIHJlc3VsdFxuICAvLyAgICAgICAgb2YgdGhlIFwibG9naW5cIiBtZXRob2QuXG4gIC8vXG4gIHVwZGF0ZU9yQ3JlYXRlVXNlckZyb21FeHRlcm5hbFNlcnZpY2UoXG4gICAgc2VydmljZU5hbWUsXG4gICAgc2VydmljZURhdGEsXG4gICAgb3B0aW9uc1xuICApIHtcbiAgICBvcHRpb25zID0geyAuLi5vcHRpb25zIH07XG5cbiAgICBpZiAoc2VydmljZU5hbWUgPT09IFwicGFzc3dvcmRcIiB8fCBzZXJ2aWNlTmFtZSA9PT0gXCJyZXN1bWVcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbid0IHVzZSB1cGRhdGVPckNyZWF0ZVVzZXJGcm9tRXh0ZXJuYWxTZXJ2aWNlIHdpdGggaW50ZXJuYWwgc2VydmljZSBcIlxuICAgICAgICArIHNlcnZpY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKCFoYXNPd24uY2FsbChzZXJ2aWNlRGF0YSwgJ2lkJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNlcnZpY2UgZGF0YSBmb3Igc2VydmljZSAke3NlcnZpY2VOYW1lfSBtdXN0IGluY2x1ZGUgaWRgKTtcbiAgICB9XG5cbiAgICAvLyBMb29rIGZvciBhIHVzZXIgd2l0aCB0aGUgYXBwcm9wcmlhdGUgc2VydmljZSB1c2VyIGlkLlxuICAgIGNvbnN0IHNlbGVjdG9yID0ge307XG4gICAgY29uc3Qgc2VydmljZUlkS2V5ID0gYHNlcnZpY2VzLiR7c2VydmljZU5hbWV9LmlkYDtcblxuICAgIC8vIFhYWCBUZW1wb3Jhcnkgc3BlY2lhbCBjYXNlIGZvciBUd2l0dGVyLiAoSXNzdWUgIzYyOSlcbiAgICAvLyAgIFRoZSBzZXJ2aWNlRGF0YS5pZCB3aWxsIGJlIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGFuIGludGVnZXIuXG4gICAgLy8gICBXZSB3YW50IGl0IHRvIG1hdGNoIGVpdGhlciBhIHN0b3JlZCBzdHJpbmcgb3IgaW50IHJlcHJlc2VudGF0aW9uLlxuICAgIC8vICAgVGhpcyBpcyB0byBjYXRlciB0byBlYXJsaWVyIHZlcnNpb25zIG9mIE1ldGVvciBzdG9yaW5nIHR3aXR0ZXJcbiAgICAvLyAgIHVzZXIgSURzIGluIG51bWJlciBmb3JtLCBhbmQgcmVjZW50IHZlcnNpb25zIHN0b3JpbmcgdGhlbSBhcyBzdHJpbmdzLlxuICAgIC8vICAgVGhpcyBjYW4gYmUgcmVtb3ZlZCBvbmNlIG1pZ3JhdGlvbiB0ZWNobm9sb2d5IGlzIGluIHBsYWNlLCBhbmQgdHdpdHRlclxuICAgIC8vICAgdXNlcnMgc3RvcmVkIHdpdGggaW50ZWdlciBJRHMgaGF2ZSBiZWVuIG1pZ3JhdGVkIHRvIHN0cmluZyBJRHMuXG4gICAgaWYgKHNlcnZpY2VOYW1lID09PSBcInR3aXR0ZXJcIiAmJiAhaXNOYU4oc2VydmljZURhdGEuaWQpKSB7XG4gICAgICBzZWxlY3RvcltcIiRvclwiXSA9IFt7fSx7fV07XG4gICAgICBzZWxlY3RvcltcIiRvclwiXVswXVtzZXJ2aWNlSWRLZXldID0gc2VydmljZURhdGEuaWQ7XG4gICAgICBzZWxlY3RvcltcIiRvclwiXVsxXVtzZXJ2aWNlSWRLZXldID0gcGFyc2VJbnQoc2VydmljZURhdGEuaWQsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0b3Jbc2VydmljZUlkS2V5XSA9IHNlcnZpY2VEYXRhLmlkO1xuICAgIH1cblxuICAgIGxldCB1c2VyID0gdGhpcy51c2Vycy5maW5kT25lKHNlbGVjdG9yLCB7ZmllbGRzOiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWVsZFNlbGVjdG9yfSk7XG5cbiAgICAvLyBCZWZvcmUgY29udGludWluZywgcnVuIHVzZXIgaG9vayB0byBzZWUgaWYgd2Ugc2hvdWxkIGNvbnRpbnVlXG4gICAgaWYgKHRoaXMuX2JlZm9yZUV4dGVybmFsTG9naW5Ib29rICYmICF0aGlzLl9iZWZvcmVFeHRlcm5hbExvZ2luSG9vayhzZXJ2aWNlTmFtZSwgc2VydmljZURhdGEsIHVzZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJMb2dpbiBmb3JiaWRkZW5cIik7XG4gICAgfVxuXG4gICAgLy8gV2hlbiBjcmVhdGluZyBhIG5ldyB1c2VyIHdlIHBhc3MgdGhyb3VnaCBhbGwgb3B0aW9ucy4gV2hlbiB1cGRhdGluZyBhblxuICAgIC8vIGV4aXN0aW5nIHVzZXIsIGJ5IGRlZmF1bHQgd2Ugb25seSBwcm9jZXNzL3Bhc3MgdGhyb3VnaCB0aGUgc2VydmljZURhdGFcbiAgICAvLyAoZWcsIHNvIHRoYXQgd2Uga2VlcCBhbiB1bmV4cGlyZWQgYWNjZXNzIHRva2VuIGFuZCBkb24ndCBjYWNoZSBvbGQgZW1haWxcbiAgICAvLyBhZGRyZXNzZXMgaW4gc2VydmljZURhdGEuZW1haWwpLiBUaGUgb25FeHRlcm5hbExvZ2luIGhvb2sgY2FuIGJlIHVzZWQgd2hlblxuICAgIC8vIGNyZWF0aW5nIG9yIHVwZGF0aW5nIGEgdXNlciwgdG8gbW9kaWZ5IG9yIHBhc3MgdGhyb3VnaCBtb3JlIG9wdGlvbnMgYXNcbiAgICAvLyBuZWVkZWQuXG4gICAgbGV0IG9wdHMgPSB1c2VyID8ge30gOiBvcHRpb25zO1xuICAgIGlmICh0aGlzLl9vbkV4dGVybmFsTG9naW5Ib29rKSB7XG4gICAgICBvcHRzID0gdGhpcy5fb25FeHRlcm5hbExvZ2luSG9vayhvcHRpb25zLCB1c2VyKTtcbiAgICB9XG5cbiAgICBpZiAodXNlcikge1xuICAgICAgcGluRW5jcnlwdGVkRmllbGRzVG9Vc2VyKHNlcnZpY2VEYXRhLCB1c2VyLl9pZCk7XG5cbiAgICAgIGxldCBzZXRBdHRycyA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoc2VydmljZURhdGEpLmZvckVhY2goa2V5ID0+XG4gICAgICAgIHNldEF0dHJzW2BzZXJ2aWNlcy4ke3NlcnZpY2VOYW1lfS4ke2tleX1gXSA9IHNlcnZpY2VEYXRhW2tleV1cbiAgICAgICk7XG5cbiAgICAgIC8vIFhYWCBNYXliZSB3ZSBzaG91bGQgcmUtdXNlIHRoZSBzZWxlY3RvciBhYm92ZSBhbmQgbm90aWNlIGlmIHRoZSB1cGRhdGVcbiAgICAgIC8vICAgICB0b3VjaGVzIG5vdGhpbmc/XG4gICAgICBzZXRBdHRycyA9IHsgLi4uc2V0QXR0cnMsIC4uLm9wdHMgfTtcbiAgICAgIHRoaXMudXNlcnMudXBkYXRlKHVzZXIuX2lkLCB7XG4gICAgICAgICRzZXQ6IHNldEF0dHJzXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogc2VydmljZU5hbWUsXG4gICAgICAgIHVzZXJJZDogdXNlci5faWRcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENyZWF0ZSBhIG5ldyB1c2VyIHdpdGggdGhlIHNlcnZpY2UgZGF0YS5cbiAgICAgIHVzZXIgPSB7c2VydmljZXM6IHt9fTtcbiAgICAgIHVzZXIuc2VydmljZXNbc2VydmljZU5hbWVdID0gc2VydmljZURhdGE7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBzZXJ2aWNlTmFtZSxcbiAgICAgICAgdXNlcklkOiB0aGlzLmluc2VydFVzZXJEb2Mob3B0cywgdXNlcilcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlbW92ZXMgZGVmYXVsdCByYXRlIGxpbWl0aW5nIHJ1bGVcbiAgcmVtb3ZlRGVmYXVsdFJhdGVMaW1pdCgpIHtcbiAgICBjb25zdCByZXNwID0gRERQUmF0ZUxpbWl0ZXIucmVtb3ZlUnVsZSh0aGlzLmRlZmF1bHRSYXRlTGltaXRlclJ1bGVJZCk7XG4gICAgdGhpcy5kZWZhdWx0UmF0ZUxpbWl0ZXJSdWxlSWQgPSBudWxsO1xuICAgIHJldHVybiByZXNwO1xuICB9O1xuXG4gIC8vIEFkZCBhIGRlZmF1bHQgcnVsZSBvZiBsaW1pdGluZyBsb2dpbnMsIGNyZWF0aW5nIG5ldyB1c2VycyBhbmQgcGFzc3dvcmQgcmVzZXRcbiAgLy8gdG8gNSB0aW1lcyBldmVyeSAxMCBzZWNvbmRzIHBlciBjb25uZWN0aW9uLlxuICBhZGREZWZhdWx0UmF0ZUxpbWl0KCkge1xuICAgIGlmICghdGhpcy5kZWZhdWx0UmF0ZUxpbWl0ZXJSdWxlSWQpIHtcbiAgICAgIHRoaXMuZGVmYXVsdFJhdGVMaW1pdGVyUnVsZUlkID0gRERQUmF0ZUxpbWl0ZXIuYWRkUnVsZSh7XG4gICAgICAgIHVzZXJJZDogbnVsbCxcbiAgICAgICAgY2xpZW50QWRkcmVzczogbnVsbCxcbiAgICAgICAgdHlwZTogJ21ldGhvZCcsXG4gICAgICAgIG5hbWU6IG5hbWUgPT4gWydsb2dpbicsICdjcmVhdGVVc2VyJywgJ3Jlc2V0UGFzc3dvcmQnLCAnZm9yZ290UGFzc3dvcmQnXVxuICAgICAgICAgIC5pbmNsdWRlcyhuYW1lKSxcbiAgICAgICAgY29ubmVjdGlvbklkOiAoY29ubmVjdGlvbklkKSA9PiB0cnVlLFxuICAgICAgfSwgNSwgMTAwMDApO1xuICAgIH1cbiAgfTtcblxufVxuXG4vLyBHaXZlIGVhY2ggbG9naW4gaG9vayBjYWxsYmFjayBhIGZyZXNoIGNsb25lZCBjb3B5IG9mIHRoZSBhdHRlbXB0XG4vLyBvYmplY3QsIGJ1dCBkb24ndCBjbG9uZSB0aGUgY29ubmVjdGlvbi5cbi8vXG5jb25zdCBjbG9uZUF0dGVtcHRXaXRoQ29ubmVjdGlvbiA9IChjb25uZWN0aW9uLCBhdHRlbXB0KSA9PiB7XG4gIGNvbnN0IGNsb25lZEF0dGVtcHQgPSBFSlNPTi5jbG9uZShhdHRlbXB0KTtcbiAgY2xvbmVkQXR0ZW1wdC5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgcmV0dXJuIGNsb25lZEF0dGVtcHQ7XG59O1xuXG5jb25zdCB0cnlMb2dpbk1ldGhvZCA9ICh0eXBlLCBmbikgPT4ge1xuICBsZXQgcmVzdWx0O1xuICB0cnkge1xuICAgIHJlc3VsdCA9IGZuKCk7XG4gIH1cbiAgY2F0Y2ggKGUpIHtcbiAgICByZXN1bHQgPSB7ZXJyb3I6IGV9O1xuICB9XG5cbiAgaWYgKHJlc3VsdCAmJiAhcmVzdWx0LnR5cGUgJiYgdHlwZSlcbiAgICByZXN1bHQudHlwZSA9IHR5cGU7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IHNldHVwRGVmYXVsdExvZ2luSGFuZGxlcnMgPSBhY2NvdW50cyA9PiB7XG4gIGFjY291bnRzLnJlZ2lzdGVyTG9naW5IYW5kbGVyKFwicmVzdW1lXCIsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRSZXN1bWVMb2dpbkhhbmRsZXIuY2FsbCh0aGlzLCBhY2NvdW50cywgb3B0aW9ucyk7XG4gIH0pO1xufTtcblxuLy8gTG9naW4gaGFuZGxlciBmb3IgcmVzdW1lIHRva2Vucy5cbmNvbnN0IGRlZmF1bHRSZXN1bWVMb2dpbkhhbmRsZXIgPSAoYWNjb3VudHMsIG9wdGlvbnMpID0+IHtcbiAgaWYgKCFvcHRpb25zLnJlc3VtZSlcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGNoZWNrKG9wdGlvbnMucmVzdW1lLCBTdHJpbmcpO1xuXG4gIGNvbnN0IGhhc2hlZFRva2VuID0gYWNjb3VudHMuX2hhc2hMb2dpblRva2VuKG9wdGlvbnMucmVzdW1lKTtcblxuICAvLyBGaXJzdCBsb29rIGZvciBqdXN0IHRoZSBuZXctc3R5bGUgaGFzaGVkIGxvZ2luIHRva2VuLCB0byBhdm9pZFxuICAvLyBzZW5kaW5nIHRoZSB1bmhhc2hlZCB0b2tlbiB0byB0aGUgZGF0YWJhc2UgaW4gYSBxdWVyeSBpZiB3ZSBkb24ndFxuICAvLyBuZWVkIHRvLlxuICBsZXQgdXNlciA9IGFjY291bnRzLnVzZXJzLmZpbmRPbmUoXG4gICAge1wic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLmhhc2hlZFRva2VuXCI6IGhhc2hlZFRva2VufSxcbiAgICB7ZmllbGRzOiB7XCJzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuJFwiOiAxfX0pO1xuXG4gIGlmICghIHVzZXIpIHtcbiAgICAvLyBJZiB3ZSBkaWRuJ3QgZmluZCB0aGUgaGFzaGVkIGxvZ2luIHRva2VuLCB0cnkgYWxzbyBsb29raW5nIGZvclxuICAgIC8vIHRoZSBvbGQtc3R5bGUgdW5oYXNoZWQgdG9rZW4uICBCdXQgd2UgbmVlZCB0byBsb29rIGZvciBlaXRoZXJcbiAgICAvLyB0aGUgb2xkLXN0eWxlIHRva2VuIE9SIHRoZSBuZXctc3R5bGUgdG9rZW4sIGJlY2F1c2UgYW5vdGhlclxuICAgIC8vIGNsaWVudCBjb25uZWN0aW9uIGxvZ2dpbmcgaW4gc2ltdWx0YW5lb3VzbHkgbWlnaHQgaGF2ZSBhbHJlYWR5XG4gICAgLy8gY29udmVydGVkIHRoZSB0b2tlbi5cbiAgICB1c2VyID0gYWNjb3VudHMudXNlcnMuZmluZE9uZSh7XG4gICAgICAkb3I6IFtcbiAgICAgICAge1wic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLmhhc2hlZFRva2VuXCI6IGhhc2hlZFRva2VufSxcbiAgICAgICAge1wic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLnRva2VuXCI6IG9wdGlvbnMucmVzdW1lfVxuICAgICAgXVxuICAgIH0sXG4gICAgLy8gTm90ZTogQ2Fubm90IHVzZSAuLi5sb2dpblRva2Vucy4kIHBvc2l0aW9uYWwgb3BlcmF0b3Igd2l0aCAkb3IgcXVlcnkuXG4gICAge2ZpZWxkczoge1wic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IDF9fSk7XG4gIH1cblxuICBpZiAoISB1c2VyKVxuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogbmV3IE1ldGVvci5FcnJvcig0MDMsIFwiWW91J3ZlIGJlZW4gbG9nZ2VkIG91dCBieSB0aGUgc2VydmVyLiBQbGVhc2UgbG9nIGluIGFnYWluLlwiKVxuICAgIH07XG5cbiAgLy8gRmluZCB0aGUgdG9rZW4sIHdoaWNoIHdpbGwgZWl0aGVyIGJlIGFuIG9iamVjdCB3aXRoIGZpZWxkc1xuICAvLyB7aGFzaGVkVG9rZW4sIHdoZW59IGZvciBhIGhhc2hlZCB0b2tlbiBvciB7dG9rZW4sIHdoZW59IGZvciBhblxuICAvLyB1bmhhc2hlZCB0b2tlbi5cbiAgbGV0IG9sZFVuaGFzaGVkU3R5bGVUb2tlbjtcbiAgbGV0IHRva2VuID0gdXNlci5zZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMuZmluZCh0b2tlbiA9PlxuICAgIHRva2VuLmhhc2hlZFRva2VuID09PSBoYXNoZWRUb2tlblxuICApO1xuICBpZiAodG9rZW4pIHtcbiAgICBvbGRVbmhhc2hlZFN0eWxlVG9rZW4gPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0b2tlbiA9IHVzZXIuc2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLmZpbmQodG9rZW4gPT5cbiAgICAgIHRva2VuLnRva2VuID09PSBvcHRpb25zLnJlc3VtZVxuICAgICk7XG4gICAgb2xkVW5oYXNoZWRTdHlsZVRva2VuID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHRva2VuRXhwaXJlcyA9IGFjY291bnRzLl90b2tlbkV4cGlyYXRpb24odG9rZW4ud2hlbik7XG4gIGlmIChuZXcgRGF0ZSgpID49IHRva2VuRXhwaXJlcylcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcklkOiB1c2VyLl9pZCxcbiAgICAgIGVycm9yOiBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJZb3VyIHNlc3Npb24gaGFzIGV4cGlyZWQuIFBsZWFzZSBsb2cgaW4gYWdhaW4uXCIpXG4gICAgfTtcblxuICAvLyBVcGRhdGUgdG8gYSBoYXNoZWQgdG9rZW4gd2hlbiBhbiB1bmhhc2hlZCB0b2tlbiBpcyBlbmNvdW50ZXJlZC5cbiAgaWYgKG9sZFVuaGFzaGVkU3R5bGVUb2tlbikge1xuICAgIC8vIE9ubHkgYWRkIHRoZSBuZXcgaGFzaGVkIHRva2VuIGlmIHRoZSBvbGQgdW5oYXNoZWQgdG9rZW4gc3RpbGxcbiAgICAvLyBleGlzdHMgKHRoaXMgYXZvaWRzIHJlc3VycmVjdGluZyB0aGUgdG9rZW4gaWYgaXQgd2FzIGRlbGV0ZWRcbiAgICAvLyBhZnRlciB3ZSByZWFkIGl0KS4gIFVzaW5nICRhZGRUb1NldCBhdm9pZHMgZ2V0dGluZyBhbiBpbmRleFxuICAgIC8vIGVycm9yIGlmIGFub3RoZXIgY2xpZW50IGxvZ2dpbmcgaW4gc2ltdWx0YW5lb3VzbHkgaGFzIGFscmVhZHlcbiAgICAvLyBpbnNlcnRlZCB0aGUgbmV3IGhhc2hlZCB0b2tlbi5cbiAgICBhY2NvdW50cy51c2Vycy51cGRhdGUoXG4gICAgICB7XG4gICAgICAgIF9pZDogdXNlci5faWQsXG4gICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zLnRva2VuXCI6IG9wdGlvbnMucmVzdW1lXG4gICAgICB9LFxuICAgICAgeyRhZGRUb1NldDoge1xuICAgICAgICAgIFwic2VydmljZXMucmVzdW1lLmxvZ2luVG9rZW5zXCI6IHtcbiAgICAgICAgICAgIFwiaGFzaGVkVG9rZW5cIjogaGFzaGVkVG9rZW4sXG4gICAgICAgICAgICBcIndoZW5cIjogdG9rZW4ud2hlblxuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICApO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBvbGQgdG9rZW4gKmFmdGVyKiBhZGRpbmcgdGhlIG5ldywgc2luY2Ugb3RoZXJ3aXNlXG4gICAgLy8gYW5vdGhlciBjbGllbnQgdHJ5aW5nIHRvIGxvZ2luIGJldHdlZW4gb3VyIHJlbW92aW5nIHRoZSBvbGQgYW5kXG4gICAgLy8gYWRkaW5nIHRoZSBuZXcgd291bGRuJ3QgZmluZCBhIHRva2VuIHRvIGxvZ2luIHdpdGguXG4gICAgYWNjb3VudHMudXNlcnMudXBkYXRlKHVzZXIuX2lkLCB7XG4gICAgICAkcHVsbDoge1xuICAgICAgICBcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vuc1wiOiB7IFwidG9rZW5cIjogb3B0aW9ucy5yZXN1bWUgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB1c2VySWQ6IHVzZXIuX2lkLFxuICAgIHN0YW1wZWRMb2dpblRva2VuOiB7XG4gICAgICB0b2tlbjogb3B0aW9ucy5yZXN1bWUsXG4gICAgICB3aGVuOiB0b2tlbi53aGVuXG4gICAgfVxuICB9O1xufTtcblxuY29uc3QgZXhwaXJlUGFzc3dvcmRUb2tlbiA9IChcbiAgYWNjb3VudHMsXG4gIG9sZGVzdFZhbGlkRGF0ZSxcbiAgdG9rZW5GaWx0ZXIsXG4gIHVzZXJJZFxuKSA9PiB7XG4gIGNvbnN0IHVzZXJGaWx0ZXIgPSB1c2VySWQgPyB7X2lkOiB1c2VySWR9IDoge307XG4gIGNvbnN0IHJlc2V0UmFuZ2VPciA9IHtcbiAgICAkb3I6IFtcbiAgICAgIHsgXCJzZXJ2aWNlcy5wYXNzd29yZC5yZXNldC53aGVuXCI6IHsgJGx0OiBvbGRlc3RWYWxpZERhdGUgfSB9LFxuICAgICAgeyBcInNlcnZpY2VzLnBhc3N3b3JkLnJlc2V0LndoZW5cIjogeyAkbHQ6ICtvbGRlc3RWYWxpZERhdGUgfSB9XG4gICAgXVxuICB9O1xuICBjb25zdCBleHBpcmVGaWx0ZXIgPSB7ICRhbmQ6IFt0b2tlbkZpbHRlciwgcmVzZXRSYW5nZU9yXSB9O1xuXG4gIGFjY291bnRzLnVzZXJzLnVwZGF0ZSh7Li4udXNlckZpbHRlciwgLi4uZXhwaXJlRmlsdGVyfSwge1xuICAgICR1bnNldDoge1xuICAgICAgXCJzZXJ2aWNlcy5wYXNzd29yZC5yZXNldFwiOiBcIlwiXG4gICAgfVxuICB9LCB7IG11bHRpOiB0cnVlIH0pO1xufTtcblxuY29uc3Qgc2V0RXhwaXJlVG9rZW5zSW50ZXJ2YWwgPSBhY2NvdW50cyA9PiB7XG4gIGFjY291bnRzLmV4cGlyZVRva2VuSW50ZXJ2YWwgPSBNZXRlb3Iuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGFjY291bnRzLl9leHBpcmVUb2tlbnMoKTtcbiAgICBhY2NvdW50cy5fZXhwaXJlUGFzc3dvcmRSZXNldFRva2VucygpO1xuICAgIGFjY291bnRzLl9leHBpcmVQYXNzd29yZEVucm9sbFRva2VucygpO1xuICB9LCBFWFBJUkVfVE9LRU5TX0lOVEVSVkFMX01TKTtcbn07XG5cbi8vL1xuLy8vIE9BdXRoIEVuY3J5cHRpb24gU3VwcG9ydFxuLy8vXG5cbmNvbnN0IE9BdXRoRW5jcnlwdGlvbiA9XG4gIFBhY2thZ2VbXCJvYXV0aC1lbmNyeXB0aW9uXCJdICYmXG4gIFBhY2thZ2VbXCJvYXV0aC1lbmNyeXB0aW9uXCJdLk9BdXRoRW5jcnlwdGlvbjtcblxuY29uc3QgdXNpbmdPQXV0aEVuY3J5cHRpb24gPSAoKSA9PiB7XG4gIHJldHVybiBPQXV0aEVuY3J5cHRpb24gJiYgT0F1dGhFbmNyeXB0aW9uLmtleUlzTG9hZGVkKCk7XG59O1xuXG4vLyBPQXV0aCBzZXJ2aWNlIGRhdGEgaXMgdGVtcG9yYXJpbHkgc3RvcmVkIGluIHRoZSBwZW5kaW5nIGNyZWRlbnRpYWxzXG4vLyBjb2xsZWN0aW9uIGR1cmluZyB0aGUgb2F1dGggYXV0aGVudGljYXRpb24gcHJvY2Vzcy4gIFNlbnNpdGl2ZSBkYXRhXG4vLyBzdWNoIGFzIGFjY2VzcyB0b2tlbnMgYXJlIGVuY3J5cHRlZCB3aXRob3V0IHRoZSB1c2VyIGlkIGJlY2F1c2Vcbi8vIHdlIGRvbid0IGtub3cgdGhlIHVzZXIgaWQgeWV0LiAgV2UgcmUtZW5jcnlwdCB0aGVzZSBmaWVsZHMgd2l0aCB0aGVcbi8vIHVzZXIgaWQgaW5jbHVkZWQgd2hlbiBzdG9yaW5nIHRoZSBzZXJ2aWNlIGRhdGEgcGVybWFuZW50bHkgaW5cbi8vIHRoZSB1c2VycyBjb2xsZWN0aW9uLlxuLy9cbmNvbnN0IHBpbkVuY3J5cHRlZEZpZWxkc1RvVXNlciA9IChzZXJ2aWNlRGF0YSwgdXNlcklkKSA9PiB7XG4gIE9iamVjdC5rZXlzKHNlcnZpY2VEYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgbGV0IHZhbHVlID0gc2VydmljZURhdGFba2V5XTtcbiAgICBpZiAoT0F1dGhFbmNyeXB0aW9uICYmIE9BdXRoRW5jcnlwdGlvbi5pc1NlYWxlZCh2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IE9BdXRoRW5jcnlwdGlvbi5zZWFsKE9BdXRoRW5jcnlwdGlvbi5vcGVuKHZhbHVlKSwgdXNlcklkKTtcbiAgICBzZXJ2aWNlRGF0YVtrZXldID0gdmFsdWU7XG4gIH0pO1xufTtcblxuXG4vLyBFbmNyeXB0IHVuZW5jcnlwdGVkIGxvZ2luIHNlcnZpY2Ugc2VjcmV0cyB3aGVuIG9hdXRoLWVuY3J5cHRpb24gaXNcbi8vIGFkZGVkLlxuLy9cbi8vIFhYWCBGb3IgdGhlIG9hdXRoU2VjcmV0S2V5IHRvIGJlIGF2YWlsYWJsZSBoZXJlIGF0IHN0YXJ0dXAsIHRoZVxuLy8gZGV2ZWxvcGVyIG11c3QgY2FsbCBBY2NvdW50cy5jb25maWcoe29hdXRoU2VjcmV0S2V5OiAuLi59KSBhdCBsb2FkXG4vLyB0aW1lLCBpbnN0ZWFkIG9mIGluIGEgTWV0ZW9yLnN0YXJ0dXAgYmxvY2ssIGJlY2F1c2UgdGhlIHN0YXJ0dXBcbi8vIGJsb2NrIGluIHRoZSBhcHAgY29kZSB3aWxsIHJ1biBhZnRlciB0aGlzIGFjY291bnRzLWJhc2Ugc3RhcnR1cFxuLy8gYmxvY2suICBQZXJoYXBzIHdlIG5lZWQgYSBwb3N0LXN0YXJ0dXAgY2FsbGJhY2s/XG5cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgaWYgKCEgdXNpbmdPQXV0aEVuY3J5cHRpb24oKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgU2VydmljZUNvbmZpZ3VyYXRpb24gfSA9IFBhY2thZ2VbJ3NlcnZpY2UtY29uZmlndXJhdGlvbiddO1xuXG4gIFNlcnZpY2VDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zLmZpbmQoe1xuICAgICRhbmQ6IFt7XG4gICAgICBzZWNyZXQ6IHsgJGV4aXN0czogdHJ1ZSB9XG4gICAgfSwge1xuICAgICAgXCJzZWNyZXQuYWxnb3JpdGhtXCI6IHsgJGV4aXN0czogZmFsc2UgfVxuICAgIH1dXG4gIH0pLmZvckVhY2goY29uZmlnID0+IHtcbiAgICBTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy51cGRhdGUoY29uZmlnLl9pZCwge1xuICAgICAgJHNldDoge1xuICAgICAgICBzZWNyZXQ6IE9BdXRoRW5jcnlwdGlvbi5zZWFsKGNvbmZpZy5zZWNyZXQpXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIFhYWCBzZWUgY29tbWVudCBvbiBBY2NvdW50cy5jcmVhdGVVc2VyIGluIHBhc3N3b3Jkc19zZXJ2ZXIgYWJvdXQgYWRkaW5nIGFcbi8vIHNlY29uZCBcInNlcnZlciBvcHRpb25zXCIgYXJndW1lbnQuXG5jb25zdCBkZWZhdWx0Q3JlYXRlVXNlckhvb2sgPSAob3B0aW9ucywgdXNlcikgPT4ge1xuICBpZiAob3B0aW9ucy5wcm9maWxlKVxuICAgIHVzZXIucHJvZmlsZSA9IG9wdGlvbnMucHJvZmlsZTtcbiAgcmV0dXJuIHVzZXI7XG59O1xuXG4vLyBWYWxpZGF0ZSBuZXcgdXNlcidzIGVtYWlsIG9yIEdvb2dsZS9GYWNlYm9vay9HaXRIdWIgYWNjb3VudCdzIGVtYWlsXG5mdW5jdGlvbiBkZWZhdWx0VmFsaWRhdGVOZXdVc2VySG9vayh1c2VyKSB7XG4gIGNvbnN0IGRvbWFpbiA9IHRoaXMuX29wdGlvbnMucmVzdHJpY3RDcmVhdGlvbkJ5RW1haWxEb21haW47XG4gIGlmICghZG9tYWluKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBsZXQgZW1haWxJc0dvb2QgPSBmYWxzZTtcbiAgaWYgKHVzZXIuZW1haWxzICYmIHVzZXIuZW1haWxzLmxlbmd0aCA+IDApIHtcbiAgICBlbWFpbElzR29vZCA9IHVzZXIuZW1haWxzLnJlZHVjZShcbiAgICAgIChwcmV2LCBlbWFpbCkgPT4gcHJldiB8fCB0aGlzLl90ZXN0RW1haWxEb21haW4oZW1haWwuYWRkcmVzcyksIGZhbHNlXG4gICAgKTtcbiAgfSBlbHNlIGlmICh1c2VyLnNlcnZpY2VzICYmIE9iamVjdC52YWx1ZXModXNlci5zZXJ2aWNlcykubGVuZ3RoID4gMCkge1xuICAgIC8vIEZpbmQgYW55IGVtYWlsIG9mIGFueSBzZXJ2aWNlIGFuZCBjaGVjayBpdFxuICAgIGVtYWlsSXNHb29kID0gT2JqZWN0LnZhbHVlcyh1c2VyLnNlcnZpY2VzKS5yZWR1Y2UoXG4gICAgICAocHJldiwgc2VydmljZSkgPT4gc2VydmljZS5lbWFpbCAmJiB0aGlzLl90ZXN0RW1haWxEb21haW4oc2VydmljZS5lbWFpbCksXG4gICAgICBmYWxzZSxcbiAgICApO1xuICB9XG5cbiAgaWYgKGVtYWlsSXNHb29kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIGRvbWFpbiA9PT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgYEAke2RvbWFpbn0gZW1haWwgcmVxdWlyZWRgKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJFbWFpbCBkb2Vzbid0IG1hdGNoIHRoZSBjcml0ZXJpYS5cIik7XG4gIH1cbn1cblxuY29uc3Qgc2V0dXBVc2Vyc0NvbGxlY3Rpb24gPSB1c2VycyA9PiB7XG4gIC8vL1xuICAvLy8gUkVTVFJJQ1RJTkcgV1JJVEVTIFRPIFVTRVIgT0JKRUNUU1xuICAvLy9cbiAgdXNlcnMuYWxsb3coe1xuICAgIC8vIGNsaWVudHMgY2FuIG1vZGlmeSB0aGUgcHJvZmlsZSBmaWVsZCBvZiB0aGVpciBvd24gZG9jdW1lbnQsIGFuZFxuICAgIC8vIG5vdGhpbmcgZWxzZS5cbiAgICB1cGRhdGU6ICh1c2VySWQsIHVzZXIsIGZpZWxkcywgbW9kaWZpZXIpID0+IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBvdXIgcmVjb3JkXG4gICAgICBpZiAodXNlci5faWQgIT09IHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIHVzZXIgY2FuIG9ubHkgbW9kaWZ5IHRoZSAncHJvZmlsZScgZmllbGQuIHNldHMgdG8gbXVsdGlwbGVcbiAgICAgIC8vIHN1Yi1rZXlzIChlZyBwcm9maWxlLmZvbyBhbmQgcHJvZmlsZS5iYXIpIGFyZSBtZXJnZWQgaW50byBlbnRyeVxuICAgICAgLy8gaW4gdGhlIGZpZWxkcyBsaXN0LlxuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggIT09IDEgfHwgZmllbGRzWzBdICE9PSAncHJvZmlsZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGZldGNoOiBbJ19pZCddIC8vIHdlIG9ubHkgbG9vayBhdCBfaWQuXG4gIH0pO1xuXG4gIC8vLyBERUZBVUxUIElOREVYRVMgT04gVVNFUlNcbiAgdXNlcnMuX2Vuc3VyZUluZGV4KCd1c2VybmFtZScsIHsgdW5pcXVlOiB0cnVlLCBzcGFyc2U6IHRydWUgfSk7XG4gIHVzZXJzLl9lbnN1cmVJbmRleCgnZW1haWxzLmFkZHJlc3MnLCB7IHVuaXF1ZTogdHJ1ZSwgc3BhcnNlOiB0cnVlIH0pO1xuICB1c2Vycy5fZW5zdXJlSW5kZXgoJ3NlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy5oYXNoZWRUb2tlbicsXG4gICAgeyB1bmlxdWU6IHRydWUsIHNwYXJzZTogdHJ1ZSB9KTtcbiAgdXNlcnMuX2Vuc3VyZUluZGV4KCdzZXJ2aWNlcy5yZXN1bWUubG9naW5Ub2tlbnMudG9rZW4nLFxuICAgIHsgdW5pcXVlOiB0cnVlLCBzcGFyc2U6IHRydWUgfSk7XG4gIC8vIEZvciB0YWtpbmcgY2FyZSBvZiBsb2dvdXRPdGhlckNsaWVudHMgY2FsbHMgdGhhdCBjcmFzaGVkIGJlZm9yZSB0aGVcbiAgLy8gdG9rZW5zIHdlcmUgZGVsZXRlZC5cbiAgdXNlcnMuX2Vuc3VyZUluZGV4KCdzZXJ2aWNlcy5yZXN1bWUuaGF2ZUxvZ2luVG9rZW5zVG9EZWxldGUnLFxuICAgIHsgc3BhcnNlOiB0cnVlIH0pO1xuICAvLyBGb3IgZXhwaXJpbmcgbG9naW4gdG9rZW5zXG4gIHVzZXJzLl9lbnN1cmVJbmRleChcInNlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucy53aGVuXCIsIHsgc3BhcnNlOiB0cnVlIH0pO1xuICAvLyBGb3IgZXhwaXJpbmcgcGFzc3dvcmQgdG9rZW5zXG4gIHVzZXJzLl9lbnN1cmVJbmRleCgnc2VydmljZXMucGFzc3dvcmQucmVzZXQud2hlbicsIHsgc3BhcnNlOiB0cnVlIH0pO1xufTtcbiJdfQ==
