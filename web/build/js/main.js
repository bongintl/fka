// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/es6-map/is-implemented.js":[function(require,module,exports) {
'use strict';

module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (String(map) !== '[object Map]') return false;
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;

	return true;
};

},{}],"node_modules/es5-ext/function/noop.js":[function(require,module,exports) {
"use strict";

// eslint-disable-next-line no-empty-function
module.exports = function () {};

},{}],"node_modules/es5-ext/object/is-value.js":[function(require,module,exports) {
"use strict";

var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };

},{"../function/noop":"node_modules/es5-ext/function/noop.js"}],"node_modules/es5-ext/object/valid-value.js":[function(require,module,exports) {
"use strict";

var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{"./is-value":"node_modules/es5-ext/object/is-value.js"}],"node_modules/es5-ext/array/#/clear.js":[function(require,module,exports) {
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

"use strict";

var value = require("../../object/valid-value");

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":"node_modules/es5-ext/object/valid-value.js"}],"node_modules/es5-ext/number/is-nan/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};

},{}],"node_modules/es5-ext/number/is-nan/shim.js":[function(require,module,exports) {
"use strict";

module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};

},{}],"node_modules/es5-ext/number/is-nan/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Number.isNaN : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/number/is-nan/is-implemented.js","./shim":"node_modules/es5-ext/number/is-nan/shim.js"}],"node_modules/es5-ext/math/sign/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};

},{}],"node_modules/es5-ext/math/sign/shim.js":[function(require,module,exports) {
"use strict";

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};

},{}],"node_modules/es5-ext/math/sign/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Math.sign : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/math/sign/is-implemented.js","./shim":"node_modules/es5-ext/math/sign/shim.js"}],"node_modules/es5-ext/number/to-integer.js":[function(require,module,exports) {
"use strict";

var sign  = require("../math/sign")
  , abs   = Math.abs
  , floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":"node_modules/es5-ext/math/sign/index.js"}],"node_modules/es5-ext/number/to-pos-integer.js":[function(require,module,exports) {
"use strict";

var toInteger = require("./to-integer")
  , max       = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };

},{"./to-integer":"node_modules/es5-ext/number/to-integer.js"}],"node_modules/es5-ext/array/#/e-index-of.js":[function(require,module,exports) {
"use strict";

var numberIsNaN       = require("../../number/is-nan")
  , toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , indexOf           = Array.prototype.indexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};

},{"../../number/is-nan":"node_modules/es5-ext/number/is-nan/index.js","../../number/to-pos-integer":"node_modules/es5-ext/number/to-pos-integer.js","../../object/valid-value":"node_modules/es5-ext/object/valid-value.js"}],"node_modules/es5-ext/object/set-prototype-of/is-implemented.js":[function(require,module,exports) {
"use strict";

var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};

},{}],"node_modules/es5-ext/object/is-object.js":[function(require,module,exports) {
"use strict";

var isValue = require("./is-value");

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };

},{"./is-value":"node_modules/es5-ext/object/is-value.js"}],"node_modules/es5-ext/object/create.js":[function(require,module,exports) {
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

"use strict";

var create = Object.create, shim;

if (!require("./set-prototype-of/is-implemented")()) {
	shim = require("./set-prototype-of/shim");
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = { configurable: false, enumerable: false, writable: true, value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
})();

},{"./set-prototype-of/is-implemented":"node_modules/es5-ext/object/set-prototype-of/is-implemented.js","./set-prototype-of/shim":"node_modules/es5-ext/object/set-prototype-of/shim.js"}],"node_modules/es5-ext/object/set-prototype-of/shim.js":[function(require,module,exports) {
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

"use strict";

var isObject         = require("../is-object")
  , value            = require("../valid-value")
  , objIsPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty   = Object.defineProperty
  , nullDesc         = { configurable: true, enumerable: false, writable: true, value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
})(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
);

require("../create");

},{"../is-object":"node_modules/es5-ext/object/is-object.js","../valid-value":"node_modules/es5-ext/object/valid-value.js","../create":"node_modules/es5-ext/object/create.js"}],"node_modules/es5-ext/object/set-prototype-of/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Object.setPrototypeOf : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/object/set-prototype-of/is-implemented.js","./shim":"node_modules/es5-ext/object/set-prototype-of/shim.js"}],"node_modules/es5-ext/object/valid-callable.js":[function(require,module,exports) {
"use strict";

module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],"node_modules/type/value/is.js":[function(require,module,exports) {
"use strict";

// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };

},{}],"node_modules/type/object/is.js":[function(require,module,exports) {
"use strict";

var isValue = require("../value/is");

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

},{"../value/is":"node_modules/type/value/is.js"}],"node_modules/type/prototype/is.js":[function(require,module,exports) {
"use strict";

var isObject = require("../object/is");

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

},{"../object/is":"node_modules/type/object/is.js"}],"node_modules/type/function/is.js":[function(require,module,exports) {
"use strict";

var isPrototype = require("../prototype/is");

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};

},{"../prototype/is":"node_modules/type/prototype/is.js"}],"node_modules/type/plain-function/is.js":[function(require,module,exports) {
"use strict";

var isFunction = require("../function/is");

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

},{"../function/is":"node_modules/type/function/is.js"}],"node_modules/es5-ext/object/assign/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

},{}],"node_modules/es5-ext/object/keys/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

},{}],"node_modules/es5-ext/object/keys/shim.js":[function(require,module,exports) {
"use strict";

var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };

},{"../is-value":"node_modules/es5-ext/object/is-value.js"}],"node_modules/es5-ext/object/keys/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Object.keys : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/object/keys/is-implemented.js","./shim":"node_modules/es5-ext/object/keys/shim.js"}],"node_modules/es5-ext/object/assign/shim.js":[function(require,module,exports) {
"use strict";

var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":"node_modules/es5-ext/object/keys/index.js","../valid-value":"node_modules/es5-ext/object/valid-value.js"}],"node_modules/es5-ext/object/assign/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Object.assign : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/object/assign/is-implemented.js","./shim":"node_modules/es5-ext/object/assign/shim.js"}],"node_modules/es5-ext/object/normalize-options.js":[function(require,module,exports) {

"use strict";

var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

},{"./is-value":"node_modules/es5-ext/object/is-value.js"}],"node_modules/es5-ext/string/#/contains/is-implemented.js":[function(require,module,exports) {
"use strict";

var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

},{}],"node_modules/es5-ext/string/#/contains/shim.js":[function(require,module,exports) {
"use strict";

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],"node_modules/es5-ext/string/#/contains/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/string/#/contains/is-implemented.js","./shim":"node_modules/es5-ext/string/#/contains/shim.js"}],"node_modules/d/index.js":[function(require,module,exports) {
"use strict";

var isValue         = require("type/value/is")
  , isPlainFunction = require("type/plain-function/is")
  , assign          = require("es5-ext/object/assign")
  , normalizeOpts   = require("es5-ext/object/normalize-options")
  , contains        = require("es5-ext/string/#/contains");

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"type/value/is":"node_modules/type/value/is.js","type/plain-function/is":"node_modules/type/plain-function/is.js","es5-ext/object/assign":"node_modules/es5-ext/object/assign/index.js","es5-ext/object/normalize-options":"node_modules/es5-ext/object/normalize-options.js","es5-ext/string/#/contains":"node_modules/es5-ext/string/#/contains/index.js"}],"node_modules/event-emitter/index.js":[function(require,module,exports) {
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":"node_modules/d/index.js","es5-ext/object/valid-callable":"node_modules/es5-ext/object/valid-callable.js"}],"node_modules/es5-ext/global.js":[function(require,module,exports) {
module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module), be nice

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	Object.defineProperty(Object.prototype, "__global__", {
		get: function () { return this; },
		configurable: true
	});
	try { return __global__; }
	finally { delete Object.prototype.__global__; }
})();

},{}],"node_modules/es6-symbol/is-implemented.js":[function(require,module,exports) {

"use strict";

var global     = require("es5-ext/global")
  , validTypes = { object: true, symbol: true };

module.exports = function () {
	var Symbol = global.Symbol;
	var symbol;
	if (typeof Symbol !== "function") return false;
	symbol = Symbol("test symbol");
	try { String(symbol); }
	catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{"es5-ext/global":"node_modules/es5-ext/global.js"}],"node_modules/es6-symbol/is-symbol.js":[function(require,module,exports) {
"use strict";

module.exports = function (value) {
	if (!value) return false;
	if (typeof value === "symbol") return true;
	if (!value.constructor) return false;
	if (value.constructor.name !== "Symbol") return false;
	return value[value.constructor.toStringTag] === "Symbol";
};

},{}],"node_modules/es6-symbol/validate-symbol.js":[function(require,module,exports) {
"use strict";

var isSymbol = require("./is-symbol");

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":"node_modules/es6-symbol/is-symbol.js"}],"node_modules/es6-symbol/lib/private/generate-name.js":[function(require,module,exports) {
"use strict";

var d = require("d");

var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

var created = create(null);
module.exports = function (desc) {
	var postfix = 0, name, ie11BugWorkaround;
	while (created[desc + (postfix || "")]) ++postfix;
	desc += postfix || "";
	created[desc] = true;
	name = "@@" + desc;
	defineProperty(
		objPrototype,
		name,
		d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		})
	);
	return name;
};

},{"d":"node_modules/d/index.js"}],"node_modules/es6-symbol/lib/private/setup/standard-symbols.js":[function(require,module,exports) {
"use strict";

var d            = require("d")
  , NativeSymbol = require("es5-ext/global").Symbol;

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d(
			"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
		),
		isConcatSpreadable: d(
			"",
			(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
				SymbolPolyfill("isConcatSpreadable")
		),
		iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
		match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
		replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
		search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
		species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
		split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
		toPrimitive: d(
			"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
		),
		toStringTag: d(
			"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
		),
		unscopables: d(
			"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
		)
	});
};

},{"d":"node_modules/d/index.js","es5-ext/global":"node_modules/es5-ext/global.js"}],"node_modules/es6-symbol/lib/private/setup/symbol-registry.js":[function(require,module,exports) {
"use strict";

var d              = require("d")
  , validateSymbol = require("../../../validate-symbol");

var registry = Object.create(null);

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (registry[key]) return registry[key];
			return (registry[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (symbol) {
			var key;
			validateSymbol(symbol);
			for (key in registry) {
				if (registry[key] === symbol) return key;
			}
			return undefined;
		})
	});
};

},{"d":"node_modules/d/index.js","../../../validate-symbol":"node_modules/es6-symbol/validate-symbol.js"}],"node_modules/es6-symbol/polyfill.js":[function(require,module,exports) {
// ES2015 Symbol polyfill for environments that do not (or partially) support it

"use strict";

var d                    = require("d")
  , validateSymbol       = require("./validate-symbol")
  , NativeSymbol         = require("es5-ext/global").Symbol
  , generateName         = require("./lib/private/generate-name")
  , setupStandardSymbols = require("./lib/private/setup/standard-symbols")
  , setupSymbolRegistry  = require("./lib/private/setup/symbol-registry");

var create = Object.create
  , defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty;

var SymbolPolyfill, HiddenSymbol, isNativeSafe;

if (typeof NativeSymbol === "function") {
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
} else {
	NativeSymbol = null;
}

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? "" : String(description);
	return defineProperties(symbol, {
		__description__: d("", description),
		__name__: d("", generateName(description))
	});
};

setupStandardSymbols(SymbolPolyfill);
setupSymbolRegistry(SymbolPolyfill);

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d("", function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(
	SymbolPolyfill.prototype,
	SymbolPolyfill.toPrimitive,
	d("", function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === "symbol") return symbol;
		return symbol.toString();
	})
);
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
);

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
);

},{"d":"node_modules/d/index.js","./validate-symbol":"node_modules/es6-symbol/validate-symbol.js","es5-ext/global":"node_modules/es5-ext/global.js","./lib/private/generate-name":"node_modules/es6-symbol/lib/private/generate-name.js","./lib/private/setup/standard-symbols":"node_modules/es6-symbol/lib/private/setup/standard-symbols.js","./lib/private/setup/symbol-registry":"node_modules/es6-symbol/lib/private/setup/symbol-registry.js"}],"node_modules/es6-symbol/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")()
	? require("es5-ext/global").Symbol
	: require("./polyfill");

},{"./is-implemented":"node_modules/es6-symbol/is-implemented.js","es5-ext/global":"node_modules/es5-ext/global.js","./polyfill":"node_modules/es6-symbol/polyfill.js"}],"node_modules/es5-ext/function/is-arguments.js":[function(require,module,exports) {
"use strict";

var objToString = Object.prototype.toString
  , id = objToString.call((function () { return arguments; })());

module.exports = function (value) { return objToString.call(value) === id; };

},{}],"node_modules/es5-ext/string/is-string.js":[function(require,module,exports) {
"use strict";

var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};

},{}],"node_modules/es6-iterator/is-iterable.js":[function(require,module,exports) {
"use strict";

var isArguments = require("es5-ext/function/is-arguments")
  , isValue     = require("es5-ext/object/is-value")
  , isString    = require("es5-ext/string/is-string");

var iteratorSymbol = require("es6-symbol").iterator
  , isArray        = Array.isArray;

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return typeof value[iteratorSymbol] === "function";
};

},{"es5-ext/function/is-arguments":"node_modules/es5-ext/function/is-arguments.js","es5-ext/object/is-value":"node_modules/es5-ext/object/is-value.js","es5-ext/string/is-string":"node_modules/es5-ext/string/is-string.js","es6-symbol":"node_modules/es6-symbol/index.js"}],"node_modules/es6-iterator/valid-iterable.js":[function(require,module,exports) {
"use strict";

var isIterable = require("./is-iterable");

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":"node_modules/es6-iterator/is-iterable.js"}],"node_modules/type/string/coerce.js":[function(require,module,exports) {
"use strict";

var isValue  = require("../value/is")
  , isObject = require("../object/is");

var objectToString = Object.prototype.toString;

module.exports = function (value) {
	if (!isValue(value)) return null;
	if (isObject(value)) {
		// Reject Object.prototype.toString coercion
		var valueToString = value.toString;
		if (typeof valueToString !== "function") return null;
		if (valueToString === objectToString) return null;
		// Note: It can be object coming from other realm, still as there's no ES3 and CSP compliant
		// way to resolve its realm's Object.prototype.toString it's left as not addressed edge case
	}
	try {
		return "" + value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
};

},{"../value/is":"node_modules/type/value/is.js","../object/is":"node_modules/type/object/is.js"}],"node_modules/type/lib/safe-to-string.js":[function(require,module,exports) {
"use strict";

module.exports = function (value) {
	try {
		return value.toString();
	} catch (error) {
		try { return String(value); }
		catch (error2) { return null; }
	}
};

},{}],"node_modules/type/lib/to-short-string.js":[function(require,module,exports) {
"use strict";

var safeToString = require("./safe-to-string");

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	if (string === null) return "<Non-coercible to string value>";
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		switch (char) {
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\u2028":
				return "\\u2028";
			case "\u2029":
				return "\\u2029";
			/* istanbul ignore next */
			default:
				throw new Error("Unexpected character");
		}
	});
	return string;
};

},{"./safe-to-string":"node_modules/type/lib/safe-to-string.js"}],"node_modules/type/lib/resolve-exception.js":[function(require,module,exports) {
"use strict";

var isValue       = require("../value/is")
  , isObject      = require("../object/is")
  , stringCoerce  = require("../string/coerce")
  , toShortString = require("./to-short-string");

var resolveMessage = function (message, value) {
	return message.replace("%v", toShortString(value));
};

module.exports = function (value, defaultMessage, inputOptions) {
	if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
	if (!isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var errorMessage = stringCoerce(inputOptions.errorMessage);
	if (!isValue(errorMessage)) errorMessage = defaultMessage;
	throw new TypeError(resolveMessage(errorMessage, value));
};

},{"../value/is":"node_modules/type/value/is.js","../object/is":"node_modules/type/object/is.js","../string/coerce":"node_modules/type/string/coerce.js","./to-short-string":"node_modules/type/lib/to-short-string.js"}],"node_modules/type/value/ensure.js":[function(require,module,exports) {
"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "Cannot use %v", arguments[1]);
};

},{"../lib/resolve-exception":"node_modules/type/lib/resolve-exception.js","./is":"node_modules/type/value/is.js"}],"node_modules/type/plain-function/ensure.js":[function(require,module,exports) {
"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "%v is not a plain function", arguments[1]);
};

},{"../lib/resolve-exception":"node_modules/type/lib/resolve-exception.js","./is":"node_modules/type/plain-function/is.js"}],"node_modules/es5-ext/array/from/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};

},{}],"node_modules/es5-ext/function/is-function.js":[function(require,module,exports) {
"use strict";

var objToString = Object.prototype.toString
  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

module.exports = function (value) {
	return typeof value === "function" && isFunctionStringTag(objToString.call(value));
};

},{}],"node_modules/es5-ext/array/from/shim.js":[function(require,module,exports) {
"use strict";

var iteratorSymbol = require("es6-symbol").iterator
  , isArguments    = require("../../function/is-arguments")
  , isFunction     = require("../../function/is-function")
  , toPosInt       = require("../../number/to-pos-integer")
  , callable       = require("../../object/valid-callable")
  , validValue     = require("../../object/valid-value")
  , isValue        = require("../../object/is-value")
  , isString       = require("../../string/is-string")
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array((length = arrayLike.length));
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};

},{"es6-symbol":"node_modules/es6-symbol/index.js","../../function/is-arguments":"node_modules/es5-ext/function/is-arguments.js","../../function/is-function":"node_modules/es5-ext/function/is-function.js","../../number/to-pos-integer":"node_modules/es5-ext/number/to-pos-integer.js","../../object/valid-callable":"node_modules/es5-ext/object/valid-callable.js","../../object/valid-value":"node_modules/es5-ext/object/valid-value.js","../../object/is-value":"node_modules/es5-ext/object/is-value.js","../../string/is-string":"node_modules/es5-ext/string/is-string.js"}],"node_modules/es5-ext/array/from/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Array.from : require("./shim");

},{"./is-implemented":"node_modules/es5-ext/array/from/is-implemented.js","./shim":"node_modules/es5-ext/array/from/shim.js"}],"node_modules/es5-ext/object/copy.js":[function(require,module,exports) {
"use strict";

var aFrom  = require("../array/from")
  , assign = require("./assign")
  , value  = require("./valid-value");

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};

},{"../array/from":"node_modules/es5-ext/array/from/index.js","./assign":"node_modules/es5-ext/object/assign/index.js","./valid-value":"node_modules/es5-ext/object/valid-value.js"}],"node_modules/es5-ext/object/_iterate.js":[function(require,module,exports) {
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

"use strict";

var callable                = require("./valid-callable")
  , value                   = require("./valid-value")
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./valid-callable":"node_modules/es5-ext/object/valid-callable.js","./valid-value":"node_modules/es5-ext/object/valid-value.js"}],"node_modules/es5-ext/object/for-each.js":[function(require,module,exports) {
"use strict";

module.exports = require("./_iterate")("forEach");

},{"./_iterate":"node_modules/es5-ext/object/_iterate.js"}],"node_modules/es5-ext/object/map.js":[function(require,module,exports) {
"use strict";

var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};

},{"./valid-callable":"node_modules/es5-ext/object/valid-callable.js","./for-each":"node_modules/es5-ext/object/for-each.js"}],"node_modules/d/auto-bind.js":[function(require,module,exports) {

"use strict";

var isValue             = require("type/value/is")
  , ensureValue         = require("type/value/ensure")
  , ensurePlainFunction = require("type/plain-function/ensure")
  , copy                = require("es5-ext/object/copy")
  , normalizeOptions    = require("es5-ext/object/normalize-options")
  , map                 = require("es5-ext/object/map");

var bind = Function.prototype.bind
  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (isValue(options.resolveContext)) ensurePlainFunction(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};

},{"type/value/is":"node_modules/type/value/is.js","type/value/ensure":"node_modules/type/value/ensure.js","type/plain-function/ensure":"node_modules/type/plain-function/ensure.js","es5-ext/object/copy":"node_modules/es5-ext/object/copy.js","es5-ext/object/normalize-options":"node_modules/es5-ext/object/normalize-options.js","es5-ext/object/map":"node_modules/es5-ext/object/map.js"}],"node_modules/es6-iterator/index.js":[function(require,module,exports) {
"use strict";

var clear    = require("es5-ext/array/#/clear")
  , assign   = require("es5-ext/object/assign")
  , callable = require("es5-ext/object/valid-callable")
  , value    = require("es5-ext/object/valid-value")
  , d        = require("d")
  , autoBind = require("d/auto-bind")
  , Symbol   = require("es6-symbol");

var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
	defineProperties(this, {
		__list__: d("w", value(list)),
		__context__: d("w", context),
		__nextIndex__: d("w", 0)
	});
	if (!context) return;
	callable(context.on);
	context.on("_add", this._onAdd);
	context.on("_delete", this._onDelete);
	context.on("_clear", this._onClear);
};

// Internal %IteratorPrototype% doesn't expose its constructor
delete Iterator.prototype.constructor;

defineProperties(
	Iterator.prototype,
	assign(
		{
			_next: d(function () {
				var i;
				if (!this.__list__) return undefined;
				if (this.__redo__) {
					i = this.__redo__.shift();
					if (i !== undefined) return i;
				}
				if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
				this._unBind();
				return undefined;
			}),
			next: d(function () {
				return this._createResult(this._next());
			}),
			_createResult: d(function (i) {
				if (i === undefined) return { done: true, value: undefined };
				return { done: false, value: this._resolve(i) };
			}),
			_resolve: d(function (i) {
				return this.__list__[i];
			}),
			_unBind: d(function () {
				this.__list__ = null;
				delete this.__redo__;
				if (!this.__context__) return;
				this.__context__.off("_add", this._onAdd);
				this.__context__.off("_delete", this._onDelete);
				this.__context__.off("_clear", this._onClear);
				this.__context__ = null;
			}),
			toString: d(function () {
				return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
			})
		},
		autoBind({
			_onAdd: d(function (index) {
				if (index >= this.__nextIndex__) return;
				++this.__nextIndex__;
				if (!this.__redo__) {
					defineProperty(this, "__redo__", d("c", [index]));
					return;
				}
				this.__redo__.forEach(function (redo, i) {
					if (redo >= index) this.__redo__[i] = ++redo;
				}, this);
				this.__redo__.push(index);
			}),
			_onDelete: d(function (index) {
				var i;
				if (index >= this.__nextIndex__) return;
				--this.__nextIndex__;
				if (!this.__redo__) return;
				i = this.__redo__.indexOf(index);
				if (i !== -1) this.__redo__.splice(i, 1);
				this.__redo__.forEach(function (redo, j) {
					if (redo > index) this.__redo__[j] = --redo;
				}, this);
			}),
			_onClear: d(function () {
				if (this.__redo__) clear.call(this.__redo__);
				this.__nextIndex__ = 0;
			})
		})
	)
);

defineProperty(
	Iterator.prototype,
	Symbol.iterator,
	d(function () {
		return this;
	})
);

},{"es5-ext/array/#/clear":"node_modules/es5-ext/array/#/clear.js","es5-ext/object/assign":"node_modules/es5-ext/object/assign/index.js","es5-ext/object/valid-callable":"node_modules/es5-ext/object/valid-callable.js","es5-ext/object/valid-value":"node_modules/es5-ext/object/valid-value.js","d":"node_modules/d/index.js","d/auto-bind":"node_modules/d/auto-bind.js","es6-symbol":"node_modules/es6-symbol/index.js"}],"node_modules/es6-iterator/array.js":[function(require,module,exports) {
"use strict";

var setPrototypeOf = require("es5-ext/object/set-prototype-of")
  , contains       = require("es5-ext/string/#/contains")
  , d              = require("d")
  , Symbol         = require("es6-symbol")
  , Iterator       = require("./");

var defineProperty = Object.defineProperty, ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
	Iterator.call(this, arr);
	if (!kind) kind = "value";
	else if (contains.call(kind, "key+value")) kind = "key+value";
	else if (contains.call(kind, "key")) kind = "key";
	else kind = "value";
	defineProperty(this, "__kind__", d("", kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete ArrayIterator.prototype.constructor;

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	_resolve: d(function (i) {
		if (this.__kind__ === "value") return this.__list__[i];
		if (this.__kind__ === "key+value") return [i, this.__list__[i]];
		return i;
	})
});
defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));

},{"es5-ext/object/set-prototype-of":"node_modules/es5-ext/object/set-prototype-of/index.js","es5-ext/string/#/contains":"node_modules/es5-ext/string/#/contains/index.js","d":"node_modules/d/index.js","es6-symbol":"node_modules/es6-symbol/index.js","./":"node_modules/es6-iterator/index.js"}],"node_modules/es6-iterator/string.js":[function(require,module,exports) {
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

"use strict";

var setPrototypeOf = require("es5-ext/object/set-prototype-of")
  , d              = require("d")
  , Symbol         = require("es6-symbol")
  , Iterator       = require("./");

var defineProperty = Object.defineProperty, StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, "__length__", d("", str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete StringIterator.prototype.constructor;

StringIterator.prototype = Object.create(Iterator.prototype, {
	_next: d(function () {
		if (!this.__list__) return undefined;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
		return char;
	})
});
defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));

},{"es5-ext/object/set-prototype-of":"node_modules/es5-ext/object/set-prototype-of/index.js","d":"node_modules/d/index.js","es6-symbol":"node_modules/es6-symbol/index.js","./":"node_modules/es6-iterator/index.js"}],"node_modules/es6-iterator/get.js":[function(require,module,exports) {
"use strict";

var isArguments    = require("es5-ext/function/is-arguments")
  , isString       = require("es5-ext/string/is-string")
  , ArrayIterator  = require("./array")
  , StringIterator = require("./string")
  , iterable       = require("./valid-iterable")
  , iteratorSymbol = require("es6-symbol").iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"es5-ext/function/is-arguments":"node_modules/es5-ext/function/is-arguments.js","es5-ext/string/is-string":"node_modules/es5-ext/string/is-string.js","./array":"node_modules/es6-iterator/array.js","./string":"node_modules/es6-iterator/string.js","./valid-iterable":"node_modules/es6-iterator/valid-iterable.js","es6-symbol":"node_modules/es6-symbol/index.js"}],"node_modules/es6-iterator/for-of.js":[function(require,module,exports) {
"use strict";

var isArguments = require("es5-ext/function/is-arguments")
  , callable    = require("es5-ext/object/valid-callable")
  , isString    = require("es5-ext/string/is-string")
  , get         = require("./get");

var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = "array";
	else if (isString(iterable)) mode = "string";
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () {
		broken = true;
	};
	if (mode === "array") {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			return broken;
		});
		return;
	}
	if (mode === "string") {
		length = iterable.length;
		for (i = 0; i < length; ++i) {
			char = iterable[i];
			if (i + 1 < length) {
				code = char.charCodeAt(0);
				if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"es5-ext/function/is-arguments":"node_modules/es5-ext/function/is-arguments.js","es5-ext/object/valid-callable":"node_modules/es5-ext/object/valid-callable.js","es5-ext/string/is-string":"node_modules/es5-ext/string/is-string.js","./get":"node_modules/es6-iterator/get.js"}],"node_modules/es5-ext/object/primitive-set.js":[function(require,module,exports) {
"use strict";

var forEach = Array.prototype.forEach, create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};

},{}],"node_modules/es6-map/lib/iterator-kinds.js":[function(require,module,exports) {
'use strict';

module.exports = require('es5-ext/object/primitive-set')('key',
	'value', 'key+value');

},{"es5-ext/object/primitive-set":"node_modules/es5-ext/object/primitive-set.js"}],"node_modules/es6-map/lib/iterator.js":[function(require,module,exports) {
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , d                 = require('d')
  , Iterator          = require('es6-iterator')
  , toStringTagSymbol = require('es6-symbol').toStringTag
  , kinds             = require('./iterator-kinds')

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));

},{"es5-ext/object/set-prototype-of":"node_modules/es5-ext/object/set-prototype-of/index.js","d":"node_modules/d/index.js","es6-iterator":"node_modules/es6-iterator/index.js","es6-symbol":"node_modules/es6-symbol/index.js","./iterator-kinds":"node_modules/es6-map/lib/iterator-kinds.js"}],"node_modules/es6-map/is-native-implemented.js":[function(require,module,exports) {
// Exports true if environment provides native `Map` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
	if (typeof Map === 'undefined') return false;
	return (Object.prototype.toString.call(new Map()) === '[object Map]');
}());

},{}],"node_modules/es6-map/polyfill.js":[function(require,module,exports) {
'use strict';

var clear          = require('es5-ext/array/#/clear')
  , eIndexOf       = require('es5-ext/array/#/e-index-of')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , callable       = require('es5-ext/object/valid-callable')
  , validValue     = require('es5-ext/object/valid-value')
  , d              = require('d')
  , ee             = require('event-emitter')
  , Symbol         = require('es6-symbol')
  , iterator       = require('es6-iterator/valid-iterable')
  , forOf          = require('es6-iterator/for-of')
  , Iterator       = require('./lib/iterator')
  , isNative       = require('./is-native-implemented')

  , call = Function.prototype.call
  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values, self;
	if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (Map !== MapPoly)) {
		self = setPrototypeOf(new Map(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) iterator(iterable);
	defineProperties(self, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return self;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, self);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result],
				this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));

},{"es5-ext/array/#/clear":"node_modules/es5-ext/array/#/clear.js","es5-ext/array/#/e-index-of":"node_modules/es5-ext/array/#/e-index-of.js","es5-ext/object/set-prototype-of":"node_modules/es5-ext/object/set-prototype-of/index.js","es5-ext/object/valid-callable":"node_modules/es5-ext/object/valid-callable.js","es5-ext/object/valid-value":"node_modules/es5-ext/object/valid-value.js","d":"node_modules/d/index.js","event-emitter":"node_modules/event-emitter/index.js","es6-symbol":"node_modules/es6-symbol/index.js","es6-iterator/valid-iterable":"node_modules/es6-iterator/valid-iterable.js","es6-iterator/for-of":"node_modules/es6-iterator/for-of.js","./lib/iterator":"node_modules/es6-map/lib/iterator.js","./is-native-implemented":"node_modules/es6-map/is-native-implemented.js"}],"node_modules/es6-map/index.js":[function(require,module,exports) {
'use strict';

module.exports = require('./is-implemented')() ? Map : require('./polyfill');

},{"./is-implemented":"node_modules/es6-map/is-implemented.js","./polyfill":"node_modules/es6-map/polyfill.js"}],"js/utils/observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _es6Map = _interopRequireDefault(require("es6-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(Observer, options) {
  var observer = new Observer(function (entries) {
    return entries.forEach(handle);
  }, options);
  var callbacks = new _es6Map.default();

  var handle = function handle(entry) {
    var cbs = callbacks.get(entry.target);
    if (cbs) cbs.forEach(function (cb) {
      return cb(entry);
    });
  };

  var observe = function observe(el, cb) {
    if (callbacks.has(el)) {
      callbacks.set(el, [].concat(_toConsumableArray(callbacks.get(el)), [cb]));
    } else {
      callbacks.set(el, [cb]);
      observer.observe(el);
    }
  };

  var unobserve = function unobserve(el, cb) {
    var cbs = callbacks.get(el);

    if (cbs) {
      cbs = cbs.filter(function (x) {
        return x !== cb;
      });

      if (cbs.length) {
        callbacks.set(el, cbs);
      } else {
        callbacks.delete(el);
        observer.unobserve(el);
      }
    }
  };

  return {
    observe: observe,
    unobserve: unobserve
  };
};

