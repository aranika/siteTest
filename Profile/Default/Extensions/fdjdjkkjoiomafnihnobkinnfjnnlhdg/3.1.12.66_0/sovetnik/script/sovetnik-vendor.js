/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["loadSovetnikModule"];
/******/ 	window["loadSovetnikModule"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

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

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"ecomerce-context","1":"sovetnik-templates"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/*jslint bitwise: true, nomen: true, plusplus: true, white: true */

	/*!
	* Mediator.js Library v0.9.7
	* https://github.com/ajacksified/Mediator.js
	*
	* Copyright 2013, Jack Lawson
	* MIT Licensed (http://www.opensource.org/licenses/mit-license.php)
	*
	* For more information: http://thejacklawson.com/2011/06/mediators-for-modularized-asynchronous-programming-in-javascript/index.html
	* Project on GitHub: https://github.com/ajacksified/Mediator.js
	*
	* Last update: October 19 2013
	*/

	(function(global, factory) {
	  'use strict';

	  if(true) {
	    // Node/CommonJS
	    exports.Mediator = factory();
	  } else if(typeof define === 'function' && define.amd) {
	    // AMD
	    define('mediator-js', [], function() {
	      global.Mediator = factory();
	      return global.Mediator;
	    });
	  } else {
	    // Browser global
	    global.Mediator = factory();
	  }
	}(this, function() {
	  'use strict';

	  // We'll generate guids for class instances for easy referencing later on.
	  // Subscriber instances will have an id that can be refernced for quick
	  // lookups.

	  function guidGenerator() {
	    var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };

	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	  }

	  // Subscribers are instances of Mediator Channel registrations. We generate
	  // an object instance so that it can be updated later on without having to
	  // unregister and re-register. Subscribers are constructed with a function
	  // to be called, options object, and context.

	  function Subscriber(fn, options, context){
	    if(!(this instanceof Subscriber)) {
	      return new Subscriber(fn, options, context);
	    }

	    this.id = guidGenerator();
	    this.fn = fn;
	    this.options = options;
	    this.context = context;
	    this.channel = null;
	  }

	  Subscriber.prototype = {
	    // Mediator.update on a subscriber instance can update its function,context,
	    // or options object. It takes in an object and looks for fn, context, or
	    // options keys.

	    update: function(options){
	      if(options){
	        this.fn = options.fn || this.fn;
	        this.context = options.context || this.context;
	        this.options = options.options || this.options;
	        if(this.channel && this.options && this.options.priority !== undefined) {
	            this.channel.setPriority(this.id, this.options.priority);
	        }
	      }
	    }
	  };


	  function Channel(namespace, parent){
	    if(!(this instanceof Channel)) {
	      return new Channel(namespace);
	    }

	    this.namespace = namespace || "";
	    this._subscribers = [];
	    this._channels = [];
	    this._parent = parent;
	    this.stopped = false;
	  }

	  // A Mediator channel holds a list of sub-channels and subscribers to be fired
	  // when Mediator.publish is called on the Mediator instance. It also contains
	  // some methods to manipulate its lists of data; only setPriority and
	  // StopPropagation are meant to be used. The other methods should be accessed
	  // through the Mediator instance.

	  Channel.prototype = {
	    addSubscriber: function(fn, options, context){
	      var subscriber = new Subscriber(fn, options, context);

	      if(options && options.priority !== undefined){
	        // Cheap hack to either parse as an int or turn it into 0. Runs faster
	        // in many browsers than parseInt with the benefit that it won't
	        // return a NaN.
	        options.priority = options.priority >> 0;

	        if(options.priority < 0){ options.priority = 0; }
	        if(options.priority >= this._subscribers.length){ options.priority = this._subscribers.length-1; }

	        this._subscribers.splice(options.priority, 0, subscriber);
	      }else{
	        this._subscribers.push(subscriber);
	      }

	      subscriber.channel = this;

	      return subscriber;
	    },

	    // The channel instance is passed as an argument to the mediator subscriber,
	    // and further subscriber propagation can be called with
	    // channel.StopPropagation().
	    stopPropagation: function(){
	      this.stopped = true;
	    },

	    getSubscriber: function(identifier){
	      var x = 0,
	          y = this._subscribers.length;

	      for(x, y; x < y; x++){
	        if(this._subscribers[x].id === identifier || this._subscribers[x].fn === identifier){
	          return this._subscribers[x];
	        }
	      }
	    },

	    // Channel.setPriority is useful in updating the order in which Subscribers
	    // are called, and takes an identifier (subscriber id or named function) and
	    // an array index. It will not search recursively through subchannels.

	    setPriority: function(identifier, priority){
	      var oldIndex = 0,
	          x = 0,
	          sub, firstHalf, lastHalf, y;

	      for(x = 0, y = this._subscribers.length; x < y; x++){
	        if(this._subscribers[x].id === identifier || this._subscribers[x].fn === identifier){
	          break;
	        }
	        oldIndex ++;
	      }

	      sub = this._subscribers[oldIndex];
	      firstHalf = this._subscribers.slice(0, oldIndex);
	      lastHalf = this._subscribers.slice(oldIndex+1);

	      this._subscribers = firstHalf.concat(lastHalf);
	      this._subscribers.splice(priority, 0, sub);
	    },

	    addChannel: function(channel){
	      this._channels[channel] = new Channel((this.namespace ? this.namespace + ':' : '') + channel, this);
	    },

	    hasChannel: function(channel){
	      return this._channels.hasOwnProperty(channel);
	    },

	    returnChannel: function(channel){
	      return this._channels[channel];
	    },

	    removeSubscriber: function(identifier){
	      var x = this._subscribers.length - 1;

	      // If we don't pass in an id, we're clearing all
	      if(!identifier){
	        this._subscribers = [];
	        return;
	      }

	      // Going backwards makes splicing a whole lot easier.
	      for(x; x >= 0; x--) {
	        if(this._subscribers[x].fn === identifier || this._subscribers[x].id === identifier){
	          this._subscribers[x].channel = null;
	          this._subscribers.splice(x,1);
	        }
	      }
	    },

	    // This will publish arbitrary arguments to a subscriber and then to parent
	    // channels.

	    publish: function(data){
	      var x = 0,
	          y = this._subscribers.length,
	          called = false,
	          subscriber, l,
	          subsBefore,subsAfter;

	      // Priority is preserved in the _subscribers index.
	      for(x, y; x < y; x++) {
	        called = false;

	        if(!this.stopped){
	          subscriber = this._subscribers[x];
	          if(subscriber.options !== undefined && typeof subscriber.options.predicate === "function"){
	            if(subscriber.options.predicate.apply(subscriber.context, data)){
	              subscriber.fn.apply(subscriber.context, data);
	              called = true;
	            }
	          }else{
	            subsBefore = this._subscribers.length;
	            subscriber.fn.apply(subscriber.context, data);
	            subsAfter = this._subscribers.length;
	            y = subsAfter;
	            if (subsAfter === subsBefore - 1){
	              x--;
	            }
	            called = true;
	          }
	        }

	        if(called && subscriber.options && subscriber.options !== undefined){
	          subscriber.options.calls--;

	          if(subscriber.options.calls < 1){
	            this.removeSubscriber(subscriber.id);
	            y--;
	            x--;
	          }
	        }
	      }

	      if(this._parent){
	        this._parent.publish(data);
	      }

	      this.stopped = false;
	    }
	  };

	  function Mediator() {
	    if(!(this instanceof Mediator)) {
	      return new Mediator();
	    }

	    this._channels = new Channel('');
	  }

	  // A Mediator instance is the interface through which events are registered
	  // and removed from publish channels.

	  Mediator.prototype = {

	    // Returns a channel instance based on namespace, for example
	    // application:chat:message:received

	    getChannel: function(namespace){
	      var channel = this._channels,
	          namespaceHierarchy = namespace.split(':'),
	          x = 0, 
	          y = namespaceHierarchy.length;

	      if(namespace === ''){
	        return channel;
	      }

	      if(namespaceHierarchy.length > 0){
	        for(x, y; x < y; x++){

	          if(!channel.hasChannel(namespaceHierarchy[x])){
	            channel.addChannel(namespaceHierarchy[x]);
	          }

	          channel = channel.returnChannel(namespaceHierarchy[x]);
	        }
	      }

	      return channel;
	    },

	    // Pass in a channel namespace, function to be called, options, and context
	    // to call the function in to Subscribe. It will create a channel if one
	    // does not exist. Options can include a predicate to determine if it
	    // should be called (based on the data published to it) and a priority
	    // index.

	    subscribe: function(channelName, fn, options, context){
	      var channel = this.getChannel(channelName);

	      options = options || {};
	      context = context || {};

	      return channel.addSubscriber(fn, options, context);
	    },

	    // Pass in a channel namespace, function to be called, options, and context
	    // to call the function in to Subscribe. It will create a channel if one
	    // does not exist. Options can include a predicate to determine if it
	    // should be called (based on the data published to it) and a priority
	    // index.

	    once: function(channelName, fn, options, context){
	      options = options || {};
	      options.calls = 1;

	      return this.subscribe(channelName, fn, options, context);
	    },

	    // Returns a subscriber for a given subscriber id / named function and
	    // channel namespace

	    getSubscriber: function(identifier, channel){
	      return this.getChannel(channel || "").getSubscriber(identifier);
	    },

	    // Remove a subscriber from a given channel namespace recursively based on
	    // a passed-in subscriber id or named function.

	    remove: function(channelName, identifier){
	      this.getChannel(channelName).removeSubscriber(identifier);
	    },

	    // Publishes arbitrary data to a given channel namespace. Channels are
	    // called recursively downwards; a post to application:chat will post to
	    // application:chat:receive and application:chat:derp:test:beta:bananas.
	    // Called using Mediator.publish("application:chat", [ args ]);

	    publish: function(channelName){
	      var args = Array.prototype.slice.call(arguments, 1),
	          channel = this.getChannel(channelName);

	      args.push(channel);

	      this.getChannel(channelName).publish(args);
	    }
	  };

	  // Alias some common names for easy interop
	  Mediator.prototype.on = Mediator.prototype.subscribe;
	  Mediator.prototype.bind = Mediator.prototype.subscribe;
	  Mediator.prototype.emit = Mediator.prototype.publish;
	  Mediator.prototype.trigger = Mediator.prototype.publish;
	  Mediator.prototype.off = Mediator.prototype.remove;

	  // Finally, expose it all.

	  Mediator.Channel = Channel;
	  Mediator.Subscriber = Subscriber;
	  Mediator.version = "0.9.7";

	  return Mediator;
	}));
	  


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {/**@license MIT-promiscuous-©Ruben Verborgh*/
	(function (func, obj) {
	  // Type checking utility function
	  function is(type, item) { return (typeof item)[0] == type; }

	  // Creates a promise, calling callback(resolve, reject), ignoring other parameters.
	  function Promise(callback, handler) {
	    // The `handler` variable points to the function that will
	    // 1) handle a .then(resolved, rejected) call
	    // 2) handle a resolve or reject call (if the first argument === `is`)
	    // Before 2), `handler` holds a queue of callbacks.
	    // After 2), `handler` is a finalized .then handler.
	    handler = function pendingHandler(resolved, rejected, value, queue, then, i) {
	      queue = pendingHandler.q;

	      // Case 1) handle a .then(resolved, rejected) call
	      if (resolved != is) {
	        return Promise(function (resolve, reject) {
	          queue.push({ p: this, r: resolve, j: reject, 1: resolved, 0: rejected });
	        });
	      }

	      // Case 2) handle a resolve or reject call
	      // (`resolved` === `is` acts as a sentinel)
	      // The actual function signature is
	      // .re[ject|solve](<is>, success, value)

	      // Check if the value is a promise and try to obtain its `then` method
	      if (value && (is(func, value) | is(obj, value))) {
	        try { then = value.then; }
	        catch (reason) { rejected = 0; value = reason; }
	      }
	      // If the value is a promise, take over its state
	      if (is(func, then)) {
	        function valueHandler(resolved) {
	          return function (value) { then && (then = 0, pendingHandler(is, resolved, value)); };
	        }
	        try { then.call(value, valueHandler(1), rejected = valueHandler(0)); }
	        catch (reason) { rejected(reason); }
	      }
	      // The value is not a promise; handle resolve/reject
	      else {
	        // Replace this handler with a finalized resolved/rejected handler
	        handler = function (Resolved, Rejected) {
	          // If the Resolved or Rejected parameter is not a function,
	          // return the original promise (now stored in the `callback` variable)
	          if (!is(func, (Resolved = rejected ? Resolved : Rejected)))
	            return callback;
	          // Otherwise, return a finalized promise, transforming the value with the function
	          return Promise(function (resolve, reject) { finalize(this, resolve, reject, value, Resolved); });
	        };
	        // Resolve/reject pending callbacks
	        i = 0;
	        while (i < queue.length) {
	          then = queue[i++];
	          // If no callback, just resolve/reject the promise
	          if (!is(func, resolved = then[rejected]))
	            (rejected ? then.r : then.j)(value);
	          // Otherwise, resolve/reject the promise with the result of the callback
	          else
	            finalize(then.p, then.r, then.j, value, resolved);
	        }
	      }
	    };
	    // The queue of pending callbacks; garbage-collected when handler is resolved/rejected
	    handler.q = [];

	    // Create and return the promise (reusing the callback variable)
	    callback.call(callback = { then:  function (resolved, rejected) { return handler(resolved, rejected); },
	                               catch: function (rejected)           { return handler(0,        rejected); } },
	                  function (value)  { handler(is, 1,  value); },
	                  function (reason) { handler(is, 0, reason); });
	    return callback;
	  }

	  // Finalizes the promise by resolving/rejecting it with the transformed value
	  function finalize(promise, resolve, reject, value, transform) {
	    setImmediate(function () {
	      try {
	        // Transform the value through and check whether it's a promise
	        value = transform(value);
	        transform = value && (is(obj, value) | is(func, value)) && value.then;
	        // Return the result if it's not a promise
	        if (!is(func, transform))
	          resolve(value);
	        // If it's a promise, make sure it's not circular
	        else if (value == promise)
	          reject(TypeError());
	        // Take over the promise's state
	        else
	          transform.call(value, resolve, reject);
	      }
	      catch (error) { reject(error); }
	    });
	  }

	  // Export the main module
	  module.exports = Promise;

	  // Creates a resolved promise
	  Promise.resolve = ResolvedPromise;
	  function ResolvedPromise(value) { return Promise(function (resolve) { resolve(value); }); }

	  // Creates a rejected promise
	  Promise.reject = function (reason) { return Promise(function (resolve, reject) { reject(reason); }); };

	  // Transforms an array of promises into a promise for an array
	  Promise.all = function (promises) {
	    return Promise(function (resolve, reject, count, values) {
	      // Array of collected values
	      values = [];
	      // Resolve immediately if there are no promises
	      count = promises.length || resolve(values);
	      // Transform all elements (`map` is shorter than `forEach`)
	      promises.map(function (promise, index) {
	        ResolvedPromise(promise).then(
	          // Store the value and resolve if it was the last
	          function (value) {
	            values[index] = value;
	            --count || resolve(values);
	          },
	          // Reject if one element fails
	          reject);
	      });
	    });
	  };
	})('f', 'o');

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate))

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(11).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).setImmediate, __webpack_require__(10).clearImmediate))

