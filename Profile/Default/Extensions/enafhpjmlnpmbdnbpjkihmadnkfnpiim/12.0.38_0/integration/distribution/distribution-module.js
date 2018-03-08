(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _factory = __webpack_require__(1);

	var _factory2 = _interopRequireDefault(_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof window !== 'undefined') {
	  window.distributionModuleFactory = _factory2.default;
	}

	module.exports = _factory2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var extensionData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var additionalConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  return (0, _permissionChecker2.default)().then(function (_ref) {
	    var permissions = _ref.permissions,
	        origins = _ref.origins;

	    var permissionSet = (0, _paramUtils.arrayToSet)([].concat(_toConsumableArray(permissions), _toConsumableArray(origins)));
	    return (0, _distributionModuleBuilder2.default)(permissionSet, extensionData, additionalConfig);
	  });
	};

	var _permissionChecker = __webpack_require__(2);

	var _permissionChecker2 = _interopRequireDefault(_permissionChecker);

	var _paramUtils = __webpack_require__(4);

	var _distributionModuleBuilder = __webpack_require__(6);

	var _distributionModuleBuilder2 = _interopRequireDefault(_distributionModuleBuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var permissions = void 0;
	  try {
	    permissions = [].concat(_extensionDetails2.default.permissions || []).concat(_extensionDetails2.default.optional_permissions || []);
	  } catch (err) {
	    permissions = [];
	  }
	  return Promise.resolve({ permissions: permissions, origins: [] });
	};

	var _extensionDetails = __webpack_require__(3);

	var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var id = chrome.runtime.id;
	var details = chrome.runtime.getManifest();
	exports.default = _extends({ id: id }, details);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createMapper = createMapper;
	exports.generateTargetParameters = generateTargetParameters;
	exports.getRandomRnd = getRandomRnd;
	exports.formatValue = formatValue;
	exports.convertParametersToArray = convertParametersToArray;
	exports.convertParametersToQueryString = convertParametersToQueryString;
	exports.addParametersToUrlTemplate = addParametersToUrlTemplate;
	exports.normalizeUrlTemplate = normalizeUrlTemplate;
	exports.subset = subset;
	exports.filter = filter;
	exports.isNotEmpty = isNotEmpty;
	exports.getIfNotEmpty = getIfNotEmpty;
	exports.isUrlTemplate = isUrlTemplate;
	exports.arrayToSet = arrayToSet;

	var _urlTemplate = __webpack_require__(5);

	var _urlTemplate2 = _interopRequireDefault(_urlTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createMapper(mappings) {
	  return function (source) {
	    var result = {};
	    Object.keys(source).forEach(function (key) {
	      if (mappings.hasOwnProperty(key)) {
	        result[mappings[key]] = source[key];
	      } else {
	        result[key] = source[key];
	      }
	    });
	    return result;
	  };
	}

	function generateTargetParameters(source) {
	  var result = {};
	  source.forEach(function (item) {
	    result[item.Id] = item.Value;
	  });
	  return result;
	}

	function getRandomRnd() {
	  return Math.floor(Math.random() * 100 * 1000 * 1000);
	}

	function formatValue(value) {
	  if (typeof value === 'boolean') {
	    return value ? 1 : 0;
	  }
	  return value;
	}

	function convertParametersToArray(source) {
	  var result = [];
	  Object.keys(source).forEach(function (key) {
	    result.push({ key: key, value: source[key] });
	  });
	  return result;
	}

	function convertParametersToQueryString(parameters) {
	  return parameters.filter(function (param) {
	    return param.value !== undefined;
	  }).map(function (param) {
	    return encodeURIComponent(param.key) + '=' + encodeURIComponent(formatValue(param.value));
	  }).join('&');
	}

	function addParametersToUrlTemplate(template, parameters) {
	  return _urlTemplate2.default.parse(template).expand(parameters);
	}

	function normalizeUrlTemplate(template) {
	  return template.replace(/\$(\{\w+\})/gi, '$1');
	}

	function subset(source) {
	  var result = {};

	  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    keys[_key - 1] = arguments[_key];
	  }

	  keys.forEach(function (key) {
	    if (source.hasOwnProperty(key) && source[key] !== undefined) {
	      result[key] = source[key];
	    }
	  });
	  return result;
	}

	function filter(source) {
	  for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    keys[_key2 - 1] = arguments[_key2];
	  }

	  var result = {};
	  Object.keys(source).forEach(function (key) {
	    if (keys.indexOf(key) === -1) {
	      result[key] = source[key];
	    }
	  });
	  return result;
	}

	function isNotEmpty(source, prop) {
	  return source.hasOwnProperty(prop) && source[prop] !== undefined && source[prop] !== '';
	}

	function getIfNotEmpty(source, prop, defaultValue) {
	  return isNotEmpty(source, prop) ? source[prop] : defaultValue;
	}

	function isUrlTemplate(source) {
	  return (/\{\w+\}/gi.test(source)
	  );
	}

	function arrayToSet(source) {
	  var result = new Set();
	  source.forEach(result.add.bind(result));
	  return result;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (root, factory) {
	  if (( false ? 'undefined' : _typeof(exports)) === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    root.urltemplate = factory();
	  }
	})(undefined, function () {
	  /**
	   * @constructor
	   */
	  function UrlTemplate() {}

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeReserved = function (str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	      if (!/%[0-9A-Fa-f]/.test(part)) {
	        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');
	      }
	      return part;
	    }).join('');
	  };

	  /**
	   * @private
	   * @param {string} str
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeUnreserved = function (str) {
	    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
	      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	    });
	  };

	  /**
	   * @private
	   * @param {string} operator
	   * @param {string} value
	   * @param {string} key
	   * @return {string}
	   */
	  UrlTemplate.prototype.encodeValue = function (operator, value, key) {
	    value = operator === '+' || operator === '#' ? this.encodeReserved(value) : this.encodeUnreserved(value);

	    if (key) {
	      return this.encodeUnreserved(key) + '=' + value;
	    } else {
	      return value;
	    }
	  };

	  /**
	   * @private
	   * @param {*} value
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isDefined = function (value) {
	    return value !== undefined && value !== null;
	  };

	  /**
	   * @private
	   * @param {string}
	   * @return {boolean}
	   */
	  UrlTemplate.prototype.isKeyOperator = function (operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	  };

	  /**
	   * @private
	   * @param {Object} context
	   * @param {string} operator
	   * @param {string} key
	   * @param {string} modifier
	   */
	  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {
	    var value = context[key],
	        result = [];

	    if (this.isDefined(value) && value !== '') {
	      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	        value = value.toString();

	        if (modifier && modifier !== '*') {
	          value = value.substring(0, parseInt(modifier, 10));
	        }

	        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	      } else {
	        if (modifier === '*') {
	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                result.push(this.encodeValue(operator, value[k], k));
	              }
	            }, this);
	          }
	        } else {
	          var tmp = [];

	          if (Array.isArray(value)) {
	            value.filter(this.isDefined).forEach(function (value) {
	              tmp.push(this.encodeValue(operator, value));
	            }, this);
	          } else {
	            Object.keys(value).forEach(function (k) {
	              if (this.isDefined(value[k])) {
	                tmp.push(this.encodeUnreserved(k));
	                tmp.push(this.encodeValue(operator, value[k].toString()));
	              }
	            }, this);
	          }

	          if (this.isKeyOperator(operator)) {
	            result.push(this.encodeUnreserved(key) + '=' + tmp.join(','));
	          } else if (tmp.length !== 0) {
	            result.push(tmp.join(','));
	          }
	        }
	      }
	    } else {
	      if (operator === ';') {
	        if (this.isDefined(value)) {
	          result.push(this.encodeUnreserved(key));
	        }
	      } else if (value === '' && (operator === '&' || operator === '?')) {
	        result.push(this.encodeUnreserved(key) + '=');
	      } else if (value === '') {
	        result.push('');
	      }
	    }
	    return result;
	  };

	  /**
	   * @param {string} template
	   * @return {function(Object):string}
	   */
	  UrlTemplate.prototype.parse = function (template) {
	    var that = this;
	    var operators = ['+', '#', '.', '/', ';', '?', '&'];

	    return {
	      expand: function expand(context) {
	        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	          if (expression) {
	            var operator = null,
	                values = [];

	            if (operators.indexOf(expression.charAt(0)) !== -1) {
	              operator = expression.charAt(0);
	              expression = expression.substr(1);
	            }

	            expression.split(/,/g).forEach(function (variable) {
	              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	            });

	            if (operator && operator !== '+') {
	              var separator = ',';

	              if (operator === '?') {
	                separator = '&';
	              } else if (operator !== '#') {
	                separator = operator;
	              }
	              return (values.length !== 0 ? operator : '') + values.join(separator);
	            } else {
	              return values.join(',');
	            }
	          } else {
	            return that.encodeReserved(literal);
	          }
	        });
	      }
	    };
	  };

	  return new UrlTemplate();
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = function (permissions) {
	  var extensionData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var additionalConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var createMetricConfiguration = function createMetricConfiguration(url, parameters, storageKey) {
	    return { url: url, parameters: parameters, storage: new _localStorageFacade2.default(storageKey) };
	  };

	  var convertMixinsToSet = function convertMixinsToSet() {
	    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    var result = new Set();
	    items.forEach(result.add.bind(result));
	    return result;
	  };

	  var supportsCookies = function supportsCookies(permissions) {
	    return permissions.has('cookies');
	  };

	  var supportsNativeMessaging = function supportsNativeMessaging(permissions) {
	    return permissions.has('nativeMessaging');
	  };

	  var supportsNotifications = function supportsNotifications(permissions) {
	    return permissions.has('notifications');
	  };

	  var supportsWebRequest = function supportsWebRequest(permissions) {
	    return permissions.has('webRequest');
	  };

	  var createExtensionDataGenerator = function createExtensionDataGenerator(permissions, options, data) {
	    if (options.oneLink === true && supportsCookies(permissions)) {
	      var _ret = function () {
	        var oneLinkUrl = 'https://mail.ru';
	        var pairs = ['mr1lad', 'mr1luid', 'mr1lext', 'VID'].map(function (name) {
	          return { url: oneLinkUrl, name: name };
	        });
	        var multiCookieReader = new (Function.prototype.bind.apply(_multiCookieReader2.default, [null].concat(_toConsumableArray(pairs))))();
	        return {
	          v: new _oneLinkExtensionDataGenerator2.default(multiCookieReader, data)
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	    return new _extensionDataGenerator2.default(data);
	  };

	  var moduleClass = _distributionCommonModule2.default;

	  var options = (0, _deepAssign2.default)({}, _config2.default, additionalConfig);
	  var mixinSet = convertMixinsToSet(options.mixins);
	  console.info('All options:', options);
	  console.info('All mixins:', mixinSet);

	  var extensionDataStorage = new _localStorageFacade2.default(options.localStorage.key);
	  var extensionSettingsStorage = new _localStorageFacade2.default(options.localStorage.key + '.settings');
	  var additionalExtensionData = _extends({}, options.extensionData, extensionData);
	  var extensionDataGenerator = createExtensionDataGenerator(permissions, options, additionalExtensionData);

	  extensionDataGenerator.addGenerator(new _dataGenerators2.default.LegacyDataGenerator());

	  if ((0, _chromeUtils.isAmigo)()) {
	    extensionDataGenerator.addGenerator(new _dataGenerators2.default.AmigoDataGenerator());
	  }

	  if (supportsNativeMessaging(permissions) && options.nativeMessaging) {
	    var nativeMessageSender = new _nativeMessageSender2.default(options.nativeMessaging.host);
	    extensionDataGenerator.addGenerator(new _dataGenerators2.default.NativeMessagingDataGenerator(_extensionDetails2.default.id, nativeMessageSender));
	    if (mixinSet.has('nativeMessaging')) {
	      moduleClass = _mixins2.default.NativeMessagingMixin(moduleClass, nativeMessageSender);
	    }
	  }

	  if (supportsCookies(permissions) && options.shortTermCookie) {
	    var shortTermCookieFacade = new _cookieFacade2.default(options.shortTermCookie.url, options.shortTermCookie.name);
	    extensionDataGenerator.addGenerator(new _dataGenerators2.default.CookieDataGenerator(shortTermCookieFacade));
	  }

	  extensionDataGenerator.addGenerator(new _dataGenerators2.default.DefaultDataGenerator());

	  var mrdsSender = options.metrics ? new _metricSenders2.default.MetricSender(options.metrics.mrds.url, options.metrics.mrds.parameters) : new _metricSenders2.default.DummyMetricSender();

	  if (mixinSet.has('mrdsMetrics')) {
	    moduleClass = _mixins2.default.MrdsMetricsMixin(moduleClass, mrdsSender);
	  }

	  if (mixinSet.has('additionalParameters')) {
	    moduleClass = _mixins2.default.AdditionalParametersMixin(moduleClass, extensionDataStorage);
	  }

	  if (mixinSet.has('guid')) {
	    moduleClass = _mixins2.default.GuidMixin(moduleClass);
	  }

	  if (supportsNotifications(permissions) && mixinSet.has('notifications')) {
	    moduleClass = _mixins2.default.NotificationsMixin(moduleClass);
	  }

	  moduleClass = _mixins2.default.VersionMixin(moduleClass);
	  moduleClass = _mixins2.default.PluginListMixin(moduleClass);

	  var module = new moduleClass(extensionDataGenerator, extensionDataStorage, extensionSettingsStorage);
	  var scheduler = new _scheduleManager2.default();

	  if (options.metrics) {
	    var metricManager = new _metricManager2.default();
	    var metrics = options.metrics;
	    var mrdsMetricConfiguration = createMetricConfiguration(metrics.mrds.url, metrics.mrds.parameters, 'metric_state_mrds_metric');
	    var goMetricConfiguration = createMetricConfiguration(metrics.go.url, metrics.go.parameters, 'metric_state_go_metric');
	    var partnerMetricConfiguration = createMetricConfiguration(null, metrics.partnerInstall.parameters, 'metric_state_installPartnerMetric');

	    module.registerPlugin(new _plugins2.default.OnlineMetricsPlugin(metricManager, scheduler, mrdsMetricConfiguration, goMetricConfiguration, partnerMetricConfiguration));
	  }

	  if (supportsCookies(permissions) && options.longTermCookie) {
	    var expirationDate = new Date();
	    expirationDate.setDate(expirationDate.getDate() + 7);
	    var cookieOptions = { expirationDate: expirationDate.getTime() / 1000 };
	    var longTermCookieFacade = new _cookieFacade2.default(options.longTermCookie.url, options.longTermCookie.name, cookieOptions);

	    module.registerPlugin(new _plugins2.default.LongTermCookiePlugin(longTermCookieFacade, scheduler));
	  }

	  if (options.rbTargeting) {
	    if (options.rbTargeting.hasOwnProperty('urls') && Array.isArray(options.rbTargeting.urls)) {
	      // New scheme
	      options.rbTargeting.urls.forEach(function (url) {
	        return module.registerPlugin(new _plugins2.default.PixelFetcherPlugin(url, scheduler));
	      });
	    } else {
	      module.registerPlugin(new _plugins2.default.PixelFetcherPlugin(options.rbTargeting.url, scheduler));
	    }
	  }

	  if (supportsCookies(permissions) && options.uninstall) {
	    var cookieName = 'uninstall_' + (0, _guid2.default)();
	    var uninstallCookieFacade = new _cookieFacade2.default(options.uninstall.url, cookieName);
	    module.registerPlugin(new _plugins2.default.UninstallUrlPlugin(options.uninstall.url, cookieName, uninstallCookieFacade));
	  }

	  if (supportsWebRequest(permissions) && supportsNotifications(permissions) && options.notifications) {
	    _notificationHandlerRegistry2.default.init();

	    var FetcherClass = (0, _urlFetcher.CredentialsMixin)(_urlFetcher2.default);
	    var urlFetcher = new FetcherClass(options.notifications.configUrl + '?rnd=' + Date.now().toString());
	    var notificationHistoryStorage = new _localStorageFacade2.default(options.notifications.storageKey || 'notifications_history');
	    var notificationConfigService = new _notificationConfigService2.default(urlFetcher);
	    var notificationHistoryManager = new _notificationHistoryManager2.default(notificationHistoryStorage);
	    var urlWatcher = new _urlWatcher2.default();

	    module.registerPlugin(new _plugins2.default.NotificationsPlugin(notificationConfigService, notificationHistoryManager, scheduler, urlWatcher, mrdsSender));
	  }

	  return module;
	};

	var _deepAssign = __webpack_require__(7);

	var _deepAssign2 = _interopRequireDefault(_deepAssign);

	var _config = __webpack_require__(9);

	var _config2 = _interopRequireDefault(_config);

	var _extensionDetails = __webpack_require__(3);

	var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

	var _dataGenerators = __webpack_require__(11);

	var _dataGenerators2 = _interopRequireDefault(_dataGenerators);

	var _metricSenders = __webpack_require__(21);

	var _metricSenders2 = _interopRequireDefault(_metricSenders);

	var _plugins = __webpack_require__(28);

	var _plugins2 = _interopRequireDefault(_plugins);

	var _mixins = __webpack_require__(84);

	var _mixins2 = _interopRequireDefault(_mixins);

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	var _chromeUtils = __webpack_require__(20);

	var _localStorageFacade = __webpack_require__(92);

	var _localStorageFacade2 = _interopRequireDefault(_localStorageFacade);

	var _cookieFacade = __webpack_require__(93);

	var _cookieFacade2 = _interopRequireDefault(_cookieFacade);

	var _multiCookieReader = __webpack_require__(94);

	var _multiCookieReader2 = _interopRequireDefault(_multiCookieReader);

	var _scheduleManager = __webpack_require__(95);

	var _scheduleManager2 = _interopRequireDefault(_scheduleManager);

	var _urlFetcher = __webpack_require__(74);

	var _urlFetcher2 = _interopRequireDefault(_urlFetcher);

	var _urlWatcher = __webpack_require__(96);

	var _urlWatcher2 = _interopRequireDefault(_urlWatcher);

	var _metricManager = __webpack_require__(97);

	var _metricManager2 = _interopRequireDefault(_metricManager);

	var _oneLinkExtensionDataGenerator = __webpack_require__(98);

	var _oneLinkExtensionDataGenerator2 = _interopRequireDefault(_oneLinkExtensionDataGenerator);

	var _extensionDataGenerator = __webpack_require__(99);

	var _extensionDataGenerator2 = _interopRequireDefault(_extensionDataGenerator);

	var _nativeMessageSender = __webpack_require__(105);

	var _nativeMessageSender2 = _interopRequireDefault(_nativeMessageSender);

	var _notificationHandlerRegistry = __webpack_require__(79);

	var _notificationHandlerRegistry2 = _interopRequireDefault(_notificationHandlerRegistry);

	var _notificationConfigService = __webpack_require__(106);

	var _notificationConfigService2 = _interopRequireDefault(_notificationConfigService);

	var _notificationHistoryManager = __webpack_require__(117);

	var _notificationHistoryManager2 = _interopRequireDefault(_notificationHistoryManager);

	var _distributionCommonModule = __webpack_require__(119);

	var _distributionCommonModule2 = _interopRequireDefault(_distributionCommonModule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObj = __webpack_require__(8);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Sources cannot be null or undefined');
		}

		return Object(val);
	}

	function assignKey(to, from, key) {
		var val = from[key];

		if (val === undefined || val === null) {
			return;
		}

		if (hasOwnProperty.call(to, key)) {
			if (to[key] === undefined || to[key] === null) {
				throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
			}
		}

		if (!hasOwnProperty.call(to, key) || !isObj(val)) {
			to[key] = val;
		} else {
			to[key] = assign(Object(to[key]), from[key]);
		}
	}

	function assign(to, from) {
		if (to === from) {
			return to;
		}

		from = Object(from);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				assignKey(to, from, key);
			}
		}

		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(from);

			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					assignKey(to, from, symbols[i]);
				}
			}
		}

		return to;
	}

	module.exports = function deepAssign(target) {
		target = toObject(target);

		for (var s = 1; s < arguments.length; s++) {
			assign(target, arguments[s]);
		}

		return target;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (x) {
		var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
		return x !== null && (type === 'object' || type === 'function');
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(10);
	module.exports = config;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
		"shortTermCookie": {
			"url": "https://inline.go.mail.ru",
			"name": "go_install_data_vbm"
		},
		"longTermCookie": {
			"url": "https://inline.go.mail.ru",
			"name": "go_req_data_vbm"
		},
		"localStorage": {
			"key": "ru.mail.vbm.ext_info"
		},
		"nativeMessaging": {
			"host": "ru.mail.go.ext_info_host"
		},
		"uninstall": {
			"url": "https://data.amigo.mail.ru/newtab/uninstall.html"
		},
		"notifications": {
			"configUrl": "http://ad.mail.ru/adi/45568",
			"storageKey": "ru.mail.vbm.notifications_history"
		},
		"metrics": {
			"mrds": {
				"url": "http://mrds.mail.ru/update/2/version.txt",
				"parameters": {}
			},
			"go": {
				"url": "http://go.mail.ru/distib/mark/",
				"parameters": {}
			},
			"partnerInstall": {
				"parameters": {}
			}
		},
		"mixins": [
			"mrdsMetrics"
		],
		"extensionData": {
			"comp": "vbm",
			"product_type": "ch_xtnvbm"
		}
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cookieDataGenerator = __webpack_require__(12);

	var _cookieDataGenerator2 = _interopRequireDefault(_cookieDataGenerator);

	var _defaultDataGenerator = __webpack_require__(16);

	var _defaultDataGenerator2 = _interopRequireDefault(_defaultDataGenerator);

	var _nativeMessagingDataGenerator = __webpack_require__(17);

	var _nativeMessagingDataGenerator2 = _interopRequireDefault(_nativeMessagingDataGenerator);

	var _legacyDataGenerator = __webpack_require__(18);

	var _legacyDataGenerator2 = _interopRequireDefault(_legacyDataGenerator);

	var _amigoDataGenerator = __webpack_require__(19);

	var _amigoDataGenerator2 = _interopRequireDefault(_amigoDataGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  CookieDataGenerator: _cookieDataGenerator2.default,
	  NativeMessagingDataGenerator: _nativeMessagingDataGenerator2.default,
	  LegacyDataGenerator: _legacyDataGenerator2.default,
	  DefaultDataGenerator: _defaultDataGenerator2.default,
	  AmigoDataGenerator: _amigoDataGenerator2.default
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseDataGenerator = __webpack_require__(13);

	var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	var _paramUtils = __webpack_require__(4);

	var _queryString = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mappings = {
	  online_callback: 'partner_product_online_url'
	};

	var CookieDataGenerator = function (_BaseDataGenerator) {
	  _inherits(CookieDataGenerator, _BaseDataGenerator);

	  function CookieDataGenerator(cookieFacade) {
	    _classCallCheck(this, CookieDataGenerator);

	    var _this = _possibleConstructorReturn(this, (CookieDataGenerator.__proto__ || Object.getPrototypeOf(CookieDataGenerator)).call(this));

	    _this.__cookieFacade = cookieFacade;
	    return _this;
	  }

	  _createClass(CookieDataGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      var _this2 = this;

	      return this.__cookieFacade.getCookie().then(function (cookie) {
	        if (cookie === null) {
	          throw new Error('Specified cookie does not exist');
	        }

	        var generatedId = (0, _guid2.default)();
	        var parsedCookie = (0, _queryString.parseQueryString)(cookie.value);

	        return _this2.__formatData(_extends({}, (0, _paramUtils.createMapper)(mappings)(parsedCookie), {
	          product_id: generatedId,
	          install_id: generatedId
	        }));
	      });
	    }
	  }]);

	  return CookieDataGenerator;
	}(_baseDataGenerator2.default);

	exports.default = CookieDataGenerator;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseDataGenerator = function () {
	  function BaseDataGenerator() {
	    var persistent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    _classCallCheck(this, BaseDataGenerator);

	    this.__persistent = persistent;
	  }

	  _createClass(BaseDataGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      return Promise.reject('Method should be overridden');
	    }
	  }, {
	    key: '__formatData',
	    value: function __formatData(generatedData) {
	      return {
	        extensionSettings: {
	          moduleVersion: ("1.6.1"),
	          ts: new Date().getTime().toString(),
	          persistent: this.__persistent
	        },
	        extensionData: generatedData
	      };
	    }
	  }]);

	  return BaseDataGenerator;
	}();

	exports.default = BaseDataGenerator;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
	    var r = Math.random() * 16 | 0;
	    var v = char === 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	};

	;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.convertObjectToQueryString = convertObjectToQueryString;
	exports.parseQueryString = parseQueryString;
	function convertObjectToQueryString(source) {
	  var result = [];
	  Object.keys(source).forEach(function (key) {
	    if (source[key] !== undefined) {
	      result.push(encodeURIComponent(key) + '=' + encodeURIComponent(source[key]));
	    }
	  });
	  return result.join('&');
	}

	function parseQueryString(string) {
	  var pairs = string.split('&');
	  var result = {};
	  pairs.forEach(function (item) {
	    var pair = item.split('=');

	    var _pair = _slicedToArray(pair, 2),
	        name = _pair[0],
	        value = _pair[1];

	    if (value !== undefined) {
	      result[name] = decodeURIComponent(value);
	    }
	  });
	  return result;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseDataGenerator = __webpack_require__(13);

	var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DefaultDataGenerator = function (_BaseDataGenerator) {
	  _inherits(DefaultDataGenerator, _BaseDataGenerator);

	  function DefaultDataGenerator() {
	    _classCallCheck(this, DefaultDataGenerator);

	    return _possibleConstructorReturn(this, (DefaultDataGenerator.__proto__ || Object.getPrototypeOf(DefaultDataGenerator)).apply(this, arguments));
	  }

	  _createClass(DefaultDataGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      var generatedId = (0, _guid2.default)();

	      return Promise.resolve(this.__formatData({
	        gp: 800000,
	        product_id: generatedId,
	        install_id: generatedId
	      }));
	    }
	  }]);

	  return DefaultDataGenerator;
	}(_baseDataGenerator2.default);

	exports.default = DefaultDataGenerator;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _paramUtils = __webpack_require__(4);

	var _baseDataGenerator = __webpack_require__(13);

	var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mappings = {
	  rfr: 'gp',
	  online_callback: 'partner_product_online_url'
	};

	var NativeMessagingDataGenerator = function (_BaseDataGenerator) {
	  _inherits(NativeMessagingDataGenerator, _BaseDataGenerator);

	  function NativeMessagingDataGenerator(extensionId, nativeMessagingModule) {
	    _classCallCheck(this, NativeMessagingDataGenerator);

	    var _this = _possibleConstructorReturn(this, (NativeMessagingDataGenerator.__proto__ || Object.getPrototypeOf(NativeMessagingDataGenerator)).call(this, false));

	    _this.__extensionId = extensionId;
	    _this.__nativeMessageSender = nativeMessagingModule;
	    return _this;
	  }

	  _createClass(NativeMessagingDataGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      var _this2 = this;

	      return this.__nativeMessageSender.sendNativeMessage({ Action: 'GetExtInfo', ExtensionId: this.__extensionId }).then(function (response) {
	        if (response.Error !== 0) {
	          throw new Error('Native messaging error. Code: ' + response.Error);
	        }
	        return _this2.__formatData((0, _paramUtils.createMapper)(mappings)(response.InstallData));
	      });
	    }
	  }]);

	  return NativeMessagingDataGenerator;
	}(_baseDataGenerator2.default);

	exports.default = NativeMessagingDataGenerator;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _paramUtils = __webpack_require__(4);

	var _baseDataGenerator = __webpack_require__(13);

	var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mappings = {
	  rfr: 'gp'
	};

	var parameterList = ['rfr', 'product_id', 'install_id', 'go_metric_url', 'mrds_metric_url', 'partner_product_online_url', 'mrds_parameters', 'go_parameters'];

	var LegacyDataGenerator = function (_BaseDataGenerator) {
	  _inherits(LegacyDataGenerator, _BaseDataGenerator);

	  function LegacyDataGenerator() {
	    _classCallCheck(this, LegacyDataGenerator);

	    return _possibleConstructorReturn(this, (LegacyDataGenerator.__proto__ || Object.getPrototypeOf(LegacyDataGenerator)).apply(this, arguments));
	  }

	  _createClass(LegacyDataGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      var data = {};
	      try {
	        parameterList.forEach(function (key) {
	          var value = localStorage.getItem(key);
	          if (value !== null) {
	            data[key] = value;
	          }
	        });
	      } catch (e) {
	        console.error(e.message);
	      }

	      if (data.hasOwnProperty('product_id') && data.product_id !== '') {
	        return Promise.resolve(this.__formatData((0, _paramUtils.createMapper)(mappings)(data)));
	      }
	      return Promise.reject(new Error('Legacy Sputnik data not found'));
	    }
	  }]);

	  return LegacyDataGenerator;
	}(_baseDataGenerator2.default);

	exports.default = LegacyDataGenerator;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseDataGenerator = __webpack_require__(13);

	var _baseDataGenerator2 = _interopRequireDefault(_baseDataGenerator);

	var _chromeUtils = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AmigoDataGenerator = function (_BaseDataGenerator) {
	  _inherits(AmigoDataGenerator, _BaseDataGenerator);

	  function AmigoDataGenerator() {
	    _classCallCheck(this, AmigoDataGenerator);

	    return _possibleConstructorReturn(this, (AmigoDataGenerator.__proto__ || Object.getPrototypeOf(AmigoDataGenerator)).apply(this, arguments));
	  }

	  _createClass(AmigoDataGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      var _this2 = this;

	      var ns = chrome.amigo;
	      return Promise.all([(0, _chromeUtils.wrapChromeApi)(ns, 'GetRfr'), (0, _chromeUtils.wrapChromeApi)(ns, 'GetGuid')]).then(function (results) {
	        var _results = _slicedToArray(results, 2),
	            rfr = _results[0],
	            guid = _results[1];

	        if (rfr === undefined || guid === undefined) {
	          throw new Error('Amigo data does not exist');
	        }
	        return _this2.__formatData({
	          gp: rfr,
	          product_id: guid,
	          install_id: guid
	        });
	      });
	    }
	  }]);

	  return AmigoDataGenerator;
	}(_baseDataGenerator2.default);

	exports.default = AmigoDataGenerator;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapChromeApi = wrapChromeApi;
	exports.isAmigo = isAmigo;
	function wrapChromeApi(namespace, method) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  console.log('Chrome API called', namespace, method, args);
	  return new Promise(function (resolve, reject) {
	    var callback = function callback(result) {
	      if (chrome.runtime.lastError) {
	        console.error('Chrome API Error:', chrome.runtime.lastError);
	        return reject(chrome.runtime.lastError);
	      }
	      console.info('Chrome API Response', result);
	      return resolve(result);
	    };
	    namespace[method].apply(namespace, args.concat(callback));
	  });
	}

	function isAmigo() {
	  return chrome.amigo !== undefined;
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dummyMetricSender = __webpack_require__(22);

	var _dummyMetricSender2 = _interopRequireDefault(_dummyMetricSender);

	var _dailyMetricSender = __webpack_require__(23);

	var _dailyMetricSender2 = _interopRequireDefault(_dailyMetricSender);

	var _onceMetricSender = __webpack_require__(27);

	var _onceMetricSender2 = _interopRequireDefault(_onceMetricSender);

	var _metricSender = __webpack_require__(25);

	var _metricSender2 = _interopRequireDefault(_metricSender);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { MetricSender: _metricSender2.default, DailyMetricSender: _dailyMetricSender2.default, OnceMetricSender: _onceMetricSender2.default, DummyMetricSender: _dummyMetricSender2.default };

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DummyMetricSender = function () {
	  function DummyMetricSender() {
	    _classCallCheck(this, DummyMetricSender);
	  }

	  _createClass(DummyMetricSender, [{
	    key: 'send',
	    value: function send() {
	      console.log('Dummy metric sender');
	      return Promise.resolve(true);
	    }
	  }]);

	  return DummyMetricSender;
	}();

	exports.default = DummyMetricSender;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _statefulMetricSender = __webpack_require__(24);

	var _statefulMetricSender2 = _interopRequireDefault(_statefulMetricSender);

	var _dateUtils = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DailyMetricSender = function (_StatefulMetricSender) {
	  _inherits(DailyMetricSender, _StatefulMetricSender);

	  function DailyMetricSender(baseUrl, parameters, urlIsTemplate, sendCredentials, stateStorage) {
	    var sendStateParameters = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

	    _classCallCheck(this, DailyMetricSender);

	    var _this = _possibleConstructorReturn(this, (DailyMetricSender.__proto__ || Object.getPrototypeOf(DailyMetricSender)).call(this, baseUrl, parameters, urlIsTemplate, sendCredentials, stateStorage));

	    _this.__sendStateParameters = sendStateParameters;
	    return _this;
	  }

	  _createClass(DailyMetricSender, [{
	    key: 'send',
	    value: function send(additionalParameters) {
	      var _this2 = this;

	      return this.__getState().then(function (state) {
	        var currentDayNumber = state.lastDayNumber + 1;
	        var parameters = _this2.__sendStateParameters ? _extends({}, additionalParameters, { day_num: currentDayNumber }) : _extends({}, additionalParameters);

	        return _get(DailyMetricSender.prototype.__proto__ || Object.getPrototypeOf(DailyMetricSender.prototype), 'send', _this2).call(_this2, parameters).then(function () {
	          return _this2.__setState({
	            lastDayNumber: currentDayNumber,
	            lastDayDate: (0, _dateUtils.today)()
	          });
	        });
	      });
	    }
	  }, {
	    key: 'shouldBeSent',
	    value: function shouldBeSent() {
	      return this.__getState().then(function (state) {
	        return !state.lastDayDate || (0, _dateUtils.today)() > new Date(state.lastDayDate);
	      });
	    }
	  }, {
	    key: '__getDefaultState',
	    value: function __getDefaultState() {
	      return Promise.resolve({
	        lastDayNumber: 0,
	        lastDayDate: undefined
	      });
	    }
	  }]);

	  return DailyMetricSender;
	}(_statefulMetricSender2.default);

	exports.default = DailyMetricSender;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _metricSender = __webpack_require__(25);

	var _metricSender2 = _interopRequireDefault(_metricSender);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StatefulMetricSender = function (_MetricSender) {
	  _inherits(StatefulMetricSender, _MetricSender);

	  function StatefulMetricSender(baseUrl, parameters, urlIsTemplate, sendCredentials, stateStorage) {
	    _classCallCheck(this, StatefulMetricSender);

	    var _this = _possibleConstructorReturn(this, (StatefulMetricSender.__proto__ || Object.getPrototypeOf(StatefulMetricSender)).call(this, baseUrl, parameters, urlIsTemplate, sendCredentials));

	    _this.__stateStorage = stateStorage;
	    return _this;
	  }

	  _createClass(StatefulMetricSender, [{
	    key: 'shouldBeSent',
	    value: function shouldBeSent() {
	      return Promise.reject('Method should be overridden');
	    }
	  }, {
	    key: '__getState',
	    value: function __getState() {
	      var _this2 = this;

	      return this.__stateStorage.getData().catch(function () {
	        return _this2.__getDefaultState();
	      });
	    }
	  }, {
	    key: '__setState',
	    value: function __setState(state) {
	      return this.__stateStorage.setData(state);
	    }
	  }, {
	    key: '__getDefaultState',
	    value: function __getDefaultState() {
	      return Promise.reject('Method should be overridden');
	    }
	  }]);

	  return StatefulMetricSender;
	}(_metricSender2.default);

	exports.default = StatefulMetricSender;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _paramUtils = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var mappings = {
	  day_num: 'DAYNUM',
	  version: 'VERSION'
	};

	var MetricSender = function () {
	  function MetricSender(baseUrl) {
	    var baseParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var urlIsTemplate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    var sendCredentials = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    _classCallCheck(this, MetricSender);

	    this.__baseUrl = baseUrl;
	    this.__baseParameters = baseParameters;
	    this.__urlIsTemplate = urlIsTemplate;
	    this.__sendCredentials = sendCredentials;
	  }

	  _createClass(MetricSender, [{
	    key: 'send',
	    value: function send() {
	      var additionalParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var parameters = _extends({}, this.__baseParameters, additionalParameters);
	      var url = this.__urlIsTemplate ? (0, _paramUtils.addParametersToUrlTemplate)((0, _paramUtils.normalizeUrlTemplate)(this.__baseUrl), (0, _paramUtils.createMapper)(mappings)(parameters)) : this.__baseUrl + '?' + (0, _paramUtils.convertParametersToQueryString)((0, _paramUtils.convertParametersToArray)(parameters));
	      var options = this.__sendCredentials ? { credentials: 'include' } : {};
	      return fetch(url, options).then(function () {
	        return true;
	      }).catch(function () {
	        return false;
	      });
	    }
	  }]);

	  return MetricSender;
	}();

	exports.default = MetricSender;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.today = today;
	exports.tomorrow = tomorrow;
	exports.tomorrowWithRandomTime = tomorrowWithRandomTime;
	exports.isInFuture = isInFuture;
	exports.isWithinRange = isWithinRange;
	exports.isWithinTimeInterval = isWithinTimeInterval;
	function today() {
	  var date = new Date();
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	}

	function tomorrow() {
	  var date = today();
	  date.setDate(date.getDate() + 1);
	  return date;
	}

	function tomorrowWithRandomTime() {
	  var date = tomorrow();
	  date.setSeconds(Math.floor(Math.random() * 60 * 60 * 2));
	  return date;
	}

	function isInFuture(date) {
	  var now = new Date();
	  return date.getTime() >= now.getTime();
	}

	function isWithinRange(currentDate, dateStart, dateEnd) {
	  var currentTime = currentDate.getTime();
	  return currentTime >= dateStart.getTime() && currentTime <= dateEnd.getTime();
	}

	function isWithinTimeInterval(currentDate, startTime, endTime) {
	  var currentHours = currentDate.getHours();
	  var currentMinutes = currentDate.getMinutes();
	  return currentHours >= startTime.hours && currentMinutes >= startTime.minutes && currentHours <= endTime.hours && currentMinutes <= endTime.minutes;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _statefulMetricSender = __webpack_require__(24);

	var _statefulMetricSender2 = _interopRequireDefault(_statefulMetricSender);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OnceMetricSender = function (_StatefulMetricSender) {
	  _inherits(OnceMetricSender, _StatefulMetricSender);

	  function OnceMetricSender() {
	    _classCallCheck(this, OnceMetricSender);

	    return _possibleConstructorReturn(this, (OnceMetricSender.__proto__ || Object.getPrototypeOf(OnceMetricSender)).apply(this, arguments));
	  }

	  _createClass(OnceMetricSender, [{
	    key: 'send',
	    value: function send(additionalParameters) {
	      var _this2 = this;

	      return _get(OnceMetricSender.prototype.__proto__ || Object.getPrototypeOf(OnceMetricSender.prototype), 'send', this).call(this, additionalParameters).then(function (success) {
	        return _this2.__setState({ wasSent: success });
	      });
	    }
	  }, {
	    key: 'shouldBeSent',
	    value: function shouldBeSent() {
	      return this.__getState().then(function (state) {
	        return !state.wasSent;
	      });
	    }
	  }, {
	    key: '__getDefaultState',
	    value: function __getDefaultState() {
	      return Promise.resolve({ wasSent: false });
	    }
	  }]);

	  return OnceMetricSender;
	}(_statefulMetricSender2.default);

	exports.default = OnceMetricSender;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _longTermCookiePlugin = __webpack_require__(29);

	var _longTermCookiePlugin2 = _interopRequireDefault(_longTermCookiePlugin);

	var _notificationsPlugin = __webpack_require__(31);

	var _notificationsPlugin2 = _interopRequireDefault(_notificationsPlugin);

	var _onlineMetricsPlugin = __webpack_require__(81);

	var _onlineMetricsPlugin2 = _interopRequireDefault(_onlineMetricsPlugin);

	var _pixelFetcherPlugin = __webpack_require__(82);

	var _pixelFetcherPlugin2 = _interopRequireDefault(_pixelFetcherPlugin);

	var _uninstallUrlPlugin = __webpack_require__(83);

	var _uninstallUrlPlugin2 = _interopRequireDefault(_uninstallUrlPlugin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  LongTermCookiePlugin: _longTermCookiePlugin2.default,
	  NotificationsPlugin: _notificationsPlugin2.default,
	  OnlineMetricsPlugin: _onlineMetricsPlugin2.default,
	  PixelFetcherPlugin: _pixelFetcherPlugin2.default,
	  UninstallUrlPlugin: _uninstallUrlPlugin2.default
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basePlugin = __webpack_require__(30);

	var _basePlugin2 = _interopRequireDefault(_basePlugin);

	var _dateUtils = __webpack_require__(26);

	var _paramUtils = __webpack_require__(4);

	var _queryString = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LongTermCookiePlugin = function (_BasePlugin) {
	  _inherits(LongTermCookiePlugin, _BasePlugin);

	  function LongTermCookiePlugin(cookieFacade, scheduler) {
	    _classCallCheck(this, LongTermCookiePlugin);

	    var _this = _possibleConstructorReturn(this, (LongTermCookiePlugin.__proto__ || Object.getPrototypeOf(LongTermCookiePlugin)).call(this, 'LongTermCookiePlugin'));

	    _this.__cookieFacade = cookieFacade;
	    _this.__scheduler = scheduler;
	    return _this;
	  }

	  _createClass(LongTermCookiePlugin, [{
	    key: 'run',
	    value: function run() {
	      var _this2 = this;

	      return this.getHost().getExtensionData().then(function (extensionData) {
	        var cookieObject = { gp: extensionData.gp };
	        if ((0, _paramUtils.isNotEmpty)(extensionData, 'hp_cnt')) {
	          cookieObject.hp_cnt = extensionData.hp_cnt;
	        }
	        return _this2.__updateLongTermCookie((0, _queryString.convertObjectToQueryString)(cookieObject));
	      });
	    }
	  }, {
	    key: '__updateLongTermCookie',
	    value: function __updateLongTermCookie(cookie) {
	      var _this3 = this;

	      return this.__cookieFacade.setCookie(cookie).then(function () {
	        var alarmTime = (0, _dateUtils.tomorrowWithRandomTime)();
	        _this3.__scheduler.schedule('UpdateCookie', alarmTime, _this3.__updateLongTermCookie.bind(_this3, cookie));
	      });
	    }
	  }]);

	  return LongTermCookiePlugin;
	}(_basePlugin2.default);

	exports.default = LongTermCookiePlugin;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BasePlugin = function () {
	  function BasePlugin(name) {
	    _classCallCheck(this, BasePlugin);

	    this.__name = name;
	    this.__host = null;
	  }

	  _createClass(BasePlugin, [{
	    key: 'getName',
	    value: function getName() {
	      return this.__name;
	    }
	  }, {
	    key: 'getHost',
	    value: function getHost() {
	      return this.__host;
	    }
	  }, {
	    key: 'setHost',
	    value: function setHost(host) {
	      this.__host = host;
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      return Promise.reject(new Error('Method should be overridden'));
	    }
	  }]);

	  return BasePlugin;
	}();

	exports.default = BasePlugin;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _each = __webpack_require__(32);

	var _each2 = _interopRequireDefault(_each);

	var _mrdsSettings = __webpack_require__(73);

	var _basePlugin = __webpack_require__(30);

	var _basePlugin2 = _interopRequireDefault(_basePlugin);

	var _urlFetcher = __webpack_require__(74);

	var _urlFetcher2 = _interopRequireDefault(_urlFetcher);

	var _notificationScheduleTypes = __webpack_require__(75);

	var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

	var _notificationFactory = __webpack_require__(76);

	var _notificationFactory2 = _interopRequireDefault(_notificationFactory);

	var _notificationManager = __webpack_require__(80);

	var _notificationManager2 = _interopRequireDefault(_notificationManager);

	var _paramUtils = __webpack_require__(4);

	var _chromeUtils = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FetcherClass = (0, _urlFetcher.CredentialsMixin)(_urlFetcher2.default);
	var BASE_NOTIFICATION_OPTIONS = {
	  type: 'basic',
	  isClickable: true
	};

	var NotificationsPlugin = function (_BasePlugin) {
	  _inherits(NotificationsPlugin, _BasePlugin);

	  function NotificationsPlugin(notificationConfigService, notificationHistoryManager, scheduler, urlWatcher, metricSender) {
	    _classCallCheck(this, NotificationsPlugin);

	    var _this = _possibleConstructorReturn(this, (NotificationsPlugin.__proto__ || Object.getPrototypeOf(NotificationsPlugin)).call(this, 'NotificationsPlugin'));

	    _this.__notificationConfigService = notificationConfigService;
	    _this.__notificationHistoryManager = notificationHistoryManager;
	    _this.__scheduler = scheduler;
	    _this.__urlWatcher = urlWatcher;
	    _this.__metricSender = metricSender;
	    _this.__baseMetricOptions = { type: 'notification' };
	    return _this;
	  }

	  _createClass(NotificationsPlugin, [{
	    key: 'run',
	    value: function run() {
	      var _this2 = this;

	      return this.getHost().getExtensionData().then(function (extensionData) {
	        _this2.__baseMetricOptions = _extends({}, _this2.__baseMetricOptions, (0, _paramUtils.createMapper)(_mrdsSettings.MAPPINGS)(_paramUtils.filter.apply(undefined, [extensionData].concat(_toConsumableArray(_mrdsSettings.EXCLUDED_FIELDS)))));
	        return _this2.__notificationConfigService.getConfig().then(function (notifications) {
	          return new Promise(function (resolve) {
	            // Filter out disabled configurations
	            var enabledNotifications = notifications.filter(function (configuration) {
	              return configuration.enabled;
	            });
	            var iteratee = function iteratee(configuration, callback) {
	              switch (configuration.schedule.type) {
	                case _notificationScheduleTypes2.default.URL:
	                  _this2.__scheduleNotificationByUrl(configuration);
	                  break;
	                case _notificationScheduleTypes2.default.RANGE:
	                  _this2.__scheduleNotificationByDateRange(configuration);
	                  break;
	                case _notificationScheduleTypes2.default.AFTER:
	                default:
	                  _this2.__scheduleNotificationOnce(configuration);
	              }
	              callback(null);
	            };
	            // Loop through all notification entries asynchronously
	            (0, _each2.default)(enabledNotifications, iteratee, resolve);
	          });
	        });
	      });
	    }
	  }, {
	    key: '__createAndDisplayNotification',
	    value: function __createAndDisplayNotification(configurationId, notificationOptions) {
	      var notification = this.__createNotificationObject(notificationOptions);
	      return this.__displayNotification(configurationId, notification, notificationOptions.onCreated);
	    }
	  }, {
	    key: '__createNotificationObject',
	    value: function __createNotificationObject(_ref) {
	      var _this3 = this;

	      var options = _ref.options,
	          url = _ref.url;

	      return (0, _notificationFactory2.default)({
	        options: options,
	        onClicked: function onClicked(notificationId) {
	          _this3.__createTab(url).then(function () {
	            return _this3.__sendMetric('click');
	          }).then(function () {
	            return _notificationManager2.default.destroy(notificationId);
	          });
	        },
	        onClosed: function onClosed(byUser, notificationId) {
	          _this3.__sendMetric('close').then(function () {
	            return _notificationManager2.default.destroy(notificationId);
	          });
	        }
	      });
	    }
	  }, {
	    key: '__displayNotification',
	    value: function __displayNotification(configurationId, _ref2, onCreated) {
	      var _this4 = this;

	      var id = _ref2.id,
	          options = _ref2.options;

	      return _notificationManager2.default.create(id, options).then(function () {
	        return _this4.__fetchRbUrl(onCreated);
	      }).then(function () {
	        return _this4.__sendMetric('show');
	      }).then(function () {
	        return _this4.__notificationHistoryManager.logNotificationDisplay(configurationId);
	      });
	    }
	  }, {
	    key: '__configurationIsAllowed',
	    value: function __configurationIsAllowed(configuration) {
	      return this.__notificationHistoryManager.getNotificationHistory(configuration.id).then(function (history) {
	        return configuration.schedule.isAllowed(history);
	      });
	    }
	  }, {
	    key: '__getConfigurationContent',
	    value: function __getConfigurationContent(configuration) {
	      return configuration.getContent().then(function (content) {
	        if (content === null) {
	          return null;
	        }
	        var type = content.type,
	            title = content.title,
	            message = content.message,
	            iconUrl = content.iconUrl,
	            url = content.url,
	            onCreated = content.onCreated;

	        var options = _extends({}, BASE_NOTIFICATION_OPTIONS, { type: type, title: title, message: message, iconUrl: iconUrl });
	        return { options: options, url: url, onCreated: onCreated };
	      });
	    }
	  }, {
	    key: '__prepareNotification',
	    value: function __prepareNotification(configuration) {
	      var _this5 = this;

	      return this.__getConfigurationContent(configuration).then(function (content) {
	        if (content === null) {
	          return console.error('Notification content is not available');
	        }
	        console.info('Notification content is available', content);
	        return _this5.__createAndDisplayNotification(configuration.id, content);
	      });
	    }
	  }, {
	    key: '__scheduleNotificationByDateRange',
	    value: function __scheduleNotificationByDateRange(configuration) {
	      var _this6 = this;

	      return this.__scheduleNotificationOnce(configuration).then(function () {
	        console.info('Scheduling next range notification check');
	        var date = new Date();
	        date.setHours(date.getHours() + 3);
	        _this6.__scheduler.schedule('next_range_check', date, _this6.__scheduleNotificationByDateRange.bind(_this6, configuration));
	      });
	    }
	  }, {
	    key: '__scheduleNotificationByUrl',
	    value: function __scheduleNotificationByUrl(configuration) {
	      var _this7 = this;

	      this.__urlWatcher.watch(configuration.schedule.urls /*[ '*://mail.ru/!*', '*://www.mail.ru/!*' ]*/, function () {
	        console.info('URL pattern match, schedule notifications');
	        _this7.__scheduleNotificationOnce(configuration);
	      });
	      return Promise.resolve(true);
	    }
	  }, {
	    key: '__scheduleNotificationOnce',
	    value: function __scheduleNotificationOnce(configuration) {
	      var _this8 = this;

	      return this.__configurationIsAllowed(configuration).then(function (isAllowed) {
	        if (!isAllowed) {
	          return console.error('Configuration is not allowed');
	        }
	        console.info('Configuration is allowed');
	        _this8.__scheduler.schedule('notification:' + configuration.id, configuration.schedule.getNextDate(), _this8.__prepareNotification.bind(_this8, configuration));
	      });
	    }
	  }, {
	    key: '__createTab',
	    value: function __createTab(url) {
	      return (0, _chromeUtils.wrapChromeApi)(chrome.tabs, 'create', { url: url });
	    }
	  }, {
	    key: '__fetchRbUrl',
	    value: function __fetchRbUrl(url) {
	      return new FetcherClass(url + '?rnd=' + Date.now().toString()).fetch();
	    }
	  }, {
	    key: '__sendMetric',
	    value: function __sendMetric(action) {
	      return this.__metricSender.send(_extends({ action: action }, this.__baseMetricOptions));
	    }
	  }]);

	  return NotificationsPlugin;
	}(_basePlugin2.default);

	exports.default = NotificationsPlugin;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = eachLimit;

	var _eachOf = __webpack_require__(33);

	var _eachOf2 = _interopRequireDefault(_eachOf);

	var _withoutIndex = __webpack_require__(72);

	var _withoutIndex2 = _interopRequireDefault(_withoutIndex);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Applies the function `iteratee` to each item in `coll`, in parallel.
	 * The `iteratee` is called with an item from the list, and a callback for when
	 * it has finished. If the `iteratee` passes an error to its `callback`, the
	 * main `callback` (for the `each` function) is immediately called with the
	 * error.
	 *
	 * Note, that since this function applies `iteratee` to each item in parallel,
	 * there is no guarantee that the iteratee functions will complete in order.
	 *
	 * @name each
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias forEach
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {Function} iteratee - A function to apply to each item
	 * in `coll`. The iteratee is passed a `callback(err)` which must be called once
	 * it has completed. If no error has occurred, the `callback` should be run
	 * without arguments or with an explicit `null` argument. The array index is not
	 * passed to the iteratee. Invoked with (item, callback). If you need the index,
	 * use `eachOf`.
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 * @example
	 *
	 * // assuming openFiles is an array of file names and saveFile is a function
	 * // to save the modified contents of that file:
	 *
	 * async.each(openFiles, saveFile, function(err){
	 *   // if any of the saves produced an error, err would equal that error
	 * });
	 *
	 * // assuming openFiles is an array of file names
	 * async.each(openFiles, function(file, callback) {
	 *
	 *     // Perform operation on file here.
	 *     console.log('Processing file ' + file);
	 *
	 *     if( file.length > 32 ) {
	 *       console.log('This file name is too long');
	 *       callback('File name too long');
	 *     } else {
	 *       // Do work to process file here
	 *       console.log('File processed');
	 *       callback();
	 *     }
	 * }, function(err) {
	 *     // if any of the file processing produced an error, err would equal that error
	 *     if( err ) {
	 *       // One of the iterations produced an error.
	 *       // All processing will now stop.
	 *       console.log('A file failed to process');
	 *     } else {
	 *       console.log('All files have been processed successfully');
	 *     }
	 * });
	 */
	function eachLimit(coll, iteratee, callback) {
	  (0, _eachOf2.default)(coll, (0, _withoutIndex2.default)(iteratee), callback);
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (coll, iteratee, callback) {
	    var eachOfImplementation = (0, _isArrayLike2.default)(coll) ? eachOfArrayLike : eachOfGeneric;
	    eachOfImplementation(coll, iteratee, callback);
	};

	var _isArrayLike = __webpack_require__(34);

	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

	var _eachOfLimit = __webpack_require__(44);

	var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);

	var _doLimit = __webpack_require__(71);

	var _doLimit2 = _interopRequireDefault(_doLimit);

	var _noop = __webpack_require__(46);

	var _noop2 = _interopRequireDefault(_noop);

	var _once = __webpack_require__(47);

	var _once2 = _interopRequireDefault(_once);

	var _onlyOnce = __webpack_require__(69);

	var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// eachOf implementation optimized for array-likes
	function eachOfArrayLike(coll, iteratee, callback) {
	    callback = (0, _once2.default)(callback || _noop2.default);
	    var index = 0,
	        completed = 0,
	        length = coll.length;
	    if (length === 0) {
	        callback(null);
	    }

	    function iteratorCallback(err) {
	        if (err) {
	            callback(err);
	        } else if (++completed === length) {
	            callback(null);
	        }
	    }

	    for (; index < length; index++) {
	        iteratee(coll[index], index, (0, _onlyOnce2.default)(iteratorCallback));
	    }
	}

	// a generic version of eachOf which can handle array, object, and iterator cases.
	var eachOfGeneric = (0, _doLimit2.default)(_eachOfLimit2.default, Infinity);

	/**
	 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
	 * to the iteratee.
	 *
	 * @name eachOf
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias forEachOf
	 * @category Collection
	 * @see [async.each]{@link module:Collections.each}
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {Function} iteratee - A function to apply to each
	 * item in `coll`. The `key` is the item's key, or index in the case of an
	 * array. The iteratee is passed a `callback(err)` which must be called once it
	 * has completed. If no error has occurred, the callback should be run without
	 * arguments or with an explicit `null` argument. Invoked with
	 * (item, key, callback).
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 * @example
	 *
	 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
	 * var configs = {};
	 *
	 * async.forEachOf(obj, function (value, key, callback) {
	 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
	 *         if (err) return callback(err);
	 *         try {
	 *             configs[key] = JSON.parse(data);
	 *         } catch (e) {
	 *             return callback(e);
	 *         }
	 *         callback();
	 *     });
	 * }, function (err) {
	 *     if (err) console.error(err.message);
	 *     // configs is now a map of JSON data
	 *     doSomethingWith(configs);
	 * });
	 */

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isFunction = __webpack_require__(35);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _isLength = __webpack_require__(43);

	var _isLength2 = _interopRequireDefault(_isLength);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && (0, _isLength2.default)(value.length) && !(0, _isFunction2.default)(value);
	}

	exports.default = isArrayLike;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseGetTag = __webpack_require__(36);

	var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

	var _isObject = __webpack_require__(42);

	var _isObject2 = _interopRequireDefault(_isObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!(0, _isObject2.default)(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = (0, _baseGetTag2.default)(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	exports.default = isFunction;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Symbol2 = __webpack_require__(37);

	var _Symbol3 = _interopRequireDefault(_Symbol2);

	var _getRawTag = __webpack_require__(40);

	var _getRawTag2 = _interopRequireDefault(_getRawTag);

	var _objectToString = __webpack_require__(41);

	var _objectToString2 = _interopRequireDefault(_objectToString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag2.default)(value) : (0, _objectToString2.default)(value);
	}

	exports.default = baseGetTag;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _root = __webpack_require__(38);

	var _root2 = _interopRequireDefault(_root);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Built-in value references. */
	var _Symbol = _root2.default.Symbol;

	exports.default = _Symbol;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _freeGlobal = __webpack_require__(39);

	var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Detect free variable `self`. */
	var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal2.default || freeSelf || Function('return this')();

	exports.default = root;

/***/ },
/* 39 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

	exports.default = freeGlobal;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Symbol2 = __webpack_require__(37);

	var _Symbol3 = _interopRequireDefault(_Symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	exports.default = getRawTag;

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	exports.default = objectToString;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return value != null && (type == 'object' || type == 'function');
	}

	exports.default = isObject;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	exports.default = isLength;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = eachOfLimit;

	var _eachOfLimit2 = __webpack_require__(45);

	var _eachOfLimit3 = _interopRequireDefault(_eachOfLimit2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name eachOfLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.eachOf]{@link module:Collections.eachOf}
	 * @alias forEachOfLimit
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {Function} iteratee - A function to apply to each
	 * item in `coll`. The `key` is the item's key, or index in the case of an
	 * array. The iteratee is passed a `callback(err)` which must be called once it
	 * has completed. If no error has occurred, the callback should be run without
	 * arguments or with an explicit `null` argument. Invoked with
	 * (item, key, callback).
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 */
	function eachOfLimit(coll, limit, iteratee, callback) {
	  (0, _eachOfLimit3.default)(limit)(coll, iteratee, callback);
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = _eachOfLimit;

	var _noop = __webpack_require__(46);

	var _noop2 = _interopRequireDefault(_noop);

	var _once = __webpack_require__(47);

	var _once2 = _interopRequireDefault(_once);

	var _iterator = __webpack_require__(48);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _onlyOnce = __webpack_require__(69);

	var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

	var _breakLoop = __webpack_require__(70);

	var _breakLoop2 = _interopRequireDefault(_breakLoop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _eachOfLimit(limit) {
	    return function (obj, iteratee, callback) {
	        callback = (0, _once2.default)(callback || _noop2.default);
	        if (limit <= 0 || !obj) {
	            return callback(null);
	        }
	        var nextElem = (0, _iterator2.default)(obj);
	        var done = false;
	        var running = 0;

	        function iterateeCallback(err, value) {
	            running -= 1;
	            if (err) {
	                done = true;
	                callback(err);
	            } else if (value === _breakLoop2.default || done && running <= 0) {
	                done = true;
	                return callback(null);
	            } else {
	                replenish();
	            }
	        }

	        function replenish() {
	            while (running < limit && !done) {
	                var elem = nextElem();
	                if (elem === null) {
	                    done = true;
	                    if (running <= 0) {
	                        callback(null);
	                    }
	                    return;
	                }
	                running += 1;
	                iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(iterateeCallback));
	            }
	        }

	        replenish();
	    };
	}

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	exports.default = noop;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = once;
	function once(fn) {
	    return function () {
	        if (fn === null) return;
	        var callFn = fn;
	        fn = null;
	        callFn.apply(this, arguments);
	    };
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = iterator;

	var _isArrayLike = __webpack_require__(34);

	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

	var _getIterator = __webpack_require__(49);

	var _getIterator2 = _interopRequireDefault(_getIterator);

	var _keys = __webpack_require__(50);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createArrayIterator(coll) {
	    var i = -1;
	    var len = coll.length;
	    return function next() {
	        return ++i < len ? { value: coll[i], key: i } : null;
	    };
	}

	function createES2015Iterator(iterator) {
	    var i = -1;
	    return function next() {
	        var item = iterator.next();
	        if (item.done) return null;
	        i++;
	        return { value: item.value, key: i };
	    };
	}

	function createObjectIterator(obj) {
	    var okeys = (0, _keys2.default)(obj);
	    var i = -1;
	    var len = okeys.length;
	    return function next() {
	        var key = okeys[++i];
	        return i < len ? { value: obj[key], key: key } : null;
	    };
	}

	function iterator(coll) {
	    if ((0, _isArrayLike2.default)(coll)) {
	        return createArrayIterator(coll);
	    }

	    var iterator = (0, _getIterator2.default)(coll);
	    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (coll) {
	    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
	};

	var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _arrayLikeKeys = __webpack_require__(51);

	var _arrayLikeKeys2 = _interopRequireDefault(_arrayLikeKeys);

	var _baseKeys = __webpack_require__(65);

	var _baseKeys2 = _interopRequireDefault(_baseKeys);

	var _isArrayLike = __webpack_require__(34);

	var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return (0, _isArrayLike2.default)(object) ? (0, _arrayLikeKeys2.default)(object) : (0, _baseKeys2.default)(object);
	}

	exports.default = keys;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseTimes = __webpack_require__(52);

	var _baseTimes2 = _interopRequireDefault(_baseTimes);

	var _isArguments = __webpack_require__(53);

	var _isArguments2 = _interopRequireDefault(_isArguments);

	var _isArray = __webpack_require__(56);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isBuffer = __webpack_require__(57);

	var _isBuffer2 = _interopRequireDefault(_isBuffer);

	var _isIndex = __webpack_require__(60);

	var _isIndex2 = _interopRequireDefault(_isIndex);

	var _isTypedArray = __webpack_require__(61);

	var _isTypedArray2 = _interopRequireDefault(_isTypedArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = (0, _isArray2.default)(value),
	      isArg = !isArr && (0, _isArguments2.default)(value),
	      isBuff = !isArr && !isArg && (0, _isBuffer2.default)(value),
	      isType = !isArr && !isArg && !isBuff && (0, _isTypedArray2.default)(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? (0, _baseTimes2.default)(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
	    // Safari 9 has enumerable `arguments.length` in strict mode.
	    key == 'length' ||
	    // Node.js 0.10 has enumerable non-index properties on buffers.
	    isBuff && (key == 'offset' || key == 'parent') ||
	    // PhantomJS 2 has enumerable non-index properties on typed arrays.
	    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
	    // Skip index properties.
	    (0, _isIndex2.default)(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	exports.default = arrayLikeKeys;

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	exports.default = baseTimes;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseIsArguments = __webpack_require__(54);

	var _baseIsArguments2 = _interopRequireDefault(_baseIsArguments);

	var _isObjectLike = __webpack_require__(55);

	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = (0, _baseIsArguments2.default)(function () {
	  return arguments;
	}()) ? _baseIsArguments2.default : function (value) {
	  return (0, _isObjectLike2.default)(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	};

	exports.default = isArguments;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseGetTag = __webpack_require__(36);

	var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

	var _isObjectLike = __webpack_require__(55);

	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return (0, _isObjectLike2.default)(value) && (0, _baseGetTag2.default)(value) == argsTag;
	}

	exports.default = baseIsArguments;

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	exports.default = isObjectLike;

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	exports.default = isArray;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _root = __webpack_require__(38);

	var _root2 = _interopRequireDefault(_root);

	var _stubFalse = __webpack_require__(59);

	var _stubFalse2 = _interopRequireDefault(_stubFalse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root2.default.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || _stubFalse2.default;

	exports.default = isBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)(module)))

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	exports.default = stubFalse;

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	exports.default = isIndex;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _baseIsTypedArray = __webpack_require__(62);

	var _baseIsTypedArray2 = _interopRequireDefault(_baseIsTypedArray);

	var _baseUnary = __webpack_require__(63);

	var _baseUnary2 = _interopRequireDefault(_baseUnary);

	var _nodeUtil = __webpack_require__(64);

	var _nodeUtil2 = _interopRequireDefault(_nodeUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Node.js helper references. */
	var nodeIsTypedArray = _nodeUtil2.default && _nodeUtil2.default.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? (0, _baseUnary2.default)(nodeIsTypedArray) : _baseIsTypedArray2.default;

	exports.default = isTypedArray;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _baseGetTag = __webpack_require__(36);

	var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

	var _isLength = __webpack_require__(43);

	var _isLength2 = _interopRequireDefault(_isLength);

	var _isObjectLike = __webpack_require__(55);

	var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	    return (0, _isObjectLike2.default)(value) && (0, _isLength2.default)(value.length) && !!typedArrayTags[(0, _baseGetTag2.default)(value)];
	}

	exports.default = baseIsTypedArray;

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	exports.default = baseUnary;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _freeGlobal = __webpack_require__(39);

	var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && _freeGlobal2.default.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = function () {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}();

	exports.default = nodeUtil;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)(module)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isPrototype = __webpack_require__(66);

	var _isPrototype2 = _interopRequireDefault(_isPrototype);

	var _nativeKeys = __webpack_require__(67);

	var _nativeKeys2 = _interopRequireDefault(_nativeKeys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!(0, _isPrototype2.default)(object)) {
	    return (0, _nativeKeys2.default)(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	exports.default = baseKeys;

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	exports.default = isPrototype;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _overArg = __webpack_require__(68);

	var _overArg2 = _interopRequireDefault(_overArg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = (0, _overArg2.default)(Object.keys, Object);

	exports.default = nativeKeys;

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	exports.default = overArg;

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = onlyOnce;
	function onlyOnce(fn) {
	    return function () {
	        if (fn === null) throw new Error("Callback was already called.");
	        var callFn = fn;
	        fn = null;
	        callFn.apply(this, arguments);
	    };
	}

/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// A temporary value used to identify if the loop should be broken.
	// See #1064, #1293
	exports.default = {};

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = doLimit;
	function doLimit(fn, limit) {
	    return function (iterable, iteratee, callback) {
	        return fn(iterable, limit, iteratee, callback);
	    };
	}

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = _withoutIndex;
	function _withoutIndex(iteratee) {
	    return function (value, index, callback) {
	        return iteratee(value, callback);
	    };
	}

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MAPPINGS = exports.MAPPINGS = {
	  'product_type': 'kind'
	};

	var EXCLUDED_FIELDS = exports.EXCLUDED_FIELDS = ['fr', 'go_parameters', 'go_metric_url', 'mrds_parameters', 'mrds_metric_url', 'partner_product_online_url', 'partner_install_parameters'];

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function optionsMixinFactory(options) {
	  return function (Clazz) {
	    return function (_Clazz) {
	      _inherits(_class, _Clazz);

	      function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	      }

	      _createClass(_class, [{
	        key: 'fetch',
	        value: function fetch() {
	          var additionalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	          return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fetch', this).call(this, _extends({}, additionalOptions, options));
	        }
	      }]);

	      return _class;
	    }(Clazz);
	  };
	}

	var CredentialsMixin = exports.CredentialsMixin = optionsMixinFactory({ credentials: 'include' });

	var NoCacheMixin = exports.NoCacheMixin = optionsMixinFactory({ cache: 'no-store' });

	var UrlFetcher = function () {
	  function UrlFetcher(url) {
	    var baseOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, UrlFetcher);

	    this.__url = url;
	    this.__baseOptions = baseOptions;
	  }

	  _createClass(UrlFetcher, [{
	    key: 'fetch',
	    value: function (_fetch) {
	      function fetch() {
	        return _fetch.apply(this, arguments);
	      }

	      fetch.toString = function () {
	        return _fetch.toString();
	      };

	      return fetch;
	    }(function () {
	      var additionalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      return fetch(this.__url, _extends({}, this.__baseOptions, additionalOptions));
	    })
	  }]);

	  return UrlFetcher;
	}();

	exports.default = UrlFetcher;

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NotificationScheduleTypes = {
	  AFTER: 'after',
	  URL: 'url',
	  RANGE: 'range',
	  DUMMY: 'dummy'
	};
	exports.default = NotificationScheduleTypes;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _notificationBuilder = __webpack_require__(77);

	var _notificationBuilder2 = _interopRequireDefault(_notificationBuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var notificationFactory = function notificationFactory(_ref) {
	  var notificationId = _ref.notificationId,
	      options = _ref.options,
	      onClicked = _ref.onClicked,
	      onButtonClicked = _ref.onButtonClicked,
	      onClosed = _ref.onClosed;

	  var builder = new _notificationBuilder2.default();
	  if (notificationId) {
	    builder.setId(notificationId);
	  }
	  if (options) {
	    builder.setOptions(options);
	  }
	  if (onClicked) {
	    builder.setOnClicked(onClicked);
	  }
	  if (onButtonClicked) {
	    builder.setOnButtonClicked(onButtonClicked);
	  }
	  if (onClosed) {
	    builder.setOnClosed(onClosed);
	  }
	  return builder.build();
	};

	exports.default = notificationFactory;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _notificationEventTypes = __webpack_require__(78);

	var _notificationEventTypes2 = _interopRequireDefault(_notificationEventTypes);

	var _notificationHandlerRegistry = __webpack_require__(79);

	var _notificationHandlerRegistry2 = _interopRequireDefault(_notificationHandlerRegistry);

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationBuilder = function () {
	  function NotificationBuilder() {
	    _classCallCheck(this, NotificationBuilder);

	    this.__notificationId = (0, _guid2.default)();
	    this.__baseOptions = {};
	  }

	  _createClass(NotificationBuilder, [{
	    key: 'setId',
	    value: function setId(notificationId) {
	      this.__notificationId = notificationId;
	      return this;
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      this.__baseOptions = options;
	      return this;
	    }
	  }, {
	    key: 'setOnButtonClicked',
	    value: function setOnButtonClicked(handler) {
	      _notificationHandlerRegistry2.default.registerHandler(this.__notificationId, _notificationEventTypes2.default.onButtonClicked, handler);
	      return this;
	    }
	  }, {
	    key: 'setOnClicked',
	    value: function setOnClicked(handler) {
	      _notificationHandlerRegistry2.default.registerHandler(this.__notificationId, _notificationEventTypes2.default.onClicked, handler);
	      return this;
	    }
	  }, {
	    key: 'setOnClosed',
	    value: function setOnClosed(handler) {
	      _notificationHandlerRegistry2.default.registerHandler(this.__notificationId, _notificationEventTypes2.default.onClosed, handler);
	      return this;
	    }
	  }, {
	    key: 'build',
	    value: function build() {
	      return {
	        id: this.__notificationId,
	        options: this.__baseOptions
	      };
	    }
	  }]);

	  return NotificationBuilder;
	}();

	exports.default = NotificationBuilder;

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NotificationEventTypes = {
	  onClosed: 'onClosed',
	  onClicked: 'onClicked',
	  onButtonClicked: 'onButtonClicked'
	};
	exports.default = NotificationEventTypes;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _notificationEventTypes = __webpack_require__(78);

	var _notificationEventTypes2 = _interopRequireDefault(_notificationEventTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var namespace = function namespace() {
	  return chrome.notifications;
	};

	var NotificationHandlerRegistry = function () {
	  function NotificationHandlerRegistry() {
	    _classCallCheck(this, NotificationHandlerRegistry);

	    this.__closedHandlers = new Map();
	    this.__clickedHandlers = new Map();
	    this.__buttonClickedHandlers = new Map();
	  }

	  _createClass(NotificationHandlerRegistry, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      namespace().onClicked.addListener(function (notificationId) {
	        if (_this.__clickedHandlers.has(notificationId)) {
	          _this.__clickedHandlers.get(notificationId)(notificationId);
	        }
	      });

	      namespace().onButtonClicked.addListener(function (notificationId, buttonIndex) {
	        if (_this.__buttonClickedHandlers.has(notificationId)) {
	          _this.__buttonClickedHandlers.get(notificationId)(buttonIndex, notificationId);
	        }
	      });

	      namespace().onClosed.addListener(function (notificationId, byUser) {
	        if (_this.__closedHandlers.has(notificationId)) {
	          _this.__closedHandlers.get(notificationId)(byUser, notificationId);
	        }
	      });
	    }
	  }, {
	    key: 'registerHandler',
	    value: function registerHandler(notificationId, event, handler) {
	      this.__getMapByEvent(event).set(notificationId, handler);
	    }
	  }, {
	    key: 'unregisterHandler',
	    value: function unregisterHandler(notificationId, event) {
	      var map = this.__getMapByEvent(event);
	      if (map.has(notificationId)) {
	        console.info('>> Has handler for ' + event + ', remove');
	        map.delete(notificationId);
	      }
	    }
	  }, {
	    key: 'unregisterAllHandlers',
	    value: function unregisterAllHandlers(notificationId) {
	      var _this2 = this;

	      Object.keys(_notificationEventTypes2.default).forEach(function (event) {
	        return _this2.unregisterHandler(notificationId, event);
	      });
	    }
	  }, {
	    key: '__getMapByEvent',
	    value: function __getMapByEvent(event) {
	      switch (event) {
	        case _notificationEventTypes2.default.onClosed:
	          return this.__closedHandlers;
	        case _notificationEventTypes2.default.onClicked:
	          return this.__clickedHandlers;
	        case _notificationEventTypes2.default.onButtonClicked:
	          return this.__buttonClickedHandlers;
	      }
	    }
	  }]);

	  return NotificationHandlerRegistry;
	}();

	var notificationHandlerRegistry = void 0;

	try {
	  notificationHandlerRegistry = new NotificationHandlerRegistry();
	} catch (e) {}

	exports.default = notificationHandlerRegistry;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _chromeUtils = __webpack_require__(20);

	var _notificationHandlerRegistry = __webpack_require__(79);

	var _notificationHandlerRegistry2 = _interopRequireDefault(_notificationHandlerRegistry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var namespace = function namespace() {
	  return chrome.notifications;
	};

	var NotificationManager = function () {
	  function NotificationManager() {
	    _classCallCheck(this, NotificationManager);
	  }

	  _createClass(NotificationManager, [{
	    key: 'getAllVisibleNotifications',
	    value: function getAllVisibleNotifications() {
	      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'getAll');
	    }
	  }, {
	    key: 'create',
	    value: function create(notificationId, options) {
	      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'create', notificationId, options);
	    }
	  }, {
	    key: 'update',
	    value: function update(notificationId, options) {
	      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'update', notificationId, options);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(notificationId) {
	      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'clear', notificationId);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(notificationId) {
	      _notificationHandlerRegistry2.default.unregisterAllHandlers(notificationId);
	      return this.clear(notificationId);
	    }
	  }]);

	  return NotificationManager;
	}();

	exports.default = new NotificationManager();

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basePlugin = __webpack_require__(30);

	var _basePlugin2 = _interopRequireDefault(_basePlugin);

	var _mrdsSettings = __webpack_require__(73);

	var mrdsSettings = _interopRequireWildcard(_mrdsSettings);

	var _extensionDetails = __webpack_require__(3);

	var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

	var _metricSenders = __webpack_require__(21);

	var _metricSenders2 = _interopRequireDefault(_metricSenders);

	var _dateUtils = __webpack_require__(26);

	var _paramUtils = __webpack_require__(4);

	var paramUtils = _interopRequireWildcard(_paramUtils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GO_URL_KEY = 'go_metric_url';
	var MRDS_URL_KEY = 'mrds_metric_url';
	var PARTNER_URL_KEY = 'partner_product_online_url';

	var OnlineMetricsPlugin = function (_BasePlugin) {
	  _inherits(OnlineMetricsPlugin, _BasePlugin);

	  function OnlineMetricsPlugin(metricManager, scheduler, mrdsConfig, goConfig, partnerInstallConfig) {
	    _classCallCheck(this, OnlineMetricsPlugin);

	    var _this = _possibleConstructorReturn(this, (OnlineMetricsPlugin.__proto__ || Object.getPrototypeOf(OnlineMetricsPlugin)).call(this, 'OnlineMetricsPlugin'));

	    _this.__metricManager = metricManager;
	    _this.__scheduler = scheduler;
	    _this.__mrdsConfig = mrdsConfig;
	    _this.__goConfig = goConfig;
	    _this.__partnerInstallConfig = partnerInstallConfig;
	    return _this;
	  }

	  _createClass(OnlineMetricsPlugin, [{
	    key: 'run',
	    value: function run() {
	      var _this2 = this;

	      return this.__configureMetrics().then(function () {
	        return _this2.__sendMetrics();
	      });
	    }
	  }, {
	    key: '__configureMetrics',
	    value: function __configureMetrics() {
	      var _this3 = this;

	      return this.getHost().getExtensionData().then(function (extensionData) {
	        var distributionParameters = paramUtils.createMapper(mrdsSettings.MAPPINGS)(paramUtils.filter.apply(paramUtils, [extensionData].concat(_toConsumableArray(mrdsSettings.EXCLUDED_FIELDS))));
	        var extensionParameters = paramUtils.createMapper({ id: 'extid' })(paramUtils.subset(_extensionDetails2.default, 'version', 'id'));
	        var commonParameters = _extends({}, extensionParameters, distributionParameters);

	        _this3.__metricManager.addSender(_this3.__createMrdsMetricSender(_this3.__mrdsConfig, extensionData, commonParameters)).addSender(_this3.__createGoMetricSender(_this3.__goConfig, extensionData, commonParameters));

	        if (paramUtils.isNotEmpty(extensionData, PARTNER_URL_KEY)) {
	          _this3.__metricManager.addSender(_this3.__createPartnerOnlineMetricSender(_this3.__partnerInstallConfig, extensionData, commonParameters));
	        }
	      });
	    }
	  }, {
	    key: '__sendMetrics',
	    value: function __sendMetrics() {
	      var _this4 = this;

	      this.__metricManager.sendMetrics().then(function () {
	        var alarmTime = (0, _dateUtils.tomorrowWithRandomTime)();
	        _this4.__scheduler.schedule('SendOnlineMetric', alarmTime, _this4.__sendMetrics.bind(_this4));
	      });
	    }
	  }, {
	    key: '__createMrdsMetricSender',
	    value: function __createMrdsMetricSender(config, extensionData) {
	      var commonParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var _ref = paramUtils.isNotEmpty(extensionData, MRDS_URL_KEY) ? [extensionData[MRDS_URL_KEY], true] : [config.url, paramUtils.isUrlTemplate(config.url)],
	          _ref2 = _slicedToArray(_ref, 2),
	          url = _ref2[0],
	          isTemplate = _ref2[1];

	      var parameters = _extends({
	        type: 'product_online_metric'
	      }, commonParameters, paramUtils.generateTargetParameters(extensionData.mrds_parameters || []), config.parameters);
	      return new _metricSenders2.default.DailyMetricSender(url, parameters, isTemplate, false, config.storage);
	    }
	  }, {
	    key: '__createGoMetricSender',
	    value: function __createGoMetricSender(config, extensionData) {
	      var commonParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var _ref3 = paramUtils.isNotEmpty(extensionData, GO_URL_KEY) ? [extensionData[GO_URL_KEY], true] : [config.url, paramUtils.isUrlTemplate(config.url)],
	          _ref4 = _slicedToArray(_ref3, 2),
	          url = _ref4[0],
	          isTemplate = _ref4[1];

	      var parameters = _extends({}, paramUtils.subset(commonParameters, 'install_id', 'product_id', 'gp', 'kind'), paramUtils.generateTargetParameters(extensionData.go_parameters || []), config.parameters);
	      return new _metricSenders2.default.DailyMetricSender(url, parameters, isTemplate, true, config.storage, false);
	    }
	  }, {
	    key: '__createPartnerOnlineMetricSender',
	    value: function __createPartnerOnlineMetricSender(config, extensionData) {
	      var commonParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var url = extensionData[PARTNER_URL_KEY];
	      var parameters = _extends({}, commonParameters, paramUtils.generateTargetParameters(extensionData.partner_install_parameters || []), this.__partnerInstallConfig.parameters);
	      return new _metricSenders2.default.OnceMetricSender(url, parameters, true, false, config.storage);
	    }
	  }]);

	  return OnlineMetricsPlugin;
	}(_basePlugin2.default);

	exports.default = OnlineMetricsPlugin;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basePlugin = __webpack_require__(30);

	var _basePlugin2 = _interopRequireDefault(_basePlugin);

	var _dateUtils = __webpack_require__(26);

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PixelFetcherPlugin = function (_BasePlugin) {
	  _inherits(PixelFetcherPlugin, _BasePlugin);

	  function PixelFetcherPlugin(pixelUrl, scheduler) {
	    _classCallCheck(this, PixelFetcherPlugin);

	    var _this = _possibleConstructorReturn(this, (PixelFetcherPlugin.__proto__ || Object.getPrototypeOf(PixelFetcherPlugin)).call(this, 'PixelFetcherPlugin'));

	    _this.__pixelUrl = pixelUrl;
	    _this.__scheduler = scheduler;
	    return _this;
	  }

	  _createClass(PixelFetcherPlugin, [{
	    key: 'run',
	    value: function run() {
	      return this.__fetchPixel(this.__pixelUrl);
	    }
	  }, {
	    key: '__fetchPixel',
	    value: function __fetchPixel(url) {
	      var _this2 = this;

	      return fetch(url, { cache: 'no-store', credentials: 'include' }).then(function () {
	        var alarmTime = (0, _dateUtils.tomorrow)();
	        alarmTime.setSeconds(Math.floor(Math.random() * 60 * 60 * 2));
	        _this2.__scheduler.schedule('FetchRbPixel_' + (0, _guid2.default)(), alarmTime, _this2.__fetchPixel.bind(_this2, url));
	      });
	    }
	  }]);

	  return PixelFetcherPlugin;
	}(_basePlugin2.default);

	exports.default = PixelFetcherPlugin;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _basePlugin = __webpack_require__(30);

	var _basePlugin2 = _interopRequireDefault(_basePlugin);

	var _paramUtils = __webpack_require__(4);

	var _queryString = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EXCLUDED_FIELDS = ['fr', 'product_type', 'go_parameters', 'go_metric_url', 'mrds_parameters', 'mrds_metric_url', 'partner_product_online_url', 'partner_install_parameters'];

	var UninstallUrlPlugin = function (_BasePlugin) {
	  _inherits(UninstallUrlPlugin, _BasePlugin);

	  function UninstallUrlPlugin(uninstallUrl, cookieName, cookieFacade) {
	    _classCallCheck(this, UninstallUrlPlugin);

	    var _this = _possibleConstructorReturn(this, (UninstallUrlPlugin.__proto__ || Object.getPrototypeOf(UninstallUrlPlugin)).call(this, 'UninstallUrlPlugin'));

	    _this.__cookieName = cookieName;
	    _this.__cookieFacade = cookieFacade;
	    _this.__uninstallUrl = uninstallUrl;
	    return _this;
	  }

	  _createClass(UninstallUrlPlugin, [{
	    key: 'run',
	    value: function run() {
	      var _this2 = this;

	      return this.getHost().getExtensionData().then(function (extensionData) {
	        var parameters = _paramUtils.filter.apply(undefined, [extensionData].concat(EXCLUDED_FIELDS));
	        var queryString = (0, _queryString.convertObjectToQueryString)(parameters);
	        return _this2.__cookieFacade.setCookie(queryString).then(function () {
	          var url = _this2.__uninstallUrl + '?cookie=' + encodeURIComponent(_this2.__cookieName);
	          chrome.runtime.setUninstallURL(url);
	        });
	      });
	    }
	  }]);

	  return UninstallUrlPlugin;
	}(_basePlugin2.default);

	exports.default = UninstallUrlPlugin;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mrdsMetricMixin = __webpack_require__(85);

	var _mrdsMetricMixin2 = _interopRequireDefault(_mrdsMetricMixin);

	var _nativeMessagingMixin = __webpack_require__(86);

	var _nativeMessagingMixin2 = _interopRequireDefault(_nativeMessagingMixin);

	var _notificationsMixin = __webpack_require__(87);

	var _notificationsMixin2 = _interopRequireDefault(_notificationsMixin);

	var _additionalParametersMixin = __webpack_require__(88);

	var _additionalParametersMixin2 = _interopRequireDefault(_additionalParametersMixin);

	var _versionMixin = __webpack_require__(89);

	var _versionMixin2 = _interopRequireDefault(_versionMixin);

	var _guidMixin = __webpack_require__(90);

	var _guidMixin2 = _interopRequireDefault(_guidMixin);

	var _pluginListMixin = __webpack_require__(91);

	var _pluginListMixin2 = _interopRequireDefault(_pluginListMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  MrdsMetricsMixin: _mrdsMetricMixin2.default,
	  NotificationsMixin: _notificationsMixin2.default,
	  NativeMessagingMixin: _nativeMessagingMixin2.default,
	  AdditionalParametersMixin: _additionalParametersMixin2.default,
	  VersionMixin: _versionMixin2.default,
	  GuidMixin: _guidMixin2.default,
	  PluginListMixin: _pluginListMixin2.default
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	exports.default = function (Clazz, metricSender) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: 'sendMrdsMetric',
	      value: function sendMrdsMetric(additionalParameters) {
	        return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'getExtensionData', this).call(this).then(function (extensionData) {
	          var parameters = _extends({}, (0, _paramUtils.createMapper)(mrdsSettings.MAPPINGS)(_paramUtils.filter.apply(undefined, [extensionData].concat(_toConsumableArray(mrdsSettings.EXCLUDED_FIELDS)))), (0, _paramUtils.subset)(_extensionDetails2.default, 'version'), additionalParameters);
	          return metricSender.send(parameters);
	        });
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	var _mrdsSettings = __webpack_require__(73);

	var mrdsSettings = _interopRequireWildcard(_mrdsSettings);

	var _extensionDetails = __webpack_require__(3);

	var _extensionDetails2 = _interopRequireDefault(_extensionDetails);

	var _paramUtils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (Clazz, nativeMessageSender) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: "sendNativeMessage",
	      value: function sendNativeMessage(message) {
	        return nativeMessageSender.sendNativeMessage(message);
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (Clazz) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: 'createNotification',
	      value: function createNotification(options) {
	        var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        return (0, _notificationFactory2.default)(_extends({ options: options }, handlers));
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	var _notificationFactory = __webpack_require__(76);

	var _notificationFactory2 = _interopRequireDefault(_notificationFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (Clazz, storageFacade) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: 'addParameters',
	      value: function addParameters(additionalData) {
	        return storageFacade.getData().then(function (data) {
	          return storageFacade.setData(_extends({}, data, additionalData));
	        });
	      }
	    }, {
	      key: 'removeParameters',
	      value: function removeParameters(keys) {
	        return storageFacade.getData().then(function (data) {
	          return storageFacade.setData(_paramUtils.filter.apply(undefined, [data].concat(_toConsumableArray(keys))));
	        });
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	var _paramUtils = __webpack_require__(4);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (Clazz) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: "getVersion",
	      value: function getVersion() {
	        return ("1.6.1");
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (Clazz) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: "getGuid",
	      value: function getGuid() {
	        return this.getExtensionData().then(function (extensionData) {
	          return extensionData.install_id;
	        });
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (Clazz) {
	  return function (_Clazz) {
	    _inherits(_class, _Clazz);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: "getRegisteredPlugins",
	      value: function getRegisteredPlugins() {
	        return Array.from(this.__plugins.values()).map(function (plugin) {
	          return plugin.getName();
	        });
	      }
	    }]);

	    return _class;
	  }(Clazz);
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LocalStorageFacade = function () {
	  function LocalStorageFacade(key) {
	    _classCallCheck(this, LocalStorageFacade);

	    this.__key = key;
	  }

	  _createClass(LocalStorageFacade, [{
	    key: 'hasData',
	    value: function hasData() {
	      var _this = this;

	      return new Promise(function (resolve) {
	        var data = localStorage.getItem(_this.__key);
	        resolve(data !== null);
	      });
	    }
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      var _this2 = this;

	      console.info('Saving data to storage under key', this.__key, ':', data);
	      return new Promise(function (resolve) {
	        localStorage.setItem(_this2.__key, JSON.stringify(data));
	        resolve(data);
	      });
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      var _this3 = this;

	      return new Promise(function (resolve, reject) {
	        var data = localStorage.getItem(_this3.__key);
	        if (data === null) {
	          return reject('Data not found');
	        }
	        resolve(JSON.parse(data));
	      });
	    }
	  }]);

	  return LocalStorageFacade;
	}();

	exports.default = LocalStorageFacade;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _chromeUtils = __webpack_require__(20);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var namespace = function namespace() {
	  return chrome.cookies;
	};

	var CookieFacade = function () {
	  function CookieFacade(url, name) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, CookieFacade);

	    this.__url = url;
	    this.__name = name;
	    this.__baseOptions = options;
	  }

	  _createClass(CookieFacade, [{
	    key: 'setCookie',
	    value: function setCookie(value) {
	      var options = _extends({ url: this.__url, name: this.__name, value: value }, this.__baseOptions);
	      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'set', options);
	    }
	  }, {
	    key: 'getCookie',
	    value: function getCookie() {
	      return (0, _chromeUtils.wrapChromeApi)(namespace(), 'get', { url: this.__url, name: this.__name });
	    }
	  }]);

	  return CookieFacade;
	}();

	exports.default = CookieFacade;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cookieFacade = __webpack_require__(93);

	var _cookieFacade2 = _interopRequireDefault(_cookieFacade);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MultiCookieReader = function () {
	  function MultiCookieReader() {
	    _classCallCheck(this, MultiCookieReader);

	    for (var _len = arguments.length, pairs = Array(_len), _key = 0; _key < _len; _key++) {
	      pairs[_key] = arguments[_key];
	    }

	    this.__facades = pairs.map(function (_ref) {
	      var url = _ref.url,
	          name = _ref.name;
	      return new _cookieFacade2.default(url, name);
	    });
	  }

	  _createClass(MultiCookieReader, [{
	    key: 'getAllCookies',
	    value: function getAllCookies() {
	      return Promise.all(this.__facades.map(function (facade) {
	        return facade.getCookie();
	      }));
	    }
	  }]);

	  return MultiCookieReader;
	}();

	exports.default = MultiCookieReader;

/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var namespace = function namespace() {
	  try {
	    return chrome.alarms;
	  } catch (e) {
	    return null;
	  }
	};

	var ScheduleManagerChrome = function () {
	  function ScheduleManagerChrome() {
	    var _this = this;

	    _classCallCheck(this, ScheduleManagerChrome);

	    this.__schedulers = new Map();

	    namespace().onAlarm.addListener(function (alarm) {
	      var name = alarm.name;
	      if (_this.__schedulers.has(name)) {
	        var handler = _this.__schedulers.get(name);
	        handler();
	        _this.__clear(name);
	      }
	    });
	  }

	  _createClass(ScheduleManagerChrome, [{
	    key: 'schedule',
	    value: function schedule(name, when, callback) {
	      console.info('Setting up alarm', name, 'at', when);
	      if (this.__schedulers.has(name)) {
	        return console.error('Alarm already set');
	      }
	      namespace().create(name, { when: when.getTime() });
	      this.__schedulers.set(name, callback);
	    }
	  }, {
	    key: '__clear',
	    value: function __clear(name) {
	      if (this.__schedulers.has(name)) {
	        namespace().clear(name);
	        this.__schedulers.delete(name);
	      }
	    }
	  }]);

	  return ScheduleManagerChrome;
	}();

	var ScheduleManagerStub = function () {
	  function ScheduleManagerStub() {
	    _classCallCheck(this, ScheduleManagerStub);
	  }

	  _createClass(ScheduleManagerStub, [{
	    key: 'schedule',
	    value: function schedule() {}
	  }, {
	    key: '__clear',
	    value: function __clear() {}
	  }]);

	  return ScheduleManagerStub;
	}();

	var ScheduleManager = void 0;

	if (namespace()) {
	  ScheduleManager = ScheduleManagerChrome;
	} else {
	  ScheduleManager = ScheduleManagerStub;
	}

	exports.default = ScheduleManager;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var event = function event() {
	  return chrome.webRequest.onCompleted;
	};

	var UrlWatcher = function () {
	  function UrlWatcher() {
	    _classCallCheck(this, UrlWatcher);

	    this.__callbacks = new Map();
	  }

	  _createClass(UrlWatcher, [{
	    key: 'watch',
	    value: function watch(urls, callback) {
	      var id = (0, _guid2.default)();
	      var listener = function listener(details) {
	        return callback.call();
	      };
	      try {
	        event().addListener(listener, { urls: urls, types: ['main_frame'] });
	        this.__callbacks.set(id, listener);
	      } catch (err) {}
	      return id;
	    }
	  }, {
	    key: 'unwatch',
	    value: function unwatch(id) {
	      if (this.__callbacks.has(id)) {
	        var listener = this.__callbacks.get(id);
	        event().removeListener(listener);
	        this.__callbacks.delete(id);
	      }
	    }
	  }, {
	    key: 'unwatchAll',
	    value: function unwatchAll() {
	      var _this = this;

	      this.__callbacks.keys().forEach(function (id) {
	        return _this.unwatch(id);
	      });
	    }
	  }]);

	  return UrlWatcher;
	}();

	exports.default = UrlWatcher;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _each = __webpack_require__(32);

	var _each2 = _interopRequireDefault(_each);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MetricManager = function () {
	  function MetricManager() {
	    _classCallCheck(this, MetricManager);

	    this.__senders = [];
	  }

	  _createClass(MetricManager, [{
	    key: 'addSender',
	    value: function addSender(metricSender) {
	      this.__senders.push(metricSender);
	      return this;
	    }
	  }, {
	    key: 'sendMetrics',
	    value: function sendMetrics() {
	      var _this = this;

	      var additionalParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      return new Promise(function (resolve) {
	        (0, _each2.default)(_this.__senders, function (metricSender, callback) {
	          metricSender.shouldBeSent().then(function (should) {
	            if (should) {
	              return metricSender.send(additionalParameters).then(function () {
	                return callback(null);
	              });
	            }
	            callback(null);
	          });
	        }, function () {
	          return resolve(true);
	        });
	      });
	    }
	  }]);

	  return MetricManager;
	}();

	exports.default = MetricManager;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _extensionDataGenerator = __webpack_require__(99);

	var _extensionDataGenerator2 = _interopRequireDefault(_extensionDataGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OneLinkExtensionDataGenerator = function (_ExtensionDataGenerat) {
	  _inherits(OneLinkExtensionDataGenerator, _ExtensionDataGenerat);

	  function OneLinkExtensionDataGenerator(cookieReader) {
	    var additionalExtensionData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, OneLinkExtensionDataGenerator);

	    var _this = _possibleConstructorReturn(this, (OneLinkExtensionDataGenerator.__proto__ || Object.getPrototypeOf(OneLinkExtensionDataGenerator)).call(this, additionalExtensionData));

	    _this.__cookieReader = cookieReader;
	    return _this;
	  }

	  _createClass(OneLinkExtensionDataGenerator, [{
	    key: 'generateExtensionData',
	    value: function generateExtensionData() {
	      var _this2 = this;

	      return _get(OneLinkExtensionDataGenerator.prototype.__proto__ || Object.getPrototypeOf(OneLinkExtensionDataGenerator.prototype), 'generateExtensionData', this).call(this).then(function (extensionData) {
	        return _this2.__cookieReader.getAllCookies().then(function (cookies) {
	          var data = cookies.filter(function (cookie) {
	            return cookie !== null;
	          }).reduce(function (accumulator, cookie) {
	            return _extends({}, accumulator, _defineProperty({}, 'old_' + cookie.name.toLowerCase(), decodeURIComponent(cookie.value)));
	          }, {});
	          return _extends({}, extensionData, data);
	        });
	      });
	    }
	  }]);

	  return OneLinkExtensionDataGenerator;
	}(_extensionDataGenerator2.default);

	exports.default = OneLinkExtensionDataGenerator;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _whilst = __webpack_require__(100);

	var _whilst2 = _interopRequireDefault(_whilst);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ExtensionDataGenerator = function () {
	  function ExtensionDataGenerator(additionalExtensionData) {
	    _classCallCheck(this, ExtensionDataGenerator);

	    this.__generators = [];
	    this.__additionalExtensionData = additionalExtensionData;
	  }

	  _createClass(ExtensionDataGenerator, [{
	    key: 'addGenerator',
	    value: function addGenerator(generator) {
	      this.__generators.push(generator);
	      return this;
	    }
	  }, {
	    key: 'generateExtensionData',
	    value: function generateExtensionData() {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        var queue = _this.__generators.reverse();
	        var proceed = true;

	        var iteratee = function iteratee(callback) {
	          var generator = queue.pop();
	          generator.generate().then(function (data) {
	            console.info('Received extension data', data);
	            proceed = false;
	            callback(null, data);
	          }).catch(function (err) {
	            console.warn('Extension data not available. Reason:', err);
	            callback(null, null);
	          });
	        };

	        var test = function test() {
	          return proceed && queue.length > 0;
	        };

	        (0, _whilst2.default)(test, iteratee, function (err, data) {
	          if (err) {
	            return reject(err);
	          }
	          if (data === null) {
	            return reject(new Error('No data was generated'));
	          }
	          console.info('Extension data generated', data);
	          resolve({
	            extensionData: _extends({}, data.extensionData, _this.__additionalExtensionData),
	            extensionSettings: _extends({}, data.extensionSettings)
	          });
	        });
	      });
	    }
	  }]);

	  return ExtensionDataGenerator;
	}();

	exports.default = ExtensionDataGenerator;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = whilst;

	var _noop = __webpack_require__(46);

	var _noop2 = _interopRequireDefault(_noop);

	var _rest = __webpack_require__(101);

	var _rest2 = _interopRequireDefault(_rest);

	var _onlyOnce = __webpack_require__(69);

	var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
	 * stopped, or an error occurs.
	 *
	 * @name whilst
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Function} test - synchronous truth test to perform before each
	 * execution of `iteratee`. Invoked with ().
	 * @param {Function} iteratee - A function which is called each time `test` passes.
	 * The function is passed a `callback(err)`, which must be called once it has
	 * completed with an optional `err` argument. Invoked with (callback).
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has failed and repeated execution of `iteratee` has stopped. `callback`
	 * will be passed an error and any arguments passed to the final `iteratee`'s
	 * callback. Invoked with (err, [results]);
	 * @returns undefined
	 * @example
	 *
	 * var count = 0;
	 * async.whilst(
	 *     function() { return count < 5; },
	 *     function(callback) {
	 *         count++;
	 *         setTimeout(function() {
	 *             callback(null, count);
	 *         }, 1000);
	 *     },
	 *     function (err, n) {
	 *         // 5 seconds have passed, n = 5
	 *     }
	 * );
	 */
	function whilst(test, iteratee, callback) {
	    callback = (0, _onlyOnce2.default)(callback || _noop2.default);
	    if (!test()) return callback(null);
	    var next = (0, _rest2.default)(function (err, args) {
	        if (err) return callback(err);
	        if (test()) return iteratee(next);
	        callback.apply(null, [null].concat(args));
	    });
	    iteratee(next);
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = rest;

	var _overRest2 = __webpack_require__(102);

	var _overRest3 = _interopRequireDefault(_overRest2);

	var _identity = __webpack_require__(104);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Lodash rest function without function.toString()
	// remappings
	function rest(func, start) {
	    return (0, _overRest3.default)(func, start, _identity2.default);
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _apply = __webpack_require__(103);

	var _apply2 = _interopRequireDefault(_apply);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return (0, _apply2.default)(func, this, otherArgs);
	  };
	}

	exports.default = overRest;

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0:
	      return func.call(thisArg);
	    case 1:
	      return func.call(thisArg, args[0]);
	    case 2:
	      return func.call(thisArg, args[0], args[1]);
	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	exports.default = apply;

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	exports.default = identity;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _chromeUtils = __webpack_require__(20);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NativeMessageSender = function () {
	   function NativeMessageSender(host) {
	      _classCallCheck(this, NativeMessageSender);

	      this.__host = host;
	   }

	   _createClass(NativeMessageSender, [{
	      key: 'sendNativeMessage',
	      value: function sendNativeMessage(data) {
	         return (0, _chromeUtils.wrapChromeApi)(chrome.runtime, 'sendNativeMessage', this.__host, data);

	         /*const sampleResponse = JSON.parse(`
	           {
	              "install_id":"0516EC29E88B4736884143FEB69A5645",
	              "mrds_parameters":[
	                 {
	                    "Id":"browser_class1",
	                    "Value":true
	                 },
	                 {
	                    "Id":"browser_class2",
	                    "Value":false
	                 },
	                 {
	                    "Id":"pa",
	                    "Value":true
	                 },
	                 {
	                    "Id":"pb",
	                    "Value":true
	                 },
	                 {
	                    "Id":"pd",
	                    "Value":true
	                 }
	              ],
	              "online_callback":"http://httpstat.us/200?0516EC29E88B4736884143FEB69A5645/0516EC29E88B4736884143FEB69A5645/1/zver/ch/1/0",
	              "product_id":"{DC3EAB88-DB29-48E4-97E8-D3563C6955A1}",
	              "rfr":"821716"
	           }
	         `);
	           return Promise.resolve({
	           Error: 0,
	           InstallData: sampleResponse
	         });*/
	      }
	   }]);

	   return NativeMessageSender;
	}();

	exports.default = NativeMessageSender;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _notificationConfigEntry = __webpack_require__(107);

	var _notificationConfigEntry2 = _interopRequireDefault(_notificationConfigEntry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*const DEMO_CONFIG = {
	  notifications: [
	    {
	      conf_id: 'aaa',
	      enabled: true,
	      contentUrl: 'http://httpstat.us/200',
	      schedule: {
	        type: 'after',
	        options: {
	          count: 5,
	          limit: '3m',
	          after: '1m'
	        }
	      }
	    },
	    {
	      conf_id: 'bbb',
	      enabled: true,
	      contentUrl: 'http://httpstat.us/200',
	      schedule: {
	        type: 'url',
	        options: {
	          count: 3,
	          limit: '1d',
	          urls: [
	            'http://vk.com'
	          ]
	        }
	      }
	    },
	    {
	      conf_id: 'ccc',
	      enabled: true,
	      contentUrl: 'http://httpstat.us/200',
	      schedule: {
	        type: 'range',
	        options: {
	          count: 3,
	          limit: '1m',
	          ranges: [
	            {
	              startDate: '2016-07-11',
	              endDate: '2016-07-15',
	              startTime: '11:00',
	              endTime: '20:59'
	            }
	          ]
	        }
	      }
	    }
	  ]
	};*/

	var NotificationConfigService = function () {
	  function NotificationConfigService(slotFetcher) {
	    _classCallCheck(this, NotificationConfigService);

	    this.__fetcher = slotFetcher;
	  }

	  _createClass(NotificationConfigService, [{
	    key: 'getConfig',
	    value: function getConfig() {
	      return this.__fetcher.fetch().then(function (response) {
	        return response.json();
	      }).then(function (_ref) {
	        var notifications = _ref.notifications;
	        return notifications.map(function (entry) {
	          return new _notificationConfigEntry2.default(entry);
	        });
	      }).catch(function (err) {
	        console.error(err);
	        return [];
	      });
	    }
	  }]);

	  return NotificationConfigService;
	}();

	exports.default = NotificationConfigService;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _urlFetcher = __webpack_require__(74);

	var _urlFetcher2 = _interopRequireDefault(_urlFetcher);

	var _notificationScheduleFactory = __webpack_require__(108);

	var _notificationScheduleFactory2 = _interopRequireDefault(_notificationScheduleFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FetcherClass = (0, _urlFetcher.CredentialsMixin)(_urlFetcher2.default);

	var NotificationConfigEntry = function () {
	  function NotificationConfigEntry(_ref) {
	    var confId = _ref.confId,
	        enabled = _ref.enabled,
	        schedule = _ref.schedule,
	        contentUrl = _ref.contentUrl;

	    _classCallCheck(this, NotificationConfigEntry);

	    this.__id = confId;
	    this.__enabled = enabled;
	    this.__schedule = (0, _notificationScheduleFactory2.default)(schedule);
	    this.__contentFetcher = new FetcherClass(contentUrl + '?rnd=' + Date.now().toString());
	  }

	  _createClass(NotificationConfigEntry, [{
	    key: 'getContent',
	    value: function getContent() {
	      return this.__contentFetcher.fetch().then(function (response) {
	        return response.json();
	      }).catch(function () {
	        return null;
	      });
	    }
	  }, {
	    key: 'id',
	    get: function get() {
	      return this.__id;
	    }
	  }, {
	    key: 'enabled',
	    get: function get() {
	      return this.__enabled;
	    }
	  }, {
	    key: 'schedule',
	    get: function get() {
	      return this.__schedule;
	    }
	  }]);

	  return NotificationConfigEntry;
	}();

	exports.default = NotificationConfigEntry;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createNotificationSchedule;

	var _notificationScheduleTypes = __webpack_require__(75);

	var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

	var _schedule = __webpack_require__(109);

	var _schedule2 = _interopRequireDefault(_schedule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createNotificationSchedule(_ref) {
	  var type = _ref.type,
	      options = _ref.options;

	  switch (type) {
	    case _notificationScheduleTypes2.default.AFTER:
	      return new _schedule2.default.AfterNotificationSchedule(options);
	    case _notificationScheduleTypes2.default.RANGE:
	      return new _schedule2.default.RangeNotificationSchedule(options);
	    case _notificationScheduleTypes2.default.URL:
	      return new _schedule2.default.UrlNotificationSchedule(options);
	    default:
	      return new _schedule2.default.DummyNotificationSchedule(options);
	  }
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dummyNotificationSchedule = __webpack_require__(110);

	var _dummyNotificationSchedule2 = _interopRequireDefault(_dummyNotificationSchedule);

	var _afterNotificationSchedule = __webpack_require__(113);

	var _afterNotificationSchedule2 = _interopRequireDefault(_afterNotificationSchedule);

	var _rangeNotificationSchedule = __webpack_require__(114);

	var _rangeNotificationSchedule2 = _interopRequireDefault(_rangeNotificationSchedule);

	var _urlNotificationSchedule = __webpack_require__(115);

	var _urlNotificationSchedule2 = _interopRequireDefault(_urlNotificationSchedule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { DummyNotificationSchedule: _dummyNotificationSchedule2.default, AfterNotificationSchedule: _afterNotificationSchedule2.default, RangeNotificationSchedule: _rangeNotificationSchedule2.default, UrlNotificationSchedule: _urlNotificationSchedule2.default };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseNotificationSchedule = __webpack_require__(111);

	var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

	var _notificationScheduleTypes = __webpack_require__(75);

	var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DummyNotificationSchedule = function (_BaseNotificationSche) {
	  _inherits(DummyNotificationSchedule, _BaseNotificationSche);

	  function DummyNotificationSchedule(source) {
	    _classCallCheck(this, DummyNotificationSchedule);

	    return _possibleConstructorReturn(this, (DummyNotificationSchedule.__proto__ || Object.getPrototypeOf(DummyNotificationSchedule)).call(this, _notificationScheduleTypes2.default.DUMMY, source));
	  }

	  _createClass(DummyNotificationSchedule, [{
	    key: 'getNextDate',
	    value: function getNextDate() {
	      return new Date();
	    }
	  }]);

	  return DummyNotificationSchedule;
	}(_baseNotificationSchedule2.default);

	exports.default = DummyNotificationSchedule;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _notificationScheduleParser = __webpack_require__(112);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseNotificationSchedule = function () {
	  function BaseNotificationSchedule(type, source) {
	    _classCallCheck(this, BaseNotificationSchedule);

	    this.__type = type;
	    this.__source = source;
	  }

	  _createClass(BaseNotificationSchedule, [{
	    key: 'getNextDate',
	    value: function getNextDate() {
	      return new Date();
	    }
	  }, {
	    key: 'isAllowed',
	    value: function isAllowed(_ref) {
	      var displayCount = _ref.displayCount,
	          lastDisplayDate = _ref.lastDisplayDate;

	      var withinLimits = this.__isWithinLimits(displayCount);
	      var withinAllowedTimeInterval = this.__isWithinAllowedTimeInterval(lastDisplayDate);
	      return withinLimits && withinAllowedTimeInterval;
	    }
	  }, {
	    key: '__isWithinLimits',
	    value: function __isWithinLimits(displayCount) {
	      return this.__source.count > displayCount;
	    }
	  }, {
	    key: '__isWithinAllowedTimeInterval',
	    value: function __isWithinAllowedTimeInterval(lastDisplayDate) {
	      return new Date().getTime() - lastDisplayDate.getTime() >= (0, _notificationScheduleParser.calculateIntervalInMilliseconds)((0, _notificationScheduleParser.parseInterval)(this.__source.limit));
	    }
	  }, {
	    key: 'type',
	    get: function get() {
	      return this.__type;
	    }
	  }]);

	  return BaseNotificationSchedule;
	}();

	exports.default = BaseNotificationSchedule;

/***/ },
/* 112 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.parseTime = parseTime;
	exports.parseInterval = parseInterval;
	exports.addTime = addTime;
	exports.calculateIntervalInMilliseconds = calculateIntervalInMilliseconds;
	function parseTime(when) {
	  var TIME_PATTERN = /([0-2]{0,1}[0-9]{1}):([0-5]{0,1}[0-9]{1})/gi;

	  var _TIME_PATTERN$exec$sl = TIME_PATTERN.exec(when).slice(1).map(function (i) {
	    return parseInt(i, 10);
	  }),
	      _TIME_PATTERN$exec$sl2 = _slicedToArray(_TIME_PATTERN$exec$sl, 2),
	      hours = _TIME_PATTERN$exec$sl2[0],
	      minutes = _TIME_PATTERN$exec$sl2[1];

	  return { hours: hours, minutes: minutes };
	}

	function parseInterval(intervalStr) {
	  var INTERVAL_PATTERN = /(\d{1,2})([s,m,h,d,w]{1})/gi;

	  var _INTERVAL_PATTERN$exe = INTERVAL_PATTERN.exec(intervalStr),
	      _INTERVAL_PATTERN$exe2 = _slicedToArray(_INTERVAL_PATTERN$exe, 3),
	      countStr = _INTERVAL_PATTERN$exe2[1],
	      units = _INTERVAL_PATTERN$exe2[2];

	  var count = parseInt(countStr, 10);
	  return { count: count, units: units };
	}

	function addTime(date, _ref) {
	  var units = _ref.units,
	      count = _ref.count;

	  var clone = new Date(date.getTime());
	  switch (units) {
	    case 's':
	      clone.setSeconds(clone.getSeconds() + count);
	      break;
	    case 'm':
	      clone.setMinutes(clone.getMinutes() + count);
	      break;
	    case 'h':
	      clone.setHours(clone.getHours() + count);
	      break;
	    case 'd':
	      clone.setDate(clone.getDate() + count);
	      break;
	    case 'w':
	      clone.setDate(clone.getDate() + count * 7);
	      break;
	  }
	  return clone;
	}

	function calculateIntervalInMilliseconds(_ref2) {
	  var units = _ref2.units,
	      count = _ref2.count;

	  var result = count;
	  switch (units) {
	    case 'w':
	      result *= 7;
	    case 'd':
	      result *= 24;
	    case 'h':
	      result *= 60;
	    case 'm':
	      result *= 60;
	    case 's':
	    default:
	      result *= 1000;
	  }
	  return result;
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseNotificationSchedule = __webpack_require__(111);

	var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

	var _notificationScheduleTypes = __webpack_require__(75);

	var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

	var _notificationScheduleParser = __webpack_require__(112);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AfterNotificationSchedule = function (_BaseNotificationSche) {
	  _inherits(AfterNotificationSchedule, _BaseNotificationSche);

	  function AfterNotificationSchedule(source) {
	    _classCallCheck(this, AfterNotificationSchedule);

	    return _possibleConstructorReturn(this, (AfterNotificationSchedule.__proto__ || Object.getPrototypeOf(AfterNotificationSchedule)).call(this, _notificationScheduleTypes2.default.AFTER, source));
	  }

	  _createClass(AfterNotificationSchedule, [{
	    key: 'getNextDate',
	    value: function getNextDate() {
	      return (0, _notificationScheduleParser.addTime)(new Date(), (0, _notificationScheduleParser.parseInterval)(this.__source.after));
	    }
	  }]);

	  return AfterNotificationSchedule;
	}(_baseNotificationSchedule2.default);

	exports.default = AfterNotificationSchedule;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _baseNotificationSchedule = __webpack_require__(111);

	var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

	var _notificationScheduleTypes = __webpack_require__(75);

	var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

	var _notificationScheduleParser = __webpack_require__(112);

	var _dateUtils = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RangeNotificationSchedule = function (_BaseNotificationSche) {
	  _inherits(RangeNotificationSchedule, _BaseNotificationSche);

	  function RangeNotificationSchedule(source) {
	    _classCallCheck(this, RangeNotificationSchedule);

	    return _possibleConstructorReturn(this, (RangeNotificationSchedule.__proto__ || Object.getPrototypeOf(RangeNotificationSchedule)).call(this, _notificationScheduleTypes2.default.RANGE, source));
	  }

	  _createClass(RangeNotificationSchedule, [{
	    key: 'isAllowed',
	    value: function isAllowed(_ref) {
	      var displayCount = _ref.displayCount,
	          lastDisplayDate = _ref.lastDisplayDate;

	      var createDateWithTime = function createDateWithTime(_ref2) {
	        var hours = _ref2.hours,
	            minutes = _ref2.minutes,
	            seconds = _ref2.seconds,
	            milliseconds = _ref2.milliseconds;
	        var initialDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	        var date = initialDate === null ? new Date() : new Date(initialDate);
	        date.setSeconds(seconds || 0);
	        date.setMilliseconds(milliseconds || 0);
	        date.setHours(hours);
	        date.setMinutes(minutes);
	        return date;
	      };

	      var rangeIndex = this.__source.ranges.findIndex(function (range) {
	        var now = new Date();
	        var startDate = createDateWithTime((0, _notificationScheduleParser.parseTime)('00:00'), range.startDate);
	        var endDate = createDateWithTime(_extends({}, (0, _notificationScheduleParser.parseTime)('23:59'), { seconds: 59, milliseconds: 999 }), range.endDate);
	        var todayRangeStart = createDateWithTime((0, _notificationScheduleParser.parseTime)(range.startTime));
	        var todayRangeEnd = createDateWithTime((0, _notificationScheduleParser.parseTime)(range.endTime));

	        return (0, _dateUtils.isWithinRange)(now, startDate, endDate) && (0, _dateUtils.isWithinRange)(now, todayRangeStart, todayRangeEnd);
	      });
	      return _get(RangeNotificationSchedule.prototype.__proto__ || Object.getPrototypeOf(RangeNotificationSchedule.prototype), 'isAllowed', this).call(this, { displayCount: displayCount, lastDisplayDate: lastDisplayDate }) && rangeIndex > -1;
	    }
	  }]);

	  return RangeNotificationSchedule;
	}(_baseNotificationSchedule2.default);

	exports.default = RangeNotificationSchedule;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseNotificationSchedule = __webpack_require__(111);

	var _baseNotificationSchedule2 = _interopRequireDefault(_baseNotificationSchedule);

	var _notificationScheduleTypes = __webpack_require__(75);

	var _notificationScheduleTypes2 = _interopRequireDefault(_notificationScheduleTypes);

	var _notificationScheduleParser = __webpack_require__(112);

	var _mathUtils = __webpack_require__(116);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UrlNotificationSchedule = function (_BaseNotificationSche) {
	  _inherits(UrlNotificationSchedule, _BaseNotificationSche);

	  function UrlNotificationSchedule(source) {
	    _classCallCheck(this, UrlNotificationSchedule);

	    return _possibleConstructorReturn(this, (UrlNotificationSchedule.__proto__ || Object.getPrototypeOf(UrlNotificationSchedule)).call(this, _notificationScheduleTypes2.default.URL, source));
	  }

	  _createClass(UrlNotificationSchedule, [{
	    key: 'getNextDate',
	    value: function getNextDate() {
	      return (0, _notificationScheduleParser.addTime)(new Date(), { count: (0, _mathUtils.getRandomInt)(2, 10), units: 's' });
	    }
	  }, {
	    key: 'urls',
	    get: function get() {
	      return this.__source.urls;
	    }
	  }]);

	  return UrlNotificationSchedule;
	}(_baseNotificationSchedule2.default);

	exports.default = UrlNotificationSchedule;

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRandomArbitrary = getRandomArbitrary;
	exports.getRandomInt = getRandomInt;
	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}

	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _notificationHistoryObject = __webpack_require__(118);

	var _notificationHistoryObject2 = _interopRequireDefault(_notificationHistoryObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationHistoryManager = function () {
	  function NotificationHistoryManager(notificationHistoryStorage) {
	    _classCallCheck(this, NotificationHistoryManager);

	    this.__notificationHistoryStorage = notificationHistoryStorage;
	  }

	  _createClass(NotificationHistoryManager, [{
	    key: 'getNotificationHistory',
	    value: function getNotificationHistory(notificationId) {
	      return this.__loadData().then(function (history) {
	        return history[notificationId];
	      }).then(function (source) {
	        return new _notificationHistoryObject2.default(source);
	      });
	    }
	  }, {
	    key: 'logNotificationDisplay',
	    value: function logNotificationDisplay(notificationId) {
	      var _this = this;

	      return this.__loadData().then(function (history) {
	        if (history.hasOwnProperty(notificationId)) {
	          history[notificationId].lastDisplayDate = new Date();
	          history[notificationId].displayCount += 1;
	        } else {
	          history[notificationId] = {
	            lastDisplayDate: new Date(),
	            displayCount: 1
	          };
	        }
	        return _this.__saveData(history);
	      });
	    }
	  }, {
	    key: '__loadData',
	    value: function __loadData() {
	      return this.__notificationHistoryStorage.getData().catch(function () {
	        return {};
	      });
	    }
	  }, {
	    key: '__saveData',
	    value: function __saveData(value) {
	      return this.__notificationHistoryStorage.setData(value);
	    }
	  }]);

	  return NotificationHistoryManager;
	}();

	exports.default = NotificationHistoryManager;

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_HISTORY = { lastDisplayDate: new Date(0), displayCount: 0 };

	var NotificationHistoryObject = function () {
	  function NotificationHistoryObject() {
	    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_HISTORY;

	    _classCallCheck(this, NotificationHistoryObject);

	    this.__lastDisplayDate = new Date(source.lastDisplayDate);
	    this.__displayCount = source.displayCount;
	  }

	  _createClass(NotificationHistoryObject, [{
	    key: "lastDisplayDate",
	    get: function get() {
	      return this.__lastDisplayDate;
	    }
	  }, {
	    key: "displayCount",
	    get: function get() {
	      return this.__displayCount;
	    }
	  }]);

	  return NotificationHistoryObject;
	}();

	exports.default = NotificationHistoryObject;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _each = __webpack_require__(32);

	var _each2 = _interopRequireDefault(_each);

	var _guid = __webpack_require__(14);

	var _guid2 = _interopRequireDefault(_guid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DistributionCommonModule = function () {
	  function DistributionCommonModule(extensionDataGenerator, extensionDataStorage, extensionSettingsStorage) {
	    var additionalExtensionData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    _classCallCheck(this, DistributionCommonModule);

	    this.__extensionDataStorage = extensionDataStorage;
	    this.__extensionSettingsStorage = extensionSettingsStorage;
	    this.__extensionDataGenerator = extensionDataGenerator;
	    this.__additionalExtensionData = additionalExtensionData;
	    this.__plugins = new Map();
	  }

	  _createClass(DistributionCommonModule, [{
	    key: 'getExtensionData',
	    value: function getExtensionData() {
	      return this.__extensionDataStorage.getData();
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      var _this = this;

	      return this.__generateExtensionData().then(function () {
	        return _this.__runPlugins();
	      });
	    }
	  }, {
	    key: 'registerPlugin',
	    value: function registerPlugin(plugin) {
	      plugin.setHost(this);
	      this.__plugins.set(plugin.getName() + '_' + (0, _guid2.default)(), plugin);
	      return this;
	    }
	  }, {
	    key: '__hasExtensionData',
	    value: function __hasExtensionData() {
	      var _this2 = this;

	      return Promise.all([this.__extensionDataStorage.hasData(), this.__extensionSettingsStorage.hasData()]).then(function (results) {
	        var _results = _slicedToArray(results, 2),
	            hasExtensionData = _results[0],
	            hasExtensionSettings = _results[1];

	        if (!hasExtensionData) {
	          return false;
	        }
	        if (hasExtensionSettings) {
	          return _this2.__extensionSettingsStorage.getData().then(function (extensionSettings) {
	            return extensionSettings.persistent === true;
	          });
	        }
	        return true;
	      });
	    }
	  }, {
	    key: '__generateExtensionData',
	    value: function __generateExtensionData() {
	      var _this3 = this;

	      return this.__hasExtensionData().then(function (hasData) {
	        if (hasData) {
	          return;
	        }
	        return _this3.__extensionDataGenerator.generateExtensionData().then(function (_ref) {
	          var extensionSettings = _ref.extensionSettings,
	              extensionData = _ref.extensionData;
	          return _this3.__extensionSettingsStorage.setData(extensionSettings).then(function () {
	            return extensionData;
	          });
	        }).then(function (extensionData) {
	          return _extends({}, extensionData, _this3.__additionalExtensionData);
	        }).then(function (extensionData) {
	          return _this3.__extensionDataStorage.setData(extensionData);
	        });
	      });
	    }
	  }, {
	    key: '__runPlugins',
	    value: function __runPlugins() {
	      var _this4 = this;

	      (0, _each2.default)(this.__plugins.keys(), function (key, callback) {
	        var plugin = _this4.__plugins.get(key);
	        console.info('>>> RUN', plugin.getName());
	        plugin.run().then(callback);
	      });
	    }
	  }]);

	  return DistributionCommonModule;
	}();

	exports.default = DistributionCommonModule;

/***/ }
/******/ ])
});
;