exports.default = _default;
},{"es6-map":"node_modules/es6-map/index.js"}],"node_modules/intersection-observer/intersection-observer.js":[function(require,module,exports) {
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());

},{}],"node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */

/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
  if (typeof Map !== 'undefined') {
    return Map;
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */


  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }

  return (
    /** @class */
    function () {
      function class_1() {
        this.__entries__ = [];
      }

      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function () {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      /**
       * @param {*} key
       * @returns {*}
       */

      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      /**
       * @param {*} key
       * @param {*} value
       * @returns {void}
       */


      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);

        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);

        if (~index) {
          entries.splice(index, 1);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      /**
       * @returns {void}
       */


      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      /**
       * @param {Function} callback
       * @param {*} [ctx=null]
       * @returns {void}
       */


      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }

        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };

      return class_1;
    }()
  );
}();
/**
 * Detects whether window and document objects are available in current environment.
 */


var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

var global$1 = function () {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }

  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }

  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  } // eslint-disable-next-line no-new-func


  return Function('return this')();
}();
/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */


var requestAnimationFrame$1 = function () {
  if (typeof requestAnimationFrame === 'function') {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1);
  }

  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  };
}(); // Defines minimum timeout before adding a trailing call.


var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */

function throttle(callback, delay) {
  var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */

  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }

    if (trailingCall) {
      proxy();
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */


  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */


  function proxy() {
    var timeStamp = Date.now();

    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      } // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.


      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }

    lastCallTime = timeStamp;
  }

  return proxy;
} // Minimum delay before invoking the update of observers.