/***/ },

/***/ 11:
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory(__webpack_require__(16));
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define(["./core"], factory);
		}
		else {
			// Global (browser)
			factory(root.CryptoJS);
		}
	}(this, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_algo = C.algo;

		    // Constants table
		    var T = [];

		    // Compute constants
		    (function () {
		        for (var i = 0; i < 64; i++) {
		            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
		        }
		    }());

		    /**
		     * MD5 hash algorithm.
		     */
		    var MD5 = C_algo.MD5 = Hasher.extend({
		        _doReset: function () {
		            this._hash = new WordArray.init([
		                0x67452301, 0xefcdab89,
		                0x98badcfe, 0x10325476
		            ]);
		        },

		        _doProcessBlock: function (M, offset) {
		            // Swap endian
		            for (var i = 0; i < 16; i++) {
		                // Shortcuts
		                var offset_i = offset + i;
		                var M_offset_i = M[offset_i];

		                M[offset_i] = (
		                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
		                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
		                );
		            }

		            // Shortcuts
		            var H = this._hash.words;

		            var M_offset_0  = M[offset + 0];
		            var M_offset_1  = M[offset + 1];
		            var M_offset_2  = M[offset + 2];
		            var M_offset_3  = M[offset + 3];
		            var M_offset_4  = M[offset + 4];
		            var M_offset_5  = M[offset + 5];
		            var M_offset_6  = M[offset + 6];
		            var M_offset_7  = M[offset + 7];
		            var M_offset_8  = M[offset + 8];
		            var M_offset_9  = M[offset + 9];
		            var M_offset_10 = M[offset + 10];
		            var M_offset_11 = M[offset + 11];
		            var M_offset_12 = M[offset + 12];
		            var M_offset_13 = M[offset + 13];
		            var M_offset_14 = M[offset + 14];
		            var M_offset_15 = M[offset + 15];

		            // Working varialbes
		            var a = H[0];
		            var b = H[1];
		            var c = H[2];
		            var d = H[3];

		            // Computation
		            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
		            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
		            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
		            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
		            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
		            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
		            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
		            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
		            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
		            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
		            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
		            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
		            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
		            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
		            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
		            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

		            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
		            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
		            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
		            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
		            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
		            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
		            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
		            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
		            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
		            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
		            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
		            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
		            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
		            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
		            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
		            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

		            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
		            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
		            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
		            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
		            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
		            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
		            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
		            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
		            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
		            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
		            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
		            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
		            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
		            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
		            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
		            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

		            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
		            d = II(d, a, b, c, M_offset_7,  10, T[49]);
		            c = II(c, d, a, b, M_offset_14, 15, T[50]);
		            b = II(b, c, d, a, M_offset_5,  21, T[51]);
		            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
		            d = II(d, a, b, c, M_offset_3,  10, T[53]);
		            c = II(c, d, a, b, M_offset_10, 15, T[54]);
		            b = II(b, c, d, a, M_offset_1,  21, T[55]);
		            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
		            d = II(d, a, b, c, M_offset_15, 10, T[57]);
		            c = II(c, d, a, b, M_offset_6,  15, T[58]);
		            b = II(b, c, d, a, M_offset_13, 21, T[59]);
		            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
		            d = II(d, a, b, c, M_offset_11, 10, T[61]);
		            c = II(c, d, a, b, M_offset_2,  15, T[62]);
		            b = II(b, c, d, a, M_offset_9,  21, T[63]);

		            // Intermediate hash value
		            H[0] = (H[0] + a) | 0;
		            H[1] = (H[1] + b) | 0;
		            H[2] = (H[2] + c) | 0;
		            H[3] = (H[3] + d) | 0;
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;

		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		            var nBitsTotalL = nBitsTotal;
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
		                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		            );
		            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
		                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
		                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		            );

		            data.sigBytes = (dataWords.length + 1) * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var hash = this._hash;
		            var H = hash.words;

		            // Swap endian
		            for (var i = 0; i < 4; i++) {
		                // Shortcut
		                var H_i = H[i];

		                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
		                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		            }

		            // Return final computed hash
		            return hash;
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);
		            clone._hash = this._hash.clone();

		            return clone;
		        }
		    });

		    function FF(a, b, c, d, x, s, t) {
		        var n = a + ((b & c) | (~b & d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function GG(a, b, c, d, x, s, t) {
		        var n = a + ((b & d) | (c & ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function HH(a, b, c, d, x, s, t) {
		        var n = a + (b ^ c ^ d) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    function II(a, b, c, d, x, s, t) {
		        var n = a + (c ^ (b | ~d)) + x + t;
		        return ((n << s) | (n >>> (32 - s))) + b;
		    }

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.MD5('message');
		     *     var hash = CryptoJS.MD5(wordArray);
		     */
		    C.MD5 = Hasher._createHelper(MD5);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacMD5(message, key);
		     */
		    C.HmacMD5 = Hasher._createHmacHelper(MD5);
		}(Math));


		return CryptoJS.MD5;

	}));

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	;(function (root, factory) {
		if (true) {
			// CommonJS
			module.exports = exports = factory();
		}
		else if (typeof define === "function" && define.amd) {
			// AMD
			define([], factory);
		}
		else {
			// Global (browser)
			root.CryptoJS = factory();
		}
	}(this, function () {

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined) {
		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {
		        function F() {}

		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                F.prototype = this;
		                var subtype = new F();

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init')) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;

		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });

		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);

		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));

/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	// This file is for use with Node.js. See dist/ for browser files.

	var Hogan = __webpack_require__(95);
	Hogan.Template = __webpack_require__(96).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;

	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };

	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';

	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }

	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }

	      return isAllWhitespace;
	    }

	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();

	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }

	      seenTag = false;
	      lineStart = tokens.length;
	    }

	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');

	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];

	      return closeIndex + close.length - 1;
	    }

	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }

	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }

	    filterLine(seenTag, true);

	    return tokens;
	  }

	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }

	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }

	    return s.replace(/^\s*|\s*$/g, '');
	  }

	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }

	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }

	    return true;
	  }

	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;

	    tail = stack[stack.length - 1];

	    while (tokens.length > 0) {
	      token = tokens.shift();

	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }

	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }

	      instructions.push(token);
	    }

	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }

	    return instructions;
	  }

	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }

	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }

	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }

	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }

	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }

	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);

	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }

	    return this.makeTemplate(context, text, options);
	  }

	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }

	  Hogan.template = Hogan.Template;

	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }

	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }

	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }

	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }

	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }

	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },

	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },

	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },

	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },

	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },

	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },

	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },

	    '{': tripleStache,

	    '&': tripleStache
	  }

	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }

	  function write(s) {
	    return 't.b(' + s + ');';
	  }

	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }

	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }

	  Hogan.cache = {};

	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }

	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];

	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }

	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})( true ? exports : Hogan);