var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.

var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */

var ResizeObserverController =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */

    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */

    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */


  ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    } // Add listeners if they haven't been added yet.


    if (!this.connected_) {
      this.connect_();
    }
  };
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */


  ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer); // Remove observer if it's present in registry.

    if (~index) {
      observers.splice(index, 1);
    } // Remove listeners if controller has no connected observers.


    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  };
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */


  ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.

    if (changesDetected) {
      this.refresh();
    }
  };
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */


  ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
      return observer.gatherActive(), observer.hasActive();
    }); // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.

    activeObservers.forEach(function (observer) {
      return observer.broadcastActive();
    });
    return activeObservers.length > 0;
  };
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    } // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.


    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh);
      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  };
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  };
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */


  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
    var _b = _a.propertyName,
        propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
      this.refresh();
    }
  };
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */


  ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
  };
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */


  ResizeObserverController.instance_ = null;
  return ResizeObserverController;
}();
/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */


var defineConfigurable = function (target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }

  return target;
};
/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */


var getWindowOf = function (target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
  // provided element.

  return ownerGlobal || global$1;
}; // Placeholder of an empty content rectangle.


var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */

function toFloat(value) {
  return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */


function getBordersSize(styles) {
  var positions = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }

  return positions.reduce(function (size, position) {
    var value = styles['border-' + position + '-width'];
    return size + toFloat(value);
  }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */


function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left'];
  var paddings = {};

  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles['padding-' + position];
    paddings[position] = toFloat(value);
  }

  return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */


function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */


function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.

  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }

  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.

  var width = toFloat(styles.width),
      height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).

  if (styles.boxSizing === 'border-box') {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }

    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  } // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.


  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.

    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }

    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }

  return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


var isSVGGraphicsElement = function () {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  } // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens


  return function (target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
  };
}();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */


function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }

  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }

  return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */


function createReadOnlyRect(_a) {
  var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */


function createRectInit(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */


var ResizeObservation =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */

    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */


  ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
  };
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */


  ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  };

  return ResizeObservation;
}();

var ResizeObserverEntry =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.

    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    });
  }

  return ResizeObserverEntry;
}();

var ResizeObserverSPI =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is already being observed.

    if (observations.has(target)) {
      return;
    }

    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this); // Force the update of observations.

    this.controller_.refresh();
  };
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is not being observed.

    if (!observations.has(target)) {
      return;
    }

    observations.delete(target);

    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  };
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  };
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.gatherActive = function () {
    var _this = this;

    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  };
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }

    var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

    var entries = this.activeObservations_.map(function (observation) {
      return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  };
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
  };
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */


  ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
  };

  return ResizeObserverSPI;
}(); // Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.


var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */

var ResizeObserver =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError('Cannot call a class as a function.');
    }

    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);
    observers.set(this, observer);
  }

  return ResizeObserver;
}(); // Expose public methods of ResizeObserver.


['observe', 'unobserve', 'disconnect'].forEach(function (method) {
  ResizeObserver.prototype[method] = function () {
    var _a;

    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});

var index = function () {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver;
  }

  return ResizeObserver;
}();