/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	var Hogan = {};

	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }

	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },

	    // variable escaping
	    v: hoganEscape,

	    // triple stache
	    t: coerceToString,

	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },

	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },

	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];

	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }

	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }

	      if (!template) {
	        return null;
	      }

	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;

	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;

	      return template;
	    },

	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }

	      return partial.ri(context, partials, indent);
	    },

	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];

	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }

	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },

	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;

	      if (isArray(val) && val.length === 0) {
	        return false;
	      }

	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }

	      pass = !!val;

	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }

	      return pass;
	    },

	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;

	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }

	      if (returnFound && !val) {
	        return false;
	      }

	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }

	      return val;
	    },

	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;

	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }

	      if (!found) {
	        return (returnFound) ? false : "";
	      }

	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }

	      return val;
	    },

	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;

	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;

	      return false;
	    },

	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },

	    // template result buffering
	    b: function(s) { this.buf += s; },

	    fl: function() { var r = this.buf; this.buf = ''; return r; },

	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);

	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }

	      return result;
	    },

	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);

	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }

	      return result;
	    },

	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }

	  };

	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;

	    if (scope && typeof scope == 'object') {

	      if (scope[key] !== undefined) {
	        val = scope[key];

	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }

	    return val;
	  }

	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';

	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }

	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }

	    return partial;
	  }

	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;

	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }

	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }

	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };

	})( true ? exports : Hogan);


/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(185);


/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var destroy = __webpack_require__(186);
	var initialize = __webpack_require__(194);
	var update = __webpack_require__(204);

	module.exports = {
	  initialize: initialize,
	  update: update,
	  destroy: destroy
	};


/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var dom = __webpack_require__(189);
	var instances = __webpack_require__(190);

	module.exports = function (element) {
	  var i = instances.get(element);

	  if (!i) {
	    return;
	  }

	  i.event.unbindAll();
	  dom.remove(i.scrollbarX);
	  dom.remove(i.scrollbarY);
	  dom.remove(i.scrollbarXRail);
	  dom.remove(i.scrollbarYRail);
	  _.removePsClasses(element);

	  instances.remove(element);
	};


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cls = __webpack_require__(188);
	var dom = __webpack_require__(189);

	var toInt = exports.toInt = function (x) {
	  return parseInt(x, 10) || 0;
	};

	var clone = exports.clone = function (obj) {
	  if (obj === null) {
	    return null;
	  } else if (obj.constructor === Array) {
	    return obj.map(clone);
	  } else if (typeof obj === 'object') {
	    var result = {};
	    for (var key in obj) {
	      result[key] = clone(obj[key]);
	    }
	    return result;
	  } else {
	    return obj;
	  }
	};

	exports.extend = function (original, source) {
	  var result = clone(original);
	  for (var key in source) {
	    result[key] = clone(source[key]);
	  }
	  return result;
	};

	exports.isEditable = function (el) {
	  return dom.matches(el, "input,[contenteditable]") ||
	         dom.matches(el, "select,[contenteditable]") ||
	         dom.matches(el, "textarea,[contenteditable]") ||
	         dom.matches(el, "button,[contenteditable]");
	};

	exports.removePsClasses = function (element) {
	  var clsList = cls.list(element);
	  for (var i = 0; i < clsList.length; i++) {
	    var className = clsList[i];
	    if (className.indexOf('ps-') === 0) {
	      cls.remove(element, className);
	    }
	  }
	};

	exports.outerWidth = function (element) {
	  return toInt(dom.css(element, 'width')) +
	         toInt(dom.css(element, 'paddingLeft')) +
	         toInt(dom.css(element, 'paddingRight')) +
	         toInt(dom.css(element, 'borderLeftWidth')) +
	         toInt(dom.css(element, 'borderRightWidth'));
	};

	exports.startScrolling = function (element, axis) {
	  cls.add(element, 'ps-in-scrolling');
	  if (typeof axis !== 'undefined') {
	    cls.add(element, 'ps-' + axis);
	  } else {
	    cls.add(element, 'ps-x');
	    cls.add(element, 'ps-y');
	  }
	};

	exports.stopScrolling = function (element, axis) {
	  cls.remove(element, 'ps-in-scrolling');
	  if (typeof axis !== 'undefined') {
	    cls.remove(element, 'ps-' + axis);
	  } else {
	    cls.remove(element, 'ps-x');
	    cls.remove(element, 'ps-y');
	  }
	};

	exports.env = {
	  isWebKit: 'WebkitAppearance' in document.documentElement.style,
	  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
	  supportsIePointer: window.navigator.msMaxTouchPoints !== null
	};


/***/ },

/***/ 188:
/***/ function(module, exports) {

	'use strict';

	function oldAdd(element, className) {
	  var classes = element.className.split(' ');
	  if (classes.indexOf(className) < 0) {
	    classes.push(className);
	  }
	  element.className = classes.join(' ');
	}

	function oldRemove(element, className) {
	  var classes = element.className.split(' ');
	  var idx = classes.indexOf(className);
	  if (idx >= 0) {
	    classes.splice(idx, 1);
	  }
	  element.className = classes.join(' ');
	}

	exports.add = function (element, className) {
	  if (element.classList) {
	    element.classList.add(className);
	  } else {
	    oldAdd(element, className);
	  }
	};

	exports.remove = function (element, className) {
	  if (element.classList) {
	    element.classList.remove(className);
	  } else {
	    oldRemove(element, className);
	  }
	};

	exports.list = function (element) {
	  if (element.classList) {
	    return Array.prototype.slice.apply(element.classList);
	  } else {
	    return element.className.split(' ');
	  }
	};


/***/ },

/***/ 189:
/***/ function(module, exports) {

	'use strict';

	var DOM = {};

	DOM.e = function (tagName, className) {
	  var element = document.createElement(tagName);
	  element.className = className;
	  return element;
	};

	DOM.appendTo = function (child, parent) {
	  parent.appendChild(child);
	  return child;
	};

	function cssGet(element, styleName) {
	  return window.getComputedStyle(element)[styleName];
	}

	function cssSet(element, styleName, styleValue) {
	  if (typeof styleValue === 'number') {
	    styleValue = styleValue.toString() + 'px';
	  }
	    
	  element.style.setProperty (styleName, styleValue, "important");
	  return element;
	}

	function cssMultiSet(element, obj) {
	  for (var key in obj) {
	    var val = obj[key];
	    if (typeof val === 'number') {
	      val = val.toString() + 'px';
	    }
	      
	    element.style.setProperty (key, val, "important");
	  }
	  return element;
	}

	DOM.css = function (element, styleNameOrObject, styleValue) {
	  if (typeof styleNameOrObject === 'object') {
	    // multiple set with object
	    return cssMultiSet(element, styleNameOrObject);
	  } else {
	    if (typeof styleValue === 'undefined') {
	      return cssGet(element, styleNameOrObject);
	    } else {
	      return cssSet(element, styleNameOrObject, styleValue);
	    }
	  }
	};

	DOM.matches = function (element, query) {
	  if (typeof element.matches !== 'undefined') {
	    return element.matches(query);
	  } else {
	    if (typeof element.matchesSelector !== 'undefined') {
	      return element.matchesSelector(query);
	    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
	      return element.webkitMatchesSelector(query);
	    } else if (typeof element.mozMatchesSelector !== 'undefined') {
	      return element.mozMatchesSelector(query);
	    } else if (typeof element.msMatchesSelector !== 'undefined') {
	      return element.msMatchesSelector(query);
	    }
	  }
	};

	DOM.remove = function (element) {
	  if (typeof element.remove !== 'undefined') {
	    element.remove();
	  } else {
	    if (element.parentNode) {
	      element.parentNode.removeChild(element);
	    }
	  }
	};

	DOM.queryChildren = function (element, selector) {
	  return Array.prototype.filter.call(element.childNodes, function (child) {
	    return DOM.matches(child, selector);
	  });
	};

	module.exports = DOM;


/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var cls = __webpack_require__(188);
	var defaultSettings = __webpack_require__(191);
	var dom = __webpack_require__(189);
	var EventManager = __webpack_require__(192);
	var guid = __webpack_require__(193);

	var instances = {};

	function Instance(element) {
	  var i = this;

	  i.settings = _.clone(defaultSettings);
	  i.containerWidth = null;
	  i.containerHeight = null;
	  i.contentWidth = null;
	  i.contentHeight = null;

	  i.isRtl = dom.css(element, 'direction') === "rtl";
	  i.isNegativeScroll = (function () {
	    var originalScrollLeft = element.scrollLeft;
	    var result = null;
	    element.scrollLeft = -1;
	    result = element.scrollLeft < 0;
	    element.scrollLeft = originalScrollLeft;
	    return result;
	  })();
	  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
	  i.event = new EventManager();
	  i.ownerDocument = element.ownerDocument || document;

	  function focus() {
	    cls.add(element, 'ps-focus');
	  }

	  function blur() {
	    cls.remove(element, 'ps-focus');
	  }

	  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
	  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
	  i.scrollbarX.setAttribute('tabindex', 0);
	  i.event.bind(i.scrollbarX, 'focus', focus);
	  i.event.bind(i.scrollbarX, 'blur', blur);
	  i.scrollbarXActive = null;
	  i.scrollbarXWidth = null;
	  i.scrollbarXLeft = null;
	  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
	  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
	  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
	  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
	  // Set rail to display:block to calculate margins
	  dom.css(i.scrollbarXRail, 'display', 'block');
	  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
	  dom.css(i.scrollbarXRail, 'display', '');
	  i.railXWidth = null;
	  i.railXRatio = null;

	  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
	  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
	  i.scrollbarY.setAttribute('tabindex', 0);
	  i.event.bind(i.scrollbarY, 'focus', focus);
	  i.event.bind(i.scrollbarY, 'blur', blur);
	  i.scrollbarYActive = null;
	  i.scrollbarYHeight = null;
	  i.scrollbarYTop = null;
	  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
	  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
	  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
	  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
	  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
	  dom.css(i.scrollbarYRail, 'display', 'block');
	  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
	  dom.css(i.scrollbarYRail, 'display', '');
	  i.railYHeight = null;
	  i.railYRatio = null;
	}

	function getId(element) {
	  return element.getAttribute('data-ps-id');
	}

	function setId(element, id) {
	  element.setAttribute('data-ps-id', id);
	}

	function removeId(element) {
	  element.removeAttribute('data-ps-id');
	}

	exports.add = function (element) {
	  var newId = guid();
	  setId(element, newId);
	  instances[newId] = new Instance(element);
	  return instances[newId];
	};

	exports.remove = function (element) {
	  delete instances[getId(element)];
	  removeId(element);
	};

	exports.get = function (element) {
	  return instances[getId(element)];
	};


/***/ },