var _default = index;
exports.default = _default;
},{}],"node_modules/picturefill/dist/picturefill.js":[function(require,module,exports) {
var define;
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */

/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
(function (window) {
  /*jshint eqnull:true */
  var ua = navigator.userAgent;

  if (window.HTMLPictureElement && /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) {
    addEventListener("resize", function () {
      var timer;
      var dummySrc = document.createElement("source");

      var fixRespimg = function (img) {
        var source, sizes;
        var picture = img.parentNode;

        if (picture.nodeName.toUpperCase() === "PICTURE") {
          source = dummySrc.cloneNode();
          picture.insertBefore(source, picture.firstElementChild);
          setTimeout(function () {
            picture.removeChild(source);
          });
        } else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
          img._pfLastSize = img.offsetWidth;
          sizes = img.sizes;
          img.sizes += ",100vw";
          setTimeout(function () {
            img.sizes = sizes;
          });
        }
      };

      var findPictureImgs = function () {
        var i;
        var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");

        for (i = 0; i < imgs.length; i++) {
          fixRespimg(imgs[i]);
        }
      };

      var onResize = function () {
        clearTimeout(timer);
        timer = setTimeout(findPictureImgs, 99);
      };

      var mq = window.matchMedia && matchMedia("(orientation: landscape)");

      var init = function () {
        onResize();

        if (mq && mq.addListener) {
          mq.addListener(onResize);
        }
      };

      dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

      if (/^[c|i]|d$/.test(document.readyState || "")) {
        init();
      } else {
        document.addEventListener("DOMContentLoaded", init);
      }

      return onResize;
    }());
  }
})(window);
/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */


(function (window, document, undefined) {
  // Enable strict mode
  "use strict"; // HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)

  document.createElement("picture");
  var warn, eminpx, alwaysCheckWDescriptor, evalId; // local object for method references and testing exposure

  var pf = {};
  var isSupportTestReady = false;

  var noop = function () {};

  var image = document.createElement("img");
  var getImgAttr = image.getAttribute;
  var setImgAttr = image.setAttribute;
  var removeImgAttr = image.removeAttribute;
  var docElem = document.documentElement;
  var types = {};
  var cfg = {
    //resource selection:
    algorithm: ""
  };
  var srcAttr = "data-pfsrc";
  var srcsetAttr = srcAttr + "set"; // ua sniffing is done for undetectable img loading features,
  // to do some non crucial perf optimizations

  var ua = navigator.userAgent;
  var supportAbort = /rident/.test(ua) || /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35;
  var curSrcProp = "currentSrc";
  var regWDesc = /\s+\+?\d+(e\d+)?w/;
  var regSize = /(\([^)]+\))?\s*(.+)/;
  var setOptions = window.picturefillCFG;
  /**
   * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
   */
  // baseStyle also used by getEmValue (i.e.: width: 1em is important)

  var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
  var fsCss = "font-size:100%!important;";
  var isVwDirty = true;
  var cssCache = {};
  var sizeLengthCache = {};
  var DPR = window.devicePixelRatio;
  var units = {
    px: 1,
    "in": 96
  };
  var anchor = document.createElement("a");
  /**
   * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
   * @type {boolean}
   */

  var alreadyRun = false; // Reusable, non-"g" Regexes
  // (Don't use \s, to avoid matching non-breaking space.)

  var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
      regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
      regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
      regexTrailingCommas = /[,]+$/,
      regexNonNegativeInteger = /^\d+$/,
      // ( Positive or negative or unsigned integers or decimals, without or without exponents.
  // Must include at least one digit.
  // According to spec tests any decimal point must be followed by a digit.
  // No leading plus sign is allowed.)
  // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
  regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

  var on = function (obj, evt, fn, capture) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, capture || false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  };
  /**
   * simple memoize function:
   */


  var memoize = function (fn) {
    var cache = {};
    return function (input) {
      if (!(input in cache)) {
        cache[input] = fn(input);
      }

      return cache[input];
    };
  }; // UTILITY FUNCTIONS
  // Manual is faster than RegEx
  // http://jsperf.com/whitespace-character/5


  function isSpace(c) {
    return c === "\u0020" || // space
    c === "\u0009" || // horizontal tab
    c === "\u000A" || // new line
    c === "\u000C" || // form feed
    c === "\u000D"; // carriage return
  }
  /**
   * gets a mediaquery and returns a boolean or gets a css length and returns a number
   * @param css mediaqueries or css length
   * @returns {boolean|number}
   *
   * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
   */


  var evalCSS = function () {
    var regLength = /^([\d\.]+)(em|vw|px)$/;

    var replace = function () {
      var args = arguments,
          index = 0,
          string = args[0];

      while (++index in args) {
        string = string.replace(args[index], args[++index]);
      }

      return string;
    };

    var buildStr = memoize(function (css) {
      return "return " + replace((css || "").toLowerCase(), // interpret `and`
      /\band\b/g, "&&", // interpret `,`
      /,/g, "||", // interpret `min-` as >=
      /min-([a-z-\s]+):/g, "e.$1>=", // interpret `max-` as <=
      /max-([a-z-\s]+):/g, "e.$1<=", //calc value
      /calc([^)]+)/g, "($1)", // interpret css values
      /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", //make eval less evil
      /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, "") + ";";
    });
    return function (css, length) {
      var parsedLength;

      if (!(css in cssCache)) {
        cssCache[css] = false;

        if (length && (parsedLength = css.match(regLength))) {
          cssCache[css] = parsedLength[1] * units[parsedLength[2]];
        } else {
          /*jshint evil:true */
          try {
            cssCache[css] = new Function("e", buildStr(css))(units);
          } catch (e) {}
          /*jshint evil:false */

        }
      }

      return cssCache[css];
    };
  }();

  var setResolution = function (candidate, sizesattr) {
    if (candidate.w) {
      // h = means height: || descriptor.type === 'h' do not handle yet...
      candidate.cWidth = pf.calcListLength(sizesattr || "100vw");
      candidate.res = candidate.w / candidate.cWidth;
    } else {
      candidate.res = candidate.d;
    }

    return candidate;
  };
  /**
   *
   * @param opt
   */


  var picturefill = function (opt) {
    if (!isSupportTestReady) {
      return;
    }

    var elements, i, plen;
    var options = opt || {};

    if (options.elements && options.elements.nodeType === 1) {
      if (options.elements.nodeName.toUpperCase() === "IMG") {
        options.elements = [options.elements];
      } else {
        options.context = options.elements;
        options.elements = null;
      }
    }

    elements = options.elements || pf.qsa(options.context || document, options.reevaluate || options.reselect ? pf.sel : pf.selShort);

    if (plen = elements.length) {
      pf.setupRun(options);
      alreadyRun = true; // Loop through all elements

      for (i = 0; i < plen; i++) {
        pf.fillImg(elements[i], options);
      }

      pf.teardownRun(options);
    }
  };
  /**
   * outputs a warning for the developer
   * @param {message}
   * @type {Function}
   */


  warn = window.console && console.warn ? function (message) {
    console.warn(message);
  } : noop;

  if (!(curSrcProp in image)) {
    curSrcProp = "src";
  } // Add support for standard mime types.


  types["image/jpeg"] = true;
  types["image/gif"] = true;
  types["image/png"] = true;

  function detectTypeSupport(type, typeUri) {
    // based on Modernizr's lossless img-webp test
    // note: asynchronous
    var image = new window.Image();

    image.onerror = function () {
      types[type] = false;
      picturefill();
    };

    image.onload = function () {
      types[type] = image.width === 1;
      picturefill();
    };

    image.src = typeUri;
    return "pending";
  } // test svg support


  types["image/svg+xml"] = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
  /**
   * updates the internal vW property with the current viewport width in px
   */

  function updateMetrics() {
    isVwDirty = false;
    DPR = window.devicePixelRatio;
    cssCache = {};
    sizeLengthCache = {};
    pf.DPR = DPR || 1;
    units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
    units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);
    units.vw = units.width / 100;
    units.vh = units.height / 100;
    evalId = [units.height, units.width, DPR].join("-");
    units.em = pf.getEmValue();
    units.rem = units.em;
  }

  function chooseLowRes(lowerValue, higherValue, dprValue, isCached) {
    var bonusFactor, tooMuch, bonus, meanDensity; //experimental

    if (cfg.algorithm === "saveData") {
      if (lowerValue > 2.7) {
        meanDensity = dprValue + 1;
      } else {
        tooMuch = higherValue - dprValue;
        bonusFactor = Math.pow(lowerValue - 0.6, 1.5);
        bonus = tooMuch * bonusFactor;

        if (isCached) {
          bonus += 0.1 * bonusFactor;
        }

        meanDensity = lowerValue + bonus;
      }
    } else {
      meanDensity = dprValue > 1 ? Math.sqrt(lowerValue * higherValue) : lowerValue;
    }

    return meanDensity > dprValue;
  }

  function applyBestCandidate(img) {
    var srcSetCandidates;
    var matchingSet = pf.getSet(img);
    var evaluated = false;

    if (matchingSet !== "pending") {
      evaluated = evalId;

      if (matchingSet) {
        srcSetCandidates = pf.setRes(matchingSet);
        pf.applySetCandidate(srcSetCandidates, img);
      }
    }

    img[pf.ns].evaled = evaluated;
  }

  function ascendingSort(a, b) {
    return a.res - b.res;
  }

  function setSrcToCur(img, src, set) {
    var candidate;

    if (!set && src) {
      set = img[pf.ns].sets;
      set = set && set[set.length - 1];
    }

    candidate = getCandidateForSrc(src, set);

    if (candidate) {
      src = pf.makeUrl(src);
      img[pf.ns].curSrc = src;
      img[pf.ns].curCan = candidate;

      if (!candidate.res) {
        setResolution(candidate, candidate.set.sizes);
      }
    }

    return candidate;
  }

  function getCandidateForSrc(src, set) {
    var i, candidate, candidates;

    if (src && set) {
      candidates = pf.parseSet(set);
      src = pf.makeUrl(src);

      for (i = 0; i < candidates.length; i++) {
        if (src === pf.makeUrl(candidates[i].url)) {
          candidate = candidates[i];
          break;
        }
      }
    }

    return candidate;
  }

  function getAllSourceElements(picture, candidates) {
    var i, len, source, srcset; // SPEC mismatch intended for size and perf:
    // actually only source elements preceding the img should be used
    // also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector

    var sources = picture.getElementsByTagName("source");

    for (i = 0, len = sources.length; i < len; i++) {
      source = sources[i];
      source[pf.ns] = true;
      srcset = source.getAttribute("srcset"); // if source does not have a srcset attribute, skip

      if (srcset) {
        candidates.push({
          srcset: srcset,
          media: source.getAttribute("media"),
          type: source.getAttribute("type"),
          sizes: source.getAttribute("sizes")
        });
      }
    }
  }
  /**
   * Srcset Parser
   * By Alex Bell |  MIT License
   *
   * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
   *
   * Based super duper closely on the reference algorithm at:
   * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
   */
  // 1. Let input be the value passed to this algorithm.
  // (TO-DO : Explain what "set" argument is here. Maybe choose a more
  // descriptive & more searchable name.  Since passing the "set" in really has
  // nothing to do with parsing proper, I would prefer this assignment eventually
  // go in an external fn.)


  function parseSrcset(input, set) {
    function collectCharacters(regEx) {
      var chars,
          match = regEx.exec(input.substring(pos));

      if (match) {
        chars = match[0];
        pos += chars.length;
        return chars;
      }
    }

    var inputLength = input.length,
        url,
        descriptors,
        currentDescriptor,
        state,
        c,
        // 2. Let position be a pointer into input, initially pointing at the start
    //    of the string.
    pos = 0,
        // 3. Let candidates be an initially empty source set.
    candidates = [];
    /**
    * Adds descriptor properties to a candidate, pushes to the candidates array
    * @return undefined
    */
    // (Declared outside of the while loop so that it's only created once.
    // (This fn is defined before it is used, in order to pass JSHINT.
    // Unfortunately this breaks the sequencing of the spec comments. :/ )

    function parseDescriptors() {
      // 9. Descriptor parser: Let error be no.
      var pError = false,
          // 10. Let width be absent.
      // 11. Let density be absent.
      // 12. Let future-compat-h be absent. (We're implementing it now as h)
      w,
          d,
          h,
          i,
          candidate = {},
          desc,
          lastChar,
          value,
          intVal,
          floatVal; // 13. For each descriptor in descriptors, run the appropriate set of steps
      // from the following list:

      for (i = 0; i < descriptors.length; i++) {
        desc = descriptors[i];
        lastChar = desc[desc.length - 1];
        value = desc.substring(0, desc.length - 1);
        intVal = parseInt(value, 10);
        floatVal = parseFloat(value); // If the descriptor consists of a valid non-negative integer followed by
        // a U+0077 LATIN SMALL LETTER W character

        if (regexNonNegativeInteger.test(value) && lastChar === "w") {
          // If width and density are not both absent, then let error be yes.
          if (w || d) {
            pError = true;
          } // Apply the rules for parsing non-negative integers to the descriptor.
          // If the result is zero, let error be yes.
          // Otherwise, let width be the result.


          if (intVal === 0) {
            pError = true;
          } else {
            w = intVal;
          } // If the descriptor consists of a valid floating-point number followed by
          // a U+0078 LATIN SMALL LETTER X character

        } else if (regexFloatingPoint.test(value) && lastChar === "x") {
          // If width, density and future-compat-h are not all absent, then let error
          // be yes.
          if (w || d || h) {
            pError = true;
          } // Apply the rules for parsing floating-point number values to the descriptor.
          // If the result is less than zero, let error be yes. Otherwise, let density
          // be the result.


          if (floatVal < 0) {
            pError = true;
          } else {
            d = floatVal;
          } // If the descriptor consists of a valid non-negative integer followed by
          // a U+0068 LATIN SMALL LETTER H character

        } else if (regexNonNegativeInteger.test(value) && lastChar === "h") {
          // If height and density are not both absent, then let error be yes.
          if (h || d) {
            pError = true;
          } // Apply the rules for parsing non-negative integers to the descriptor.
          // If the result is zero, let error be yes. Otherwise, let future-compat-h
          // be the result.


          if (intVal === 0) {
            pError = true;
          } else {
            h = intVal;
          } // Anything else, Let error be yes.

        } else {
          pError = true;
        }
      } // (close step 13 for loop)
      // 15. If error is still no, then append a new image source to candidates whose
      // URL is url, associated with a width width if not absent and a pixel
      // density density if not absent. Otherwise, there is a parse error.


      if (!pError) {
        candidate.url = url;

        if (w) {
          candidate.w = w;
        }

        if (d) {
          candidate.d = d;
        }

        if (h) {
          candidate.h = h;
        }

        if (!h && !d && !w) {
          candidate.d = 1;
        }

        if (candidate.d === 1) {
          set.has1x = true;
        }

        candidate.set = set;
        candidates.push(candidate);
      }
    } // (close parseDescriptors fn)

    /**
    * Tokenizes descriptor properties prior to parsing
    * Returns undefined.
    * (Again, this fn is defined before it is used, in order to pass JSHINT.
    * Unfortunately this breaks the logical sequencing of the spec comments. :/ )
    */


    function tokenize() {
      // 8.1. Descriptor tokeniser: Skip whitespace
      collectCharacters(regexLeadingSpaces); // 8.2. Let current descriptor be the empty string.

      currentDescriptor = ""; // 8.3. Let state be in descriptor.

      state = "in descriptor";

      while (true) {
        // 8.4. Let c be the character at position.
        c = input.charAt(pos); //  Do the following depending on the value of state.
        //  For the purpose of this step, "EOF" is a special character representing
        //  that position is past the end of input.
        // In descriptor

        if (state === "in descriptor") {
          // Do the following, depending on the value of c:
          // Space character
          // If current descriptor is not empty, append current descriptor to
          // descriptors and let current descriptor be the empty string.
          // Set state to after descriptor.
          if (isSpace(c)) {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
              currentDescriptor = "";
              state = "after descriptor";
            } // U+002C COMMA (,)
            // Advance position to the next character in input. If current descriptor
            // is not empty, append current descriptor to descriptors. Jump to the step
            // labeled descriptor parser.

          } else if (c === ",") {
            pos += 1;

            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }

            parseDescriptors();
            return; // U+0028 LEFT PARENTHESIS (()
            // Append c to current descriptor. Set state to in parens.
          } else if (c === "\u0028") {
            currentDescriptor = currentDescriptor + c;
            state = "in parens"; // EOF
            // If current descriptor is not empty, append current descriptor to
            // descriptors. Jump to the step labeled descriptor parser.
          } else if (c === "") {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }

            parseDescriptors();
            return; // Anything else
            // Append c to current descriptor.
          } else {
            currentDescriptor = currentDescriptor + c;
          } // (end "in descriptor"
          // In parens

        } else if (state === "in parens") {
          // U+0029 RIGHT PARENTHESIS ())
          // Append c to current descriptor. Set state to in descriptor.
          if (c === ")") {
            currentDescriptor = currentDescriptor + c;
            state = "in descriptor"; // EOF
            // Append current descriptor to descriptors. Jump to the step labeled
            // descriptor parser.
          } else if (c === "") {
            descriptors.push(currentDescriptor);
            parseDescriptors();
            return; // Anything else
            // Append c to current descriptor.
          } else {
            currentDescriptor = currentDescriptor + c;
          } // After descriptor

        } else if (state === "after descriptor") {
          // Do the following, depending on the value of c:
          // Space character: Stay in this state.
          if (isSpace(c)) {// EOF: Jump to the step labeled descriptor parser.
          } else if (c === "") {
            parseDescriptors();
            return; // Anything else
            // Set state to in descriptor. Set position to the previous character in input.
          } else {
            state = "in descriptor";
            pos -= 1;
          }
        } // Advance position to the next character in input.


        pos += 1; // Repeat this step.
      } // (close while true loop)

    } // 4. Splitting loop: Collect a sequence of characters that are space
    //    characters or U+002C COMMA characters. If any U+002C COMMA characters
    //    were collected, that is a parse error.


    while (true) {
      collectCharacters(regexLeadingCommasOrSpaces); // 5. If position is past the end of input, return candidates and abort these steps.

      if (pos >= inputLength) {
        return candidates; // (we're done, this is the sole return path)
      } // 6. Collect a sequence of characters that are not space characters,
      //    and let that be url.


      url = collectCharacters(regexLeadingNotSpaces); // 7. Let descriptors be a new empty list.

      descriptors = []; // 8. If url ends with a U+002C COMMA character (,), follow these substeps:
      //		(1). Remove all trailing U+002C COMMA characters from url. If this removed
      //         more than one character, that is a parse error.

      if (url.slice(-1) === ",") {
        url = url.replace(regexTrailingCommas, ""); // (Jump ahead to step 9 to skip tokenization and just push the candidate).

        parseDescriptors(); //	Otherwise, follow these substeps:
      } else {
        tokenize();
      } // (close else of step 8)
      // 16. Return to the step labeled splitting loop.

    } // (Close of big while loop.)

  }
  /*
   * Sizes Parser
   *
   * By Alex Bell |  MIT License
   *
   * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
   *
   * Reference algorithm at:
   * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
   *
   * Most comments are copied in directly from the spec
   * (except for comments in parens).
   *
   * Grammar is:
   * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
   * <source-size> = <media-condition> <source-size-value>
   * <source-size-value> = <length>
   * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
   *
   * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
   * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
   *
   * Returns the first valid <css-length> with a media condition that evaluates to true,
   * or "100vw" if all valid media conditions evaluate to false.
   *
   */


  function parseSizes(strValue) {
    // (Percentage CSS lengths are not allowed in this case, to avoid confusion:
    // https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
    // CSS allows a single optional plus or minus sign:
    // http://www.w3.org/TR/CSS2/syndata.html#numbers
    // CSS is ASCII case-insensitive:
    // http://www.w3.org/TR/CSS2/syndata.html#characters )
    // Spec allows exponential notation for <number> type:
    // http://dev.w3.org/csswg/css-values/#numbers
    var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i; // (This is a quick and lenient test. Because of optional unlimited-depth internal
    // grouping parens and strict spacing rules, this could get very complicated.)

    var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
    var i;
    var unparsedSizesList;
    var unparsedSizesListLength;
    var unparsedSize;
    var lastComponentValue;
    var size; // UTILITY FUNCTIONS
    //  (Toy CSS parser. The goals here are:
    //  1) expansive test coverage without the weight of a full CSS parser.
    //  2) Avoiding regex wherever convenient.
    //  Quick tests: http://jsfiddle.net/gtntL4gr/3/
    //  Returns an array of arrays.)

    function parseComponentValues(str) {
      var chrctr;
      var component = "";
      var componentArray = [];
      var listArray = [];
      var parenDepth = 0;
      var pos = 0;
      var inComment = false;

      function pushComponent() {
        if (component) {
          componentArray.push(component);
          component = "";
        }
      }

      function pushComponentArray() {
        if (componentArray[0]) {
          listArray.push(componentArray);
          componentArray = [];
        }
      } // (Loop forwards from the beginning of the string.)


      while (true) {
        chrctr = str.charAt(pos);

        if (chrctr === "") {
          // ( End of string reached.)
          pushComponent();
          pushComponentArray();
          return listArray;
        } else if (inComment) {
          if (chrctr === "*" && str[pos + 1] === "/") {
            // (At end of a comment.)
            inComment = false;
            pos += 2;
            pushComponent();
            continue;
          } else {
            pos += 1; // (Skip all characters inside comments.)

            continue;
          }
        } else if (isSpace(chrctr)) {
          // (If previous character in loop was also a space, or if
          // at the beginning of the string, do not add space char to
          // component.)
          if (str.charAt(pos - 1) && isSpace(str.charAt(pos - 1)) || !component) {
            pos += 1;
            continue;
          } else if (parenDepth === 0) {
            pushComponent();
            pos += 1;
            continue;
          } else {
            // (Replace any space character with a plain space for legibility.)
            chrctr = " ";
          }
        } else if (chrctr === "(") {
          parenDepth += 1;
        } else if (chrctr === ")") {
          parenDepth -= 1;
        } else if (chrctr === ",") {
          pushComponent();
          pushComponentArray();
          pos += 1;
          continue;
        } else if (chrctr === "/" && str.charAt(pos + 1) === "*") {
          inComment = true;
          pos += 2;
          continue;
        }

        component = component + chrctr;
        pos += 1;
      }
    }

    function isValidNonNegativeSourceSizeValue(s) {
      if (regexCssLengthWithUnits.test(s) && parseFloat(s) >= 0) {
        return true;
      }

      if (regexCssCalc.test(s)) {
        return true;
      } // ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
      // "-0 is equivalent to 0 and is not a negative number." which means that
      // unitless zero and unitless negative zero must be accepted as special cases.)


      if (s === "0" || s === "-0" || s === "+0") {
        return true;
      }

      return false;
    } // When asked to parse a sizes attribute from an element, parse a
    // comma-separated list of component values from the value of the element's
    // sizes attribute (or the empty string, if the attribute is absent), and let
    // unparsed sizes list be the result.
    // http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values


    unparsedSizesList = parseComponentValues(strValue);
    unparsedSizesListLength = unparsedSizesList.length; // For each unparsed size in unparsed sizes list:

    for (i = 0; i < unparsedSizesListLength; i++) {
      unparsedSize = unparsedSizesList[i]; // 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
      // ( parseComponentValues() already omits spaces outside of parens. )
      // If unparsed size is now empty, that is a parse error; continue to the next
      // iteration of this algorithm.
      // ( parseComponentValues() won't push an empty array. )
      // 2. If the last component value in unparsed size is a valid non-negative
      // <source-size-value>, let size be its value and remove the component value
      // from unparsed size. Any CSS function other than the calc() function is
      // invalid. Otherwise, there is a parse error; continue to the next iteration
      // of this algorithm.
      // http://dev.w3.org/csswg/css-syntax/#parse-component-value

      lastComponentValue = unparsedSize[unparsedSize.length - 1];

      if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
        size = lastComponentValue;
        unparsedSize.pop();
      } else {
        continue;
      } // 3. Remove all consecutive <whitespace-token>s from the end of unparsed
      // size. If unparsed size is now empty, return size and exit this algorithm.
      // If this was not the last item in unparsed sizes list, that is a parse error.


      if (unparsedSize.length === 0) {
        return size;
      } // 4. Parse the remaining component values in unparsed size as a
      // <media-condition>. If it does not parse correctly, or it does parse
      // correctly but the <media-condition> evaluates to false, continue to the
      // next iteration of this algorithm.
      // (Parsing all possible compound media conditions in JS is heavy, complicated,
      // and the payoff is unclear. Is there ever an situation where the
      // media condition parses incorrectly but still somehow evaluates to true?
      // Can we just rely on the browser/polyfill to do it?)


      unparsedSize = unparsedSize.join(" ");

      if (!pf.matchesMedia(unparsedSize)) {
        continue;
      } // 5. Return size and exit this algorithm.


      return size;
    } // If the above algorithm exhausts unparsed sizes list without returning a
    // size value, return 100vw.


    return "100vw";
  } // namespace


  pf.ns = ("pf" + new Date().getTime()).substr(0, 9); // srcset support test

  pf.supSrcset = "srcset" in image;
  pf.supSizes = "sizes" in image;
  pf.supPicture = !!window.HTMLPictureElement; // UC browser does claim to support srcset and picture, but not sizes,
  // this extended test reveals the browser does support nothing

  if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
    (function (image2) {
      image.srcset = "data:,a";
      image2.src = "data:,a";
      pf.supSrcset = image.complete === image2.complete;
      pf.supPicture = pf.supSrcset && pf.supPicture;
    })(document.createElement("img"));
  } // Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute


  if (pf.supSrcset && !pf.supSizes) {
    (function () {
      var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
      var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      var img = document.createElement("img");

      var test = function () {
        var width = img.width;

        if (width === 2) {
          pf.supSizes = true;
        }

        alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;
        isSupportTestReady = true; // force async

        setTimeout(picturefill);
      };

      img.onload = test;
      img.onerror = test;
      img.setAttribute("sizes", "9px");
      img.srcset = width1 + " 1w," + width2 + " 9w";
      img.src = width1;
    })();
  } else {
    isSupportTestReady = true;
  } // using pf.qsa instead of dom traversing does scale much better,
  // especially on sites mixing responsive and non-responsive images


  pf.selShort = "picture>img,img[srcset]";
  pf.sel = pf.selShort;
  pf.cfg = cfg;
  /**
   * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
   */

  pf.DPR = DPR || 1;
  pf.u = units; // container of supported mime types that one might need to qualify before using

  pf.types = types;
  pf.setSize = noop;
  /**
   * Gets a string and returns the absolute URL
   * @param src
   * @returns {String} absolute URL
   */

  pf.makeUrl = memoize(function (src) {
    anchor.href = src;
    return anchor.href;
  });
  /**
   * Gets a DOM element or document and a selctor and returns the found matches
   * Can be extended with jQuery/Sizzle for IE7 support
   * @param context
   * @param sel
   * @returns {NodeList|Array}
   */

  pf.qsa = function (context, sel) {
    return "querySelector" in context ? context.querySelectorAll(sel) : [];
  };
  /**
   * Shortcut method for matchMedia ( for easy overriding in tests )
   * wether native or pf.mMQ is used will be decided lazy on first call
   * @returns {boolean}
   */


  pf.matchesMedia = function () {
    if (window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches) {
      pf.matchesMedia = function (media) {
        return !media || matchMedia(media).matches;
      };
    } else {
      pf.matchesMedia = pf.mMQ;
    }

    return pf.matchesMedia.apply(this, arguments);
  };
  /**
   * A simplified matchMedia implementation for IE8 and IE9
   * handles only min-width/max-width with px or em values
   * @param media
   * @returns {boolean}
   */


  pf.mMQ = function (media) {
    return media ? evalCSS(media) : true;
  };
  /**
   * Returns the calculated length in css pixel from the given sourceSizeValue
   * http://dev.w3.org/csswg/css-values-3/#length-value
   * intended Spec mismatches:
   * * Does not check for invalid use of CSS functions
   * * Does handle a computed length of 0 the same as a negative and therefore invalid value
   * @param sourceSizeValue
   * @returns {Number}
   */


  pf.calcLength = function (sourceSizeValue) {
    var value = evalCSS(sourceSizeValue, true) || false;

    if (value < 0) {
      value = false;
    }

    return value;
  };
  /**
   * Takes a type string and checks if its supported
   */


  pf.supportsType = function (type) {
    return type ? types[type] : true;
  };
  /**
   * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
   * @param sourceSizeStr
   * @returns {*}
   */


  pf.parseSize = memoize(function (sourceSizeStr) {
    var match = (sourceSizeStr || "").match(regSize);
    return {
      media: match && match[1],
      length: match && match[2]
    };
  });

  pf.parseSet = function (set) {
    if (!set.cands) {
      set.cands = parseSrcset(set.srcset, set);
    }

    return set.cands;
  };
  /**
   * returns 1em in css px for html/body default size
   * function taken from respondjs
   * @returns {*|number}
   */


  pf.getEmValue = function () {
    var body;

    if (!eminpx && (body = document.body)) {
      var div = document.createElement("div"),
          originalHTMLCSS = docElem.style.cssText,
          originalBodyCSS = body.style.cssText;
      div.style.cssText = baseStyle; // 1em in a media query is the value of the default font size of the browser
      // reset docElem and body to ensure the correct value is returned

      docElem.style.cssText = fsCss;
      body.style.cssText = fsCss;
      body.appendChild(div);
      eminpx = div.offsetWidth;
      body.removeChild(div); //also update eminpx before returning

      eminpx = parseFloat(eminpx, 10); // restore the original values

      docElem.style.cssText = originalHTMLCSS;
      body.style.cssText = originalBodyCSS;
    }

    return eminpx || 16;
  };
  /**
   * Takes a string of sizes and returns the width in pixels as a number
   */


  pf.calcListLength = function (sourceSizeListStr) {
    // Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
    //
    //                           or (min-width:30em) calc(30% - 15px)
    if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
      var winningLength = pf.calcLength(parseSizes(sourceSizeListStr));
      sizeLengthCache[sourceSizeListStr] = !winningLength ? units.width : winningLength;
    }

    return sizeLengthCache[sourceSizeListStr];
  };
  /**
   * Takes a candidate object with a srcset property in the form of url/
   * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
   *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
   *     "images/pic-small.png"
   * Get an array of image candidates in the form of
   *      {url: "/foo/bar.png", resolution: 1}
   * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
   * If sizes is specified, res is calculated
   */


  pf.setRes = function (set) {
    var candidates;

    if (set) {
      candidates = pf.parseSet(set);

      for (var i = 0, len = candidates.length; i < len; i++) {
        setResolution(candidates[i], set.sizes);
      }
    }

    return candidates;
  };

  pf.setRes.res = setResolution;

  pf.applySetCandidate = function (candidates, img) {
    if (!candidates.length) {
      return;
    }

    var candidate, i, j, length, bestCandidate, curSrc, curCan, candidateSrc, abortCurSrc;
    var imageData = img[pf.ns];
    var dpr = pf.DPR;
    curSrc = imageData.curSrc || img[curSrcProp];
    curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set); // if we have a current source, we might either become lazy or give this source some advantage

    if (curCan && curCan.set === candidates[0].set) {
      // if browser can abort image request and the image has a higher pixel density than needed
      // and this image isn't downloaded yet, we skip next part and try to save bandwidth
      abortCurSrc = supportAbort && !img.complete && curCan.res - 0.1 > dpr;

      if (!abortCurSrc) {
        curCan.cached = true; // if current candidate is "best", "better" or "okay",
        // set it to bestCandidate

        if (curCan.res >= dpr) {
          bestCandidate = curCan;
        }
      }
    }

    if (!bestCandidate) {
      candidates.sort(ascendingSort);
      length = candidates.length;
      bestCandidate = candidates[length - 1];

      for (i = 0; i < length; i++) {
        candidate = candidates[i];

        if (candidate.res >= dpr) {
          j = i - 1; // we have found the perfect candidate,
          // but let's improve this a little bit with some assumptions ;-)

          if (candidates[j] && (abortCurSrc || curSrc !== pf.makeUrl(candidate.url)) && chooseLowRes(candidates[j].res, candidate.res, dpr, candidates[j].cached)) {
            bestCandidate = candidates[j];
          } else {
            bestCandidate = candidate;
          }

          break;
        }
      }
    }

    if (bestCandidate) {
      candidateSrc = pf.makeUrl(bestCandidate.url);
      imageData.curSrc = candidateSrc;
      imageData.curCan = bestCandidate;

      if (candidateSrc !== curSrc) {
        pf.setSrc(img, bestCandidate);
      }

      pf.setSize(img);
    }
  };

  pf.setSrc = function (img, bestCandidate) {
    var origWidth;
    img.src = bestCandidate.url; // although this is a specific Safari issue, we don't want to take too much different code paths

    if (bestCandidate.set.type === "image/svg+xml") {
      origWidth = img.style.width;
      img.style.width = img.offsetWidth + 1 + "px"; // next line only should trigger a repaint
      // if... is only done to trick dead code removal

      if (img.offsetWidth + 1) {
        img.style.width = origWidth;
      }
    }
  };

  pf.getSet = function (img) {
    var i, set, supportsType;
    var match = false;
    var sets = img[pf.ns].sets;

    for (i = 0; i < sets.length && !match; i++) {
      set = sets[i];

      if (!set.srcset || !pf.matchesMedia(set.media) || !(supportsType = pf.supportsType(set.type))) {
        continue;
      }

      if (supportsType === "pending") {
        set = supportsType;
      }

      match = set;
      break;
    }

    return match;
  };

  pf.parseSets = function (element, parent, options) {
    var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;
    var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
    var imageData = element[pf.ns];

    if (imageData.src === undefined || options.src) {
      imageData.src = getImgAttr.call(element, "src");

      if (imageData.src) {
        setImgAttr.call(element, srcAttr, imageData.src);
      } else {
        removeImgAttr.call(element, srcAttr);
      }
    }

    if (imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset) {
      srcsetAttribute = getImgAttr.call(element, "srcset");
      imageData.srcset = srcsetAttribute;
      srcsetParsed = true;
    }

    imageData.sets = [];

    if (hasPicture) {
      imageData.pic = true;
      getAllSourceElements(parent, imageData.sets);
    }

    if (imageData.srcset) {
      imageSet = {
        srcset: imageData.srcset,
        sizes: getImgAttr.call(element, "sizes")
      };
      imageData.sets.push(imageSet);
      isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || ""); // add normal src as candidate, if source has no w descriptor

      if (!isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x) {
        imageSet.srcset += ", " + imageData.src;
        imageSet.cands.push({
          url: imageData.src,
          d: 1,
          set: imageSet
        });
      }
    } else if (imageData.src) {
      imageData.sets.push({
        srcset: imageData.src,
        sizes: null
      });
    }

    imageData.curCan = null;
    imageData.curSrc = undefined; // if img has picture or the srcset was removed or has a srcset and does not support srcset at all
    // or has a w descriptor (and does not support sizes) set support to false to evaluate

    imageData.supported = !(hasPicture || imageSet && !pf.supSrcset || isWDescripor && !pf.supSizes);

    if (srcsetParsed && pf.supSrcset && !imageData.supported) {
      if (srcsetAttribute) {
        setImgAttr.call(element, srcsetAttr, srcsetAttribute);
        element.srcset = "";
      } else {
        removeImgAttr.call(element, srcsetAttr);
      }
    }

    if (imageData.supported && !imageData.srcset && (!imageData.src && element.src || element.src !== pf.makeUrl(imageData.src))) {
      if (imageData.src === null) {
        element.removeAttribute("src");
      } else {
        element.src = imageData.src;
      }
    }

    imageData.parsed = true;
  };

  pf.fillImg = function (element, options) {
    var imageData;
    var extreme = options.reselect || options.reevaluate; // expando for caching data on the img

    if (!element[pf.ns]) {
      element[pf.ns] = {};
    }

    imageData = element[pf.ns]; // if the element has already been evaluated, skip it
    // unless `options.reevaluate` is set to true ( this, for example,
    // is set to true when running `picturefill` on `resize` ).

    if (!extreme && imageData.evaled === evalId) {
      return;
    }

    if (!imageData.parsed || options.reevaluate) {
      pf.parseSets(element, element.parentNode, options);
    }

    if (!imageData.supported) {
      applyBestCandidate(element);
    } else {
      imageData.evaled = evalId;
    }
  };

  pf.setupRun = function () {
    if (!alreadyRun || isVwDirty || DPR !== window.devicePixelRatio) {
      updateMetrics();
    }
  }; // If picture is supported, well, that's awesome.


  if (pf.supPicture) {
    picturefill = noop;
    pf.fillImg = noop;
  } else {
    // Set up picture polyfill by polling the document
    (function () {
      var isDomReady;
      var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

      var run = function () {
        var readyState = document.readyState || "";
        timerId = setTimeout(run, readyState === "loading" ? 200 : 999);

        if (document.body) {
          pf.fillImgs();
          isDomReady = isDomReady || regReady.test(readyState);

          if (isDomReady) {
            clearTimeout(timerId);
          }
        }
      };

      var timerId = setTimeout(run, document.body ? 9 : 99); // Also attach picturefill on resize and readystatechange
      // http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html

      var debounce = function (func, wait) {
        var timeout, timestamp;

        var later = function () {
          var last = new Date() - timestamp;

          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            func();
          }
        };

        return function () {
          timestamp = new Date();

          if (!timeout) {
            timeout = setTimeout(later, wait);
          }
        };
      };

      var lastClientWidth = docElem.clientHeight;

      var onResize = function () {
        isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
        lastClientWidth = docElem.clientHeight;

        if (isVwDirty) {
          pf.fillImgs();
        }
      };

      on(window, "resize", debounce(onResize, 99));
      on(document, "readystatechange", run);
    })();
  }

  pf.picturefill = picturefill; //use this internally for easy monkey patching/performance testing

  pf.fillImgs = picturefill;
  pf.teardownRun = noop;
  /* expose methods for testing */

  picturefill._ = pf;
  window.picturefillCFG = {
    pf: pf,
    push: function (args) {
      var name = args.shift();

      if (typeof pf[name] === "function") {
        pf[name].apply(pf, args);
      } else {
        cfg[name] = args[0];

        if (alreadyRun) {
          pf.fillImgs({
            reselect: true
          });
        }
      }
    }
  };

  while (setOptions && setOptions.length) {
    window.picturefillCFG.push(setOptions.shift());
  }
  /* expose picturefill */


  window.picturefill = picturefill;
  /* expose picturefill */

  if (typeof module === "object" && typeof module.exports === "object") {
    // CommonJS, just export
    module.exports = picturefill;
  } else if (typeof define === "function" && define.amd) {
    // AMD support
    define("picturefill", function () {
      return picturefill;
    });
  } // IE8 evals this sync, so it must be the last thing we do


  if (!pf.supPicture) {
    types["image/webp"] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==");
  }
})(window, document);
},{}],"js/image.js":[function(require,module,exports) {
"use strict";

var _observer = _interopRequireDefault(require("./utils/observer"));

require("intersection-observer");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _picturefill = _interopRequireDefault(require("picturefill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var resizeObserver = (0, _observer.default)(_resizeObserverPolyfill.default);
var intersectionObserver = (0, _observer.default)(IntersectionObserver, {
  rootMargin: '100% 0% 100% 0%'
});

_toConsumableArray(document.querySelectorAll('img[data-srcset]')).forEach(function (img) {
  var update = function update(width) {
    return img.setAttribute('sizes', width + 'px');
  };

  var onResize = function onResize(entry) {
    update(entry.contentRect.width);
    (0, _picturefill.default)({
      reevaluate: true,
      elements: [img]
    });
  };

  var onIntersect = function onIntersect(entry) {
    if (entry.isIntersecting) {
      update(img.getBoundingClientRect().width);
      img.setAttribute('srcset', img.dataset.srcset);
      resizeObserver.observe(img, onResize);
      (0, _picturefill.default)({
        reevaluate: true,
        elements: [img]
      });
    } else {
      resizeObserver.unobserve(img, onResize);
    }
  };

  intersectionObserver.observe(img, onIntersect);
});
},{"./utils/observer":"js/utils/observer.js","intersection-observer":"node_modules/intersection-observer/intersection-observer.js","resize-observer-polyfill":"node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js","picturefill":"node_modules/picturefill/dist/picturefill.js"}],"node_modules/lodash/_arrayPush.js":[function(require,module,exports) {
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],"node_modules/lodash/_freeGlobal.js":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"node_modules/lodash/_root.js":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"node_modules/lodash/_freeGlobal.js"}],"node_modules/lodash/_Symbol.js":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"node_modules/lodash/_root.js"}],"node_modules/lodash/_getRawTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol');

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
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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

module.exports = getRawTag;

},{"./_Symbol":"node_modules/lodash/_Symbol.js"}],"node_modules/lodash/_objectToString.js":[function(require,module,exports) {
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

module.exports = objectToString;

},{}],"node_modules/lodash/_baseGetTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"node_modules/lodash/_Symbol.js","./_getRawTag":"node_modules/lodash/_getRawTag.js","./_objectToString":"node_modules/lodash/_objectToString.js"}],"node_modules/lodash/isObjectLike.js":[function(require,module,exports) {
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
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"node_modules/lodash/_baseIsArguments.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

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
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":"node_modules/lodash/_baseGetTag.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/isArguments.js":[function(require,module,exports) {
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

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
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":"node_modules/lodash/_baseIsArguments.js","./isObjectLike":"node_modules/lodash/isObjectLike.js"}],"node_modules/lodash/isArray.js":[function(require,module,exports) {
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

module.exports = isArray;

},{}],"node_modules/lodash/_isFlattenable.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

},{"./_Symbol":"node_modules/lodash/_Symbol.js","./isArguments":"node_modules/lodash/isArguments.js","./isArray":"node_modules/lodash/isArray.js"}],"node_modules/lodash/_baseFlatten.js":[function(require,module,exports) {
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":"node_modules/lodash/_arrayPush.js","./_isFlattenable":"node_modules/lodash/_isFlattenable.js"}],"node_modules/lodash/flatten.js":[function(require,module,exports) {
var baseFlatten = require('./_baseFlatten');

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

},{"./_baseFlatten":"node_modules/lodash/_baseFlatten.js"}],"node_modules/intersection-observer-polyfill/src/shims/es6-collections.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeakMap = exports.Map = void 0;