/***/ 191:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
	  maxScrollbarLength: null,
	  minScrollbarLength: null,
	  scrollXMarginOffset: 0,
	  scrollYMarginOffset: 0,
	  stopPropagationOnClick: true,
	  suppressScrollX: false,
	  suppressScrollY: false,
	  swipePropagation: true,
	  useBothWheelAxes: false,
	  wheelPropagation: false,
	  wheelSpeed: 1,
	  theme: 'default'
	};


/***/ },

/***/ 192:
/***/ function(module, exports) {

	'use strict';

	var EventElement = function (element) {
	  this.element = element;
	  this.events = {};
	};

	EventElement.prototype.bind = function (eventName, handler) {
	  if (typeof this.events[eventName] === 'undefined') {
	    this.events[eventName] = [];
	  }
	  this.events[eventName].push(handler);
	  this.element.addEventListener(eventName, handler, false);
	};

	EventElement.prototype.unbind = function (eventName, handler) {
	  var isHandlerProvided = (typeof handler !== 'undefined');
	  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
	    if (isHandlerProvided && hdlr !== handler) {
	      return true;
	    }
	    this.element.removeEventListener(eventName, hdlr, false);
	    return false;
	  }, this);
	};

	EventElement.prototype.unbindAll = function () {
	  for (var name in this.events) {
	    this.unbind(name);
	  }
	};

	var EventManager = function () {
	  this.eventElements = [];
	};

	EventManager.prototype.eventElement = function (element) {
	  var ee = this.eventElements.filter(function (eventElement) {
	    return eventElement.element === element;
	  })[0];
	  if (typeof ee === 'undefined') {
	    ee = new EventElement(element);
	    this.eventElements.push(ee);
	  }
	  return ee;
	};

	EventManager.prototype.bind = function (element, eventName, handler) {
	  this.eventElement(element).bind(eventName, handler);
	};

	EventManager.prototype.unbind = function (element, eventName, handler) {
	  this.eventElement(element).unbind(eventName, handler);
	};

	EventManager.prototype.unbindAll = function () {
	  for (var i = 0; i < this.eventElements.length; i++) {
	    this.eventElements[i].unbindAll();
	  }
	};

	EventManager.prototype.once = function (element, eventName, handler) {
	  var ee = this.eventElement(element);
	  var onceHandler = function (e) {
	    ee.unbind(eventName, onceHandler);
	    handler(e);
	  };
	  ee.bind(eventName, onceHandler);
	};

	module.exports = EventManager;


/***/ },

/***/ 193:
/***/ function(module, exports) {

	'use strict';

	module.exports = (function () {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	               .toString(16)
	               .substring(1);
	  }
	  return function () {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	           s4() + '-' + s4() + s4() + s4();
	  };
	})();


/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var cls = __webpack_require__(188);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);

	// Handlers
	var handlers = {
	  'click-rail': __webpack_require__(197),
	  'drag-scrollbar': __webpack_require__(198),
	  'keyboard': __webpack_require__(199),
	  'wheel': __webpack_require__(200),
	  'touch': __webpack_require__(201),
	  'selection': __webpack_require__(202)
	};
	var nativeScrollHandler = __webpack_require__(203);

	module.exports = function (element, userSettings) {
	  userSettings = typeof userSettings === 'object' ? userSettings : {};

	  cls.add(element, 'ps-container');

	  // Create a plugin instance.
	  var i = instances.add(element);

	  i.settings = _.extend(i.settings, userSettings);
	  cls.add(element, 'ps-theme-' + i.settings.theme);

	  i.settings.handlers.forEach(function (handlerName) {
	    handlers[handlerName](element);
	  });

	  nativeScrollHandler(element);

	  updateGeometry(element);
	};


/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var cls = __webpack_require__(188);
	var dom = __webpack_require__(189);
	var instances = __webpack_require__(190);
	var updateScroll = __webpack_require__(196);

	function getThumbSize(i, thumbSize) {
	  if (i.settings.minScrollbarLength) {
	    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
	  }
	  if (i.settings.maxScrollbarLength) {
	    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
	  }
	  return thumbSize;
	}

	function updateCss(element, i) {
	  var xRailOffset = {width: i.railXWidth};
	  if (i.isRtl) {
	    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
	  } else {
	    xRailOffset.left = element.scrollLeft;
	  }
	  if (i.isScrollbarXUsingBottom) {
	    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
	  } else {
	    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
	  }
	  dom.css(i.scrollbarXRail, xRailOffset);

	  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
	  if (i.isScrollbarYUsingRight) {
	    if (i.isRtl) {
	      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
	    } else {
	      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
	    }
	  } else {
	    if (i.isRtl) {
	      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
	    } else {
	      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
	    }
	  }
	  dom.css(i.scrollbarYRail, yRailOffset);

	  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
	  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
	}

	module.exports = function (element) {
	  var i = instances.get(element);

	  i.containerWidth = element.clientWidth;
	  i.containerHeight = element.clientHeight;
	  i.contentWidth = element.scrollWidth;
	  i.contentHeight = element.scrollHeight;

	  var existingRails;
	  if (!element.contains(i.scrollbarXRail)) {
	    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
	    if (existingRails.length > 0) {
	      existingRails.forEach(function (rail) {
	        dom.remove(rail);
	      });
	    }
	    dom.appendTo(i.scrollbarXRail, element);
	  }
	  if (!element.contains(i.scrollbarYRail)) {
	    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
	    if (existingRails.length > 0) {
	      existingRails.forEach(function (rail) {
	        dom.remove(rail);
	      });
	    }
	    dom.appendTo(i.scrollbarYRail, element);
	  }

	  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
	    i.scrollbarXActive = true;
	    i.railXWidth = i.containerWidth - i.railXMarginWidth;
	    i.railXRatio = i.containerWidth / i.railXWidth;
	    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
	    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
	  } else {
	    i.scrollbarXActive = false;
	  }

	  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
	    i.scrollbarYActive = true;
	    i.railYHeight = i.containerHeight - i.railYMarginHeight;
	    i.railYRatio = i.containerHeight / i.railYHeight;
	    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
	    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
	  } else {
	    i.scrollbarYActive = false;
	  }

	  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
	    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
	  }
	  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
	    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
	  }

	  updateCss(element, i);

	  if (i.scrollbarXActive) {
	    cls.add(element, 'ps-active-x');
	  } else {
	    cls.remove(element, 'ps-active-x');
	    i.scrollbarXWidth = 0;
	    i.scrollbarXLeft = 0;
	    updateScroll(element, 'left', 0);
	  }
	  if (i.scrollbarYActive) {
	    cls.add(element, 'ps-active-y');
	  } else {
	    cls.remove(element, 'ps-active-y');
	    i.scrollbarYHeight = 0;
	    i.scrollbarYTop = 0;
	    updateScroll(element, 'top', 0);
	  }
	};


/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var instances = __webpack_require__(190);

	var lastTop;
	var lastLeft;

	var createDOMEvent = function (name) {
	  var event = document.createEvent("Event");
	  event.initEvent(name, true, true);
	  return event;
	};

	module.exports = function (element, axis, value) {
	  if (typeof element === 'undefined') {
	    throw 'You must provide an element to the update-scroll function';
	  }

	  if (typeof axis === 'undefined') {
	    throw 'You must provide an axis to the update-scroll function';
	  }

	  if (typeof value === 'undefined') {
	    throw 'You must provide a value to the update-scroll function';
	  }

	  if (axis === 'top' && value <= 0) {
	    element.scrollTop = value = 0; // don't allow negative scroll
	    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
	  }

	  if (axis === 'left' && value <= 0) {
	    element.scrollLeft = value = 0; // don't allow negative scroll
	    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
	  }

	  var i = instances.get(element);

	  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
	    // don't allow scroll past container
	    value = i.contentHeight - i.containerHeight;
	    if (value - element.scrollTop <= 1) {
	      // mitigates rounding errors on non-subpixel scroll values
	      value = element.scrollTop;
	    } else {
	      element.scrollTop = value;
	    }
	    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
	  }

	  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
	    // don't allow scroll past container
	    value = i.contentWidth - i.containerWidth;
	    if (value - element.scrollLeft <= 1) {
	      // mitigates rounding errors on non-subpixel scroll values
	      value = element.scrollLeft;
	    } else {
	      element.scrollLeft = value;
	    }
	    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
	  }

	  if (!lastTop) {
	    lastTop = element.scrollTop;
	  }

	  if (!lastLeft) {
	    lastLeft = element.scrollLeft;
	  }

	  if (axis === 'top' && value < lastTop) {
	    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
	  }

	  if (axis === 'top' && value > lastTop) {
	    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
	  }

	  if (axis === 'left' && value < lastLeft) {
	    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
	  }

	  if (axis === 'left' && value > lastLeft) {
	    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
	  }

	  if (axis === 'top') {
	    element.scrollTop = lastTop = value;
	    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
	  }

	  if (axis === 'left') {
	    element.scrollLeft = lastLeft = value;
	    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
	  }

	};