/**
 * Simple shims for WeakMap and Map classes.
 * This implementation is not meant to be used outside of IntersectionObserver modules
 * because it covers only limited range of use cases.
 */
const hasNativeCollections = typeof window.WeakMap === 'function' && typeof window.Map === 'function';

const WeakMap = function () {
  if (hasNativeCollections) {
    return window.WeakMap;
  }
  /**
   *
   * @param {Array<Array>} arr
   * @param {Object} key
   * @returns {Number}
   */


  function getIndex(arr, key) {
    let result = -1;
    arr.some((entry, index) => {
      let matches = entry[0] === key;

      if (matches) {
        result = index;
      }

      return matches;
    });
    return result;
  }

  return class {
    constructor() {
      this.__entries__ = [];
    }
    /**
     *
     * @param {Object} key
     * @returns {*}
     */


    get(key) {
      let index = getIndex(this.__entries__, key);
      return this.__entries__[index][1];
    }
    /**
     *
     * @param {Object} key
     * @param {*} value
     */


    set(key, value) {
      let index = getIndex(this.__entries__, key);

      if (~index) {
        this.__entries__[index][1] = value;
      } else {
        this.__entries__.push([key, value]);
      }
    }
    /**
     *
     * @param {Object} key
     */


    delete(key) {
      let entries = this.__entries__,
          index = getIndex(entries, key);

      if (~index) {
        entries.splice(index, 1);
      }
    }
    /**
     *
     * @param {Object} key
     * @returns {Boolean}
     */


    has(key) {
      return !!~getIndex(this.__entries__, key);
    }

  };
}();

exports.WeakMap = WeakMap;

const Map = function () {
  if (hasNativeCollections) {
    return window.Map;
  }

  return class extends WeakMap {
    /**
     *
     * @returns {Number}
     */
    get size() {
      return this.__entries__.length;
    }

    clear() {
      this.__entries__.splice(0, this.__entries__.length);
    }
    /**
     *
     * @returns {Array<Array>}
     */


    entries() {
      return this.__entries__.slice();
    }
    /**
     *
     * @returns {Array}
     */


    keys() {
      return this.__entries__.map(entry => entry[0]);
    }
    /**
     *
     * @returns {Array}
     */


    values() {
      return this.__entries__.map(entry => entry[1]);
    }
    /**
     *
     * @param {Function} callback
     * @param {Object} [ctx = null]
     */


    forEach(callback, ctx = null) {
      for (const entry of this.__entries__) {
        callback.call(ctx, entry[1], entry[0]);
      }
    }

  };
}();

exports.Map = Map;
},{}],"node_modules/intersection-observer-polyfill/src/shims/performance.now.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A shim for performance.now method which falls back
 * to Date.now if the first one is not supported.
 *
 * @returns {Timestamp}
 */
var _default = function () {
  if (window.performance && window.performance.now) {
    return () => window.performance.now();
  }

  return () => Date.now();
}();

exports.default = _default;
},{}],"node_modules/intersection-observer-polyfill/src/IntersectionObserverController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _performance = _interopRequireDefault(require("./shims/performance.now"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mutationsSupported = typeof window.MutationObserver === 'function';
/**
 * A shim for requestAnimationFrame which falls back
 * to setTimeout if the first one is not supported.
 *
 * @returns {Number} Request identifier.
 */

const requestAnimFrame = function () {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame;
  }

  return callback => {
    return setTimeout(() => callback((0, _performance.default)()), 1000 / 60);
  };
}();
/**
 * Creates a wrapper function that ensures that
 * provided callback will be invoked only after
 * the specified delay.
 *
 * @param {Function} callback
 * @param {Number} [delay = 0]
 * @returns {Function}
 */


function debounce(callback, delay = 0) {
  let timeoutID = false;
  return function (...args) {
    if (timeoutID !== false) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      timeoutID = false;
      callback.apply(this, args);
    }, delay);
  };
}
/**
 * Controller class that is used to handle updates of registered IntersectionObservers.
 * It controls when and for how long it's necessary to run updates of observations
 * by listening to various events on window along with DOM mutations
 * (nodes removal, changes of attributes, etc.).
  *
 * CSS transitions and animations are handled by running the update cycle
 * until position of DOM elements, added to connected observers, keeps changing
 * or until the idle timeout is reached (default timeout is 50 milliseconds).
 * Timeout value can be manually increased if transitions have a delay.
 *
 * Tracking of changes made by ":hover" class is optional and can be
 * enabled by invoking the "enableHover" method.
 *
 * Infinite update cycle along with a listener of "click" event will be used in case when
 * MutatioObserver is not supported.
 */


class IntersectionObserverController {
  /**
   * Creates new IntersectionObserverController instance.
   *
   * @param {Number} [idleTimeout = 50]
   * @pram {Boolean} [trackHovers = false] - Whether to track "mouseover"
   *      events or not. Disabled be default.
   */
  constructor(idleTimeout = 50, trackHovers = false) {
    this._idleTimeout = idleTimeout;
    this._trackHovers = trackHovers;
    this._cycleStartTime = -1; // Indicates whether the update of observers is scheduled.

    this._isUpdateScheduled = false; // Indicates whether infinite cycles are enabled.

    this._repeatCycle = false; // Indicates whether "mouseover" event handler was added.

    this._hoverInitiated = false; // Keeps reference to the instance of MutationObserver.

    this._mutationsObserver = null; // Indicates whether DOM listeners were initiated.

    this._isListening = false; // A list of connected observers.

    this._observers = []; // Fix value of "this" binding for the following methods.

    this.startUpdateCycle = this.startUpdateCycle.bind(this);
    this.scheduleUpdate = this.scheduleUpdate.bind(this);
    this._onMutation = this._onMutation.bind(this); // Function that will be invoked to re-rerun the update cycle
    // if repeatable cycles are enabled.

    this._repeatHandler = debounce(this.scheduleUpdate, 200); // "mouseover" event handler.

    this._onMouseOver = debounce(this.startUpdateCycle, 200);
  }
  /**
   * Returns current idle timeout value.
   *
   * @returns {Number}
   */


  get idleTimeout() {
    return this._idleTimeout;
  }
  /**
   * Sets up new idle timeout value.
   *
   * @param {Number} value - New timeout value.
   */


  set idleTimeout(value) {
    this._idleTimeout = value;
  }
  /**
   * Adds observer to observers list.
   *
   * @param {IntersectionObserver} observer - Observer to be added.
   */


  connect(observer) {
    if (!this.isConnected(observer)) {
      this._observers.push(observer);
    } // Instantiate listeners if they
    // weren't instantiated yet.


    if (!this._isListening) {
      this._initListeners();
    }
  }
  /**
   * Removes observer from observers list.
   *
   * @param {IntersectionObserver} observer - Observer to be removed.
   */


  disconnect(observer) {
    let observers = this._observers,
        index = observers.indexOf(observer);

    if (~index) {
      observers.splice(index, 1);
    } // Remove listeners if controller
    // has no connected observers.


    if (!observers.length && this._isListening) {
      this._removeListeners();
    }
  }
  /**
   * Tells whether provided observer is connected to controller.
   *
   * @param {IntersectionObserver} observer - Observer to be checked.
   * @returns {Boolean}
   */


  isConnected(observer) {
    return !!~this._observers.indexOf(observer);
  }
  /**
   * Updates every observer from observers list and
   * notifies them of queued entries.
   *
   * @private
   * @returns {Boolean} Returns "true" if any observer
   *      has detected changes in position of its elements.
   */


  _updateObservers() {
    let hasChanges = false;

    for (const observer of this._observers) {
      if (observer.updateObservations()) {
        hasChanges = true;
      }

      if (observer.hasEntries()) {
        observer.notifySubscriber();
      }
    }

    return hasChanges;
  }
  /**
   * Schedules new update cycle.
   */


  startUpdateCycle() {
    this._cycleStartTime = (0, _performance.default)();
    this.scheduleUpdate();
  }
  /**
   * Controls invocation of "_updateObservers" method.
   * It will re-invoke itself in the following cases:
   *      - Update of observers detected changes in elements position.
   *        In this case we need to postpone cycle end time in order to ensure
   *        that we won't miss next iteration of animations.
   *
   *      - Idle timeout wasn't reached yet.
   *        In this case we need to schedule new single update
   *        because changes may be delayed.
   *
   * @param {Number} [timestamp] - Internal parameter
   *      that is used to define whether method was invoked
   *      as a callback of requestAnimationFrame.
   */


  scheduleUpdate(timestamp) {
    let calledFromRAF = typeof timestamp === 'number'; // Invoke the update of observers only if function
    // was called as a requestAnimationFrame callback.

    if (calledFromRAF) {
      const hasChanges = this._updateObservers();

      this._isUpdateScheduled = false; // Do nothing if cycle wasn't started.

      if (!this._wasCycleStarted()) {
        return;
      }

      if (hasChanges) {
        // Postpone cycle end time if changes were detected.
        this.startUpdateCycle();
      } else if (!this._hasIdleTimeEnded()) {
        // Schedule new single update if cycle timeout wasn't reached yet.
        this.scheduleUpdate();
      } else {
        // Finish cycle.
        this._onCycleEnded();
      }
    } else if (!this._isUpdateScheduled) {
      // Request new update if it wasn't requested already.
      requestAnimFrame(this.scheduleUpdate);
      this._isUpdateScheduled = true;
    }
  }
  /**
   * Tells whether cycle has reached its idle timeout.
   *
   * @private
   * @returns {Boolean}
   */


  _hasIdleTimeEnded() {
    return (0, _performance.default)() - this._cycleStartTime > this._idleTimeout;
  }
  /**
   * Tells whether the update cycle is currently running.
   *
   * @private
   * @returns {Boolean}
   */


  _wasCycleStarted() {
    return this._cycleStartTime !== -1;
  }
  /**
   * Callback that will be invoked after the update cycle is finished.
   *
   * @private
   */


  _onCycleEnded() {
    // Mark that update cycle is not running.
    this._cycleStartTime = -1;

    if (this._repeatCycle) {
      // Time is set to '0' because we want to automatically
      // start update cycle when single update detects changes.
      this._cycleStartTime = 0;

      this._repeatHandler();
    }
  }
  /**
   * Initializes DOM listeners.
   *
   * @private
   */


  _initListeners() {
    // Do nothing if listeners are already initiated.
    if (this._isListening) {
      return;
    }

    this._isListening = true; // Use update cycle here instead of a single update because we may encounter
    // with delayed changes, e.g. when width or height of an
    // element are changed by CSS transitions.

    window.addEventListener('resize', this.startUpdateCycle, true);
    window.addEventListener('scroll', this.scheduleUpdate, true); // Listen to possible changes made by ":hover" class.

    if (this._trackHovers) {
      this._addHoverListener();
    } // Fall back to repeatable cycle with additional tracking of
    // "click" event if MutationObserver is not supported.


    if (!mutationsSupported) {
      this._repeatCycle = true; // Listen to clicks as they may cause changes in elements position.

      window.addEventListener('click', this.startUpdateCycle, true); // Manually start cycle.

      this.startUpdateCycle();
    } else {
      // Subscribe to DOM mutations as they may lead to changes in position of elements.
      this._mutationsObserver = new MutationObserver(this._onMutation);

      this._mutationsObserver.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }
  /**
   * Removes all DOM listeners.
   *
   * @private
   */


  _removeListeners() {
    // Do nothing if listeners were already removed.
    if (!this._isListening) {
      return;
    }

    window.removeEventListener('resize', this.startUpdateCycle, true);
    window.removeEventListener('scroll', this.scheduleUpdate, true);

    this._removeHoverListener();

    if (!mutationsSupported) {
      this._repeatCycle = false;
      window.removeEventListener('click', this.startUpdateCycle, true);
    } else if (this._mutationsObserver) {
      this._mutationsObserver.disconnect();

      this._mutationsObserver = null;
    }

    this._isListening = false;
  }
  /**
   * Enables hover listener.
   */


  enableHover() {
    this._trackHovers = true; // Manually add hover listener
    // if listeners were already initiated.

    if (this._isListening) {
      this._addHoverListener();
    }
  }
  /**
   * Disables hover listener.
   */


  disableHover() {
    this._trackHovers = false;

    this._removeHoverListener();
  }
  /**
   * Tells whether hover listener is enabled.
   *
   * @returns {Boolean}
   */


  isHoverEnabled() {
    return this._trackHovers;
  }
  /**
   * Adds "mouseover" listener if it wasn't already added.
   *
   * @private
   */


  _addHoverListener() {
    if (this._hoverInitiated) {
      return;
    }

    window.addEventListener('mouseover', this._onMouseOver, true);
    this._hoverInitiated = true;
  }
  /**
   * Removes "mouseover" listener if it was added previously.
   *
   * @private
   */


  _removeHoverListener() {
    if (!this._hoverInitiated) {
      return;
    }

    window.removeEventListener('mouseover', this._onMouseOver, true);
    this._hoverInitiated = false;
  }
  /**
   * DOM mutations handler.
   *
   * @private
   * @param {Array<MutationRecord>} entries
   */


  _onMutation(entries) {
    const runSingleUpdate = entries.every(entry => {
      return entry.type !== 'attributes';
    }); // Schedule single update if attributes (class, style, etc.)
    // were not changed. Otherwise run update cycle because
    // animations are expected to appear only in this case.

    runSingleUpdate ? this.scheduleUpdate() : this.startUpdateCycle();
  }

}

exports.default = IntersectionObserverController;
},{"./shims/performance.now":"node_modules/intersection-observer-polyfill/src/shims/performance.now.js"}],"node_modules/intersection-observer-polyfill/src/geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToClientRect = mapToClientRect;
exports.createRectangle = createRectangle;
exports.getRectangle = getRectangle;
exports.getArea = getArea;
exports.isEmpty = isEmpty;
exports.isEqual = isEqual;

/**
 * From provided rectangle creates a new one whose
 * properties are not enumerable, configurable or writable.
 *
 * @param {ClientRect} rect - Initial rectangle.
 * @returns {ClientRect}
 */
function mapToClientRect(rect) {
  const descriptors = {};

  for (const key of Object.keys(rect)) {
    descriptors[key] = {
      value: rect[key]
    };
  }

  return Object.defineProperties({}, descriptors);
}
/**
 * Creates rectangle based on provided arguments.
 * If called without arguments then an empty rectangle
 * will be created.
 *
 * @param {Number} [left = 0] - Left position of rectangle.
 * @param {Number} [top = 0] - Top position of rectangle.
 * @param {Number} [width = 0] - Rectangles' width.
 * @param {Number} [height = 0] - Rectangles' height.
 * @returns {ClientRect}
 */


function createRectangle(left = 0, top = 0, width = 0, height = 0) {
  return {
    left,
    top,
    width,
    height,
    bottom: top + height,
    right: left + width
  };
}
/**
 * Returns client rectangle of provided element.
 * If element represents documentElement then returns
 * main viewport rectangle.
 *
 * @param {Element} target
 * @returns {ClientRect}
 */


function getRectangle(target) {
  if (target === document.documentElement) {
    return createRectangle(0, 0, target.clientWidth, target.clientHeight);
  }

  return target.getBoundingClientRect();
}
/**
 * Calculates area of rectangle.
 *
 * @param {ClientRect} rect - Rectangle whose area needs to be calculated.
 * @returns {Number} Rectangles' area.
 */


function getArea(rect) {
  return rect.width * rect.height;
}
/**
 * Tells whether rectangle is empty.
 *
 * @param {ClientRect} rect - Rectangle to be checked.
 * @returns {Boolean}
 */


function isEmpty(rect) {
  return rect.height === 0 && rect.width === 0;
}
/**
 * Compares rectangles to each other.
 *
 * @param {ClientRect} first
 * @param {ClientRect} second
 * @returns {Boolean}
 */


function isEqual(first, second) {
  return first.top === second.top && first.left === second.left && first.right === second.right && first.bottom === second.bottom;
}
},{}],"node_modules/intersection-observer-polyfill/src/IntersectionObserverEntry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _geometry = require("./geometry");

class IntersectionObserverEntry {
  /**
   * Creates new instance of IntersectionObserverEntry.
   *
   * @param {Element} target
   * @param {ClientRect} targetRect
   * @param {ClientRect} intersecRect
   * @param {Number} intersecRatio
   * @param {ClientRect} rootBounds
   * @param {Timestamp} time
   */
  constructor(target, targetRect, intersecRect, intersecRatio, rootBounds, time) {
    // According to the spec following properties are not writable and
    // in native implementation they are also not enumerable.
    Object.defineProperties(this, {
      boundingClientRect: {
        value: targetRect
      },
      intersectionRatio: {
        value: intersecRatio
      },
      intersectionRect: {
        value: (0, _geometry.mapToClientRect)(intersecRect)
      },
      rootBounds: {
        value: (0, _geometry.mapToClientRect)(rootBounds)
      },
      target: {
        value: target
      },
      time: {
        value: time
      }
    });
  }

}

exports.default = IntersectionObserverEntry;
},{"./geometry":"node_modules/intersection-observer-polyfill/src/geometry.js"}],"node_modules/intersection-observer-polyfill/src/IntersectionObservation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _performance = _interopRequireDefault(require("./shims/performance.now"));

var _geometry = require("./geometry");

var _IntersectionObserverEntry = _interopRequireDefault(require("./IntersectionObserverEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emptyRect = (0, _geometry.createRectangle)();
/**
 * Tells whether target is a descendant of container element
 * and that both of them are present in DOM.
 *
 * @param {Element} container - Container element.
 * @param {Element} target - Target element.
 * @returns {Boolean}
 */

function isDetached(container, target) {
  const docElement = document.documentElement;
  return container !== docElement && !docElement.contains(container) || !container.contains(target);
}
/**
 * Computes intersection rectangle between two rectangles.
 *
 * @param {ClientRect} rootRect - Rectangle of container element.
 * @param {ClientRect} targetRect - Rectangle of target element.
 * @returns {ClientRect} Intersection rectangle.
 */


function computeIntersection(rootRect, targetRect) {
  const left = Math.max(targetRect.left, rootRect.left);
  const right = Math.min(targetRect.right, rootRect.right);
  const top = Math.max(targetRect.top, rootRect.top);
  const bottom = Math.min(targetRect.bottom, rootRect.bottom);
  const width = right - left;
  const height = bottom - top;
  return (0, _geometry.createRectangle)(left, top, width, height);
}
/**
 * Finds intersection rectangle of provided elements.
 *
 * @param {Element} container - Container element.
 * @param {Element} target - Target element.
 * @param {ClientRect} targetRect - Rectangle of target element.
 * @param {ClientRect} containterRect - Rectangle of container element.
 */


function getIntersection(container, target, containterRect, targetRect) {
  let intersecRect = targetRect,
      parent = target.parentNode,
      rootReached = false;

  while (!rootReached) {
    let parentRect = null;

    if (parent === container || parent.nodeType !== 1) {
      rootReached = true;
      parentRect = containterRect;
    } else if (window.getComputedStyle(parent).overflow !== 'visible') {
      parentRect = (0, _geometry.getRectangle)(parent);
    }

    if (parentRect) {
      intersecRect = computeIntersection(intersecRect, parentRect);
    }

    parent = parent.parentNode;
  }

  return intersecRect;
}
/**
 * This class is responsible for computing and keeping track of intersections
 * between target element and its container. It will create and queue for notification
 * new IntersectionObserverEntry when intersection ratio reaches new thresholded value.
 */


class IntersectionObservation {
  /**
   * Creates instance of IntersectionObservation.
   *
   * @param {Element} target - Element being observed.
   * @param {IntersectionObserver} observer - Associated IntersectionObserver.
   */
  constructor(target, observer) {
    this.target = target;
    this.observer = observer;
    this.prevTargetRect = emptyRect;
    this.prevThreshold = 0;
    this.prevRatio = 0;
  }
  /**
   * Updates intersection data. Creates and queues new
   * IntersectionObserverEntry if intersection threshold has changed.
   *
   * @param {Object} root - Element for which to compute intersection.
   * @param {ClientRect} rootRect - Rectangle of root element.
   * @returns {Object} An object with information about detected changes:
   *  {
   *      ratioChanged: boolean,
   *      targetRectChanged: boolean,
   *      thresholdChanged: boolean
   *  }
   */


  updateIntersection(root, rootRect) {
    let targetRect = (0, _geometry.getRectangle)(this.target),
        intersection = this.getIntersectionData(root, rootRect, targetRect),
        threshold = +intersection.exists,
        ratioChanged = intersection.ratio !== this.prevRatio,
        targetRectChanged = !(0, _geometry.isEqual)(targetRect, this.prevTargetRect),
        thresholdChanged; // Find thresholds' index if intersection
    // and target rectangles are not empty.

    if (intersection.exists && !(0, _geometry.isEmpty)(targetRect)) {
      threshold = this.observer.getThresholdGreaterThan(intersection.ratio);
    }

    thresholdChanged = threshold !== this.prevThreshold; // Update cached properties.

    this.prevTargetRect = targetRect;
    this.prevThreshold = threshold;
    this.prevRatio = intersection.ratio; // Create an empty rectangle if there is no intersection.

    if (!intersection.exists) {
      intersection.ratio = 0;
      intersection.rect = emptyRect;
    } // Create and queue new entry if threshold has changed.


    if (thresholdChanged) {
      const entry = new _IntersectionObserverEntry.default(this.target, targetRect, intersection.rect, intersection.ratio, rootRect, (0, _performance.default)());
      this.observer.queueEntry(entry);
    }

    return {
      ratioChanged,
      thresholdChanged,
      targetRectChanged
    };
  }
  /**
   * Computes intersection data.
   *
   * @param {Element} container - Container element.
   * @param {ClientRect} [containterRect]
   * @param {ClientRect} [targetRect]
   * @returns {Object}
   */


  getIntersectionData(container, containterRect, targetRect) {
    const target = this.target;

    if (!targetRect) {
      targetRect = (0, _geometry.getRectangle)(this.target);
    }

    if (!containterRect) {
      containterRect = (0, _geometry.getRectangle)(container);
    }

    let detached = isDetached(container, target),
        intersecRect = !detached ? getIntersection(container, target, containterRect, targetRect) : emptyRect,
        intersects = !detached && intersecRect.width >= 0 && intersecRect.height >= 0,
        intersecRatio = (0, _geometry.getArea)(intersecRect) / (0, _geometry.getArea)(targetRect) || 0;
    return {
      rect: intersecRect,
      ratio: intersecRatio,
      exists: intersects
    };
  }

}

exports.default = IntersectionObservation;
},{"./shims/performance.now":"node_modules/intersection-observer-polyfill/src/shims/performance.now.js","./geometry":"node_modules/intersection-observer-polyfill/src/geometry.js","./IntersectionObserverEntry":"node_modules/intersection-observer-polyfill/src/IntersectionObserverEntry.js"}],"node_modules/intersection-observer-polyfill/src/_IntersectionObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _es6Collections = require("./shims/es6-collections");