/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	function bindClickRailHandler(element, i) {
	  function pageOffset(el) {
	    return el.getBoundingClientRect();
	  }
	  var stopPropagation = function (e) { e.stopPropagation(); };

	  if (i.settings.stopPropagationOnClick) {
	    i.event.bind(i.scrollbarY, 'click', stopPropagation);
	  }
	  i.event.bind(i.scrollbarYRail, 'click', function (e) {
	    var halfOfScrollbarLength = _.toInt(i.scrollbarYHeight / 2);
	    var positionTop = i.railYRatio * (e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top - halfOfScrollbarLength);
	    var maxPositionTop = i.railYRatio * (i.railYHeight - i.scrollbarYHeight);
	    var positionRatio = positionTop / maxPositionTop;

	    if (positionRatio < 0) {
	      positionRatio = 0;
	    } else if (positionRatio > 1) {
	      positionRatio = 1;
	    }

	    updateScroll(element, 'top', (i.contentHeight - i.containerHeight) * positionRatio);
	    updateGeometry(element);

	    e.stopPropagation();
	  });

	  if (i.settings.stopPropagationOnClick) {
	    i.event.bind(i.scrollbarX, 'click', stopPropagation);
	  }
	  i.event.bind(i.scrollbarXRail, 'click', function (e) {
	    var halfOfScrollbarLength = _.toInt(i.scrollbarXWidth / 2);
	    var positionLeft = i.railXRatio * (e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left - halfOfScrollbarLength);
	    var maxPositionLeft = i.railXRatio * (i.railXWidth - i.scrollbarXWidth);
	    var positionRatio = positionLeft / maxPositionLeft;

	    if (positionRatio < 0) {
	      positionRatio = 0;
	    } else if (positionRatio > 1) {
	      positionRatio = 1;
	    }

	    updateScroll(element, 'left', ((i.contentWidth - i.containerWidth) * positionRatio) - i.negativeScrollAdjustment);
	    updateGeometry(element);

	    e.stopPropagation();
	  });
	}

	module.exports = function (element) {
	  var i = instances.get(element);
	  bindClickRailHandler(element, i);
	};


/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var dom = __webpack_require__(189);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	function bindMouseScrollXHandler(element, i) {
	  var currentLeft = null;
	  var currentPageX = null;

	  function updateScrollLeft(deltaX) {
	    var newLeft = currentLeft + (deltaX * i.railXRatio);
	    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

	    if (newLeft < 0) {
	      i.scrollbarXLeft = 0;
	    } else if (newLeft > maxLeft) {
	      i.scrollbarXLeft = maxLeft;
	    } else {
	      i.scrollbarXLeft = newLeft;
	    }

	    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
	    updateScroll(element, 'left', scrollLeft);
	  }

	  var mouseMoveHandler = function (e) {
	    updateScrollLeft(e.pageX - currentPageX);
	    updateGeometry(element);
	    e.stopPropagation();
	    e.preventDefault();
	  };

	  var mouseUpHandler = function () {
	    _.stopScrolling(element, 'x');
	    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
	  };

	  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
	    currentPageX = e.pageX;
	    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
	    _.startScrolling(element, 'x');

	    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
	    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

	    e.stopPropagation();
	    e.preventDefault();
	  });
	}

	function bindMouseScrollYHandler(element, i) {
	  var currentTop = null;
	  var currentPageY = null;

	  function updateScrollTop(deltaY) {
	    var newTop = currentTop + (deltaY * i.railYRatio);
	    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

	    if (newTop < 0) {
	      i.scrollbarYTop = 0;
	    } else if (newTop > maxTop) {
	      i.scrollbarYTop = maxTop;
	    } else {
	      i.scrollbarYTop = newTop;
	    }

	    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
	    updateScroll(element, 'top', scrollTop);
	  }

	  var mouseMoveHandler = function (e) {
	    updateScrollTop(e.pageY - currentPageY);
	    updateGeometry(element);
	    e.stopPropagation();
	    e.preventDefault();
	  };

	  var mouseUpHandler = function () {
	    _.stopScrolling(element, 'y');
	    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
	  };

	  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
	    currentPageY = e.pageY;
	    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
	    _.startScrolling(element, 'y');

	    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
	    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

	    e.stopPropagation();
	    e.preventDefault();
	  });
	}

	module.exports = function (element) {
	  var i = instances.get(element);
	  bindMouseScrollXHandler(element, i);
	  bindMouseScrollYHandler(element, i);
	};


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var dom = __webpack_require__(189);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	function bindKeyboardHandler(element, i) {
	  var hovered = false;
	  i.event.bind(element, 'mouseenter', function () {
	    hovered = true;
	  });
	  i.event.bind(element, 'mouseleave', function () {
	    hovered = false;
	  });

	  var shouldPrevent = false;
	  function shouldPreventDefault(deltaX, deltaY) {
	    var scrollTop = element.scrollTop;
	    if (deltaX === 0) {
	      if (!i.scrollbarYActive) {
	        return false;
	      }
	      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
	        return !i.settings.wheelPropagation;
	      }
	    }

	    var scrollLeft = element.scrollLeft;
	    if (deltaY === 0) {
	      if (!i.scrollbarXActive) {
	        return false;
	      }
	      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
	        return !i.settings.wheelPropagation;
	      }
	    }
	    return true;
	  }

	  i.event.bind(i.ownerDocument, 'keydown', function (e) {
	    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
	      return;
	    }

	    var focused = dom.matches(i.scrollbarX, ':focus') ||
	                  dom.matches(i.scrollbarY, ':focus');

	    if (!hovered && !focused) {
	      return;
	    }

	    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
	    if (activeElement) {
	      if (activeElement.tagName === 'IFRAME') {
	        activeElement = activeElement.contentDocument.activeElement;
	      } else {
	        // go deeper if element is a webcomponent
	        while (activeElement.shadowRoot) {
	          activeElement = activeElement.shadowRoot.activeElement;
	        }
	      }
	      if (_.isEditable(activeElement)) {
	        return;
	      }
	    }

	    var deltaX = 0;
	    var deltaY = 0;

	    switch (e.which) {
	    case 37: // left
	      deltaX = -30;
	      break;
	    case 38: // up
	      deltaY = 30;
	      break;
	    case 39: // right
	      deltaX = 30;
	      break;
	    case 40: // down
	      deltaY = -30;
	      break;
	    case 33: // page up
	      deltaY = 90;
	      break;
	    case 32: // space bar
	      if (e.shiftKey) {
	        deltaY = 90;
	      } else {
	        deltaY = -90;
	      }
	      break;
	    case 34: // page down
	      deltaY = -90;
	      break;
	    case 35: // end
	      if (e.ctrlKey) {
	        deltaY = -i.contentHeight;
	      } else {
	        deltaY = -i.containerHeight;
	      }
	      break;
	    case 36: // home
	      if (e.ctrlKey) {
	        deltaY = element.scrollTop;
	      } else {
	        deltaY = i.containerHeight;
	      }
	      break;
	    default:
	      return;
	    }

	    updateScroll(element, 'top', element.scrollTop - deltaY);
	    updateScroll(element, 'left', element.scrollLeft + deltaX);
	    updateGeometry(element);

	    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
	    if (shouldPrevent) {
	      e.preventDefault();
	    }
	  });
	}

	module.exports = function (element) {
	  var i = instances.get(element);
	  bindKeyboardHandler(element, i);
	};


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	function bindMouseWheelHandler(element, i) {
	  var shouldPrevent = false;

	  function shouldPreventDefault(deltaX, deltaY) {
	    var scrollTop = element.scrollTop;
	    if (deltaX === 0) {
	      if (!i.scrollbarYActive) {
	        return false;
	      }
	      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
	        return !i.settings.wheelPropagation;
	      }
	    }

	    var scrollLeft = element.scrollLeft;
	    if (deltaY === 0) {
	      if (!i.scrollbarXActive) {
	        return false;
	      }
	      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
	        return !i.settings.wheelPropagation;
	      }
	    }
	    return true;
	  }

	  function getDeltaFromEvent(e) {
	    var deltaX = e.deltaX;
	    var deltaY = -1 * e.deltaY;

	    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
	      // OS X Safari
	      deltaX = -1 * e.wheelDeltaX / 6;
	      deltaY = e.wheelDeltaY / 6;
	    }

	    if (e.deltaMode && e.deltaMode === 1) {
	      // Firefox in deltaMode 1: Line scrolling
	      deltaX *= 10;
	      deltaY *= 10;
	    }

	    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
	      // IE in some mouse drivers
	      deltaX = 0;
	      deltaY = e.wheelDelta;
	    }

	    return [deltaX, deltaY];
	  }

	  function shouldBeConsumedByChild(deltaX, deltaY) {
	    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
	    if (child) {
	      if (child.tagName !== 'TEXTAREA' && !window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
	        return false;
	      }

	      var maxScrollTop = child.scrollHeight - child.clientHeight;
	      if (maxScrollTop > 0) {
	        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
	          return true;
	        }
	      }
	      var maxScrollLeft = child.scrollLeft - child.clientWidth;
	      if (maxScrollLeft > 0) {
	        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
	          return true;
	        }
	      }
	    }
	    return false;
	  }

	  function mousewheelHandler(e) {
	    var delta = getDeltaFromEvent(e);

	    var deltaX = delta[0];
	    var deltaY = delta[1];

	    if (shouldBeConsumedByChild(deltaX, deltaY)) {
	      return;
	    }

	    shouldPrevent = false;
	    if (!i.settings.useBothWheelAxes) {
	      // deltaX will only be used for horizontal scrolling and deltaY will
	      // only be used for vertical scrolling - this is the default
	      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
	      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
	    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
	      // only vertical scrollbar is active and useBothWheelAxes option is
	      // active, so let's scroll vertical bar using both mouse wheel axes
	      if (deltaY) {
	        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
	      } else {
	        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
	      }
	      shouldPrevent = true;
	    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
	      // useBothWheelAxes and only horizontal bar is active, so use both
	      // wheel axes for horizontal bar
	      if (deltaX) {
	        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
	      } else {
	        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
	      }
	      shouldPrevent = true;
	    }

	    updateGeometry(element);

	    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
	    if (shouldPrevent) {
	      e.stopPropagation();
	      e.preventDefault();
	    }
	  }

	  if (typeof window.onwheel !== "undefined") {
	    i.event.bind(element, 'wheel', mousewheelHandler);
	  } else if (typeof window.onmousewheel !== "undefined") {
	    i.event.bind(element, 'mousewheel', mousewheelHandler);
	  }
	}

	module.exports = function (element) {
	  var i = instances.get(element);
	  bindMouseWheelHandler(element, i);
	};


/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
	  function shouldPreventDefault(deltaX, deltaY) {
	    var scrollTop = element.scrollTop;
	    var scrollLeft = element.scrollLeft;
	    var magnitudeX = Math.abs(deltaX);
	    var magnitudeY = Math.abs(deltaY);

	    if (magnitudeY > magnitudeX) {
	      // user is perhaps trying to swipe up/down the page

	      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
	          ((deltaY > 0) && (scrollTop === 0))) {
	        return !i.settings.swipePropagation;
	      }
	    } else if (magnitudeX > magnitudeY) {
	      // user is perhaps trying to swipe left/right across the page

	      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
	          ((deltaX > 0) && (scrollLeft === 0))) {
	        return !i.settings.swipePropagation;
	      }
	    }

	    return true;
	  }

	  function applyTouchMove(differenceX, differenceY) {
	    updateScroll(element, 'top', element.scrollTop - differenceY);
	    updateScroll(element, 'left', element.scrollLeft - differenceX);

	    updateGeometry(element);
	  }

	  var startOffset = {};
	  var startTime = 0;
	  var speed = {};
	  var easingLoop = null;
	  var inGlobalTouch = false;
	  var inLocalTouch = false;

	  function globalTouchStart() {
	    inGlobalTouch = true;
	  }
	  function globalTouchEnd() {
	    inGlobalTouch = false;
	  }

	  function getTouch(e) {
	    if (e.targetTouches) {
	      return e.targetTouches[0];
	    } else {
	      // Maybe IE pointer
	      return e;
	    }
	  }
	  function shouldHandle(e) {
	    if (e.targetTouches && e.targetTouches.length === 1) {
	      return true;
	    }
	    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
	      return true;
	    }
	    return false;
	  }
	  function touchStart(e) {
	    if (shouldHandle(e)) {
	      inLocalTouch = true;

	      var touch = getTouch(e);

	      startOffset.pageX = touch.pageX;
	      startOffset.pageY = touch.pageY;

	      startTime = (new Date()).getTime();

	      if (easingLoop !== null) {
	        clearInterval(easingLoop);
	      }

	      e.stopPropagation();
	    }
	  }
	  function touchMove(e) {
	    if (!inLocalTouch && i.settings.swipePropagation) {
	      touchStart(e);
	    }
	    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
	      var touch = getTouch(e);

	      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

	      var differenceX = currentOffset.pageX - startOffset.pageX;
	      var differenceY = currentOffset.pageY - startOffset.pageY;

	      applyTouchMove(differenceX, differenceY);
	      startOffset = currentOffset;

	      var currentTime = (new Date()).getTime();

	      var timeGap = currentTime - startTime;
	      if (timeGap > 0) {
	        speed.x = differenceX / timeGap;
	        speed.y = differenceY / timeGap;
	        startTime = currentTime;
	      }

	      if (shouldPreventDefault(differenceX, differenceY)) {
	        e.stopPropagation();
	        e.preventDefault();
	      }
	    }
	  }
	  function touchEnd() {
	    if (!inGlobalTouch && inLocalTouch) {
	      inLocalTouch = false;

	      clearInterval(easingLoop);
	      easingLoop = setInterval(function () {
	        if (!instances.get(element)) {
	          clearInterval(easingLoop);
	          return;
	        }

	        if (!speed.x && !speed.y) {
	          clearInterval(easingLoop);
	          return;
	        }

	        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
	          clearInterval(easingLoop);
	          return;
	        }

	        applyTouchMove(speed.x * 30, speed.y * 30);

	        speed.x *= 0.8;
	        speed.y *= 0.8;
	      }, 10);
	    }
	  }

	  if (supportsTouch) {
	    i.event.bind(window, 'touchstart', globalTouchStart);
	    i.event.bind(window, 'touchend', globalTouchEnd);
	    i.event.bind(element, 'touchstart', touchStart);
	    i.event.bind(element, 'touchmove', touchMove);
	    i.event.bind(element, 'touchend', touchEnd);
	  }

	  if (supportsIePointer) {
	    if (window.PointerEvent) {
	      i.event.bind(window, 'pointerdown', globalTouchStart);
	      i.event.bind(window, 'pointerup', globalTouchEnd);
	      i.event.bind(element, 'pointerdown', touchStart);
	      i.event.bind(element, 'pointermove', touchMove);
	      i.event.bind(element, 'pointerup', touchEnd);
	    } else if (window.MSPointerEvent) {
	      i.event.bind(window, 'MSPointerDown', globalTouchStart);
	      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
	      i.event.bind(element, 'MSPointerDown', touchStart);
	      i.event.bind(element, 'MSPointerMove', touchMove);
	      i.event.bind(element, 'MSPointerUp', touchEnd);
	    }
	  }
	}

	module.exports = function (element) {
	  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
	    return;
	  }

	  var i = instances.get(element);
	  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
	};


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	function bindSelectionHandler(element, i) {
	  function getRangeNode() {
	    var selection = window.getSelection ? window.getSelection() :
	                    document.getSelection ? document.getSelection() : '';
	    if (selection.toString().length === 0) {
	      return null;
	    } else {
	      return selection.getRangeAt(0).commonAncestorContainer;
	    }
	  }

	  var scrollingLoop = null;
	  var scrollDiff = {top: 0, left: 0};
	  function startScrolling() {
	    if (!scrollingLoop) {
	      scrollingLoop = setInterval(function () {
	        if (!instances.get(element)) {
	          clearInterval(scrollingLoop);
	          return;
	        }

	        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
	        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
	        updateGeometry(element);
	      }, 50); // every .1 sec
	    }
	  }
	  function stopScrolling() {
	    if (scrollingLoop) {
	      clearInterval(scrollingLoop);
	      scrollingLoop = null;
	    }
	    _.stopScrolling(element);
	  }

	  var isSelected = false;
	  i.event.bind(i.ownerDocument, 'selectionchange', function () {
	    if (element.contains(getRangeNode())) {
	      isSelected = true;
	    } else {
	      isSelected = false;
	      stopScrolling();
	    }
	  });
	  i.event.bind(window, 'mouseup', function () {
	    if (isSelected) {
	      isSelected = false;
	      stopScrolling();
	    }
	  });

	  i.event.bind(window, 'mousemove', function (e) {
	    if (isSelected) {
	      var mousePosition = {x: e.pageX, y: e.pageY};
	      var containerGeometry = {
	        left: element.offsetLeft,
	        right: element.offsetLeft + element.offsetWidth,
	        top: element.offsetTop,
	        bottom: element.offsetTop + element.offsetHeight
	      };

	      if (mousePosition.x < containerGeometry.left + 3) {
	        scrollDiff.left = -5;
	        _.startScrolling(element, 'x');
	      } else if (mousePosition.x > containerGeometry.right - 3) {
	        scrollDiff.left = 5;
	        _.startScrolling(element, 'x');
	      } else {
	        scrollDiff.left = 0;
	      }

	      if (mousePosition.y < containerGeometry.top + 3) {
	        if (containerGeometry.top + 3 - mousePosition.y < 5) {
	          scrollDiff.top = -5;
	        } else {
	          scrollDiff.top = -20;
	        }
	        _.startScrolling(element, 'y');
	      } else if (mousePosition.y > containerGeometry.bottom - 3) {
	        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
	          scrollDiff.top = 5;
	        } else {
	          scrollDiff.top = 20;
	        }
	        _.startScrolling(element, 'y');
	      } else {
	        scrollDiff.top = 0;
	      }

	      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
	        stopScrolling();
	      } else {
	        startScrolling();
	      }
	    }
	  });
	}

	module.exports = function (element) {
	  var i = instances.get(element);
	  bindSelectionHandler(element, i);
	};


/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);

	function bindNativeScrollHandler(element, i) {
	  i.event.bind(element, 'scroll', function () {
	    updateGeometry(element);
	  });
	}

	module.exports = function (element) {
	  var i = instances.get(element);
	  bindNativeScrollHandler(element, i);
	};


/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(187);
	var dom = __webpack_require__(189);
	var instances = __webpack_require__(190);
	var updateGeometry = __webpack_require__(195);
	var updateScroll = __webpack_require__(196);

	module.exports = function (element) {
	  var i = instances.get(element);

	  if (!i) {
	    return;
	  }

	  // Recalcuate negative scrollLeft adjustment
	  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

	  // Recalculate rail margins
	  dom.css(i.scrollbarXRail, 'display', 'block');
	  dom.css(i.scrollbarYRail, 'display', 'block');
	  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
	  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

	  // Hide scrollbars not to affect scrollWidth and scrollHeight
	  dom.css(i.scrollbarXRail, 'display', 'none');
	  dom.css(i.scrollbarYRail, 'display', 'none');

	  updateGeometry(element);

	  // Update top/left scroll to trigger events
	  updateScroll(element, 'top', element.scrollTop);
	  updateScroll(element, 'left', element.scrollLeft);

	  dom.css(i.scrollbarXRail, 'display', '');
	  dom.css(i.scrollbarYRail, 'display', '');
	};


/***/ },