var _geometry = require("./geometry");

var _IntersectionObservation = _interopRequireDefault(require("./IntersectionObservation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validates and parses threshold values.
 * Throws an error if one of the thresholds
 * is non-finite or not in range of 0 and 1.
 *
 * @param {(Array<Number>|Number)} [thresholds = 0]
 * @returns {Array<Number>} An array of thresholds in ascending order.
 */
function parseThresholds(thresholds = 0) {
  let result = thresholds;

  if (!Array.isArray(thresholds)) {
    result = [thresholds];
  } else if (!thresholds.length) {
    result = [0];
  }

  return result.map(threshold => {
    // We use Number function instead of parseFloat
    // to convert boolean values and null to theirs
    // numeric representation. This is done to act
    // in the same manner as a native implementation.
    threshold = Number(threshold);

    if (!window.isFinite(threshold)) {
      throw new TypeError('The provided double value is non-finite.');
    } else if (threshold < 0 || threshold > 1) {
      throw new RangeError('Threshold values must be between 0 and 1.');
    }

    return threshold;
  }).sort();
}
/**
 * Validates and converts margins value (defined in a form of
 * CSS 'margin' property) to a list of tokens, e.g:
 * 1. '0px' = [['0px'], ['0px'], ['0px'], ['0px']]
 * 2. '5px 11px' = [['5px'], ['11px'], ['5px'], ['11px']]
 *
 * @param {String} [margins = '0px'] - Margins value to be processed.
 * @returns {Array<Array>} Object that contains both: a list of
 *      tokens and its string representation.
 */


function parseMargins(margins = '0px') {
  // Use regular expression in order to properly
  // handle multiple spaces in-between of tokens: '0px     2px   5px'.
  //
  // Casting to a string is required to keep the behavior
  // closer to the native implementation which converts
  // an array like [[['2px 3px']]] to '2px 3px';
  margins = (margins + '').split(/\s+/); // Chrome validates tokens length starting from version 53.

  if (margins.length > 4) {
    throw new Error('Extra text found at the end of rootMargin.');
  }

  margins[0] = margins[0] || '0px';
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];
  const rawData = margins.join(' ');
  const parsedData = margins.map(token => {
    let [, value, unit] = /^(-?\d*\.?\d+)(px|%)$/.exec(token) || [];
    const pixels = unit === 'px';
    value = parseFloat(value);

    if (!window.isFinite(value)) {
      throw new Error('rootMargin must be specified in pixels or percent.');
    }

    if (!pixels) {
      value /= 100;
    }

    return {
      value,
      pixels
    };
  });
  return {
    rawData,
    parsedData
  };
}
/**
 * Creates new rectangle from provided one whose
 * dimensions will be modified by applying margins
 * defined in a form of [[value: Number, pixels: Boolean], ...].
 *
 * @param {ClientRect} targetRect - Initial rectangle.
 * @param {Array<Array>} margins - Margins data.
 * @returns {ClientRect} Modified rectangle.
 */


function applyMargins(targetRect, margins) {
  margins = margins.map((margin, index) => {
    let value = margin.value;

    if (!margin.pixels) {
      value *= index % 2 ? targetRect.width : targetRect.height;
    }

    return value;
  });
  const result = {
    top: targetRect.top - margins[0],
    right: targetRect.right + margins[1],
    bottom: targetRect.bottom + margins[2],
    left: targetRect.left - margins[3]
  };
  result.width = result.right - result.left;
  result.height = result.bottom - result.top;
  return result;
}

class IntersectionObserver {
  /**
   * Creates new IntersectionObserver instance.
   *
   * @param {Function} callback - Callback function that will be invoked
   *      whenever one of the observed targets reaches new ratio value defined in "options.threshold".
   * @param {Object} [options = {}] - Optional configuration.
   * @param {IntersectionObserverController} controller - Associated controller instance.
   * @param {IntersectionObserver} publicObserver - This value will be used as
   *      a value of "this" binding for the callback function.
   */
  constructor(callback, options = {}, controller, publicObserver) {
    if (typeof callback !== 'function') {
      throw new TypeError("The callback provided as parameter 1 is not a function.");
    }

    if (typeof options !== 'object') {
      throw new TypeError("parameter 2 is not an object.");
    }

    if ('root' in options && !(options.root instanceof Element)) {
      throw new TypeError("member root is not of type Element.");
    }

    const thresholds = parseThresholds(options.threshold);
    const rootMargin = parseMargins(options.rootMargin);
    this.root = options.root || null;
    this.rootMargin = rootMargin.rawData; // Thresholds array needs to be immutable
    // according to the native implementation.

    this.thresholds = Object.freeze(thresholds);
    this._root = options.root || document.documentElement;
    this._callback = callback;
    this._rootMargin = rootMargin.parsedData; // Registry of observed elements and
    // corresponding IntersectionObservation instances.

    this._targets = new _es6Collections.Map(); // A list of queued IntersectionObserverEntry
    // items that will passed to the callback function.

    this._quedEntries = [];
    this._publicObserver = publicObserver || this;
    this.controller = controller;
  }
  /**
   * Adds provided target to observations list.
   *
   * @param {Element} target - DOM element to be observed.
   */


  observe(target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    if (!(target instanceof Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    let targets = this._targets; // Do nothing if target is already observed.

    if (targets.has(target)) {
      return;
    } // Create new IntersectionObservation instance and assign it
    // to provided target.


    targets.set(target, new _IntersectionObservation.default(target, this)); // Connect current observer to controller
    // if it wasn't connected yet.

    if (!this.controller.isConnected(this)) {
      this.controller.connect(this);
    } // Request the update of observers.


    this.controller.startUpdateCycle();
  }
  /**
   * Removes provided target from observations list.
   *
   * @param {Element} target - DOM element to stop observing.
   */


  unobserve(target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    if (!(target instanceof Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    let targets = this._targets;

    if (targets.has(target)) {
      targets.delete(target);
    } // Disconnect observer if the list of observed targets is empty.


    if (!targets.size) {
      this.disconnect();
    }
  }
  /**
   * Removes all targets from observations list
   * and disconnects observer from associated controller, i.e.
   * no updates will be invoked for it.
   */


  disconnect() {
    this._targets.clear();

    this.controller.disconnect(this);
  }
  /**
   * Returns a list of queued observation entries and
   * clears the queue.
   *
   * @returns {Array}
   */


  takeRecords() {
    return this._quedEntries.splice(0);
  }
  /**
   * Invokes callback function with a list
   * of queued entries if the last one is not empty.
   *
   * @private
   */


  notifySubscriber() {
    const entries = this.takeRecords();
    const publicObserver = this._publicObserver;

    if (entries.length) {
      this._callback.call(publicObserver, entries, publicObserver);
    }
  }
  /**
   * Adds entry to the queue.
   *
   * @param {IntersectionObserverEntry} entry
   */


  queueEntry(entry) {
    this._quedEntries.push(entry);
  }
  /**
   * Tells whether observer has queued entries.
   *
   * @returns {Boolean}
   */


  hasEntries() {
    return !!this._quedEntries.length;
  }
  /**
   * Updates intersection data of each observed target.
   *
   * @returns {Boolean} Returns "true" if intersection ratio or the rectangle of one of the
   *      observed targets has changed. This information is required for
   *      controller to decide whether to continue running the update cycle.
   */


  updateObservations() {
    let root = this._root,
        rootRect = this.getRootRect(),
        hasChanges = false;

    this._targets.forEach(observation => {
      const changes = observation.updateIntersection(root, rootRect);

      if (changes.ratioChanged || changes.targetRectChanged) {
        hasChanges = true;
      }
    });

    return hasChanges;
  }
  /**
   * Finds index of the first threshold whose value is greater than provided ratio.
   * In case if there is no such value the amount of thresholds will be returned.
   *
   * @param {Number} ratio
   * @returns {Number}
   */


  getThresholdGreaterThan(ratio) {
    let thresholds = this.thresholds,
        thresholdsLen = thresholds.length,
        index = 0;

    while (index < thresholdsLen && thresholds[index] <= ratio) {
      ++index;
    }

    return index;
  }
  /**
   * Calculates rectangle of root node with applied margins.
   *
   * @returns {ClientRect}
   */


  getRootRect() {
    let rootRect = (0, _geometry.getRectangle)(this._root);
    return applyMargins(rootRect, this._rootMargin);
  }

}

exports.default = IntersectionObserver;
},{"./shims/es6-collections":"node_modules/intersection-observer-polyfill/src/shims/es6-collections.js","./geometry":"node_modules/intersection-observer-polyfill/src/geometry.js","./IntersectionObservation":"node_modules/intersection-observer-polyfill/src/IntersectionObservation.js"}],"node_modules/intersection-observer-polyfill/src/IntersectionObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _es6Collections = require("./shims/es6-collections");

var _IntersectionObserverController = _interopRequireDefault(require("./IntersectionObserverController"));

var _IntersectionObserver2 = _interopRequireDefault(require("./_IntersectionObserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This controllers' instance will be assigned to all IntersectionObservers
const controller = new _IntersectionObserverController.default(); // Registry of internal observers.

const observers = new _es6Collections.WeakMap();
/**
 * IntersectionObservers' "Proxy" class which is meant to hide private
 * properties and methods from IntersectionObserver instances.
 *
 * Additionally it implements "idleTimeout" and "trackHovers" static property
 * accessors to give a control over the behavior of IntersectionObserverController
 * instance. Changes made to these properties will affect both future and
 * existing instances of IntersectionObserver.
 */

class IntersectionObserver {
  /**
   * Creates instance of public IntersectionObserver.
   *
   * @param {Function} callback
   * @param {Object} options
   */
  constructor(callback, options) {
    if (!arguments.length) {
      throw new TypeError("1 argument required, but only 0 present.");
    }

    const observer = new _IntersectionObserver2.default(callback, options, controller, this); // Due to the spec following properties are non-writable
    // and in native implementation they are also not enumerable.

    Object.defineProperties(this, {
      root: {
        value: observer.root
      },
      thresholds: {
        value: observer.thresholds
      },
      rootMargin: {
        value: observer.rootMargin
      }
    }); // Register internal observer.

    observers.set(this, observer);
  }
  /**
   * Extracts controllers' idle timeout value.
   *
   * @returns {Number}
   */


  static get idleTimeout() {
    return controller.idleTimeout;
  }
  /**
   * Sets up new idle timeout.
   *
   * @param {Number} value - New timeout value.
   */


  static set idleTimeout(value) {
    if (typeof value !== 'number') {
      throw new TypeError('type of "idleTimeout" value must be a number.');
    }

    if (typeof value < 0) {
      throw new TypeError('"idleTimeout" value must be greater than 0.');
    }

    controller.idleTimeout = value;
  }
  /**
   * Tells whether controller tracks "hover" events.
   *
   * @returns {Boolean}
   */


  static get trackHovers() {
    return controller.isHoverEnabled();
  }
  /**
   * Enables or disables tracking of "hover" event.
   *
   * @param {Boolean} value - Whether to disable or enable tracking.
   */


  static set trackHovers(value) {
    if (typeof value !== 'boolean') {
      throw new TypeError('type of "trackHovers" value must be a boolean.');
    }

    value ? controller.enableHover() : controller.disableHover();
  }

} // Expose public methods of IntersectionObserver.


['observe', 'unobserve', 'disconnect', 'takeRecords'].forEach(method => {
  IntersectionObserver.prototype[method] = function () {
    return observers.get(this)[method](...arguments);
  };
});
var _default = IntersectionObserver;
exports.default = _default;
},{"./shims/es6-collections":"node_modules/intersection-observer-polyfill/src/shims/es6-collections.js","./IntersectionObserverController":"node_modules/intersection-observer-polyfill/src/IntersectionObserverController.js","./_IntersectionObserver":"node_modules/intersection-observer-polyfill/src/_IntersectionObserver.js"}],"node_modules/intersection-observer-polyfill/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IntersectionObserver = _interopRequireDefault(require("./src/IntersectionObserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IntersectionObserver; // Define what implementation of IntersectionObserver
// needs to be exported: existing or polyfilled.

if (typeof window.IntersectionObserver === 'function') {
  // Export existing IntersectionObservers' implementation.
  IntersectionObserver = window.IntersectionObserver;
} else {
  // Export polyfill.
  IntersectionObserver = _IntersectionObserver.default;
}

var _default = IntersectionObserver;
exports.default = _default;
},{"./src/IntersectionObserver":"node_modules/intersection-observer-polyfill/src/IntersectionObserver.js"}],"js/borders.js":[function(require,module,exports) {
"use strict";

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _observer = _interopRequireDefault(require("./utils/observer"));

require("intersection-observer-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _createObserver = (0, _observer.default)(IntersectionObserver),
    observe = _createObserver.observe,
    unobserve = _createObserver.unobserve;

var createSegments = function createSegments(container) {
  var delays = Array(4).fill(0).map(function (_) {
    return Math.random() * .5 + 's';
  });
  ['tl', 'tr', 'rt', 'rb', 'br', 'bl', 'lb', 'lt'].forEach(function (modifier, i) {
    var segment = document.createElement('div');
    segment.className = "border__segment border__segment--".concat(modifier);
    segment.style.transitionDelay = delays[Math.floor(i / 2)];
    container.appendChild(segment);
  });
};

var els = _toConsumableArray(document.querySelectorAll('.border'));

els.forEach(createSegments);

var onIntersect = function onIntersect(entry) {
  if (entry.isIntersecting) {
    entry.target.classList.add('border--visible');
    unobserve(entry.target, onIntersect);
  }
};

var update = function update() {
  els.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    el.style.setProperty('--border-container-width', rect.width);
    el.style.setProperty('--border-container-height', rect.height);

    if (!el.classList.contains('border--measured')) {
      el.classList.add('border--measured');
      observe(el, onIntersect);
    }
  });
};

update();
window.addEventListener('resize', update);
},{"lodash/flatten":"node_modules/lodash/flatten.js","./utils/observer":"js/utils/observer.js","intersection-observer-polyfill":"node_modules/intersection-observer-polyfill/index.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

require("./image");

require("./borders");
},{"./image":"js/image.js","./borders":"js/borders.js"}]},{},["js/main.js"], null)
//# sourceMappingURL=/js/main.js.map