/***/ 261:
/***/ function(module, exports) {

	(function() {
	  var COUNT_FRAMERATE, COUNT_MS_PER_FRAME, DIGIT_FORMAT, DIGIT_HTML, DIGIT_SPEEDBOOST, DURATION, FORMAT_MARK_HTML, FORMAT_PARSER, FRAMERATE, FRAMES_PER_VALUE, MS_PER_FRAME, MutationObserver, Odometer, RIBBON_HTML, TRANSITION_END_EVENTS, TRANSITION_SUPPORT, VALUE_HTML, addClass, createFromHTML, fractionalPart, now, removeClass, requestAnimationFrame, round, transitionCheckStyles, trigger, truncate, wrapJQuery, _jQueryWrapped, _old, _ref, _ref1,
	    __slice = [].slice;

	  VALUE_HTML = '<span class="odometer-value"></span>';

	  RIBBON_HTML = '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' + VALUE_HTML + '</span></span>';

	  DIGIT_HTML = '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' + RIBBON_HTML + '</span></span>';

	  FORMAT_MARK_HTML = '<span class="odometer-formatting-mark"></span>';

	  DIGIT_FORMAT = '(,ddd).dd';

	  FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;

	  FRAMERATE = 30;

	  DURATION = 2000;

	  COUNT_FRAMERATE = 20;

	  FRAMES_PER_VALUE = 2;

	  DIGIT_SPEEDBOOST = .5;

	  MS_PER_FRAME = 1000 / FRAMERATE;

	  COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE;

	  TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

	  transitionCheckStyles = document.createElement('div').style;

	  TRANSITION_SUPPORT = (transitionCheckStyles.transition != null) || (transitionCheckStyles.webkitTransition != null) || (transitionCheckStyles.mozTransition != null) || (transitionCheckStyles.oTransition != null);

	  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	  MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

	  createFromHTML = function(html) {
	    var el;
	    el = document.createElement('div');
	    el.innerHTML = html;
	    return el.children[0];
	  };

	  removeClass = function(el, name) {
	    return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
	  };

	  addClass = function(el, name) {
	    removeClass(el, name);
	    return el.className += " " + name;
	  };

	  trigger = function(el, name) {
	    var evt;
	    if (document.createEvent != null) {
	      evt = document.createEvent('HTMLEvents');
	      evt.initEvent(name, true, true);
	      return el.dispatchEvent(evt);
	    }
	  };

	  now = function() {
	    var _ref, _ref1;
	    return (_ref = (_ref1 = window.performance) != null ? typeof _ref1.now === "function" ? _ref1.now() : void 0 : void 0) != null ? _ref : +(new Date);
	  };

	  round = function(val, precision) {
	    if (precision == null) {
	      precision = 0;
	    }
	    if (!precision) {
	      return Math.round(val);
	    }
	    val *= Math.pow(10, precision);
	    val += 0.5;
	    val = Math.floor(val);
	    return val /= Math.pow(10, precision);
	  };

	  truncate = function(val) {
	    if (val < 0) {
	      return Math.ceil(val);
	    } else {
	      return Math.floor(val);
	    }
	  };

	  fractionalPart = function(val) {
	    return val - round(val);
	  };

	  _jQueryWrapped = false;

	  (wrapJQuery = function() {
	    var property, _i, _len, _ref, _results;
	    if (_jQueryWrapped) {
	      return;
	    }
	    if (window.jQuery != null) {
	      _jQueryWrapped = true;
	      _ref = ['html', 'text'];
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        property = _ref[_i];
	        _results.push((function(property) {
	          var old;
	          old = window.jQuery.fn[property];
	          return window.jQuery.fn[property] = function(val) {
	            var _ref1;
	            if ((val == null) || (((_ref1 = this[0]) != null ? _ref1.odometer : void 0) == null)) {
	              return old.apply(this, arguments);
	            }
	            return this[0].odometer.update(val);
	          };
	        })(property));
	      }
	      return _results;
	    }
	  })();

	  setTimeout(wrapJQuery, 0);

	  Odometer = (function() {
	    function Odometer(options) {
	      var e, k, property, v, _base, _i, _len, _ref, _ref1, _ref2,
	        _this = this;
	      this.options = options;
	      this.el = this.options.el;
	      if (this.el.odometer != null) {
	        return this.el.odometer;
	      }
	      this.el.odometer = this;
	      _ref = Odometer.options;
	      for (k in _ref) {
	        v = _ref[k];
	        if (this.options[k] == null) {
	          this.options[k] = v;
	        }
	      }
	      if ((_base = this.options).duration == null) {
	        _base.duration = DURATION;
	      }
	      this.MAX_VALUES = ((this.options.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
	      this.resetFormat();
	      this.value = this.cleanValue((_ref1 = this.options.value) != null ? _ref1 : '');
	      this.renderInside();
	      this.render();
	      try {
	        _ref2 = ['innerHTML', 'innerText', 'textContent'];
	        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	          property = _ref2[_i];
	          if (this.el[property] != null) {
	            (function(property) {
	              return Object.defineProperty(_this.el, property, {
	                get: function() {
	                  var _ref3;
	                  if (property === 'innerHTML') {
	                    return _this.inside.outerHTML;
	                  } else {
	                    return (_ref3 = _this.inside.innerText) != null ? _ref3 : _this.inside.textContent;
	                  }
	                },
	                set: function(val) {
	                  return _this.update(val);
	                }
	              });
	            })(property);
	          }
	        }
	      } catch (_error) {
	        e = _error;
	        this.watchForMutations();
	      }
	      this;
	    }

	    Odometer.prototype.renderInside = function() {
	      this.inside = document.createElement('div');
	      this.inside.className = 'odometer-inside';
	      this.el.innerHTML = '';
	      return this.el.appendChild(this.inside);
	    };

	    Odometer.prototype.watchForMutations = function() {
	      var e,
	        _this = this;
	      if (MutationObserver == null) {
	        return;
	      }
	      try {
	        if (this.observer == null) {
	          this.observer = new MutationObserver(function(mutations) {
	            var newVal;
	            newVal = _this.el.innerText;
	            _this.renderInside();
	            _this.render(_this.value);
	            return _this.update(newVal);
	          });
	        }
	        this.watchMutations = true;
	        return this.startWatchingMutations();
	      } catch (_error) {
	        e = _error;
	      }
	    };

	    Odometer.prototype.startWatchingMutations = function() {
	      if (this.watchMutations) {
	        return this.observer.observe(this.el, {
	          childList: true
	        });
	      }
	    };

	    Odometer.prototype.stopWatchingMutations = function() {
	      var _ref;
	      return (_ref = this.observer) != null ? _ref.disconnect() : void 0;
	    };

	    Odometer.prototype.cleanValue = function(val) {
	      var _ref;
	      if (typeof val === 'string') {
	        val = val.replace((_ref = this.format.radix) != null ? _ref : '.', '<radix>');
	        val = val.replace(/[.,]/g, '');
	        val = val.replace('<radix>', '.');
	        val = parseFloat(val, 10) || 0;
	      }
	      return round(val, this.format.precision);
	    };

	    Odometer.prototype.bindTransitionEnd = function() {
	      var event, renderEnqueued, _i, _len, _ref, _results,
	        _this = this;
	      if (this.transitionEndBound) {
	        return;
	      }
	      this.transitionEndBound = true;
	      renderEnqueued = false;
	      _ref = TRANSITION_END_EVENTS.split(' ');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        event = _ref[_i];
	        _results.push(this.el.addEventListener(event, function() {
	          if (renderEnqueued) {
	            return true;
	          }
	          renderEnqueued = true;
	          setTimeout(function() {
	            _this.render();
	            renderEnqueued = false;
	            return trigger(_this.el, 'odometerdone');
	          }, 0);
	          return true;
	        }, false));
	      }
	      return _results;
	    };

	    Odometer.prototype.resetFormat = function() {
	      var format, fractional, parsed, precision, radix, repeating, _ref, _ref1;
	      format = (_ref = this.options.format) != null ? _ref : DIGIT_FORMAT;
	      format || (format = 'd');
	      parsed = FORMAT_PARSER.exec(format);
	      if (!parsed) {
	        throw new Error("Odometer: Unparsable digit format");
	      }
	      _ref1 = parsed.slice(1, 4), repeating = _ref1[0], radix = _ref1[1], fractional = _ref1[2];
	      precision = (fractional != null ? fractional.length : void 0) || 0;
	      return this.format = {
	        repeating: repeating,
	        radix: radix,
	        precision: precision
	      };
	    };

	    Odometer.prototype.render = function(value) {
	      var classes, cls, match, newClasses, theme, _i, _len;
	      if (value == null) {
	        value = this.value;
	      }
	      this.stopWatchingMutations();
	      this.resetFormat();
	      this.inside.innerHTML = '';
	      theme = this.options.theme;
	      classes = this.el.className.split(' ');
	      newClasses = [];
	      for (_i = 0, _len = classes.length; _i < _len; _i++) {
	        cls = classes[_i];
	        if (!cls.length) {
	          continue;
	        }
	        if (match = /^odometer-theme-(.+)$/.exec(cls)) {
	          theme = match[1];
	          continue;
	        }
	        if (/^odometer(-|$)/.test(cls)) {
	          continue;
	        }
	        newClasses.push(cls);
	      }
	      newClasses.push('odometer');
	      if (!TRANSITION_SUPPORT) {
	        newClasses.push('odometer-no-transitions');
	      }
	      if (theme) {
	        newClasses.push("odometer-theme-" + theme);
	      } else {
	        newClasses.push("odometer-auto-theme");
	      }
	      this.el.className = newClasses.join(' ');
	      this.ribbons = {};
	      this.formatDigits(value);
	      return this.startWatchingMutations();
	    };

	    Odometer.prototype.formatDigits = function(value) {
	      var digit, valueDigit, valueString, wholePart, _i, _j, _len, _len1, _ref, _ref1;
	      this.digits = [];
	      if (this.options.formatFunction) {
	        valueString = this.options.formatFunction(value);
	        _ref = valueString.split('').reverse();
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          valueDigit = _ref[_i];
	          if (valueDigit.match(/0-9/)) {
	            digit = this.renderDigit();
	            digit.querySelector('.odometer-value').innerHTML = valueDigit;
	            this.digits.push(digit);
	            this.insertDigit(digit);
	          } else {
	            this.addSpacer(valueDigit);
	          }
	        }
	      } else {
	        wholePart = !this.format.precision || !fractionalPart(value) || false;
	        _ref1 = value.toString().split('').reverse();
	        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	          digit = _ref1[_j];
	          if (digit === '.') {
	            wholePart = true;
	          }
	          this.addDigit(digit, wholePart);
	        }
	      }
	    };

	    Odometer.prototype.update = function(newValue) {
	      var diff,
	        _this = this;
	      newValue = this.cleanValue(newValue);
	      if (!(diff = newValue - this.value)) {
	        return;
	      }
	      removeClass(this.el, 'odometer-animating-up odometer-animating-down odometer-animating');
	      if (diff > 0) {
	        addClass(this.el, 'odometer-animating-up');
	      } else {
	        addClass(this.el, 'odometer-animating-down');
	      }
	      this.stopWatchingMutations();
	      this.animate(newValue);
	      this.startWatchingMutations();
	      setTimeout(function() {
	        _this.el.offsetHeight;
	        return addClass(_this.el, 'odometer-animating');
	      }, 0);
	      return this.value = newValue;
	    };

	    Odometer.prototype.renderDigit = function() {
	      return createFromHTML(DIGIT_HTML);
	    };

	    Odometer.prototype.insertDigit = function(digit, before) {
	      if (before != null) {
	        return this.inside.insertBefore(digit, before);
	      } else if (!this.inside.children.length) {
	        return this.inside.appendChild(digit);
	      } else {
	        return this.inside.insertBefore(digit, this.inside.children[0]);
	      }
	    };

	    Odometer.prototype.addSpacer = function(chr, before, extraClasses) {
	      var spacer;
	      spacer = createFromHTML(FORMAT_MARK_HTML);
	      spacer.innerHTML = chr;
	      if (extraClasses) {
	        addClass(spacer, extraClasses);
	      }
	      return this.insertDigit(spacer, before);
	    };

	    Odometer.prototype.addDigit = function(value, repeating) {
	      var chr, digit, resetted, _ref;
	      if (repeating == null) {
	        repeating = true;
	      }
	      if (value === '-') {
	        return this.addSpacer(value, null, 'odometer-negation-mark');
	      }
	      if (value === '.') {
	        return this.addSpacer((_ref = this.format.radix) != null ? _ref : '.', null, 'odometer-radix-mark');
	      }
	      if (repeating) {
	        resetted = false;
	        while (true) {
	          if (!this.format.repeating.length) {
	            if (resetted) {
	              throw new Error("Bad odometer format without digits");
	            }
	            this.resetFormat();
	            resetted = true;
	          }
	          chr = this.format.repeating[this.format.repeating.length - 1];
	          this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1);
	          if (chr === 'd') {
	            break;
	          }
	          this.addSpacer(chr);
	        }
	      }
	      digit = this.renderDigit();
	      digit.querySelector('.odometer-value').innerHTML = value;
	      this.digits.push(digit);
	      return this.insertDigit(digit);
	    };

	    Odometer.prototype.animate = function(newValue) {
	      if (!TRANSITION_SUPPORT || this.options.animation === 'count') {
	        return this.animateCount(newValue);
	      } else {
	        return this.animateSlide(newValue);
	      }
	    };

	    Odometer.prototype.animateCount = function(newValue) {
	      var cur, diff, last, start, tick,
	        _this = this;
	      if (!(diff = +newValue - this.value)) {
	        return;
	      }
	      start = last = now();
	      cur = this.value;
	      return (tick = function() {
	        var delta, dist, fraction;
	        if ((now() - start) > _this.options.duration) {
	          _this.value = newValue;
	          _this.render();
	          trigger(_this.el, 'odometerdone');
	          return;
	        }
	        delta = now() - last;
	        if (delta > COUNT_MS_PER_FRAME) {
	          last = now();
	          fraction = delta / _this.options.duration;
	          dist = diff * fraction;
	          cur += dist;
	          _this.render(Math.round(cur));
	        }
	        if (requestAnimationFrame != null) {
	          return requestAnimationFrame(tick);
	        } else {
	          return setTimeout(tick, COUNT_MS_PER_FRAME);
	        }
	      })();
	    };

	    Odometer.prototype.getDigitCount = function() {
	      var i, max, value, values, _i, _len;
	      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
	        value = values[i];
	        values[i] = Math.abs(value);
	      }
	      max = Math.max.apply(Math, values);
	      return Math.ceil(Math.log(max + 1) / Math.log(10));
	    };

	    Odometer.prototype.getFractionalDigitCount = function() {
	      var i, parser, parts, value, values, _i, _len;
	      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      parser = /^\-?\d*\.(\d*?)0*$/;
	      for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
	        value = values[i];
	        values[i] = value.toString();
	        parts = parser.exec(values[i]);
	        if (parts == null) {
	          values[i] = 0;
	        } else {
	          values[i] = parts[1].length;
	        }
	      }
	      return Math.max.apply(Math, values);
	    };

	    Odometer.prototype.resetDigits = function() {
	      this.digits = [];
	      this.ribbons = [];
	      this.inside.innerHTML = '';
	      return this.resetFormat();
	    };

	    Odometer.prototype.animateSlide = function(newValue) {
	      var boosted, cur, diff, digitCount, digits, dist, end, fractionalCount, frame, frames, i, incr, j, mark, numEl, oldValue, start, _base, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _results;
	      oldValue = this.value;
	      fractionalCount = this.getFractionalDigitCount(oldValue, newValue);
	      if (fractionalCount) {
	        newValue = newValue * Math.pow(10, fractionalCount);
	        oldValue = oldValue * Math.pow(10, fractionalCount);
	      }
	      if (!(diff = newValue - oldValue)) {
	        return;
	      }
	      this.bindTransitionEnd();
	      digitCount = this.getDigitCount(oldValue, newValue);
	      digits = [];
	      boosted = 0;
	      for (i = _i = 0; 0 <= digitCount ? _i < digitCount : _i > digitCount; i = 0 <= digitCount ? ++_i : --_i) {
	        start = truncate(oldValue / Math.pow(10, digitCount - i - 1));
	        end = truncate(newValue / Math.pow(10, digitCount - i - 1));
	        dist = end - start;
	        if (Math.abs(dist) > this.MAX_VALUES) {
	          frames = [];
	          incr = dist / (this.MAX_VALUES + this.MAX_VALUES * boosted * DIGIT_SPEEDBOOST);
	          cur = start;
	          while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
	            frames.push(Math.round(cur));
	            cur += incr;
	          }
	          if (frames[frames.length - 1] !== end) {
	            frames.push(end);
	          }
	          boosted++;
	        } else {
	          frames = (function() {
	            _results = [];
	            for (var _j = start; start <= end ? _j <= end : _j >= end; start <= end ? _j++ : _j--){ _results.push(_j); }
	            return _results;
	          }).apply(this);
	        }
	        for (i = _k = 0, _len = frames.length; _k < _len; i = ++_k) {
	          frame = frames[i];
	          frames[i] = Math.abs(frame % 10);
	        }
	        digits.push(frames);
	      }
	      this.resetDigits();
	      _ref = digits.reverse();
	      for (i = _l = 0, _len1 = _ref.length; _l < _len1; i = ++_l) {
	        frames = _ref[i];
	        if (!this.digits[i]) {
	          this.addDigit(' ', i >= fractionalCount);
	        }
	        if ((_base = this.ribbons)[i] == null) {
	          _base[i] = this.digits[i].querySelector('.odometer-ribbon-inner');
	        }
	        this.ribbons[i].innerHTML = '';
	        if (diff < 0) {
	          frames = frames.reverse();
	        }
	        for (j = _m = 0, _len2 = frames.length; _m < _len2; j = ++_m) {
	          frame = frames[j];
	          numEl = document.createElement('div');
	          numEl.className = 'odometer-value';
	          numEl.innerHTML = frame;
	          this.ribbons[i].appendChild(numEl);
	          if (j === frames.length - 1) {
	            addClass(numEl, 'odometer-last-value');
	          }
	          if (j === 0) {
	            addClass(numEl, 'odometer-first-value');
	          }
	        }
	      }
	      if (start < 0) {
	        this.addDigit('-');
	      }
	      mark = this.inside.querySelector('.odometer-radix-mark');
	      if (mark != null) {
	        mark.parent.removeChild(mark);
	      }
	      if (fractionalCount) {
	        return this.addSpacer(this.format.radix, this.digits[fractionalCount - 1], 'odometer-radix-mark');
	      }
	    };

	    return Odometer;

	  })();

	  Odometer.options = (_ref = window.odometerOptions) != null ? _ref : {};

	  setTimeout(function() {
	    var k, v, _base, _ref1, _results;
	    if (window.odometerOptions) {
	      _ref1 = window.odometerOptions;
	      _results = [];
	      for (k in _ref1) {
	        v = _ref1[k];
	        _results.push((_base = Odometer.options)[k] != null ? (_base = Odometer.options)[k] : _base[k] = v);
	      }
	      return _results;
	    }
	  }, 0);

	  Odometer.init = function() {
	    var el, elements, _i, _len, _ref1, _results;
	    if (document.querySelectorAll == null) {
	      return;
	    }
	    elements = document.querySelectorAll(Odometer.options.selector || '.odometer');
	    _results = [];
	    for (_i = 0, _len = elements.length; _i < _len; _i++) {
	      el = elements[_i];
	      _results.push(el.odometer = new Odometer({
	        el: el,
	        value: (_ref1 = el.innerText) != null ? _ref1 : el.textContent
	      }));
	    }
	    return _results;
	  };

	  if ((((_ref1 = document.documentElement) != null ? _ref1.doScroll : void 0) != null) && (document.createEventObject != null)) {
	    _old = document.onreadystatechange;
	    document.onreadystatechange = function() {
	      if (document.readyState === 'complete' && Odometer.options.auto !== false) {
	        Odometer.init();
	      }
	      return _old != null ? _old.apply(this, arguments) : void 0;
	    };
	  } else {
	    document.addEventListener('DOMContentLoaded', function() {
	      if (Odometer.options.auto !== false) {
	        return Odometer.init();
	      }
	    }, false);
	  }

	  if (typeof exports !== "undefined" && exports !== null) {
	    module.exports = Odometer;
	  } else {
	    window.Odometer = Odometer;
	  }

	}).call(this);


/***/ }

/******/ });