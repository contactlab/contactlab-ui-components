/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

window.JSCompiler_renameProperty = function(prop, obj) { return prop; }

/** @namespace */
let Polymer;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


// unique global id for deduping mixins.
let dedupeId = 0;

/**
 * @constructor
 * @extends {Function}
 */
function MixinFunction(){}
/** @type {(WeakMap | undefined)} */
MixinFunction.prototype.__mixinApplications;
/** @type {(Object | undefined)} */
MixinFunction.prototype.__mixinSet;

const dedupingMixin = function(mixin) {
  let mixinApplications = /** @type {!MixinFunction} */(mixin).__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  let mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    let map = mixinApplications;
    let extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */(mixin)(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
    return extended;
  }

  return dedupingMixin;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dedupingMixin;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncInterface; // eslint-disable-line no-unused-vars

// Microtask implemented using Mutation Observer
let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
let microtaskCallbacks = [];
let microtaskNodeContent = 0;
let microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, {characterData: true});

function microtaskFlush() {
  const len = microtaskCallbacks.length;
  for (let i = 0; i < len; i++) {
    let cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => { throw e; });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}

const timeOut = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} delay Time to wait before calling callbacks in ms
   * @return {AsyncInterface} An async timeout interface
   */
  after(delay) {
    return  {
      run(fn) { return setTimeout(fn, delay); },
      cancel: window.clearTimeout.bind(window)
    };
  },
  /**
   * Enqueues a function called in the next task.
   *
   * @memberof Polymer.Async.timeOut
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.setTimeout.bind(window),
  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.clearTimeout.bind(window)
};
/* unused harmony export timeOut */


const animationFrame = {
  /**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof Polymer.Async.animationFrame
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.requestAnimationFrame.bind(window),
  /**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.cancelAnimationFrame.bind(window)
};
/* unused harmony export animationFrame */


const idlePeriod = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {function(IdleDeadline)} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestIdleCallback ?
      window.requestIdleCallback(fn) :
      window.setTimeout(fn, 16);
  },
  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    window.cancelIdleCallback ?
      window.cancelIdleCallback(handle) :
      window.clearTimeout(handle);
  }
};
/* unused harmony export idlePeriod */


const microTask = {

  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof Polymer.Async.microTask
   * @param {Function} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback) {
    microtaskNode.textContent = microtaskNodeContent++;
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof Polymer.Async.microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    const idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = microTask;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["dashToCamelCase"] = dashToCamelCase;
/* harmony export (immutable) */ __webpack_exports__["camelToDashCase"] = camelToDashCase;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


const caseMap = {};
const DASH_TO_CAMEL = /-[a-z]/g;
const CAMEL_TO_DASH = /([A-Z])/g;

function dashToCamelCase(dash) {
  return caseMap[dash] || (
    caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL,
      (m) => m[1].toUpperCase()
    )
  );
}

function camelToDashCase(camel) {
  return caseMap[camel] || (
    caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase()
  );
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return resolveCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return resolveUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pathFromUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let CSS_URL_RX = /(url\()([^)]*)(\))/g;
let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
let workingURL;
let resolveDoc;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */
function resolveUrl(url, baseURI) {
  if (url && ABS_URL.test(url)) {
    return url;
  }
  // Lazy feature detection.
  if (workingURL === undefined) {
    workingURL = false;
    try {
      const u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = (u.href === 'http://a/c%20d');
    } catch (e) {
      // silently fail
    }
  }
  if (!baseURI) {
    baseURI = document.baseURI || window.location.href;
  }
  if (workingURL) {
    return (new URL(url, baseURI)).href;
  }
  // Fallback to creating an anchor into a disconnected document.
  if (!resolveDoc) {
    resolveDoc = document.implementation.createHTMLDocument('temp');
    resolveDoc.base = resolveDoc.createElement('base');
    resolveDoc.head.appendChild(resolveDoc.base);
    resolveDoc.anchor = resolveDoc.createElement('a');
    resolveDoc.body.appendChild(resolveDoc.anchor);
  }
  resolveDoc.base.href = baseURI;
  resolveDoc.anchor.href = url;
  return resolveDoc.anchor.href || url;

}

/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */
function resolveCss(cssText, baseURI) {
  return cssText.replace(CSS_URL_RX, function(m, pre, url, post) {
    return pre + '\'' +
      resolveUrl(url.replace(/["']/g, ''), baseURI) +
      '\'' + post;
  });
}

/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */
function pathFromUrl(url) {
  return url.substring(0, url.lastIndexOf('/') + 1);
}






/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = isPath;
/* harmony export (immutable) */ __webpack_exports__["f"] = root;
/* harmony export (immutable) */ __webpack_exports__["b"] = isAncestor;
/* harmony export (immutable) */ __webpack_exports__["c"] = isDescendant;
/* harmony export (immutable) */ __webpack_exports__["h"] = translate;
/* unused harmony export matches */
/* harmony export (immutable) */ __webpack_exports__["e"] = normalize;
/* unused harmony export split */
/* harmony export (immutable) */ __webpack_exports__["a"] = get;
/* harmony export (immutable) */ __webpack_exports__["g"] = set;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


function isPath(path) {
  return path.indexOf('.') >= 0;
}

function root(path) {
  let dotIndex = path.indexOf('.');
  if (dotIndex === -1) {
    return path;
  }
  return path.slice(0, dotIndex);
}

function isAncestor(base, path) {
  //     base.startsWith(path + '.');
  return base.indexOf(path + '.') === 0;
}

function isDescendant(base, path) {
  //     path.startsWith(base + '.');
  return path.indexOf(base + '.') === 0;
}

function translate(base, newBase, path) {
  return newBase + path.slice(base.length);
}

function matches(base, path) {
  return (base === path) ||
         isAncestor(base, path) ||
         isDescendant(base, path);
}

function normalize(path) {
  if (Array.isArray(path)) {
    let parts = [];
    for (let i=0; i<path.length; i++) {
      let args = path[i].toString().split('.');
      for (let j=0; j<args.length; j++) {
        parts.push(args[j]);
      }
    }
    return parts.join('.');
  } else {
    return path;
  }
}

function split(path) {
  if (Array.isArray(path)) {
    return normalize(path).split('.');
  }
  return path.toString().split('.');
}

function get(root, path, info) {
  let prop = root;
  let parts = split(path);
  // Loop over path parts[0..n-1] and dereference
  for (let i=0; i<parts.length; i++) {
    if (!prop) {
      return;
    }
    let part = parts[i];
    prop = prop[part];
  }
  if (info) {
    info.path = parts.join('.');
  }
  return prop;
}

function set(root, path, value) {
  let prop = root;
  let parts = split(path);
  let last = parts[parts.length-1];
  if (parts.length > 1) {
    // Loop over path parts[0..n-2] and dereference
    for (let i=0; i<parts.length-1; i++) {
      let part = parts[i];
      prop = prop[part];
      if (!prop) {
        return;
      }
    }
    // Set value to object at end of path
    prop[last] = value;
  } else {
    // Simple property set
    prop[path] = value;
  }
  return parts.join('.');
}

const isDeep = isPath;
/* unused harmony export isDeep */



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export instanceCount */
/* unused harmony export _regLog */
/* unused harmony export register */
/* unused harmony export dumpRegistrations */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_mixin_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__property_effects_js__ = __webpack_require__(14);










const ElementMixin = Object(__WEBPACK_IMPORTED_MODULE_2__utils_mixin_js__["a" /* dedupingMixin */])(base => {

  /**
   * @constructor
   * @extends {base}
   * @implements {Polymer_PropertyEffects}
   */
  const polymerElementBase = Object(__WEBPACK_IMPORTED_MODULE_7__property_effects_js__["a" /* PropertyEffects */])(base);

  let caseMap = __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__;

  /**
   * Returns the `properties` object specifically on `klass`. Use for:
   * (1) super chain mixes togther to make `propertiesForClass` which is
   * then used to make `observedAttributes`.
   * (2) properties effects and observers are created from it at `finalize` time.
   *
   * @param {HTMLElement} klass Element class
   * @return {Object} Object containing own properties for this class
   * @private
   */
  function ownPropertiesForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__ownProperties', klass))) {
      klass.__ownProperties =
        klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
        /** @type PolymerElementConstructor */ (klass).properties : {};
    }
    return klass.__ownProperties;
  }

  /**
   * Returns the `observers` array specifically on `klass`. Use for
   * setting up observers.
   *
   * @param {HTMLElement} klass Element class
   * @return {Array} Array containing own observers for this class
   * @private
   */
  function ownObserversForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__ownObservers', klass))) {
      klass.__ownObservers =
        klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
        /** @type PolymerElementConstructor */ (klass).observers : [];
    }
    return klass.__ownObservers;
  }

  /**
   * Mixes `props` into `flattenedProps` but upgrades shorthand type
   * syntax to { type: Type}.
   *
   * @param {Object} flattenedProps Bag to collect flattened properties into
   * @param {Object} props Bag of properties to add to `flattenedProps`
   * @return {Object} The input `flattenedProps` bag
   * @private
   */
  function flattenProperties(flattenedProps, props) {
    for (let p in props) {
      let o = props[p];
      if (typeof o == 'function') {
        o = { type: o };
      }
      flattenedProps[p] = o;
    }
    return flattenedProps;
  }

  /**
   * Returns a flattened list of properties mixed together from the chain of all
   * constructor's `config.properties`. This list is used to create
   * (1) observedAttributes,
   * (2) class property default values
   *
   * @param {PolymerElementConstructor} klass Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   * @suppress {missingProperties} class.prototype is not a property for some reason?
   * @private
   */
  function propertiesForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__classProperties', klass))) {
      klass.__classProperties =
      flattenProperties({}, ownPropertiesForClass(klass));
      let superCtor = Object.getPrototypeOf(klass.prototype).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        klass.__classProperties = Object.assign(
          Object.create(propertiesForClass(/** @type PolymerElementConstructor */(superCtor))),
          klass.__classProperties);
      }
    }
    return klass.__classProperties;
  }

  /**
   * Returns a list of properties with default values.
   * This list is created as an optimization since it is a subset of
   * the list returned from `propertiesForClass`.
   * This list is used in `_initializeProperties` to set property defaults.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   *   that have default values
   * @private
   */
  function propertyDefaultsForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
      klass.__classPropertyDefaults = null;
      let props = propertiesForClass(klass);
      for (let p in props) {
        let info = props[p];
        if ('value' in info) {
          klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
          klass.__classPropertyDefaults[p] = info;
        }
      }
    }
    return klass.__classPropertyDefaults;
  }

  /**
   * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
   * @param {PolymerElementConstructor} klass Element class
   * @return {boolean} True if all metaprogramming for this class has been
   *   completed
   * @private
   */
  function hasClassFinalized(klass) {
    return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
  }

  /**
   * Called by `ElementClass.finalize()`. Ensures this `klass` and
   * *all superclasses* are finalized by traversing the prototype chain
   * and calling `klass.finalize()`.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @private
   */
  function finalizeClassAndSuper(klass) {
    let proto = /** @type PolymerElementConstructor */ (klass).prototype;
    let superCtor = Object.getPrototypeOf(proto).constructor;
    if (superCtor.prototype instanceof PolymerElement) {
      superCtor.finalize();
    }
    finalizeClass(klass);
  }

  /**
   * Configures a `klass` based on a staic `klass.config` object and
   * a `template`. This includes creating accessors and effects
   * for properties in `config` and the `template` as well as preparing the
   * `template` for stamping.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @private
   */
  function finalizeClass(klass) {
    klass.__finalized = true;
    let proto = /** @type PolymerElementConstructor */ (klass).prototype;
    if (klass.hasOwnProperty(
      JSCompiler_renameProperty('is', klass)) && klass.is) {
      register(proto);
    }
    let props = ownPropertiesForClass(klass);
    if (props) {
      finalizeProperties(proto, props);
    }
    let observers = ownObserversForClass(klass);
    if (observers) {
      finalizeObservers(proto, observers, props);
    }
    // note: create "working" template that is finalized at instance time
    let template = /** @type PolymerElementConstructor */ (klass).template;
    if (template) {
      if (typeof template === 'string') {
        let t = document.createElement('template');
        t.innerHTML = template;
        template = t;
      } else {
        template = template.cloneNode(true);
      }
      proto._template = template;
    }
  }

  /**
   * Configures a `proto` based on a `properties` object.
   * Leverages `PropertyEffects` to create property accessors and effects
   * supporting, observers, reflecting to attributes, change notification,
   * computed properties, and read only properties.
   * @param {PolymerElement} proto Element class prototype to add accessors
   *    and effects to
   * @param {Object} properties Flattened bag of property descriptors for
   *    this class
   * @private
   */
  function finalizeProperties(proto, properties) {
    for (let p in properties) {
      createPropertyFromConfig(proto, p, properties[p], properties);
    }
  }

  /**
   * Configures a `proto` based on a `observers` array.
   * Leverages `PropertyEffects` to create observers.
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {Object} observers Flattened array of observer descriptors for
   *   this class
   * @param {Object} dynamicFns Object containing keys for any properties
   *   that are functions and should trigger the effect when the function
   *   reference is changed
   * @private
   */
  function finalizeObservers(proto, observers, dynamicFns) {
    for (let i=0; i < observers.length; i++) {
      proto._createMethodObserver(observers[i], dynamicFns);
    }
  }

  /**
   * Creates effects for a property.
   *
   * Note, once a property has been set to
   * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
   * these values may not be changed. For example, a subclass cannot
   * alter these settings. However, additional `observers` may be added
   * by subclasses.
   *
   * The info object should may contain property metadata as follows:
   *
   * * `type`: {function} type to which an attribute matching the property
   * is deserialized. Note the property is camel-cased from a dash-cased
   * attribute. For example, 'foo-bar' attribute is dersialized to a
   * property named 'fooBar'.
   *
   * * `readOnly`: {boolean} creates a readOnly property and
   * makes a private setter for the private of the form '_setFoo' for a
   * property 'foo',
   *
   * * `computed`: {string} creates a computed property. A computed property
   * also automatically is set to `readOnly: true`. The value is calculated
   * by running a method and arguments parsed from the given string. For
   * example 'compute(foo)' will compute a given property when the
   * 'foo' property changes by executing the 'compute' method. This method
   * must return the computed value.
   *
   * * `reflectToAttriute`: {boolean} If true, the property value is reflected
   * to an attribute of the same name. Note, the attribute is dash-cased
   * so a property named 'fooBar' is reflected as 'foo-bar'.
   *
   * * `notify`: {boolean} sends a non-bubbling notification event when
   * the property changes. For example, a property named 'foo' sends an
   * event named 'foo-changed' with `event.detail` set to the value of
   * the property.
   *
   * * observer: {string} name of a method that runs when the property
   * changes. The arguments of the method are (value, previousValue).
   *
   * Note: Users may want control over modifying property
   * effects via subclassing. For example, a user might want to make a
   * reflectToAttribute property not do so in a subclass. We've chosen to
   * disable this because it leads to additional complication.
   * For example, a readOnly effect generates a special setter. If a subclass
   * disables the effect, the setter would fail unexpectedly.
   * Based on feedback, we may want to try to make effects more malleable
   * and/or provide an advanced api for manipulating them.
   * Also consider adding warnings when an effect cannot be changed.
   *
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {string} name Name of the property.
   * @param {Object} info Info object from which to create property effects.
   * Supported keys:
   * @param {Object} allProps Flattened map of all properties defined in this
   *   element (including inherited properties)
   * @private
   */
  function createPropertyFromConfig(proto, name, info, allProps) {
    // computed forces readOnly...
    if (info.computed) {
      info.readOnly = true;
    }
    // Note, since all computed properties are readOnly, this prevents
    // adding additional computed property effects (which leads to a confusing
    // setup where multiple triggers for setting a property)
    // While we do have `hasComputedEffect` this is set on the property's
    // dependencies rather than itself.
    if (info.computed  && !proto._hasReadOnlyEffect(name)) {
      proto._createComputedProperty(name, info.computed, allProps);
    }
    if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
      proto._createReadOnlyProperty(name, !info.computed);
    }
    if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
      proto._createReflectedProperty(name);
    }
    if (info.notify && !proto._hasNotifyEffect(name)) {
      proto._createNotifyingProperty(name);
    }
    // always add observer
    if (info.observer) {
      proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
    }
  }

  /**
   * Configures an element `proto` to function with a given `template`.
   * The element name `is` and extends `ext` must be specified for ShadyCSS
   * style scoping.
   *
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {!HTMLTemplateElement} template Template to process and bind
   * @param {string} baseURI URL against which to resolve urls in
   *   style element cssText
   * @param {string} is Tag name (or type extension name) for this element
   * @param {string=} ext For type extensions, the tag name that was extended
   * @private
   */
  function finalizeTemplate(proto, template, baseURI, is, ext) {
    // support `include="module-name"`
    let cssText =
      Object(__WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__["a" /* cssFromModuleImports */])(is) +
      Object(__WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__["b" /* cssFromTemplate */])(template, baseURI);
    if (cssText) {
      let style = document.createElement('style');
      style.textContent = cssText;
      template.content.insertBefore(style, template.content.firstChild);
    }
    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, is, ext);
    }
    proto._bindTemplate(template);
  }

  /**
   * @polymer
   * @mixinClass
   * @unrestricted
   * @implements {Polymer_ElementMixin}
   */
  class PolymerElement extends polymerElementBase {

    /**
     * Standard Custom Elements V1 API.  The default implementation returns
     * a list of dash-cased attributes based on a flattening of all properties
     * declared in `static get properties()` for this element and any
     * superclasses.
     *
     * @return {Array} Observed attribute list
     */
    static get observedAttributes() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
        let list = [];
        let properties = propertiesForClass(this);
        for (let prop in properties) {
          list.push(Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["camelToDashCase"])(prop));
        }
        this.__observedAttributes = list;
      }
      return this.__observedAttributes;
    }

    /**
     * Called automatically when the first element instance is created to
     * ensure that class finalization work has been completed.
     * May be called by users to eagerly perform class finalization work
     * prior to the creation of the first element instance.
     *
     * Class finalization work generally includes meta-programming such as
     * creating property accessors and any property effect metadata needed for
     * the features used.
     *
     * @public
     */
    static finalize() {
      if (!hasClassFinalized(this)) {
        finalizeClassAndSuper(this);
      }
    }

    /**
     * Returns the template that will be stamped into this element's shadow root.
     *
     * If a `static get is()` getter is defined, the default implementation
     * will return the first `<template>` in a `dom-module` whose `id`
     * matches this element's `is`.
     *
     * Users may override this getter to return an arbitrary template
     * (in which case the `is` getter is unnecessary). The template returned
     * may be either an `HTMLTemplateElement` or a string that will be
     * automatically parsed into a template.
     *
     * Note that when subclassing, if the super class overrode the default
     * implementation and the subclass would like to provide an alternate
     * template via a `dom-module`, it should override this getter and
     * return `Polymer.DomModule.import(this.is, 'template')`.
     *
     * If a subclass would like to modify the super class template, it should
     * clone it rather than modify it in place.  If the getter does expensive
     * work such as cloning/modifying a template, it should memoize the
     * template for maximum performance:
     *
     *   let memoizedTemplate;
     *   class MySubClass extends MySuperClass {
     *     static get template() {
     *       if (!memoizedTemplate) {
     *         memoizedTemplate = super.template.cloneNode(true);
     *         let subContent = document.createElement('div');
     *         subContent.textContent = 'This came from MySubClass';
     *         memoizedTemplate.content.appendChild(subContent);
     *       }
     *       return memoizedTemplate;
     *     }
     *   }
     *
     * @return {HTMLTemplateElement|string} Template to be stamped
     */
    static get template() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
        this._template = __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */].import(
          /** @type PolymerElementConstructor*/ (this).is, 'template') ||
          // note: implemented so a subclass can retrieve the super
          // template; call the super impl this way so that `this` points
          // to the superclass.
          Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.template;
      }
      return this._template;
    }

    /**
     * Path matching the url from which the element was imported.
     * This path is used to resolve url's in template style cssText.
     * The `importPath` property is also set on element instances and can be
     * used to create bindings relative to the import path.
     * Defaults to the path matching the url containing a `dom-module` element
     * matching this element's static `is` property.
     * Note, this path should contain a trailing `/`.
     *
     * @return {string} The import path for this element class
     */
    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
          const module = __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */].import(/** @type PolymerElementConstructor */ (this).is);
          this._importPath = module ? module.assetpath : '' ||
          Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.importPath;
      }
      return this._importPath;
    }

    constructor() {
      super();
      /** @type {HTMLTemplateElement} */
      this._template;
      /** @type {string} */
      this._importPath;
      /** @type {string} */
      this.rootPath;
      /** @type {string} */
      this.importPath;
      /** @type {StampedTemplate | HTMLElement | ShadowRoot} */
      this.root;
      /** @type {!Object<string, !Node>} */
      this.$;
    }

    /**
     * Overrides the default `Polymer.PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @override
     * @suppress {invalidCasts}
     */
    _initializeProperties() {
      instanceCount++;
      this.constructor.finalize();
      const importPath = this.constructor.importPath;
      // note: finalize template when we have access to `localName` to
      // avoid dependence on `is` for polyfilling styling.
      if (this._template && !this._template.__polymerFinalized) {
        this._template.__polymerFinalized = true;
        const baseURI =
          importPath ? Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(importPath) : '';
        finalizeTemplate(/** @type {!PolymerElement} */(this.__proto__), this._template, baseURI,
          /**@type {!HTMLElement}*/(this).localName);
      }
      super._initializeProperties();
      // set path defaults
      this.rootPath = __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__["a" /* rootPath */];
      this.importPath = importPath;
      // apply property defaults...
      let p$ = propertyDefaultsForClass(this.constructor);
      if (!p$) {
        return;
      }
      for (let p in p$) {
        let info = p$[p];
        // Don't set default value if there is already an own property, which
        // happens when a `properties` property with default but no effects had
        // a property set (e.g. bound) by its host before upgrade
        if (!this.hasOwnProperty(p)) {
          let value = typeof info.value == 'function' ?
            info.value.call(this) :
            info.value;
          // Set via `_setProperty` if there is an accessor, to enable
          // initializing readOnly property defaults
          if (this._hasAccessor(p)) {
            this._setPendingProperty(p, value, true);
          } else {
            this[p] = value;
          }
        }
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `connectedCallback`.
     *
     * The default implementation enables the property effects system and
     * flushes any pending properties, and updates shimmed CSS properties
     * when using the ShadyCSS scoping/custom properties polyfill.
     *
     * @suppress {invalidCasts}
     */
    connectedCallback() {
      if (window.ShadyCSS && this._template) {
        window.ShadyCSS.styleElement(/** @type {!HTMLElement} */(this));
      }
      this._enableProperties();
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `disconnectedCallback`.
     */
    disconnectedCallback() {}

    /**
     * Stamps the element template.
     *
     * @override
     */
    ready() {
      if (this._template) {
        this.root = this._stampTemplate(this._template);
        this.$ = this.root.$;
      }
      super.ready();
    }

    /**
     * Implements `PropertyEffects`'s `_readyClients` call. Attaches
     * element dom by calling `_attachDom` with the dom stamped from the
     * element's template via `_stampTemplate`. Note that this allows
     * client dom to be attached to the element prior to any observers
     * running.
     *
     * @override
     */
    _readyClients() {
      if (this._template) {
        this.root = this._attachDom(/** @type {StampedTemplate} */(this.root));
      }
      // The super._readyClients here sets the clients initialized flag.
      // We must wait to do this until after client dom is created/attached
      // so that this flag can be checked to prevent notifications fired
      // during this process from being handled before clients are ready.
      super._readyClients();
    }


    /**
     * Attaches an element's stamped dom to itself. By default,
     * this method creates a `shadowRoot` and adds the dom to it.
     * However, this method may be overridden to allow an element
     * to put its dom in another location.
     *
     * @throws {Error}
     * @suppress {missingReturn}
     * @param {StampedTemplate} dom to attach to the element.
     * @return {ShadowRoot} node to which the dom has been attached.
     */
    _attachDom(dom) {
      if (this.attachShadow) {
        if (dom) {
          if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
          }
          this.shadowRoot.appendChild(dom);
          return this.shadowRoot;
        }
        return null;
      } else {
        throw new Error('ShadowDOM not available. ' +
          // TODO(sorvell): move to compile-time conditional when supported
        'Polymer.Element can create dom as children instead of in ' +
        'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `attributeChangedCallback`.
     *
     * By default, attributes declared in `properties` metadata are
     * deserialized using their `type` information to properties of the
     * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
     * properties.
     *
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     * @override
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        let property = caseMap.dashToCamelCase(name);
        let type = propertiesForClass(this.constructor)[property].type;
        if (!this._hasReadOnlyEffect(property)) {
          this._attributeToProperty(name, value, type);
        }
      }
    }

    /**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed styles in this element (and its subtree) to be updated
     * based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `this.updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * @param {Object=} properties Bag of custom property key/values to
     *   apply to this element.
     * @suppress {invalidCasts}
     */
    updateStyles(properties) {
      if (window.ShadyCSS) {
        window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */(this), properties);
      }
    }

    /**
     * Rewrites a given URL relative to a base URL. The base URL defaults to
     * the original location of the document containing the `dom-module` for
     * this element. This method will return the same URL before and after
     * bundling.
     *
     * @param {string} url URL to resolve.
     * @param {string=} base Optional base URL to resolve against, defaults
     * to the element's `importPath`
     * @return {string} Rewritten URL relative to base
     */
    resolveUrl(url, base) {
      if (!base && this.importPath) {
        base = Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(this.importPath);
      }
      return Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(url, base);
    }

    /**
     * Overrides `PropertyAccessors` to add map of dynamic functions on
     * template info, for consumption by `PropertyEffects` template binding
     * code. This map determines which method templates should have accessors
     * created for them.
     *
     * @override
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
      return super._parseTemplateContent(template, templateInfo, nodeInfo);
    }

  }

  return PolymerElement;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementMixin;


let instanceCount = 0;
const registrations = [];
/* unused harmony export registrations */


function _regLog(prototype) {
  console.log('[' + prototype.is + ']: registered');
}

function register(prototype) {
  registrations.push(prototype);
  undefined && _regLog(prototype);
}

function dumpRegistrations() {
  registrations.forEach(_regLog);
}

const updateStyles = function(props) {
  if (window.ShadyCSS) {
    window.ShadyCSS.styleDocument(props);
  }
};
/* unused harmony export updateStyles */



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Settings */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rootPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sanitizeDOMValue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resolve_url_js__ = __webpack_require__(4);



/**
 * Legacy settings.
 * @namespace
 * @memberof Polymer
 */
const settings = undefined || {};
const useShadow = !(window.ShadyDOM);
/* unused harmony export useShadow */

const useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
/* unused harmony export useNativeCSSProperties */

const useNativeCustomElements = !(window.customElements.polyfillWrapFlushCallback);
/* unused harmony export useNativeCustomElements */



/**
 * Globally settable property that is automatically assigned to
 * `Polymer.ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `Polymer.rootPath` to provide a stable application mount path when
 * using client side routing.
 *
 * @memberof Polymer
 */
let rootPath = undefined ||
  Object(__WEBPACK_IMPORTED_MODULE_1__resolve_url_js__["a" /* pathFromUrl */])(document.baseURI || window.location.href);



const setRootPath = function(path) {
  rootPath = path;
};
/* unused harmony export setRootPath */


/**
 * A global callback used to sanitize any value before inserting it into the DOM. The callback signature is:
 *
 *     Polymer = {
 *       sanitizeDOMValue: function(value, name, type, node) { ... }
 *     }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,Node):*)|undefined}
 * @memberof Polymer
 */
let sanitizeDOMValue = undefined;



const setSanitizeDOMValue = function(newSanitizeDOMValue) {
  sanitizeDOMValue = newSanitizeDOMValue;
};
/* unused harmony export setSanitizeDOMValue */



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_path_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__property_accessors_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__template_stamp_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_settings_js__ = __webpack_require__(13);









/** @const {Object} */
const CaseMap = __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__;

// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
let dedupeId = 0;

/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */
const TYPES = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly'
};

/**
 * @typedef {{
 * name: (string | undefined),
 * structured: (boolean | undefined),
 * wildcard: (boolean | undefined)
 * }}
 */
let DataTrigger; //eslint-disable-line no-unused-vars

/**
 * @typedef {{
 * info: ?,
 * trigger: (!DataTrigger | undefined),
 * fn: (!Function | undefined)
 * }}
 */
let DataEffect; //eslint-disable-line no-unused-vars

let PropertyEffectsType; //eslint-disable-line no-unused-vars

/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */
function ensureOwnEffectMap(model, type) {
  let effects = model[type];
  if (!effects) {
    effects = model[type] = {};
  } else if (!model.hasOwnProperty(type)) {
    effects = model[type] = Object.create(model[type]);
    for (let p in effects) {
      let protoFx = effects[p];
      let instFx = effects[p] = Array(protoFx.length);
      for (let i=0; i<protoFx.length; i++) {
        instFx[i] = protoFx[i];
      }
    }
  }
  return effects;
}

// -- effects ----------------------------------------------

/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {Object} props Bag of current property changes
 * @param {Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
  if (effects) {
    let ran = false;
    let id = dedupeId++;
    for (let prop in props) {
      if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
        ran = true;
      }
    }
    return ran;
  }
  return false;
}

/**
 * Runs a list of effects for a given property.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
  let ran = false;
  let rootProperty = hasPaths ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* root */])(prop) : prop;
  let fxs = effects[rootProperty];
  if (fxs) {
    for (let i=0, l=fxs.length, fx; (i<l) && (fx=fxs[i]); i++) {
      if ((!fx.info || fx.info.lastRun !== dedupeId) &&
          (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        if (fx.info) {
          fx.info.lastRun = dedupeId;
        }
        fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
        ran = true;
      }
    }
  }
  return ran;
}

/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */
function pathMatchesTrigger(path, trigger) {
  if (trigger) {
    let triggerPath = trigger.name;
    return (triggerPath == path) ||
      (trigger.structured && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["b" /* isAncestor */])(triggerPath, path)) ||
      (trigger.wildcard && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(triggerPath, path));
  } else {
    return true;
  }
}

/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runObserverEffect(inst, property, props, oldProps, info) {
  let fn = inst[info.methodName];
  let changedProp = info.property;
  if (fn) {
    fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
  } else if (!info.dynamicFn) {
    console.warn('observer method `' + info.methodName + '` not defined');
  }
}

/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
  // Notify
  let fxs = inst[TYPES.NOTIFY];
  let notified;
  let id = dedupeId++;
  // Try normal notify effects; if none, fall back to try path notification
  for (let prop in notifyProps) {
    if (notifyProps[prop]) {
      if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
        notified = true;
      } else if (hasPaths && notifyPath(inst, prop, props)) {
        notified = true;
      }
    }
  }
  // Flush host if we actually notified and host was batching
  // And the host has already initialized clients; this prevents
  // an issue with a host observing data changes before clients are ready.
  let host;
  if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
    host._invalidateProperties();
  }
}

/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */
function notifyPath(inst, path, props) {
  let rootProperty = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* root */])(path);
  if (rootProperty !== path) {
    let eventName = Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["camelToDashCase"])(rootProperty) + '-changed';
    dispatchNotifyEvent(inst, eventName, props[path], path);
    return true;
  }
  return false;
}

/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} eventName The name of the event to send ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property changed, the path
 *   that changed (optional).
 * @private
 * @suppress {invalidCasts}
 */
function dispatchNotifyEvent(inst, eventName, value, path) {
  let detail = {
    value: value,
    queueProperty: true
  };
  if (path) {
    detail.path = path;
  }
  /** @type {!HTMLElement} */(inst).dispatchEvent(new CustomEvent(eventName, { detail }));
}

/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
  let rootProperty = hasPaths ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* root */])(property) : property;
  let path = rootProperty != property ? property : null;
  let value = path ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, path) : inst.__data[property];
  if (path && value === undefined) {
    value = props[property];  // specifically for .splices
  }
  dispatchNotifyEvent(inst, info.eventName, value, path);
}

/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!PropertyEffectsType} inst Host element instance handling the notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @private
 */
function handleNotification(event, inst, fromProp, toPath, negate) {
  let value;
  let detail = /** @type {Object} */(event.detail);
  let fromPath = detail && detail.path;
  if (fromPath) {
    toPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* translate */])(fromProp, toPath, fromPath);
    value = detail && detail.value;
  } else {
    value = event.target[fromProp];
  }
  value = negate ? !value : value;
  if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
    if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath))
      && (!detail || !detail.queueProperty)) {
      inst._invalidateProperties();
    }
  }
}

/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runReflectEffect(inst, property, props, oldProps, info) {
  let value = inst.__data[property];
  if (__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */]) {
    value = Object(__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */])(value, info.attrName, 'attribute', /** @type {Node} */(inst));
  }
  inst._propertyToAttribute(property, info.attrName, value);
}

/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {!Object} changedProps Bag of changed properties
 * @param {!Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
  let computeEffects = inst[TYPES.COMPUTE];
  if (computeEffects) {
    let inputProps = changedProps;
    while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
      Object.assign(oldProps, inst.__dataOld);
      Object.assign(changedProps, inst.__dataPending);
      inputProps = inst.__dataPending;
      inst.__dataPending = null;
    }
  }
}

/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runComputedEffect(inst, property, props, oldProps, info) {
  let result = runMethodEffect(inst, property, props, oldProps, info);
  let computedProp = info.methodInfo;
  if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
    inst._setPendingProperty(computedProp, result, true);
  } else {
    inst[computedProp] = result;
  }
}

/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!PropertyEffectsType} inst The instance whose props are changing
 * @param {string | !Array<(string|number)>} path Path that has changed
 * @param {*} value Value of changed path
 * @private
 */
function computeLinkedPaths(inst, path, value) {
  let links = inst.__dataLinkedPaths;
  if (links) {
    let link;
    for (let a in links) {
      let b = links[a];
      if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(a, path)) {
        link = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* translate */])(a, b, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      } else if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(b, path)) {
        link = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* translate */])(b, a, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      }
    }
  }
}

// -- bindings ----------------------------------------------

/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @private
 */
function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
  // Create binding metadata and add to nodeInfo
  nodeInfo.bindings = nodeInfo.bindings || [];
  let /** Binding */ binding = { kind, target, parts, literal, isCompound: (parts.length !== 1) };
  nodeInfo.bindings.push(binding);
  // Add listener info to binding metadata
  if (shouldAddListener(binding)) {
    let {event, negate} = binding.parts[0];
    binding.listenerEvent = event || (CaseMap.camelToDashCase(target) + '-changed');
    binding.listenerNegate = negate;
  }
  // Add "propagate" property effects to templateInfo
  let index = templateInfo.nodeInfoList.length;
  for (let i=0; i<binding.parts.length; i++) {
    let part = binding.parts[i];
    part.compoundIndex = i;
    addEffectForBindingPart(constructor, templateInfo, binding, part, index);
  }
}

/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 */
function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
  if (!part.literal) {
    if (binding.kind === 'attribute' && binding.target[0] === '-') {
      console.warn('Cannot set attribute ' + binding.target +
        ' because "-" is not a valid attribute starting character');
    } else {
      let dependencies = part.dependencies;
      let info = { index, binding, part, evaluator: constructor };
      for (let j=0; j<dependencies.length; j++) {
        let trigger = dependencies[j];
        if (typeof trigger == 'string') {
          trigger = parseArg(trigger);
          trigger.wildcard = true;
        }
        constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
          fn: runBindingEffect,
          info, trigger
        });
      }
    }
  }
}

/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @private
 */
function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
  let node = nodeList[info.index];
  let binding = info.binding;
  let part = info.part;
  // Subpath notification: transform path and set to client
  // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
  if (hasPaths && part.source && (path.length > part.source.length) &&
      (binding.kind == 'property') && !binding.isCompound &&
      node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
    let value = props[path];
    path = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* translate */])(part.source, binding.target, path);
    if (node._setPendingPropertyOrPath(path, value, false, true)) {
      inst._enqueueClient(node);
    }
  } else {
    let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
    // Propagate value to child
    applyBindingValue(inst, node, binding, part, value);
  }
}

/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!PropertyEffectsType} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @private
 */
function applyBindingValue(inst, node, binding, part, value) {
  value = computeBindingValue(node, value, binding, part);
  if (__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */]) {
    value = Object(__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["b" /* sanitizeDOMValue */])(value, binding.target, binding.kind, node);
  }
  if (binding.kind == 'attribute') {
    // Attribute binding
    inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
  } else {
    // Property binding
    let prop = binding.target;
    if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
      if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
        if (node._setPendingProperty(prop, value)) {
          inst._enqueueClient(node);
        }
      }
    } else  {
      inst._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
}

/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */
function computeBindingValue(node, value, binding, part) {
  if (binding.isCompound) {
    let storage = node.__dataCompoundStorage[binding.target];
    storage[part.compoundIndex] = value;
    value = storage.join('');
  }
  if (binding.kind !== 'attribute') {
    // Some browsers serialize `undefined` to `"undefined"`
    if (binding.target === 'textContent' ||
        (node.localName == 'input' && binding.target == 'value')) {
      value = value == undefined ? '' : value;
    }
  }
  return value;
}

/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */
function shouldAddListener(binding) {
  return Boolean(binding.target) &&
         binding.kind != 'attribute' &&
         binding.kind != 'text' &&
         !binding.isCompound &&
         binding.parts[0].mode === '{';
}

/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!PropertyEffectsType} inst Instance that bas been previously bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @private
 */
function setupBindings(inst, templateInfo) {
  // Setup compound storage, dataHost, and notify listeners
  let {nodeList, nodeInfoList} = templateInfo;
  if (nodeInfoList.length) {
    for (let i=0; i < nodeInfoList.length; i++) {
      let info = nodeInfoList[i];
      let node = nodeList[i];
      let bindings = info.bindings;
      if (bindings) {
        for (let i=0; i<bindings.length; i++) {
          let binding = bindings[i];
          setupCompoundStorage(node, binding);
          addNotifyListener(node, inst, binding);
        }
      }
      node.__dataHost = inst;
    }
  }
}

/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @private
 */
function setupCompoundStorage(node, binding) {
  if (binding.isCompound) {
    // Create compound storage map
    let storage = node.__dataCompoundStorage ||
      (node.__dataCompoundStorage = {});
    let parts = binding.parts;
    // Copy literals from parts into storage for this binding
    let literals = new Array(parts.length);
    for (let j=0; j<parts.length; j++) {
      literals[j] = parts[j].literal;
    }
    let target = binding.target;
    storage[target] = literals;
    // Configure properties with their literal parts
    if (binding.literal && binding.kind == 'property') {
      node[target] = binding.literal;
    }
  }
}

/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!PropertyEffectsType} inst Host element instance to handle notification event
 * @param {Binding} binding Binding metadata
 * @private
 */
function addNotifyListener(node, inst, binding) {
  if (binding.listenerEvent) {
    let part = binding.parts[0];
    node.addEventListener(binding.listenerEvent, function(e) {
      handleNotification(e, inst, binding.target, part.source, part.negate);
    });
  }
}

// -- for method-based effects (complexObserver & computed) --------------

/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @private
 */
function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
  dynamicFn = sig.static || (dynamicFn &&
    (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]));
  let info = {
    methodName: sig.methodName,
    args: sig.args,
    methodInfo,
    dynamicFn
  };
  for (let i=0, arg; (i<sig.args.length) && (arg=sig.args[i]); i++) {
    if (!arg.literal) {
      model._addPropertyEffect(arg.rootProperty, type, {
        fn: effectFn, info: info, trigger: arg
      });
    }
  }
  if (dynamicFn) {
    model._addPropertyEffect(sig.methodName, type, {
      fn: effectFn, info: info
    });
  }
}

/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */
function runMethodEffect(inst, property, props, oldProps, info) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  let context = inst._methodHost || inst;
  let fn = context[info.methodName];
  if (fn) {
    let args = marshalArgs(inst.__data, info.args, property, props);
    return fn.apply(context, args);
  } else if (!info.dynamicFn) {
    console.warn('method `' + info.methodName + '` not defined');
  }
}

const emptyArray = [];

// Regular expressions used for binding
const IDENT  = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' +  STRING + ')\\s*' + ')';
const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
const ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                              '(?:' + ARGUMENTS + '?' + ')' +
                            '\\)\\s*' + ')';
const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
const CLOSE_BRACKET = '(?:]]|}})';
const NEGATE = '(?:(!)\\s*)?'; // Group 2
const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
const bindingRegex = new RegExp(EXPRESSION, "g");

/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */
function literalFromParts(parts) {
  let s = '';
  for (let i=0; i<parts.length; i++) {
    let literal = parts[i].literal;
    s += literal || '';
  }
  return s;
}

/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */
function parseMethod(expression) {
  // tries to match valid javascript property names
  let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (m) {
    let methodName = m[1];
    let sig = { methodName, static: true, args: emptyArray };
    if (m[2].trim()) {
      // replace escaped commas with comma entity, split on un-escaped commas
      let args = m[2].replace(/\\,/g, '&comma;').split(',');
      return parseArgs(args, sig);
    } else {
      return sig;
    }
  }
  return null;
}

/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */
function parseArgs(argList, sig) {
  sig.args = argList.map(function(rawArg) {
    let arg = parseArg(rawArg);
    if (!arg.literal) {
      sig.static = false;
    }
    return arg;
  }, this);
  return sig;
}

/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */
function parseArg(rawArg) {
  // clean up whitespace
  let arg = rawArg.trim()
    // replace comma entity with comma
    .replace(/&comma;/g, ',')
    // repair extra escape sequences; note only commas strictly need
    // escaping, but we allow any other char to be escaped since its
    // likely users will do this
    .replace(/\\(.)/g, '\$1')
    ;
  // basic argument descriptor
  let a = {
    name: arg,
    value: '',
    literal: false
  };
  // detect literal value (must be String or Number)
  let fc = arg[0];
  if (fc === '-') {
    fc = arg[1];
  }
  if (fc >= '0' && fc <= '9') {
    fc = '#';
  }
  switch(fc) {
    case "'":
    case '"':
      a.value = arg.slice(1, -1);
      a.literal = true;
      break;
    case '#':
      a.value = Number(arg);
      a.literal = true;
      break;
  }
  // if not literal, look for structured path
  if (!a.literal) {
    a.rootProperty = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* root */])(arg);
    // detect structured path (has dots)
    a.structured = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(arg);
    if (a.structured) {
      a.wildcard = (arg.slice(-2) == '.*');
      if (a.wildcard) {
        a.name = arg.slice(0, -2);
      }
    }
  }
  return a;
}

/**
 * Gather the argument values for a method specified in the provided array
 * of argument metadata.
 *
 * The `path` and `value` arguments are used to fill in wildcard descriptor
 * when the method is being called as a result of a path notification.
 *
 * @param {Object} data Instance data storage object to read properties from
 * @param {!Array<!MethodArg>} args Array of argument metadata
 * @param {string} path Property/path name that triggered the method effect
 * @param {Object} props Bag of current property changes
 * @return {Array<*>} Array of argument values
 * @private
 */
function marshalArgs(data, args, path, props) {
  let values = [];
  for (let i=0, l=args.length; i<l; i++) {
    let arg = args[i];
    let name = arg.name;
    let v;
    if (arg.literal) {
      v = arg.value;
    } else {
      if (arg.structured) {
        v = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(data, name);
        // when data is not stored e.g. `splices`
        if (v === undefined) {
          v = props[name];
        }
      } else {
        v = data[name];
      }
    }
    if (arg.wildcard) {
      // Only send the actual path changed info if the change that
      // caused the observer to run matched the wildcard
      let baseChanged = (name.indexOf(path + '.') === 0);
      let matches = (path.indexOf(name) === 0 && !baseChanged);
      values[i] = {
        path: matches ? path : name,
        value: matches ? props[path] : v,
        base: v
      };
    } else {
      values[i] = v;
    }
  }
  return values;
}

// data api

/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @private
 */
function notifySplices(inst, array, path, splices) {
  let splicesPath = path + '.splices';
  inst.notifyPath(splicesPath, { indexSplices: splices });
  inst.notifyPath(path + '.length', array.length);
  // Null here to allow potentially large splice records to be GC'ed.
  inst.__data[splicesPath] = {indexSplices: null};
}

/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @private
 */
function notifySplice(inst, array, path, index, addedCount, removed) {
  notifySplices(inst, array, path, [{
    index: index,
    addedCount: addedCount,
    removed: removed,
    object: array,
    type: 'splice'
  }]);
}

/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */
function upper(name) {
  return name[0].toUpperCase() + name.substring(1);
}

const PropertyEffects = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   */
  const propertyEffectsBase = Object(__WEBPACK_IMPORTED_MODULE_5__template_stamp_js__["a" /* TemplateStamp */])(Object(__WEBPACK_IMPORTED_MODULE_4__property_accessors_js__["a" /* PropertyAccessors */])(superClass));

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyEffects}
   * @extends {propertyEffectsBase}
   * @unrestricted
   */
  class PropertyEffects extends propertyEffectsBase {

    constructor() {
      super();
      /** @type {boolean} */
      this.__dataClientsReady;
      /** @type {Array} */
      this.__dataPendingClients;
      /** @type {Object} */
      this.__dataToNotify;
      /** @type {Object} */
      this.__dataLinkedPaths;
      /** @type {boolean} */
      this.__dataHasPaths;
      /** @type {Object} */
      this.__dataCompoundStorage;
      /** @type {Polymer_PropertyEffects} */
      this.__dataHost;
      /** @type {!Object} */
      this.__dataTemp;
      /** @type {boolean} */
      this.__dataClientsInitialized;
      /** @type {!Object} */
      this.__data;
      /** @type {!Object} */
      this.__dataPending;
      /** @type {!Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__computeEffects;
      /** @type {Object} */
      this.__reflectEffects;
      /** @type {Object} */
      this.__notifyEffects;
      /** @type {Object} */
      this.__propagateEffects;
      /** @type {Object} */
      this.__observeEffects;
      /** @type {Object} */
      this.__readOnly;
      /** @type {number} */
      this.__dataCounter;
      /** @type {!TemplateInfo} */
      this.__templateInfo;
    }

    get PROPERTY_EFFECT_TYPES() {
      return TYPES;
    }

    _initializeProperties() {
      super._initializeProperties();
      hostStack.registerHost(this);
      this.__dataClientsReady = false;
      this.__dataPendingClients = null;
      this.__dataToNotify = null;
      this.__dataLinkedPaths = null;
      this.__dataHasPaths = false;
      // May be set on instance prior to upgrade
      this.__dataCompoundStorage = this.__dataCompoundStorage || null;
      this.__dataHost = this.__dataHost || null;
      this.__dataTemp = {};
      this.__dataClientsInitialized = false;
    }

    /**
     * Overrides `Polymer.PropertyAccessors` implementation to provide a
     * more efficient implementation of initializing properties from
     * the prototype on the instance.
     *
     * @override
     * @param {Object} props Properties to initialize on the prototype
     */
    _initializeProtoProperties(props) {
      this.__data = Object.create(props);
      this.__dataPending = Object.create(props);
      this.__dataOld = {};
    }

    /**
     * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
     * `_setProperty`'s `shouldNotify: true`.
     *
     * @override
     * @param {Object} props Properties to initialize on the instance
     */
    _initializeInstanceProperties(props) {
      let readOnly = this[TYPES.READ_ONLY];
      for (let prop in props) {
        if (!readOnly || !readOnly[prop]) {
          this.__dataPending = this.__dataPending || {};
          this.__dataOld = this.__dataOld || {};
          this.__data[prop] = this.__dataPending[prop] = props[prop];
        }
      }
    }

    // Prototype setup ----------------------------------------

    /**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    _addPropertyEffect(property, type, effect) {
      this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
      // effects are accumulated into arrays per property based on type
      let effects = ensureOwnEffectMap(this, type)[property];
      if (!effects) {
        effects = this[type][property] = [];
      }
      effects.push(effect);
    }

    /**
     * Removes the given property effect.
     *
     * @param {string} property Property the effect was associated with
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object to remove
     */
    _removePropertyEffect(property, type, effect) {
      let effects = ensureOwnEffectMap(this, type)[property];
      let idx = effects.indexOf(effect);
      if (idx >= 0) {
        effects.splice(idx, 1);
      }
    }

    /**
     * Returns whether the current prototype/instance has a property effect
     * of a certain type.
     *
     * @param {string} property Property name
     * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasPropertyEffect(property, type) {
      let effects = this[type];
      return Boolean(effects && effects[property]);
    }

    /**
     * Returns whether the current prototype/instance has a "read only"
     * accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReadOnlyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.READ_ONLY);
    }

    /**
     * Returns whether the current prototype/instance has a "notify"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasNotifyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.NOTIFY);
    }

    /**
     * Returns whether the current prototype/instance has a "reflect to attribute"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReflectEffect(property) {
      return this._hasPropertyEffect(property, TYPES.REFLECT);
    }

    /**
     * Returns whether the current prototype/instance has a "computed"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasComputedEffect(property) {
      return this._hasPropertyEffect(property, TYPES.COMPUTE);
    }

    // Runtime ----------------------------------------

    /**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */
    _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
      if (isPathNotification ||
          Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* root */])(Array.isArray(path) ? path[0] : path) !== path) {
        // Dirty check changes being set to a path against the actual object,
        // since this is the entry point for paths into the system; from here
        // the only dirty checks are against the `__dataTemp` cache to prevent
        // duplicate work in the same turn only. Note, if this was a notification
        // of a change already set to a path (isPathNotification: true),
        // we always let the change through and skip the `set` since it was
        // already dirty checked at the point of entry and the underlying
        // object has already been updated
        if (!isPathNotification) {
          let old = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path);
          path = /** @type {string} */ (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* set */])(this, path, value));
          // Use property-accessor's simpler dirty check
          if (!path || !super._shouldPropertyChange(path, value, old)) {
            return false;
          }
        }
        this.__dataHasPaths = true;
        if (this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify)) {
          computeLinkedPaths(this, path, value);
          return true;
        }
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
          return this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify);
        } else {
          this[path] = value;
        }
      }
      return false;
    }

    /**
     * Applies a value to a non-Polymer element/node's property.
     *
     * The implementation makes a best-effort at binding interop:
     * Some native element properties have side-effects when
     * re-setting the same value (e.g. setting `<input>.value` resets the
     * cursor position), so we do a dirty-check before setting the value.
     * However, for better interop with non-Polymer custom elements that
     * accept objects, we explicitly re-set object changes coming from the
     * Polymer world (which may include deep object changes without the
     * top reference changing), erring on the side of providing more
     * information.
     *
     * Users may override this method to provide alternate approaches.
     *
     * @param {Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @protected
     */
    _setUnmanagedPropertyToNode(node, prop, value) {
      // It is a judgment call that resetting primitives is
      // "bad" and resettings objects is also "good"; alternatively we could
      // implement a whitelist of tag & property values that should never
      // be reset (e.g. <input>.value && <select>.value)
      if (value !== node[prop] || typeof value == 'object') {
        node[prop] = value;
      }
    }

    /**
     * Overrides the `PropertyAccessors` implementation to introduce special
     * dirty check logic depending on the property & value being set:
     *
     * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
     *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
     * 2. Object set to simple property (e.g. 'prop': {...})
     *    Stored in `__dataTemp` and `__data`, dirty checked against
     *    `__dataTemp` by default implementation of `_shouldPropertyChange`
     * 3. Primitive value set to simple property (e.g. 'prop': 42)
     *    Stored in `__data`, dirty checked against `__data`
     *
     * The dirty-check is important to prevent cycles due to two-way
     * notification, but paths and objects are only dirty checked against any
     * previous value set during this turn via a "temporary cache" that is
     * cleared when the last `_propertiesChaged` exits. This is so:
     * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
     *    due to array mutations like shift/unshift/splice; this is fine
     *    since path changes are dirty-checked at user entry points like `set`
     * b. dirty-checking for objects only lasts one turn to allow the user
     *    to mutate the object in-place and re-set it with the same identity
     *    and have all sub-properties re-propagated in a subsequent turn.
     *
     * The temp cache is not necessarily sufficient to prevent invalid array
     * paths, since a splice can happen during the same turn (with pathological
     * user code); we could introduce a "fixup" for temporarily cached array
     * paths if needed: https://github.com/Polymer/polymer/issues/4227
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify True if property should fire notification
     *   event (applies only for `notify: true` properties)
     * @return {boolean} Returns true if the property changed
     * @override
     */
    _setPendingProperty(property, value, shouldNotify) {
      let isPath = this.__dataHasPaths && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(property);
      let prevProps = isPath ? this.__dataTemp : this.__data;
      if (this._shouldPropertyChange(property, value, prevProps[property])) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (!(property in this.__dataOld)) {
          this.__dataOld[property] = this.__data[property];
        }
        // Paths are stored in temporary cache (cleared at end of turn),
        // which is used for dirty-checking, all others stored in __data
        if (isPath) {
          this.__dataTemp[property] = value;
        } else {
          this.__data[property] = value;
        }
        // All changes go into pending property bag, passed to _propertiesChanged
        this.__dataPending[property] = value;
        // Track properties that should notify separately
        if (isPath || (this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property])) {
          this.__dataToNotify = this.__dataToNotify || {};
          this.__dataToNotify[property] = shouldNotify;
        }
        return true;
      }
      return false;
    }

    /**
     * Overrides base implementation to ensure all accessors set `shouldNotify`
     * to true, for per-property notification tracking.
     *
     * @override
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Overrides `PropertyAccessor`'s default async queuing of
     * `_propertiesChanged`: if `__dataReady` is false (has not yet been
     * manually flushed), the function no-ops; otherwise flushes
     * `_propertiesChanged` synchronously.
     *
     * @override
     */
    _invalidateProperties() {
      if (this.__dataReady) {
        this._flushProperties();
      }
    }

    /**
     * Enqueues the given client on a list of pending clients, whose
     * pending property changes can later be flushed via a call to
     * `_flushClients`.
     *
     * @param {Object} client PropertyEffects client to enqueue
     * @protected
     */
    _enqueueClient(client) {
      this.__dataPendingClients = this.__dataPendingClients || [];
      if (client !== this) {
        this.__dataPendingClients.push(client);
      }
    }

    /**
     * Flushes any clients previously enqueued via `_enqueueClient`, causing
     * their `_flushProperties` method to run.
     *
     * @protected
     */
    _flushClients() {
      if (!this.__dataClientsReady) {
        this.__dataClientsReady = true;
        this._readyClients();
        // Override point where accessors are turned on; importantly,
        // this is after clients have fully readied, providing a guarantee
        // that any property effects occur only after all clients are ready.
        this.__dataReady = true;
      } else {
        this.__enableOrFlushClients();
      }
    }

    // NOTE: We ensure clients either enable or flush as appropriate. This
    // handles two corner cases:
    // (1) clients flush properly when connected/enabled before the host
    // enables; e.g.
    //   (a) Templatize stamps with no properties and does not flush and
    //   (b) the instance is inserted into dom and
    //   (c) then the instance flushes.
    // (2) clients enable properly when not connected/enabled when the host
    // flushes; e.g.
    //   (a) a template is runtime stamped and not yet connected/enabled
    //   (b) a host sets a property, causing stamped dom to flush
    //   (c) the stamped dom enables.
    __enableOrFlushClients() {
      let clients = this.__dataPendingClients;
      if (clients) {
        this.__dataPendingClients = null;
        for (let i=0; i < clients.length; i++) {
          let client = clients[i];
          if (!client.__dataEnabled) {
            client._enableProperties();
          } else if (client.__dataPending) {
            client._flushProperties();
          }
        }
      }
    }

    /**
     * Perform any initial setup on client dom. Called before the first
     * `_flushProperties` call on client dom and before any element
     * observers are called.
     *
     * @protected
     */
    _readyClients() {
      this.__enableOrFlushClients();
    }

    /**
     * Sets a bag of property changes to this instance, and
     * synchronously processes all effects of the properties as a batch.
     *
     * Property names must be simple properties, not paths.  Batched
     * path propagation is not supported.
     *
     * @param {Object} props Bag of one or more key-value pairs whose key is
     *   a property and value is the new value to set for that property.
     * @param {boolean=} setReadOnly When true, any private values set in
     *   `props` will be set. By default, `setProperties` will not set
     *   `readOnly: true` root properties.
     * @public
     */
    setProperties(props, setReadOnly) {
      for (let path in props) {
        if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
          //TODO(kschaaf): explicitly disallow paths in setProperty?
          // wildcard observers currently only pass the first changed path
          // in the `info` object, and you could do some odd things batching
          // paths, e.g. {'foo.bar': {...}, 'foo': null}
          this._setPendingPropertyOrPath(path, props[path], true);
        }
      }
      this._invalidateProperties();
    }

    /**
     * Overrides `PropertyAccessors` so that property accessor
     * side effects are not enabled until after client dom is fully ready.
     * Also calls `_flushClients` callback to ensure client dom is enabled
     * that was not enabled as a result of flushing properties.
     *
     * @override
     */
    ready() {
      // It is important that `super.ready()` is not called here as it
      // immediately turns on accessors. Instead, we wait until `readyClients`
      // to enable accessors to provide a guarantee that clients are ready
      // before processing any accessors side effects.
      this._flushProperties();
      // If no data was pending, `_flushProperties` will not `flushClients`
      // so ensure this is done.
      if (!this.__dataClientsReady) {
        this._flushClients();
      }
      // Before ready, client notifications do not trigger _flushProperties.
      // Therefore a flush is necessary here if data has been set.
      if (this.__dataPending) {
        this._flushProperties();
      }
    }

    /**
     * Implements `PropertyAccessors`'s properties changed callback.
     *
     * Runs each class of effects for the batch of changed properties in
     * a specific order (compute, propagate, reflect, observe, notify).
     *
     * @override
     */
    _propertiesChanged(currentProps, changedProps, oldProps) {
      // ----------------------------
      // let c = Object.getOwnPropertyNames(changedProps || {});
      // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
      // if (window.debug) { debugger; }
      // ----------------------------
      let hasPaths = this.__dataHasPaths;
      this.__dataHasPaths = false;
      // Compute properties
      runComputedEffects(this, changedProps, oldProps, hasPaths);
      // Clear notify properties prior to possible reentry (propagate, observe),
      // but after computing effects have a chance to add to them
      let notifyProps = this.__dataToNotify;
      this.__dataToNotify = null;
      // Propagate properties to clients
      this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
      // Flush clients
      this._flushClients();
      // Reflect properties
      runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
      // Observe properties
      runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
      // Notify properties to host
      if (notifyProps) {
        runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
      }
      // Clear temporary cache at end of turn
      if (this.__dataCounter == 1) {
        this.__dataTemp = {};
      }
      // ----------------------------
      // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
      // ----------------------------
    }

    /**
     * Called to propagate any property changes to stamped template nodes
     * managed by this element.
     *
     * @param {Object} changedProps Bag of changed properties
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @protected
     */
    _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
      if (this[TYPES.PROPAGATE]) {
        runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
      }
      let templateInfo = this.__templateInfo;
      while (templateInfo) {
        runEffects(this, templateInfo.propertyEffects, changedProps, oldProps,
          hasPaths, templateInfo.nodeList);
        templateInfo = templateInfo.nextTemplateInfo;
      }
    }

    /**
     * Aliases one data path as another, such that path notifications from one
     * are routed to the other.
     *
     * @param {string | !Array<string|number>} to Target path to link.
     * @param {string | !Array<string|number>} from Source path to link.
     * @public
     */
    linkPaths(to, from) {
      to = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["e" /* normalize */])(to);
      from = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["e" /* normalize */])(from);
      this.__dataLinkedPaths = this.__dataLinkedPaths || {};
      this.__dataLinkedPaths[to] = from;
    }

    /**
     * Removes a data path alias previously established with `_linkPaths`.
     *
     * Note, the path to unlink should be the target (`to`) used when
     * linking the paths.
     *
     * @param {string | !Array<string|number>} path Target path to unlink.
     * @public
     */
    unlinkPaths(path) {
      path = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["e" /* normalize */])(path);
      if (this.__dataLinkedPaths) {
        delete this.__dataLinkedPaths[path];
      }
    }

    /**
     * Notify that an array has changed.
     *
     * Example:
     *
     *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
     *     ...
     *     this.items.splice(1, 1, {name: 'Sam'});
     *     this.items.push({name: 'Bob'});
     *     this.notifySplices('items', [
     *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
     *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
     *     ]);
     *
     * @param {string} path Path that should be notified.
     * @param {Array} splices Array of splice records indicating ordered
     *   changes that occurred to the array. Each record should have the
     *   following fields:
     *    * index: index at which the change occurred
     *    * removed: array of items that were removed from this index
     *    * addedCount: number of new items added at this index
     *    * object: a reference to the array in question
     *    * type: the string literal 'splice'
     *
     *   Note that splice records _must_ be normalized such that they are
     *   reported in index order (raw results from `Object.observe` are not
     *   ordered and must be normalized/merged before notifying).
     * @public
    */
    notifySplices(path, splices) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      notifySplices(this, array, info.path, splices);
    }

    /**
     * Convenience method for reading a value from a path.
     *
     * Note, if any part in the path is undefined, this method returns
     * `undefined` (this method does not throw when dereferencing undefined
     * paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `users.12.name` or `['users', 12, 'name']`).
     * @param {Object=} root Root object from which the path is evaluated.
     * @return {*} Value at the path, or `undefined` if any part of the path
     *   is undefined.
     * @public
     */
    get(path, root) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(root || this, path);
    }

    /**
     * Convenience method for setting a value to a path and notifying any
     * elements bound to the same path.
     *
     * Note, if any part in the path except for the last is undefined,
     * this method does nothing (this method does not throw when
     * dereferencing undefined paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
     * @param {*} value Value to set at the specified path.
     * @param {Object=} root Root object from which the path is evaluated.
     *   When specified, no notification will occur.
     * @public
    */
    set(path, value, root) {
      if (root) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* set */])(root, path, value);
      } else {
        if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */(path)]) {
          if (this._setPendingPropertyOrPath(path, value, true)) {
            this._invalidateProperties();
          }
        }
      }
    }

    /**
     * Adds items onto the end of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to push onto array
     * @return {number} New length of the array.
     * @public
     */
    push(path, ...items) {
      let info = {path: ''};
      let array = /** @type {Array}*/(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let len = array.length;
      let ret = array.push(...items);
      if (items.length) {
        notifySplice(this, array, info.path, len, items.length, []);
      }
      return ret;
    }

    /**
     * Removes an item from the end of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    pop(path) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let hadLength = Boolean(array.length);
      let ret = array.pop();
      if (hadLength) {
        notifySplice(this, array, info.path, array.length, 0, [ret]);
      }
      return ret;
    }

    /**
     * Starting from the start index specified, removes 0 or more items
     * from the array and inserts 0 or more new items in their place.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.splice`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {number} start Index from which to start removing/inserting.
     * @param {number} deleteCount Number of items to remove.
     * @param {...*} items Items to insert into array.
     * @return {Array} Array of removed items.
     * @public
     */
    splice(path, start, deleteCount, ...items) {
      let info = {path : ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      // Normalize fancy native splice handling of crazy start values
      if (start < 0) {
        start = array.length - Math.floor(-start);
      } else {
        start = Math.floor(start);
      }
      if (!start) {
        start = 0;
      }
      let ret = array.splice(start, deleteCount, ...items);
      if (items.length || ret.length) {
        notifySplice(this, array, info.path, start, items.length, ret);
      }
      return ret;
    }

    /**
     * Removes an item from the beginning of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    shift(path) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let hadLength = Boolean(array.length);
      let ret = array.shift();
      if (hadLength) {
        notifySplice(this, array, info.path, 0, 0, [ret]);
      }
      return ret;
    }

    /**
     * Adds items onto the beginning of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to insert info array
     * @return {number} New length of the array.
     * @public
     */
    unshift(path, ...items) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let ret = array.unshift(...items);
      if (items.length) {
        notifySplice(this, array, info.path, 0, items.length, []);
      }
      return ret;
    }

    /**
     * Notify that a path has changed.
     *
     * Example:
     *
     *     this.item.user.name = 'Bob';
     *     this.notifyPath('item.user.name');
     *
     * @param {string} path Path that should be notified.
     * @param {*=} value Value at the path (optional).
     * @public
    */
    notifyPath(path, value) {
      /** @type {string} */
      let propPath;
      if (arguments.length == 1) {
        // Get value if not supplied
        let info = {path: ''};
        value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
        propPath = info.path;
      } else if (Array.isArray(path)) {
        // Normalize path if needed
        propPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["e" /* normalize */])(path);
      } else {
        propPath = /** @type{string} */(path);
      }
      if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Equivalent to static `createReadOnlyProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @protected
     */
    _createReadOnlyProperty(property, protectedSetter) {
      this._addPropertyEffect(property, TYPES.READ_ONLY);
      if (protectedSetter) {
        this['_set' + upper(property)] = /** @this {PropertyEffects} */function(value) {
          this._setProperty(property, value);
        };
      }
    }

    /**
     * Equivalent to static `createPropertyObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {string} methodName Name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @protected
     */
    _createPropertyObserver(property, methodName, dynamicFn) {
      let info = { property, methodName, dynamicFn: Boolean(dynamicFn) };
      this._addPropertyEffect(property, TYPES.OBSERVE, {
        fn: runObserverEffect, info, trigger: {name: property}
      });
      if (dynamicFn) {
        this._addPropertyEffect(methodName, TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: {name: methodName}
        });
      }
    }

    /**
     * Equivalent to static `createMethodObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    _createMethodObserver(expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed observer expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
    }

    /**
     * Equivalent to static `createNotifyingProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @protected
     */
    _createNotifyingProperty(property) {
      this._addPropertyEffect(property, TYPES.NOTIFY, {
        fn: runNotifyEffect,
        info: {
          eventName: CaseMap.camelToDashCase(property) + '-changed',
          property: property
        }
      });
    }

    /**
     * Equivalent to static `createReflectedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @protected
     */
    _createReflectedProperty(property) {
      let attr = CaseMap.camelToDashCase(property);
      if (attr[0] === '-') {
        console.warn('Property ' + property + ' cannot be reflected to attribute ' +
          attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
      } else {
        this._addPropertyEffect(property, TYPES.REFLECT, {
          fn: runReflectEffect,
          info: {
            attrName: attr
          }
        });
      }
    }

    /**
     * Equivalent to static `createComputedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    _createComputedProperty(property, expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed computed expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
    }

    // -- static class methods ------------

    /**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    static addPropertyEffect(property, type, effect) {
      this.prototype._addPropertyEffect(property, type, effect);
    }

    /**
     * Creates a single-property observer for the given property.
     *
     * @param {string} property Property name
     * @param {string} methodName Name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @protected
     */
    static createPropertyObserver(property, methodName, dynamicFn) {
      this.prototype._createPropertyObserver(property, methodName, dynamicFn);
    }

    /**
     * Creates a multi-property "method observer" based on the provided
     * expression, which should be a string in the form of a normal Javascript
     * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
     * should correspond to a property or path in the context of this
     * prototype (or instance), or may be a literal string or number.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    static createMethodObserver(expression, dynamicFn) {
      this.prototype._createMethodObserver(expression, dynamicFn);
    }

    /**
     * Causes the setter for the given property to dispatch `<property>-changed`
     * events to notify of changes to the property.
     *
     * @param {string} property Property name
     * @protected
     */
    static createNotifyingProperty(property) {
      this.prototype._createNotifyingProperty(property);
    }

    /**
     * Creates a read-only accessor for the given property.
     *
     * To set the property, use the protected `_setProperty` API.
     * To create a custom protected setter (e.g. `_setMyProp()` for
     * property `myProp`), pass `true` for `protectedSetter`.
     *
     * Note, if the property will have other property effects, this method
     * should be called first, before adding other effects.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @protected
     */
    static createReadOnlyProperty(property, protectedSetter) {
      this.prototype._createReadOnlyProperty(property, protectedSetter);
    }

    /**
     * Causes the setter for the given property to reflect the property value
     * to a (dash-cased) attribute of the same name.
     *
     * @param {string} property Property name
     * @protected
     */
    static createReflectedProperty(property) {
      this.prototype._createReflectedProperty(property);
    }

    /**
     * Creates a computed property whose value is set to the result of the
     * method described by the given `expression` each time one or more
     * arguments to the method changes.  The expression should be a string
     * in the form of a normal Javascript function signature:
     * `'methodName(arg1, [..., argn])'`
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
     *   method names should be included as a dependency to the effect.
     * @protected
     */
    static createComputedProperty(property, expression, dynamicFn) {
      this.prototype._createComputedProperty(property, expression, dynamicFn);
    }

    /**
     * Parses the provided template to ensure binding effects are created
     * for them, and then ensures property accessors are created for any
     * dependent properties in the template.  Binding effects for bound
     * templates are stored in a linked list on the instance so that
     * templates can be efficiently stamped and unstamped.
     *
     * @param {HTMLTemplateElement} template Template containing binding
     *   bindings
     * @return {Object} Template metadata object
     * @protected
     */
    static bindTemplate(template) {
      return this.prototype._bindTemplate(template);
    }

    // -- binding ----------------------------------------------

    /**
     * Equivalent to static `bindTemplate` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @param {HTMLTemplateElement} template Template containing binding
     *   bindings
     * @param {boolean=} instanceBinding When false (default), performs
     *   "prototypical" binding of the template and overwrites any previously
     *   bound template for the class. When true (as passed from
     *   `_stampTemplate`), the template info is instanced and linked into
     *   the list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     *   this is an instance of the prototypical template info
     * @protected
     */
    _bindTemplate(template, instanceBinding) {
      let templateInfo = this.constructor._parseTemplate(template);
      let wasPreBound = this.__templateInfo == templateInfo;
      // Optimization: since this is called twice for proto-bound templates,
      // don't attempt to recreate accessors if this template was pre-bound
      if (!wasPreBound) {
        for (let prop in templateInfo.propertyEffects) {
          this._createPropertyAccessor(prop);
        }
      }
      if (instanceBinding) {
        // For instance-time binding, create instance of template metadata
        // and link into list of templates if necessary
        templateInfo = /** @type {!TemplateInfo} */(Object.create(templateInfo));
        templateInfo.wasPreBound = wasPreBound;
        if (!wasPreBound && this.__templateInfo) {
          let last = this.__templateInfoLast || this.__templateInfo;
          this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
          templateInfo.previousTemplateInfo = last;
          return templateInfo;
        }
      }
      return this.__templateInfo = templateInfo;
    }

    /**
     * Adds a property effect to the given template metadata, which is run
     * at the "propagate" stage of `_propertiesChanged` when the template
     * has been bound to the element via `_bindTemplate`.
     *
     * The `effect` object should match the format in `_addPropertyEffect`.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    static _addTemplatePropertyEffect(templateInfo, prop, effect) {
      let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
      hostProps[prop] = true;
      let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
      let propEffects = effects[prop] = effects[prop] || [];
      propEffects.push(effect);
    }

    /**
     * Stamps the provided template and performs instance-time setup for
     * Polymer template features, including data bindings, declarative event
     * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
     * is returned containing the stamped DOM, ready for insertion into the
     * DOM.
     *
     * This method may be called more than once; however note that due to
     * `shadycss` polyfill limitations, only styles from templates prepared
     * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
     * to the shadow root and support CSS custom properties), and note that
     * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
     * any styles required by in runtime-stamped templates must be included
     * in the main element template.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     * @override
     * @protected
     */
    _stampTemplate(template) {
      // Ensures that created dom is `_enqueueClient`'d to this element so
      // that it can be flushed on next call to `_flushProperties`
      hostStack.beginHosting(this);
      let dom = super._stampTemplate(template);
      hostStack.endHosting(this);
      let templateInfo = /** @type {!TemplateInfo} */(this._bindTemplate(template, true));
      // Add template-instance-specific data to instanced templateInfo
      templateInfo.nodeList = dom.nodeList;
      // Capture child nodes to allow unstamping of non-prototypical templates
      if (!templateInfo.wasPreBound) {
        let nodes = templateInfo.childNodes = [];
        for (let n=dom.firstChild; n; n=n.nextSibling) {
          nodes.push(n);
        }
      }
      dom.templateInfo = templateInfo;
      // Setup compound storage, 2-way listeners, and dataHost for bindings
      setupBindings(this, templateInfo);
      // Flush properties into template nodes if already booted
      if (this.__dataReady) {
        runEffects(this, templateInfo.propertyEffects, this.__data, null,
          false, templateInfo.nodeList);
      }
      return dom;
    }

    /**
     * Removes and unbinds the nodes previously contained in the provided
     * DocumentFragment returned from `_stampTemplate`.
     *
     * @param {!StampedTemplate} dom DocumentFragment previously returned
     *   from `_stampTemplate` associated with the nodes to be removed
     * @protected
     */
    _removeBoundDom(dom) {
      // Unlink template info
      let templateInfo = dom.templateInfo;
      if (templateInfo.previousTemplateInfo) {
        templateInfo.previousTemplateInfo.nextTemplateInfo =
          templateInfo.nextTemplateInfo;
      }
      if (templateInfo.nextTemplateInfo) {
        templateInfo.nextTemplateInfo.previousTemplateInfo =
          templateInfo.previousTemplateInfo;
      }
      if (this.__templateInfoLast == templateInfo) {
        this.__templateInfoLast = templateInfo.previousTemplateInfo;
      }
      templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
      // Remove stamped nodes
      let nodes = templateInfo.childNodes;
      for (let i=0; i<nodes.length; i++) {
        let node = nodes[i];
        node.parentNode.removeChild(node);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
      if (node.nodeType === Node.TEXT_NODE) {
        let parts = this._parseBindings(node.textContent, templateInfo);
        if (parts) {
          // Initialize the textContent with any literal parts
          // NOTE: default to a space here so the textNode remains; some browsers
          // (IE) evacipate an empty textNode following cloneNode/importNode.
          node.textContent = literalFromParts(parts) || ' ';
          addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
          noted = true;
        }
      }
      return noted;
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from attributes.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      let parts = this._parseBindings(value, templateInfo);
      if (parts) {
        // Attribute or property
        let origName = name;
        let kind = 'property';
        if (name[name.length-1] == '$') {
          name = name.slice(0, -1);
          kind = 'attribute';
        }
        // Initialize attribute bindings with any literal parts
        let literal = literalFromParts(parts);
        if (literal && kind == 'attribute') {
          node.setAttribute(name, literal);
        }
        // Clear attribute before removing, since IE won't allow removing
        // `value` attribute if it previously had a value (can't
        // unconditionally set '' before removing since attributes with `$`
        // can't be set using setAttribute)
        if (node.localName === 'input' && origName === 'value') {
          node.setAttribute(origName, '');
        }
        // Remove annotation
        node.removeAttribute(origName);
        // Case hackery: attributes are lower-case, but bind targets
        // (properties) are case sensitive. Gambit is to map dash-case to
        // camel-case: `foo-bar` becomes `fooBar`.
        // Attribute bindings are excepted.
        if (kind === 'property') {
          name = Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["dashToCamelCase"])(name);
        }
        addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
        return true;
      } else {
        return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * binding the properties that a nested template depends on to the template
     * as `_host_<property>`.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
      // Merge host props into outer template and add bindings
      let hostProps = nodeInfo.templateInfo.hostProps;
      let mode = '{';
      for (let source in hostProps) {
        let parts = [{ mode, source, dependencies: [source] }];
        addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
      }
      return noted;
    }

    /**
     * Called to parse text in a template (either attribute values or
     * textContent) into binding metadata.
     *
     * Any overrides of this method should return an array of binding part
     * metadata  representing one or more bindings found in the provided text
     * and any "literal" text in between.  Any non-literal parts will be passed
     * to `_evaluateBinding` when any dependencies change.  The only required
     * fields of each "part" in the returned array are as follows:
     *
     * - `dependencies` - Array containing trigger metadata for each property
     *   that should trigger the binding to update
     * - `literal` - String containing text if the part represents a literal;
     *   in this case no `dependencies` are needed
     *
     * Additional metadata for use by `_evaluateBinding` may be provided in
     * each part object as needed.
     *
     * The default implementation handles the following types of bindings
     * (one or more may be intermixed with literal strings):
     * - Property binding: `[[prop]]`
     * - Path binding: `[[object.prop]]`
     * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
     * - Two-way property or path bindings (supports negation):
     *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
     * - Inline computed method (supports negation):
     *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
     *
     * @param {string} text Text to parse from attribute or textContent
     * @param {Object} templateInfo Current template metadata
     * @return {Array<!BindingPart>} Array of binding part metadata
     * @protected
     */
    static _parseBindings(text, templateInfo) {
      let parts = [];
      let lastIndex = 0;
      let m;
      // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
      // Regex matches:
      //        Iteration 1:  Iteration 2:
      // m[1]: '{{'          '[['
      // m[2]: ''            '!'
      // m[3]: 'prop'        'compute(foo,bar)'
      while ((m = bindingRegex.exec(text)) !== null) {
        // Add literal part
        if (m.index > lastIndex) {
          parts.push({literal: text.slice(lastIndex, m.index)});
        }
        // Add binding part
        let mode = m[1][0];
        let negate = Boolean(m[2]);
        let source = m[3].trim();
        let customEvent = false, notifyEvent = '', colon = -1;
        if (mode == '{' && (colon = source.indexOf('::')) > 0) {
          notifyEvent = source.substring(colon + 2);
          source = source.substring(0, colon);
          customEvent = true;
        }
        let signature = parseMethod(source);
        let dependencies = [];
        if (signature) {
          // Inline computed function
          let {args, methodName} = signature;
          for (let i=0; i<args.length; i++) {
            let arg = args[i];
            if (!arg.literal) {
              dependencies.push(arg);
            }
          }
          let dynamicFns = templateInfo.dynamicFns;
          if (dynamicFns && dynamicFns[methodName] || signature.static) {
            dependencies.push(methodName);
            signature.dynamicFn = true;
          }
        } else {
          // Property or path
          dependencies.push(source);
        }
        parts.push({
          source, mode, negate, customEvent, signature, dependencies,
          event: notifyEvent
        });
        lastIndex = bindingRegex.lastIndex;
      }
      // Add a final literal part
      if (lastIndex && lastIndex < text.length) {
        let literal = text.substring(lastIndex);
        if (literal) {
          parts.push({
            literal: literal
          });
        }
      }
      if (parts.length) {
        return parts;
      } else {
        return null;
      }
    }

    /**
     * Called to evaluate a previously parsed binding part based on a set of
     * one or more changed dependencies.
     *
     * @param {this} inst Element that should be used as scope for
     *   binding dependencies
     * @param {BindingPart} part Binding part metadata
     * @param {string} path Property/path that triggered this effect
     * @param {Object} props Bag of current property changes
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {*} Value the binding part evaluated to
     * @protected
     */
    static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
      let value;
      if (part.signature) {
        value = runMethodEffect(inst, path, props, oldProps, part.signature);
      } else if (path != part.source) {
        value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, part.source);
      } else {
        if (hasPaths && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(path)) {
          value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, path);
        } else {
          value = inst.__data[path];
        }
      }
      if (part.negate) {
        value = !value;
      }
      return value;
    }

  }

  // make a typing for closure :P
  PropertyEffectsType = PropertyEffects;

  return PropertyEffects;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyEffects;


/**
 * Helper api for enqueing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */
let hostStack = {

  stack: [],

  /**
   * @param {*} inst Instance to add to hostStack
   * @this {hostStack}
   */
  registerHost(inst) {
    if (this.stack.length) {
      let host = this.stack[this.stack.length-1];
      host._enqueueClient(inst);
    }
  },

  /**
   * @param {*} inst Instance to begin hosting
   * @this {hostStack}
   */
  beginHosting(inst) {
    this.stack.push(inst);
  },

  /**
   * @param {*} inst Instance to end hosting
   * @this {hostStack}
   */
  endHosting(inst) {
    let stackLen = this.stack.length;
    if (stackLen && this.stack[stackLen-1] == inst) {
      this.stack.pop();
    }
  }

};


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_mixins_element_mixin_js__ = __webpack_require__(12);


/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin Polymer.ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
const Element = Object(__WEBPACK_IMPORTED_MODULE_0__lib_mixins_element_mixin_js__["a" /* ElementMixin */])(HTMLElement);



/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cssFromModules */
/* unused harmony export cssFromModule */
/* harmony export (immutable) */ __webpack_exports__["b"] = cssFromTemplate;
/* harmony export (immutable) */ __webpack_exports__["a"] = cssFromModuleImports;
/* unused harmony export _cssFromModuleImports */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resolve_url_js__ = __webpack_require__(4);


const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
const INCLUDE_ATTR = 'include';

function importModule(moduleId) {
  const /** Polymer.DomModule */ PolymerDomModule = customElements.get('dom-module');
  if (!PolymerDomModule) {
    return null;
  }
  return PolymerDomModule.import(moduleId);
}

/** @typedef {{assetpath: string}} */
let templateWithAssetPath; // eslint-disable-line no-unused-vars

function cssFromModules(moduleIds) {
  let modules = moduleIds.trim().split(/\s+/);
  let cssText = '';
  for (let i=0; i < modules.length; i++) {
    cssText += cssFromModule(modules[i]);
  }
  return cssText;
}

function cssFromModule(moduleId) {
  let m = importModule(moduleId);
  if (m && m._cssText === undefined) {
    // module imports: <link rel="import" type="css">
    let cssText = _cssFromModuleImports(m);
    // include css from the first template in the module
    let t = m.querySelector('template');
    if (t) {
      cssText += cssFromTemplate(t, /** @type {templateWithAssetPath} */(m).assetpath);
    }
    m._cssText = cssText || null;
  }
  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
  }
  return m && m._cssText || '';
}

function cssFromTemplate(template, baseURI) {
  let cssText = '';
  // if element is a template, get content from its .content
  let e$ = template.content.querySelectorAll('style');
  for (let i=0; i < e$.length; i++) {
    let e = e$[i];
    // support style sharing by allowing styles to "include"
    // other dom-modules that contain styling
    let include = e.getAttribute(INCLUDE_ATTR);
    if (include) {
      cssText += cssFromModules(include);
    }
    e.parentNode.removeChild(e);
    cssText += baseURI ?
      Object(__WEBPACK_IMPORTED_MODULE_0__resolve_url_js__["b" /* resolveCss */])(e.textContent, baseURI) : e.textContent;
  }
  return cssText;
}

function cssFromModuleImports(moduleId) {
  let m = importModule(moduleId);
  return m ? _cssFromModuleImports(m) : '';
}

function _cssFromModuleImports(module) {
  let cssText = '';
  let p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
  for (let i=0; i < p$.length; i++) {
    let p = p$[i];
    if (p.import) {
      let importDoc = p.import;
      // NOTE: polyfill affordance.
      // under the HTMLImports polyfill, there will be no 'body',
      // but the import pseudo-doc can be used directly.
      let container = importDoc.body ? importDoc.body : importDoc;
      cssText +=
        Object(__WEBPACK_IMPORTED_MODULE_0__resolve_url_js__["b" /* resolveCss */])(container.textContent,
          importDoc.baseURI);
    }
  }
  return cssText;
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__ = __webpack_require__(4);



let modules = {};
let lcModules = {};
function findModule(id) {
  return modules[id] || lcModules[id.toLowerCase()];
}

function styleOutsideTemplateCheck(inst) {
  if (inst.querySelector('style')) {
    console.warn('dom-module %s has style outside template', inst.id);
  }
}

/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @memberof Polymer
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */
class DomModule extends HTMLElement {

  static get observedAttributes() { return ['id']; }

  /**
   * Retrieves the element specified by the css `selector` in the module
   * registered by `id`. For example, this.import('foo', 'img');
   * @param {string} id The id of the dom-module in which to search.
   * @param {string=} selector The css selector by which to find the element.
   * @return {Element} Returns the element which matches `selector` in the
   * module registered at the specified `id`.
   */
  static import(id, selector) {
    if (id) {
      let m = findModule(id);
      if (m && selector) {
        return m.querySelector(selector);
      }
      return m;
    }
    return null;
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this.register();
    }
  }

  /**
   * The absolute URL of the original location of this `dom-module`.
   *
   * This value will differ from this element's `ownerDocument` in the
   * following ways:
   * - Takes into account any `assetpath` attribute added during bundling
   *   to indicate the original location relative to the bundled location
   * - Uses the HTMLImports polyfill's `importForElement` API to ensure
   *   the path is relative to the import document's location since
   *   `ownerDocument` is not currently polyfilled
   */
  get assetpath() {
    // Don't override existing assetpath.
    if (!this.__assetpath) {
      // note: assetpath set via an attribute must be relative to this
      // element's location; accomodate polyfilled HTMLImports
      const owner = window.HTMLImports && HTMLImports.importForElement ?
        HTMLImports.importForElement(this) || document : this.ownerDocument;
      const url = Object(__WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__["c" /* resolveUrl */])(
        this.getAttribute('assetpath') || '', owner.baseURI);
      this.__assetpath = Object(__WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__["a" /* pathFromUrl */])(url);
    }
    return this.__assetpath;
  }

  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param {string=} id The id at which to register the dom-module.
   */
  register(id) {
    id = id || this.id;
    if (id) {
      this.id = id;
      // store id separate from lowercased id so that
      // in all cases mixedCase id will stored distinctly
      // and lowercase version is a fallback
      modules[id] = this;
      lcModules[id.toLowerCase()] = this;
      styleOutsideTemplateCheck(this);
    }
  }
}

DomModule.prototype['modules'] = modules;

customElements.define('dom-module', DomModule);




/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web_animations_js_web_animations_next_min__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web_animations_js_web_animations_next_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_web_animations_js_web_animations_next_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo_element__ = __webpack_require__(54);






/***/ }),
/* 30 */
/***/ (function(module, exports) {

// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

!function(a,b){var c={},d={},e={};!function(a,b){function c(a){if("number"==typeof a)return a;var b={};for(var c in a)b[c]=a[c];return b}function d(){this._delay=0,this._endDelay=0,this._fill="none",this._iterationStart=0,this._iterations=1,this._duration=0,this._playbackRate=1,this._direction="normal",this._easing="linear",this._easingFunction=x}function e(){return a.isDeprecated("Invalid timing inputs","2016-03-02","TypeError exceptions will be thrown instead.",!0)}function f(b,c,e){var f=new d;return c&&(f.fill="both",f.duration="auto"),"number"!=typeof b||isNaN(b)?void 0!==b&&Object.getOwnPropertyNames(b).forEach(function(c){if("auto"!=b[c]){if(("number"==typeof f[c]||"duration"==c)&&("number"!=typeof b[c]||isNaN(b[c])))return;if("fill"==c&&-1==v.indexOf(b[c]))return;if("direction"==c&&-1==w.indexOf(b[c]))return;if("playbackRate"==c&&1!==b[c]&&a.isDeprecated("AnimationEffectTiming.playbackRate","2014-11-28","Use Animation.playbackRate instead."))return;f[c]=b[c]}}):f.duration=b,f}function g(a){return"number"==typeof a&&(a=isNaN(a)?{duration:0}:{duration:a}),a}function h(b,c){return b=a.numericTimingToObject(b),f(b,c)}function i(a,b,c,d){return a<0||a>1||c<0||c>1?x:function(e){function f(a,b,c){return 3*a*(1-c)*(1-c)*c+3*b*(1-c)*c*c+c*c*c}if(e<=0){var g=0;return a>0?g=b/a:!b&&c>0&&(g=d/c),g*e}if(e>=1){var h=0;return c<1?h=(d-1)/(c-1):1==c&&a<1&&(h=(b-1)/(a-1)),1+h*(e-1)}for(var i=0,j=1;i<j;){var k=(i+j)/2,l=f(a,c,k);if(Math.abs(e-l)<1e-5)return f(b,d,k);l<e?i=k:j=k}return f(b,d,k)}}function j(a,b){return function(c){if(c>=1)return 1;var d=1/a;return(c+=b*d)-c%d}}function k(a){C||(C=document.createElement("div").style),C.animationTimingFunction="",C.animationTimingFunction=a;var b=C.animationTimingFunction;if(""==b&&e())throw new TypeError(a+" is not a valid value for easing");return b}function l(a){if("linear"==a)return x;var b=E.exec(a);if(b)return i.apply(this,b.slice(1).map(Number));var c=F.exec(a);return c?j(Number(c[1]),{start:y,middle:z,end:A}[c[2]]):B[a]||x}function m(a){return Math.abs(n(a)/a.playbackRate)}function n(a){return 0===a.duration||0===a.iterations?0:a.duration*a.iterations}function o(a,b,c){if(null==b)return G;var d=c.delay+a+c.endDelay;return b<Math.min(c.delay,d)?H:b>=Math.min(c.delay+a,d)?I:J}function p(a,b,c,d,e){switch(d){case H:return"backwards"==b||"both"==b?0:null;case J:return c-e;case I:return"forwards"==b||"both"==b?a:null;case G:return null}}function q(a,b,c,d,e){var f=e;return 0===a?b!==H&&(f+=c):f+=d/a,f}function r(a,b,c,d,e,f){var g=a===1/0?b%1:a%1;return 0!==g||c!==I||0===d||0===e&&0!==f||(g=1),g}function s(a,b,c,d){return a===I&&b===1/0?1/0:1===c?Math.floor(d)-1:Math.floor(d)}function t(a,b,c){var d=a;if("normal"!==a&&"reverse"!==a){var e=b;"alternate-reverse"===a&&(e+=1),d="normal",e!==1/0&&e%2!=0&&(d="reverse")}return"normal"===d?c:1-c}function u(a,b,c){var d=o(a,b,c),e=p(a,c.fill,b,d,c.delay);if(null===e)return null;var f=q(c.duration,d,c.iterations,e,c.iterationStart),g=r(f,c.iterationStart,d,c.iterations,e,c.duration),h=s(d,c.iterations,g,f),i=t(c.direction,h,g);return c._easingFunction(i)}var v="backwards|forwards|both|none".split("|"),w="reverse|alternate|alternate-reverse".split("|"),x=function(a){return a};d.prototype={_setMember:function(b,c){this["_"+b]=c,this._effect&&(this._effect._timingInput[b]=c,this._effect._timing=a.normalizeTimingInput(this._effect._timingInput),this._effect.activeDuration=a.calculateActiveDuration(this._effect._timing),this._effect._animation&&this._effect._animation._rebuildUnderlyingAnimation())},get playbackRate(){return this._playbackRate},set delay(a){this._setMember("delay",a)},get delay(){return this._delay},set endDelay(a){this._setMember("endDelay",a)},get endDelay(){return this._endDelay},set fill(a){this._setMember("fill",a)},get fill(){return this._fill},set iterationStart(a){if((isNaN(a)||a<0)&&e())throw new TypeError("iterationStart must be a non-negative number, received: "+timing.iterationStart);this._setMember("iterationStart",a)},get iterationStart(){return this._iterationStart},set duration(a){if("auto"!=a&&(isNaN(a)||a<0)&&e())throw new TypeError("duration must be non-negative or auto, received: "+a);this._setMember("duration",a)},get duration(){return this._duration},set direction(a){this._setMember("direction",a)},get direction(){return this._direction},set easing(a){this._easingFunction=l(k(a)),this._setMember("easing",a)},get easing(){return this._easing},set iterations(a){if((isNaN(a)||a<0)&&e())throw new TypeError("iterations must be non-negative, received: "+a);this._setMember("iterations",a)},get iterations(){return this._iterations}};var y=1,z=.5,A=0,B={ease:i(.25,.1,.25,1),"ease-in":i(.42,0,1,1),"ease-out":i(0,0,.58,1),"ease-in-out":i(.42,0,.58,1),"step-start":j(1,y),"step-middle":j(1,z),"step-end":j(1,A)},C=null,D="\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*",E=new RegExp("cubic-bezier\\("+D+","+D+","+D+","+D+"\\)"),F=/steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/,G=0,H=1,I=2,J=3;a.cloneTimingInput=c,a.makeTiming=f,a.numericTimingToObject=g,a.normalizeTimingInput=h,a.calculateActiveDuration=m,a.calculateIterationProgress=u,a.calculatePhase=o,a.normalizeEasing=k,a.parseEasingFunction=l}(c),function(a,b){function c(a,b){return a in k?k[a][b]||b:b}function d(a){return"display"===a||0===a.lastIndexOf("animation",0)||0===a.lastIndexOf("transition",0)}function e(a,b,e){if(!d(a)){var f=h[a];if(f){i.style[a]=b;for(var g in f){var j=f[g],k=i.style[j];e[j]=c(j,k)}}else e[a]=c(a,b)}}function f(a){var b=[];for(var c in a)if(!(c in["easing","offset","composite"])){var d=a[c];Array.isArray(d)||(d=[d]);for(var e,f=d.length,g=0;g<f;g++)e={},e.offset="offset"in a?a.offset:1==f?1:g/(f-1),"easing"in a&&(e.easing=a.easing),"composite"in a&&(e.composite=a.composite),e[c]=d[g],b.push(e)}return b.sort(function(a,b){return a.offset-b.offset}),b}function g(b){function c(){var a=d.length;null==d[a-1].offset&&(d[a-1].offset=1),a>1&&null==d[0].offset&&(d[0].offset=0);for(var b=0,c=d[0].offset,e=1;e<a;e++){var f=d[e].offset;if(null!=f){for(var g=1;g<e-b;g++)d[b+g].offset=c+(f-c)*g/(e-b);b=e,c=f}}}if(null==b)return[];window.Symbol&&Symbol.iterator&&Array.prototype.from&&b[Symbol.iterator]&&(b=Array.from(b)),Array.isArray(b)||(b=f(b));for(var d=b.map(function(b){var c={};for(var d in b){var f=b[d];if("offset"==d){if(null!=f){if(f=Number(f),!isFinite(f))throw new TypeError("Keyframe offsets must be numbers.");if(f<0||f>1)throw new TypeError("Keyframe offsets must be between 0 and 1.")}}else if("composite"==d){if("add"==f||"accumulate"==f)throw{type:DOMException.NOT_SUPPORTED_ERR,name:"NotSupportedError",message:"add compositing is not supported"};if("replace"!=f)throw new TypeError("Invalid composite mode "+f+".")}else f="easing"==d?a.normalizeEasing(f):""+f;e(d,f,c)}return void 0==c.offset&&(c.offset=null),void 0==c.easing&&(c.easing="linear"),c}),g=!0,h=-1/0,i=0;i<d.length;i++){var j=d[i].offset;if(null!=j){if(j<h)throw new TypeError("Keyframes are not loosely sorted by offset. Sort or specify offsets.");h=j}else g=!1}return d=d.filter(function(a){return a.offset>=0&&a.offset<=1}),g||c(),d}var h={background:["backgroundImage","backgroundPosition","backgroundSize","backgroundRepeat","backgroundAttachment","backgroundOrigin","backgroundClip","backgroundColor"],border:["borderTopColor","borderTopStyle","borderTopWidth","borderRightColor","borderRightStyle","borderRightWidth","borderBottomColor","borderBottomStyle","borderBottomWidth","borderLeftColor","borderLeftStyle","borderLeftWidth"],borderBottom:["borderBottomWidth","borderBottomStyle","borderBottomColor"],borderColor:["borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],borderLeft:["borderLeftWidth","borderLeftStyle","borderLeftColor"],borderRadius:["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],borderRight:["borderRightWidth","borderRightStyle","borderRightColor"],borderTop:["borderTopWidth","borderTopStyle","borderTopColor"],borderWidth:["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"],flex:["flexGrow","flexShrink","flexBasis"],font:["fontFamily","fontSize","fontStyle","fontVariant","fontWeight","lineHeight"],margin:["marginTop","marginRight","marginBottom","marginLeft"],outline:["outlineColor","outlineStyle","outlineWidth"],padding:["paddingTop","paddingRight","paddingBottom","paddingLeft"]},i=document.createElementNS("http://www.w3.org/1999/xhtml","div"),j={thin:"1px",medium:"3px",thick:"5px"},k={borderBottomWidth:j,borderLeftWidth:j,borderRightWidth:j,borderTopWidth:j,fontSize:{"xx-small":"60%","x-small":"75%",small:"89%",medium:"100%",large:"120%","x-large":"150%","xx-large":"200%"},fontWeight:{normal:"400",bold:"700"},outlineWidth:j,textShadow:{none:"0px 0px 0px transparent"},boxShadow:{none:"0px 0px 0px 0px transparent"}};a.convertToArrayForm=f,a.normalizeKeyframes=g}(c),function(a){var b={};a.isDeprecated=function(a,c,d,e){var f=e?"are":"is",g=new Date,h=new Date(c);return h.setMonth(h.getMonth()+3),!(g<h&&(a in b||console.warn("Web Animations: "+a+" "+f+" deprecated and will stop working on "+h.toDateString()+". "+d),b[a]=!0,1))},a.deprecated=function(b,c,d,e){var f=e?"are":"is";if(a.isDeprecated(b,c,d,e))throw new Error(b+" "+f+" no longer supported. "+d)}}(c),function(){if(document.documentElement.animate){var a=document.documentElement.animate([],0),b=!0;if(a&&(b=!1,"play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(c){void 0===a[c]&&(b=!0)})),!b)return}!function(a,b,c){function d(a){for(var b={},c=0;c<a.length;c++)for(var d in a[c])if("offset"!=d&&"easing"!=d&&"composite"!=d){var e={offset:a[c].offset,easing:a[c].easing,value:a[c][d]};b[d]=b[d]||[],b[d].push(e)}for(var f in b){var g=b[f];if(0!=g[0].offset||1!=g[g.length-1].offset)throw{type:DOMException.NOT_SUPPORTED_ERR,name:"NotSupportedError",message:"Partial keyframes are not supported"}}return b}function e(c){var d=[];for(var e in c)for(var f=c[e],g=0;g<f.length-1;g++){var h=g,i=g+1,j=f[h].offset,k=f[i].offset,l=j,m=k;0==g&&(l=-1/0,0==k&&(i=h)),g==f.length-2&&(m=1/0,1==j&&(h=i)),d.push({applyFrom:l,applyTo:m,startOffset:f[h].offset,endOffset:f[i].offset,easingFunction:a.parseEasingFunction(f[h].easing),property:e,interpolation:b.propertyInterpolation(e,f[h].value,f[i].value)})}return d.sort(function(a,b){return a.startOffset-b.startOffset}),d}b.convertEffectInput=function(c){var f=a.normalizeKeyframes(c),g=d(f),h=e(g);return function(a,c){if(null!=c)h.filter(function(a){return c>=a.applyFrom&&c<a.applyTo}).forEach(function(d){var e=c-d.startOffset,f=d.endOffset-d.startOffset,g=0==f?0:d.easingFunction(e/f);b.apply(a,d.property,d.interpolation(g))});else for(var d in g)"offset"!=d&&"easing"!=d&&"composite"!=d&&b.clear(a,d)}}}(c,d),function(a,b,c){function d(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}function e(a,b,c){h[c]=h[c]||[],h[c].push([a,b])}function f(a,b,c){for(var f=0;f<c.length;f++){e(a,b,d(c[f]))}}function g(c,e,f){var g=c;/-/.test(c)&&!a.isDeprecated("Hyphenated property names","2016-03-22","Use camelCase instead.",!0)&&(g=d(c)),"initial"!=e&&"initial"!=f||("initial"==e&&(e=i[g]),"initial"==f&&(f=i[g]));for(var j=e==f?[]:h[g],k=0;j&&k<j.length;k++){var l=j[k][0](e),m=j[k][0](f);if(void 0!==l&&void 0!==m){var n=j[k][1](l,m);if(n){var o=b.Interpolation.apply(null,n);return function(a){return 0==a?e:1==a?f:o(a)}}}}return b.Interpolation(!1,!0,function(a){return a?f:e})}var h={};b.addPropertiesHandler=f;var i={backgroundColor:"transparent",backgroundPosition:"0% 0%",borderBottomColor:"currentColor",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",borderBottomWidth:"3px",borderLeftColor:"currentColor",borderLeftWidth:"3px",borderRightColor:"currentColor",borderRightWidth:"3px",borderSpacing:"2px",borderTopColor:"currentColor",borderTopLeftRadius:"0px",borderTopRightRadius:"0px",borderTopWidth:"3px",bottom:"auto",clip:"rect(0px, 0px, 0px, 0px)",color:"black",fontSize:"100%",fontWeight:"400",height:"auto",left:"auto",letterSpacing:"normal",lineHeight:"120%",marginBottom:"0px",marginLeft:"0px",marginRight:"0px",marginTop:"0px",maxHeight:"none",maxWidth:"none",minHeight:"0px",minWidth:"0px",opacity:"1.0",outlineColor:"invert",outlineOffset:"0px",outlineWidth:"3px",paddingBottom:"0px",paddingLeft:"0px",paddingRight:"0px",paddingTop:"0px",right:"auto",strokeDasharray:"none",strokeDashoffset:"0px",textIndent:"0px",textShadow:"0px 0px 0px transparent",top:"auto",transform:"",verticalAlign:"0px",visibility:"visible",width:"auto",wordSpacing:"normal",zIndex:"auto"};b.propertyInterpolation=g}(c,d),function(a,b,c){function d(b){var c=a.calculateActiveDuration(b),d=function(d){return a.calculateIterationProgress(c,d,b)};return d._totalDuration=b.delay+c+b.endDelay,d}b.KeyframeEffect=function(c,e,f,g){var h,i=d(a.normalizeTimingInput(f)),j=b.convertEffectInput(e),k=function(){j(c,h)};return k._update=function(a){return null!==(h=i(a))},k._clear=function(){j(c,null)},k._hasSameTarget=function(a){return c===a},k._target=c,k._totalDuration=i._totalDuration,k._id=g,k}}(c,d),function(a,b){function c(a,b){return!(!b.namespaceURI||-1==b.namespaceURI.indexOf("/svg"))&&(g in a||(a[g]=/Trident|MSIE|IEMobile|Edge|Android 4/i.test(a.navigator.userAgent)),a[g])}function d(a,b,c){c.enumerable=!0,c.configurable=!0,Object.defineProperty(a,b,c)}function e(a){this._element=a,this._surrogateStyle=document.createElementNS("http://www.w3.org/1999/xhtml","div").style,this._style=a.style,this._length=0,this._isAnimatedProperty={},this._updateSvgTransformAttr=c(window,a),this._savedTransformAttr=null;for(var b=0;b<this._style.length;b++){var d=this._style[b];this._surrogateStyle[d]=this._style[d]}this._updateIndices()}function f(a){if(!a._webAnimationsPatchedStyle){var b=new e(a);try{d(a,"style",{get:function(){return b}})}catch(b){a.style._set=function(b,c){a.style[b]=c},a.style._clear=function(b){a.style[b]=""}}a._webAnimationsPatchedStyle=a.style}}var g="_webAnimationsUpdateSvgTransformAttr",h={cssText:1,length:1,parentRule:1},i={getPropertyCSSValue:1,getPropertyPriority:1,getPropertyValue:1,item:1,removeProperty:1,setProperty:1},j={removeProperty:1,setProperty:1};e.prototype={get cssText(){return this._surrogateStyle.cssText},set cssText(a){for(var b={},c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;this._surrogateStyle.cssText=a,this._updateIndices();for(var c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;for(var d in b)this._isAnimatedProperty[d]||this._style.setProperty(d,this._surrogateStyle.getPropertyValue(d))},get length(){return this._surrogateStyle.length},get parentRule(){return this._style.parentRule},_updateIndices:function(){for(;this._length<this._surrogateStyle.length;)Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,get:function(a){return function(){return this._surrogateStyle[a]}}(this._length)}),this._length++;for(;this._length>this._surrogateStyle.length;)this._length--,Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,value:void 0})},_set:function(b,c){this._style[b]=c,this._isAnimatedProperty[b]=!0,this._updateSvgTransformAttr&&"transform"==a.unprefixedPropertyName(b)&&(null==this._savedTransformAttr&&(this._savedTransformAttr=this._element.getAttribute("transform")),this._element.setAttribute("transform",a.transformToSvgMatrix(c)))},_clear:function(b){this._style[b]=this._surrogateStyle[b],this._updateSvgTransformAttr&&"transform"==a.unprefixedPropertyName(b)&&(this._savedTransformAttr?this._element.setAttribute("transform",this._savedTransformAttr):this._element.removeAttribute("transform"),this._savedTransformAttr=null),delete this._isAnimatedProperty[b]}};for(var k in i)e.prototype[k]=function(a,b){return function(){var c=this._surrogateStyle[a].apply(this._surrogateStyle,arguments);return b&&(this._isAnimatedProperty[arguments[0]]||this._style[a].apply(this._style,arguments),this._updateIndices()),c}}(k,k in j);for(var l in document.documentElement.style)l in h||l in i||function(a){d(e.prototype,a,{get:function(){return this._surrogateStyle[a]},set:function(b){this._surrogateStyle[a]=b,this._updateIndices(),this._isAnimatedProperty[a]||(this._style[a]=b)}})}(l);a.apply=function(b,c,d){f(b),b.style._set(a.propertyName(c),d)},a.clear=function(b,c){b._webAnimationsPatchedStyle&&b.style._clear(a.propertyName(c))}}(d),function(a){window.Element.prototype.animate=function(b,c){var d="";return c&&c.id&&(d=c.id),a.timeline._play(a.KeyframeEffect(this,b,c,d))}}(d),function(a,b){function c(a,b,d){if("number"==typeof a&&"number"==typeof b)return a*(1-d)+b*d;if("boolean"==typeof a&&"boolean"==typeof b)return d<.5?a:b;if(a.length==b.length){for(var e=[],f=0;f<a.length;f++)e.push(c(a[f],b[f],d));return e}throw"Mismatched interpolation arguments "+a+":"+b}a.Interpolation=function(a,b,d){return function(e){return d(c(a,b,e))}}}(d),function(a,b){function c(a,b,c){return Math.max(Math.min(a,c),b)}function d(b,d,e){var f=a.dot(b,d);f=c(f,-1,1);var g=[];if(1===f)g=b;else for(var h=Math.acos(f),i=1*Math.sin(e*h)/Math.sqrt(1-f*f),j=0;j<4;j++)g.push(b[j]*(Math.cos(e*h)-f*i)+d[j]*i);return g}var e=function(){function a(a,b){for(var c=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],d=0;d<4;d++)for(var e=0;e<4;e++)for(var f=0;f<4;f++)c[d][e]+=b[d][f]*a[f][e];return c}function b(a){return 0==a[0][2]&&0==a[0][3]&&0==a[1][2]&&0==a[1][3]&&0==a[2][0]&&0==a[2][1]&&1==a[2][2]&&0==a[2][3]&&0==a[3][2]&&1==a[3][3]}function c(c,d,e,f,g){for(var h=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],i=0;i<4;i++)h[i][3]=g[i];for(var i=0;i<3;i++)for(var j=0;j<3;j++)h[3][i]+=c[j]*h[j][i];var k=f[0],l=f[1],m=f[2],n=f[3],o=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];o[0][0]=1-2*(l*l+m*m),o[0][1]=2*(k*l-m*n),o[0][2]=2*(k*m+l*n),o[1][0]=2*(k*l+m*n),o[1][1]=1-2*(k*k+m*m),o[1][2]=2*(l*m-k*n),o[2][0]=2*(k*m-l*n),o[2][1]=2*(l*m+k*n),o[2][2]=1-2*(k*k+l*l),h=a(h,o);var p=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];e[2]&&(p[2][1]=e[2],h=a(h,p)),e[1]&&(p[2][1]=0,p[2][0]=e[0],h=a(h,p)),e[0]&&(p[2][0]=0,p[1][0]=e[0],h=a(h,p));for(var i=0;i<3;i++)for(var j=0;j<3;j++)h[i][j]*=d[i];return b(h)?[h[0][0],h[0][1],h[1][0],h[1][1],h[3][0],h[3][1]]:h[0].concat(h[1],h[2],h[3])}return c}();a.composeMatrix=e,a.quat=d}(d),function(a,b,c){a.sequenceNumber=0;var d=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type="finish",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()};b.Animation=function(b){this.id="",b&&b._id&&(this.id=b._id),this._sequenceNumber=a.sequenceNumber++,this._currentTime=0,this._startTime=null,this._paused=!1,this._playbackRate=1,this._inTimeline=!0,this._finishedFlag=!0,this.onfinish=null,this._finishHandlers=[],this._effect=b,this._inEffect=this._effect._update(0),this._idle=!0,this._currentTimePending=!1},b.Animation.prototype={_ensureAlive:function(){this.playbackRate<0&&0===this.currentTime?this._inEffect=this._effect._update(-1):this._inEffect=this._effect._update(this.currentTime),this._inTimeline||!this._inEffect&&this._finishedFlag||(this._inTimeline=!0,b.timeline._animations.push(this))},_tickCurrentTime:function(a,b){a!=this._currentTime&&(this._currentTime=a,this._isFinished&&!b&&(this._currentTime=this._playbackRate>0?this._totalDuration:0),this._ensureAlive())},get currentTime(){return this._idle||this._currentTimePending?null:this._currentTime},set currentTime(a){a=+a,isNaN(a)||(b.restart(),this._paused||null==this._startTime||(this._startTime=this._timeline.currentTime-a/this._playbackRate),this._currentTimePending=!1,this._currentTime!=a&&(this._idle&&(this._idle=!1,this._paused=!0),this._tickCurrentTime(a,!0),b.applyDirtiedAnimation(this)))},get startTime(){return this._startTime},set startTime(a){a=+a,isNaN(a)||this._paused||this._idle||(this._startTime=a,this._tickCurrentTime((this._timeline.currentTime-this._startTime)*this.playbackRate),b.applyDirtiedAnimation(this))},get playbackRate(){return this._playbackRate},set playbackRate(a){if(a!=this._playbackRate){var c=this.currentTime;this._playbackRate=a,this._startTime=null,"paused"!=this.playState&&"idle"!=this.playState&&(this._finishedFlag=!1,this._idle=!1,this._ensureAlive(),b.applyDirtiedAnimation(this)),null!=c&&(this.currentTime=c)}},get _isFinished(){return!this._idle&&(this._playbackRate>0&&this._currentTime>=this._totalDuration||this._playbackRate<0&&this._currentTime<=0)},get _totalDuration(){return this._effect._totalDuration},get playState(){return this._idle?"idle":null==this._startTime&&!this._paused&&0!=this.playbackRate||this._currentTimePending?"pending":this._paused?"paused":this._isFinished?"finished":"running"},_rewind:function(){if(this._playbackRate>=0)this._currentTime=0;else{if(!(this._totalDuration<1/0))throw new DOMException("Unable to rewind negative playback rate animation with infinite duration","InvalidStateError");this._currentTime=this._totalDuration}},play:function(){this._paused=!1,(this._isFinished||this._idle)&&(this._rewind(),this._startTime=null),this._finishedFlag=!1,this._idle=!1,this._ensureAlive(),b.applyDirtiedAnimation(this)},pause:function(){this._isFinished||this._paused||this._idle?this._idle&&(this._rewind(),this._idle=!1):this._currentTimePending=!0,this._startTime=null,this._paused=!0},finish:function(){this._idle||(this.currentTime=this._playbackRate>0?this._totalDuration:0,this._startTime=this._totalDuration-this.currentTime,this._currentTimePending=!1,b.applyDirtiedAnimation(this))},cancel:function(){this._inEffect&&(this._inEffect=!1,this._idle=!0,this._paused=!1,this._isFinished=!0,this._finishedFlag=!0,this._currentTime=0,this._startTime=null,this._effect._update(null),b.applyDirtiedAnimation(this))},reverse:function(){this.playbackRate*=-1,this.play()},addEventListener:function(a,b){"function"==typeof b&&"finish"==a&&this._finishHandlers.push(b)},removeEventListener:function(a,b){if("finish"==a){var c=this._finishHandlers.indexOf(b);c>=0&&this._finishHandlers.splice(c,1)}},_fireEvents:function(a){if(this._isFinished){if(!this._finishedFlag){var b=new d(this,this._currentTime,a),c=this._finishHandlers.concat(this.onfinish?[this.onfinish]:[]);setTimeout(function(){c.forEach(function(a){a.call(b.target,b)})},0),this._finishedFlag=!0}}else this._finishedFlag=!1},_tick:function(a,b){this._idle||this._paused||(null==this._startTime?b&&(this.startTime=a-this._currentTime/this.playbackRate):this._isFinished||this._tickCurrentTime((a-this._startTime)*this.playbackRate)),b&&(this._currentTimePending=!1,this._fireEvents(a))},get _needsTick(){return this.playState in{pending:1,running:1}||!this._finishedFlag},_targetAnimations:function(){var a=this._effect._target;return a._activeAnimations||(a._activeAnimations=[]),a._activeAnimations},_markTarget:function(){var a=this._targetAnimations();-1===a.indexOf(this)&&a.push(this)},_unmarkTarget:function(){var a=this._targetAnimations(),b=a.indexOf(this);-1!==b&&a.splice(b,1)}}}(c,d),function(a,b,c){function d(a){var b=j;j=[],a<q.currentTime&&(a=q.currentTime),q._animations.sort(e),q._animations=h(a,!0,q._animations)[0],b.forEach(function(b){b[1](a)}),g(),l=void 0}function e(a,b){return a._sequenceNumber-b._sequenceNumber}function f(){this._animations=[],this.currentTime=window.performance&&performance.now?performance.now():0}function g(){o.forEach(function(a){a()}),o.length=0}function h(a,c,d){p=!0,n=!1,b.timeline.currentTime=a,m=!1;var e=[],f=[],g=[],h=[];return d.forEach(function(b){b._tick(a,c),b._inEffect?(f.push(b._effect),b._markTarget()):(e.push(b._effect),b._unmarkTarget()),b._needsTick&&(m=!0);var d=b._inEffect||b._needsTick;b._inTimeline=d,d?g.push(b):h.push(b)}),o.push.apply(o,e),o.push.apply(o,f),m&&requestAnimationFrame(function(){}),p=!1,[g,h]}var i=window.requestAnimationFrame,j=[],k=0;window.requestAnimationFrame=function(a){var b=k++;return 0==j.length&&i(d),j.push([b,a]),b},window.cancelAnimationFrame=function(a){j.forEach(function(b){b[0]==a&&(b[1]=function(){})})},f.prototype={_play:function(c){c._timing=a.normalizeTimingInput(c.timing);var d=new b.Animation(c);return d._idle=!1,d._timeline=this,this._animations.push(d),b.restart(),b.applyDirtiedAnimation(d),d}};var l=void 0,m=!1,n=!1;b.restart=function(){return m||(m=!0,requestAnimationFrame(function(){}),n=!0),n},b.applyDirtiedAnimation=function(a){if(!p){a._markTarget();var c=a._targetAnimations();c.sort(e),h(b.timeline.currentTime,!1,c.slice())[1].forEach(function(a){var b=q._animations.indexOf(a);-1!==b&&q._animations.splice(b,1)}),g()}};var o=[],p=!1,q=new f;b.timeline=q}(c,d),function(a,b){function c(a,b){for(var c=0,d=0;d<a.length;d++)c+=a[d]*b[d];return c}function d(a,b){return[a[0]*b[0]+a[4]*b[1]+a[8]*b[2]+a[12]*b[3],a[1]*b[0]+a[5]*b[1]+a[9]*b[2]+a[13]*b[3],a[2]*b[0]+a[6]*b[1]+a[10]*b[2]+a[14]*b[3],a[3]*b[0]+a[7]*b[1]+a[11]*b[2]+a[15]*b[3],a[0]*b[4]+a[4]*b[5]+a[8]*b[6]+a[12]*b[7],a[1]*b[4]+a[5]*b[5]+a[9]*b[6]+a[13]*b[7],a[2]*b[4]+a[6]*b[5]+a[10]*b[6]+a[14]*b[7],a[3]*b[4]+a[7]*b[5]+a[11]*b[6]+a[15]*b[7],a[0]*b[8]+a[4]*b[9]+a[8]*b[10]+a[12]*b[11],a[1]*b[8]+a[5]*b[9]+a[9]*b[10]+a[13]*b[11],a[2]*b[8]+a[6]*b[9]+a[10]*b[10]+a[14]*b[11],a[3]*b[8]+a[7]*b[9]+a[11]*b[10]+a[15]*b[11],a[0]*b[12]+a[4]*b[13]+a[8]*b[14]+a[12]*b[15],a[1]*b[12]+a[5]*b[13]+a[9]*b[14]+a[13]*b[15],a[2]*b[12]+a[6]*b[13]+a[10]*b[14]+a[14]*b[15],a[3]*b[12]+a[7]*b[13]+a[11]*b[14]+a[15]*b[15]]}function e(a){var b=a.rad||0;return((a.deg||0)/360+(a.grad||0)/400+(a.turn||0))*(2*Math.PI)+b}function f(a){switch(a.t){case"rotatex":var b=e(a.d[0]);return[1,0,0,0,0,Math.cos(b),Math.sin(b),0,0,-Math.sin(b),Math.cos(b),0,0,0,0,1];case"rotatey":var b=e(a.d[0]);return[Math.cos(b),0,-Math.sin(b),0,0,1,0,0,Math.sin(b),0,Math.cos(b),0,0,0,0,1];case"rotate":case"rotatez":var b=e(a.d[0]);return[Math.cos(b),Math.sin(b),0,0,-Math.sin(b),Math.cos(b),0,0,0,0,1,0,0,0,0,1];case"rotate3d":var c=a.d[0],d=a.d[1],f=a.d[2],b=e(a.d[3]),g=c*c+d*d+f*f;if(0===g)c=1,d=0,f=0;else if(1!==g){var h=Math.sqrt(g);c/=h,d/=h,f/=h}var i=Math.sin(b/2),j=i*Math.cos(b/2),k=i*i;return[1-2*(d*d+f*f)*k,2*(c*d*k+f*j),2*(c*f*k-d*j),0,2*(c*d*k-f*j),1-2*(c*c+f*f)*k,2*(d*f*k+c*j),0,2*(c*f*k+d*j),2*(d*f*k-c*j),1-2*(c*c+d*d)*k,0,0,0,0,1];case"scale":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,1,0,0,0,0,1];case"scalex":return[a.d[0],0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];case"scaley":return[1,0,0,0,0,a.d[0],0,0,0,0,1,0,0,0,0,1];case"scalez":return[1,0,0,0,0,1,0,0,0,0,a.d[0],0,0,0,0,1];case"scale3d":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,a.d[2],0,0,0,0,1];case"skew":var l=e(a.d[0]),m=e(a.d[1]);return[1,Math.tan(m),0,0,Math.tan(l),1,0,0,0,0,1,0,0,0,0,1];case"skewx":var b=e(a.d[0]);return[1,0,0,0,Math.tan(b),1,0,0,0,0,1,0,0,0,0,1];case"skewy":var b=e(a.d[0]);return[1,Math.tan(b),0,0,0,1,0,0,0,0,1,0,0,0,0,1];case"translate":var c=a.d[0].px||0,d=a.d[1].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,d,0,1];case"translatex":var c=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,0,0,1];case"translatey":var d=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,d,0,1];case"translatez":var f=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,f,1];case"translate3d":var c=a.d[0].px||0,d=a.d[1].px||0,f=a.d[2].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,d,f,1];case"perspective":return[1,0,0,0,0,1,0,0,0,0,1,a.d[0].px?-1/a.d[0].px:0,0,0,0,1];case"matrix":return[a.d[0],a.d[1],0,0,a.d[2],a.d[3],0,0,0,0,1,0,a.d[4],a.d[5],0,1];case"matrix3d":return a.d}}function g(a){return 0===a.length?[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]:a.map(f).reduce(d)}function h(a){return[i(g(a))]}var i=function(){function a(a){return a[0][0]*a[1][1]*a[2][2]+a[1][0]*a[2][1]*a[0][2]+a[2][0]*a[0][1]*a[1][2]-a[0][2]*a[1][1]*a[2][0]-a[1][2]*a[2][1]*a[0][0]-a[2][2]*a[0][1]*a[1][0]}function b(b){for(var c=1/a(b),d=b[0][0],e=b[0][1],f=b[0][2],g=b[1][0],h=b[1][1],i=b[1][2],j=b[2][0],k=b[2][1],l=b[2][2],m=[[(h*l-i*k)*c,(f*k-e*l)*c,(e*i-f*h)*c,0],[(i*j-g*l)*c,(d*l-f*j)*c,(f*g-d*i)*c,0],[(g*k-h*j)*c,(j*e-d*k)*c,(d*h-e*g)*c,0]],n=[],o=0;o<3;o++){for(var p=0,q=0;q<3;q++)p+=b[3][q]*m[q][o];n.push(p)}return n.push(1),m.push(n),m}function d(a){return[[a[0][0],a[1][0],a[2][0],a[3][0]],[a[0][1],a[1][1],a[2][1],a[3][1]],[a[0][2],a[1][2],a[2][2],a[3][2]],[a[0][3],a[1][3],a[2][3],a[3][3]]]}function e(a,b){for(var c=[],d=0;d<4;d++){for(var e=0,f=0;f<4;f++)e+=a[f]*b[f][d];c.push(e)}return c}function f(a){var b=g(a);return[a[0]/b,a[1]/b,a[2]/b]}function g(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])}function h(a,b,c,d){return[c*a[0]+d*b[0],c*a[1]+d*b[1],c*a[2]+d*b[2]]}function i(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function j(j){var k=[j.slice(0,4),j.slice(4,8),j.slice(8,12),j.slice(12,16)];if(1!==k[3][3])return null;for(var l=[],m=0;m<4;m++)l.push(k[m].slice());for(var m=0;m<3;m++)l[m][3]=0;if(0===a(l))return null;var n,o=[];k[0][3]||k[1][3]||k[2][3]?(o.push(k[0][3]),o.push(k[1][3]),o.push(k[2][3]),o.push(k[3][3]),n=e(o,d(b(l)))):n=[0,0,0,1];var p=k[3].slice(0,3),q=[];q.push(k[0].slice(0,3));var r=[];r.push(g(q[0])),q[0]=f(q[0]);var s=[];q.push(k[1].slice(0,3)),s.push(c(q[0],q[1])),q[1]=h(q[1],q[0],1,-s[0]),r.push(g(q[1])),q[1]=f(q[1]),s[0]/=r[1],q.push(k[2].slice(0,3)),s.push(c(q[0],q[2])),q[2]=h(q[2],q[0],1,-s[1]),s.push(c(q[1],q[2])),q[2]=h(q[2],q[1],1,-s[2]),r.push(g(q[2])),q[2]=f(q[2]),s[1]/=r[2],s[2]/=r[2];var t=i(q[1],q[2]);if(c(q[0],t)<0)for(var m=0;m<3;m++)r[m]*=-1,q[m][0]*=-1,q[m][1]*=-1,q[m][2]*=-1;var u,v,w=q[0][0]+q[1][1]+q[2][2]+1;return w>1e-4?(u=.5/Math.sqrt(w),v=[(q[2][1]-q[1][2])*u,(q[0][2]-q[2][0])*u,(q[1][0]-q[0][1])*u,.25/u]):q[0][0]>q[1][1]&&q[0][0]>q[2][2]?(u=2*Math.sqrt(1+q[0][0]-q[1][1]-q[2][2]),v=[.25*u,(q[0][1]+q[1][0])/u,(q[0][2]+q[2][0])/u,(q[2][1]-q[1][2])/u]):q[1][1]>q[2][2]?(u=2*Math.sqrt(1+q[1][1]-q[0][0]-q[2][2]),v=[(q[0][1]+q[1][0])/u,.25*u,(q[1][2]+q[2][1])/u,(q[0][2]-q[2][0])/u]):(u=2*Math.sqrt(1+q[2][2]-q[0][0]-q[1][1]),v=[(q[0][2]+q[2][0])/u,(q[1][2]+q[2][1])/u,.25*u,(q[1][0]-q[0][1])/u]),[p,r,s,v,n]}return j}();a.dot=c,a.makeMatrixDecomposition=h,a.transformListToMatrix=g}(d),function(a){function b(a,b){var c=a.exec(b);if(c)return c=a.ignoreCase?c[0].toLowerCase():c[0],[c,b.substr(c.length)]}function c(a,b){b=b.replace(/^\s*/,"");var c=a(b);if(c)return[c[0],c[1].replace(/^\s*/,"")]}function d(a,d,e){a=c.bind(null,a);for(var f=[];;){var g=a(e);if(!g)return[f,e];if(f.push(g[0]),e=g[1],!(g=b(d,e))||""==g[1])return[f,e];e=g[1]}}function e(a,b){for(var c=0,d=0;d<b.length&&(!/\s|,/.test(b[d])||0!=c);d++)if("("==b[d])c++;else if(")"==b[d]&&(c--,0==c&&d++,c<=0))break;var e=a(b.substr(0,d));return void 0==e?void 0:[e,b.substr(d)]}function f(a,b){for(var c=a,d=b;c&&d;)c>d?c%=d:d%=c;return c=a*b/(c+d)}function g(a){return function(b){var c=a(b);return c&&(c[0]=void 0),c}}function h(a,b){return function(c){return a(c)||[b,c]}}function i(b,c){for(var d=[],e=0;e<b.length;e++){var f=a.consumeTrimmed(b[e],c);if(!f||""==f[0])return;void 0!==f[0]&&d.push(f[0]),c=f[1]}if(""==c)return d}function j(a,b,c,d,e){for(var g=[],h=[],i=[],j=f(d.length,e.length),k=0;k<j;k++){var l=b(d[k%d.length],e[k%e.length]);if(!l)return;g.push(l[0]),h.push(l[1]),i.push(l[2])}return[g,h,function(b){var d=b.map(function(a,b){return i[b](a)}).join(c);return a?a(d):d}]}function k(a,b,c){for(var d=[],e=[],f=[],g=0,h=0;h<c.length;h++)if("function"==typeof c[h]){var i=c[h](a[g],b[g++]);d.push(i[0]),e.push(i[1]),f.push(i[2])}else!function(a){d.push(!1),e.push(!1),f.push(function(){return c[a]})}(h);return[d,e,function(a){for(var b="",c=0;c<a.length;c++)b+=f[c](a[c]);return b}]}a.consumeToken=b,a.consumeTrimmed=c,a.consumeRepeated=d,a.consumeParenthesised=e,a.ignore=g,a.optional=h,a.consumeList=i,a.mergeNestedRepeated=j.bind(null,null),a.mergeWrappedNestedRepeated=j,a.mergeList=k}(d),function(a){function b(b){function c(b){var c=a.consumeToken(/^inset/i,b);if(c)return d.inset=!0,c;var c=a.consumeLengthOrPercent(b);if(c)return d.lengths.push(c[0]),c;var c=a.consumeColor(b);return c?(d.color=c[0],c):void 0}var d={inset:!1,lengths:[],color:null},e=a.consumeRepeated(c,/^/,b);if(e&&e[0].length)return[d,e[1]]}function c(c){var d=a.consumeRepeated(b,/^,/,c);if(d&&""==d[1])return d[0]}function d(b,c){for(;b.lengths.length<Math.max(b.lengths.length,c.lengths.length);)b.lengths.push({px:0});for(;c.lengths.length<Math.max(b.lengths.length,c.lengths.length);)c.lengths.push({px:0});if(b.inset==c.inset&&!!b.color==!!c.color){for(var d,e=[],f=[[],0],g=[[],0],h=0;h<b.lengths.length;h++){var i=a.mergeDimensions(b.lengths[h],c.lengths[h],2==h);f[0].push(i[0]),g[0].push(i[1]),e.push(i[2])}if(b.color&&c.color){var j=a.mergeColors(b.color,c.color);f[1]=j[0],g[1]=j[1],d=j[2]}return[f,g,function(a){for(var c=b.inset?"inset ":" ",f=0;f<e.length;f++)c+=e[f](a[0][f])+" ";return d&&(c+=d(a[1])),c}]}}function e(b,c,d,e){function f(a){return{inset:a,color:[0,0,0,0],lengths:[{px:0},{px:0},{px:0},{px:0}]}}for(var g=[],h=[],i=0;i<d.length||i<e.length;i++){var j=d[i]||f(e[i].inset),k=e[i]||f(d[i].inset);g.push(j),h.push(k)}return a.mergeNestedRepeated(b,c,g,h)}var f=e.bind(null,d,", ");a.addPropertiesHandler(c,f,["box-shadow","text-shadow"])}(d),function(a,b){function c(a){return a.toFixed(3).replace(/0+$/,"").replace(/\.$/,"")}function d(a,b,c){return Math.min(b,Math.max(a,c))}function e(a){if(/^\s*[-+]?(\d*\.)?\d+\s*$/.test(a))return Number(a)}function f(a,b){return[a,b,c]}function g(a,b){if(0!=a)return i(0,1/0)(a,b)}function h(a,b){return[a,b,function(a){return Math.round(d(1,1/0,a))}]}function i(a,b){return function(e,f){return[e,f,function(e){return c(d(a,b,e))}]}}function j(a){var b=a.trim().split(/\s*[\s,]\s*/);if(0!==b.length){for(var c=[],d=0;d<b.length;d++){var f=e(b[d]);if(void 0===f)return;c.push(f)}return c}}function k(a,b){if(a.length==b.length)return[a,b,function(a){return a.map(c).join(" ")}]}function l(a,b){return[a,b,Math.round]}a.clamp=d,a.addPropertiesHandler(j,k,["stroke-dasharray"]),a.addPropertiesHandler(e,i(0,1/0),["border-image-width","line-height"]),a.addPropertiesHandler(e,i(0,1),["opacity","shape-image-threshold"]),a.addPropertiesHandler(e,g,["flex-grow","flex-shrink"]),a.addPropertiesHandler(e,h,["orphans","widows"]),a.addPropertiesHandler(e,l,["z-index"]),a.parseNumber=e,a.parseNumberList=j,a.mergeNumbers=f,a.numberToString=c}(d),function(a,b){function c(a,b){if("visible"==a||"visible"==b)return[0,1,function(c){return c<=0?a:c>=1?b:"visible"}]}a.addPropertiesHandler(String,c,["visibility"])}(d),function(a,b){function c(a){a=a.trim(),f.fillStyle="#000",f.fillStyle=a;var b=f.fillStyle;if(f.fillStyle="#fff",f.fillStyle=a,b==f.fillStyle){f.fillRect(0,0,1,1);var c=f.getImageData(0,0,1,1).data;f.clearRect(0,0,1,1);var d=c[3]/255;return[c[0]*d,c[1]*d,c[2]*d,d]}}function d(b,c){return[b,c,function(b){function c(a){return Math.max(0,Math.min(255,a))}if(b[3])for(var d=0;d<3;d++)b[d]=Math.round(c(b[d]/b[3]));return b[3]=a.numberToString(a.clamp(0,1,b[3])),"rgba("+b.join(",")+")"}]}var e=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");e.width=e.height=1;var f=e.getContext("2d");a.addPropertiesHandler(c,d,["background-color","border-bottom-color","border-left-color","border-right-color","border-top-color","color","fill","flood-color","lighting-color","outline-color","stop-color","stroke","text-decoration-color"]),a.consumeColor=a.consumeParenthesised.bind(null,c),a.mergeColors=d}(d),function(a,b){function c(a){function b(){var b=h.exec(a);g=b?b[0]:void 0}function c(){var a=Number(g);return b(),a}function d(){if("("!==g)return c();b();var a=f();return")"!==g?NaN:(b(),a)}function e(){for(var a=d();"*"===g||"/"===g;){var c=g;b();var e=d();"*"===c?a*=e:a/=e}return a}function f(){for(var a=e();"+"===g||"-"===g;){var c=g;b();var d=e();"+"===c?a+=d:a-=d}return a}var g,h=/([\+\-\w\.]+|[\(\)\*\/])/g;return b(),f()}function d(a,b){if("0"==(b=b.trim().toLowerCase())&&"px".search(a)>=0)return{px:0};if(/^[^(]*$|^calc/.test(b)){b=b.replace(/calc\(/g,"(");var d={};b=b.replace(a,function(a){return d[a]=null,"U"+a});for(var e="U("+a.source+")",f=b.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g,"N").replace(new RegExp("N"+e,"g"),"D").replace(/\s[+-]\s/g,"O").replace(/\s/g,""),g=[/N\*(D)/g,/(N|D)[*\/]N/g,/(N|D)O\1/g,/\((N|D)\)/g],h=0;h<g.length;)g[h].test(f)?(f=f.replace(g[h],"$1"),h=0):h++;if("D"==f){for(var i in d){var j=c(b.replace(new RegExp("U"+i,"g"),"").replace(new RegExp(e,"g"),"*0"));if(!isFinite(j))return;d[i]=j}return d}}}function e(a,b){return f(a,b,!0)}function f(b,c,d){var e,f=[];for(e in b)f.push(e);for(e in c)f.indexOf(e)<0&&f.push(e);return b=f.map(function(a){return b[a]||0}),c=f.map(function(a){return c[a]||0}),[b,c,function(b){var c=b.map(function(c,e){return 1==b.length&&d&&(c=Math.max(c,0)),a.numberToString(c)+f[e]}).join(" + ");return b.length>1?"calc("+c+")":c}]}var g="px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc",h=d.bind(null,new RegExp(g,"g")),i=d.bind(null,new RegExp(g+"|%","g")),j=d.bind(null,/deg|rad|grad|turn/g);a.parseLength=h,a.parseLengthOrPercent=i,a.consumeLengthOrPercent=a.consumeParenthesised.bind(null,i),a.parseAngle=j,a.mergeDimensions=f;var k=a.consumeParenthesised.bind(null,h),l=a.consumeRepeated.bind(void 0,k,/^/),m=a.consumeRepeated.bind(void 0,l,/^,/);a.consumeSizePairList=m;var n=function(a){var b=m(a);if(b&&""==b[1])return b[0]},o=a.mergeNestedRepeated.bind(void 0,e," "),p=a.mergeNestedRepeated.bind(void 0,o,",");a.mergeNonNegativeSizePair=o,a.addPropertiesHandler(n,p,["background-size"]),a.addPropertiesHandler(i,e,["border-bottom-width","border-image-width","border-left-width","border-right-width","border-top-width","flex-basis","font-size","height","line-height","max-height","max-width","outline-width","width"]),a.addPropertiesHandler(i,f,["border-bottom-left-radius","border-bottom-right-radius","border-top-left-radius","border-top-right-radius","bottom","left","letter-spacing","margin-bottom","margin-left","margin-right","margin-top","min-height","min-width","outline-offset","padding-bottom","padding-left","padding-right","padding-top","perspective","right","shape-margin","stroke-dashoffset","text-indent","top","vertical-align","word-spacing"])}(d),function(a,b){function c(b){return a.consumeLengthOrPercent(b)||a.consumeToken(/^auto/,b)}function d(b){var d=a.consumeList([a.ignore(a.consumeToken.bind(null,/^rect/)),a.ignore(a.consumeToken.bind(null,/^\(/)),a.consumeRepeated.bind(null,c,/^,/),a.ignore(a.consumeToken.bind(null,/^\)/))],b);if(d&&4==d[0].length)return d[0]}function e(b,c){return"auto"==b||"auto"==c?[!0,!1,function(d){var e=d?b:c;if("auto"==e)return"auto";var f=a.mergeDimensions(e,e);return f[2](f[0])}]:a.mergeDimensions(b,c)}function f(a){return"rect("+a+")"}var g=a.mergeWrappedNestedRepeated.bind(null,f,e,", ");a.parseBox=d,a.mergeBoxes=g,a.addPropertiesHandler(d,g,["clip"])}(d),function(a,b){function c(a){return function(b){var c=0;return a.map(function(a){return a===k?b[c++]:a})}}function d(a){return a}function e(b){if("none"==(b=b.toLowerCase().trim()))return[];for(var c,d=/\s*(\w+)\(([^)]*)\)/g,e=[],f=0;c=d.exec(b);){if(c.index!=f)return;f=c.index+c[0].length;var g=c[1],h=n[g];if(!h)return;var i=c[2].split(","),j=h[0];if(j.length<i.length)return;for(var k=[],o=0;o<j.length;o++){var p,q=i[o],r=j[o];if(void 0===(p=q?{A:function(b){return"0"==b.trim()?m:a.parseAngle(b)},N:a.parseNumber,T:a.parseLengthOrPercent,L:a.parseLength}[r.toUpperCase()](q):{a:m,n:k[0],t:l}[r]))return;k.push(p)}if(e.push({t:g,d:k}),d.lastIndex==b.length)return e}}function f(a){return a.toFixed(6).replace(".000000","")}function g(b,c){if(b.decompositionPair!==c){b.decompositionPair=c;var d=a.makeMatrixDecomposition(b)}if(c.decompositionPair!==b){c.decompositionPair=b;var e=a.makeMatrixDecomposition(c)}return null==d[0]||null==e[0]?[[!1],[!0],function(a){return a?c[0].d:b[0].d}]:(d[0].push(0),e[0].push(1),[d,e,function(b){var c=a.quat(d[0][3],e[0][3],b[5]);return a.composeMatrix(b[0],b[1],b[2],c,b[4]).map(f).join(",")}])}function h(a){return a.replace(/[xy]/,"")}function i(a){return a.replace(/(x|y|z|3d)?$/,"3d")}function j(b,c){var d=a.makeMatrixDecomposition&&!0,e=!1;if(!b.length||!c.length){b.length||(e=!0,b=c,c=[]);for(var f=0;f<b.length;f++){var j=b[f].t,k=b[f].d,l="scale"==j.substr(0,5)?1:0;c.push({t:j,d:k.map(function(a){if("number"==typeof a)return l;var b={};for(var c in a)b[c]=l;return b})})}}var m=function(a,b){return"perspective"==a&&"perspective"==b||("matrix"==a||"matrix3d"==a)&&("matrix"==b||"matrix3d"==b)},o=[],p=[],q=[];if(b.length!=c.length){if(!d)return;var r=g(b,c);o=[r[0]],p=[r[1]],q=[["matrix",[r[2]]]]}else for(var f=0;f<b.length;f++){var j,s=b[f].t,t=c[f].t,u=b[f].d,v=c[f].d,w=n[s],x=n[t];if(m(s,t)){if(!d)return;var r=g([b[f]],[c[f]]);o.push(r[0]),p.push(r[1]),q.push(["matrix",[r[2]]])}else{if(s==t)j=s;else if(w[2]&&x[2]&&h(s)==h(t))j=h(s),u=w[2](u),v=x[2](v);else{if(!w[1]||!x[1]||i(s)!=i(t)){if(!d)return;var r=g(b,c);o=[r[0]],p=[r[1]],q=[["matrix",[r[2]]]];break}j=i(s),u=w[1](u),v=x[1](v)}for(var y=[],z=[],A=[],B=0;B<u.length;B++){var C="number"==typeof u[B]?a.mergeNumbers:a.mergeDimensions,r=C(u[B],v[B]);y[B]=r[0],z[B]=r[1],A.push(r[2])}o.push(y),p.push(z),q.push([j,A])}}if(e){var D=o;o=p,p=D}return[o,p,function(a){return a.map(function(a,b){var c=a.map(function(a,c){return q[b][1][c](a)}).join(",");return"matrix"==q[b][0]&&16==c.split(",").length&&(q[b][0]="matrix3d"),q[b][0]+"("+c+")"}).join(" ")}]}var k=null,l={px:0},m={deg:0},n={matrix:["NNNNNN",[k,k,0,0,k,k,0,0,0,0,1,0,k,k,0,1],d],matrix3d:["NNNNNNNNNNNNNNNN",d],rotate:["A"],rotatex:["A"],rotatey:["A"],rotatez:["A"],rotate3d:["NNNA"],perspective:["L"],scale:["Nn",c([k,k,1]),d],scalex:["N",c([k,1,1]),c([k,1])],scaley:["N",c([1,k,1]),c([1,k])],scalez:["N",c([1,1,k])],scale3d:["NNN",d],skew:["Aa",null,d],skewx:["A",null,c([k,m])],skewy:["A",null,c([m,k])],translate:["Tt",c([k,k,l]),d],translatex:["T",c([k,l,l]),c([k,l])],translatey:["T",c([l,k,l]),c([l,k])],translatez:["L",c([l,l,k])],translate3d:["TTL",d]};a.addPropertiesHandler(e,j,["transform"]),a.transformToSvgMatrix=function(b){var c=a.transformListToMatrix(e(b));return"matrix("+f(c[0])+" "+f(c[1])+" "+f(c[4])+" "+f(c[5])+" "+f(c[12])+" "+f(c[13])+")"}}(d),function(a){function b(a){var b=Number(a);if(!(isNaN(b)||b<100||b>900||b%100!=0))return b}function c(b){return b=100*Math.round(b/100),b=a.clamp(100,900,b),400===b?"normal":700===b?"bold":String(b)}function d(a,b){return[a,b,c]}a.addPropertiesHandler(b,d,["font-weight"])}(d),function(a){function b(a){var b={};for(var c in a)b[c]=-a[c];return b}function c(b){return a.consumeToken(/^(left|center|right|top|bottom)\b/i,b)||a.consumeLengthOrPercent(b)}function d(b,d){var e=a.consumeRepeated(c,/^/,d);if(e&&""==e[1]){var f=e[0];if(f[0]=f[0]||"center",f[1]=f[1]||"center",3==b&&(f[2]=f[2]||{px:0}),f.length==b){if(/top|bottom/.test(f[0])||/left|right/.test(f[1])){var h=f[0];f[0]=f[1],f[1]=h}if(/left|right|center|Object/.test(f[0])&&/top|bottom|center|Object/.test(f[1]))return f.map(function(a){return"object"==typeof a?a:g[a]})}}}function e(d){var e=a.consumeRepeated(c,/^/,d);if(e){for(var f=e[0],h=[{"%":50},{"%":50}],i=0,j=!1,k=0;k<f.length;k++){var l=f[k];"string"==typeof l?(j=/bottom|right/.test(l),i={left:0,right:0,center:i,top:1,bottom:1}[l],h[i]=g[l],"center"==l&&i++):(j&&(l=b(l),l["%"]=(l["%"]||0)+100),h[i]=l,i++,j=!1)}return[h,e[1]]}}function f(b){var c=a.consumeRepeated(e,/^,/,b);if(c&&""==c[1])return c[0]}var g={left:{"%":0},center:{"%":50},right:{"%":100},top:{"%":0},bottom:{"%":100}},h=a.mergeNestedRepeated.bind(null,a.mergeDimensions," ");a.addPropertiesHandler(d.bind(null,3),h,["transform-origin"]),a.addPropertiesHandler(d.bind(null,2),h,["perspective-origin"]),a.consumePosition=e,a.mergeOffsetList=h;var i=a.mergeNestedRepeated.bind(null,h,", ");a.addPropertiesHandler(f,i,["background-position","object-position"])}(d),function(a){function b(b){var c=a.consumeToken(/^circle/,b);if(c&&c[0])return["circle"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),d,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\)/))],c[1]));var f=a.consumeToken(/^ellipse/,b);if(f&&f[0])return["ellipse"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),e,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\)/))],f[1]));var g=a.consumeToken(/^polygon/,b);return g&&g[0]?["polygon"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),a.optional(a.consumeToken.bind(void 0,/^nonzero\s*,|^evenodd\s*,/),"nonzero,"),a.consumeSizePairList,a.ignore(a.consumeToken.bind(void 0,/^\)/))],g[1])):void 0}function c(b,c){if(b[0]===c[0])return"circle"==b[0]?a.mergeList(b.slice(1),c.slice(1),["circle(",a.mergeDimensions," at ",a.mergeOffsetList,")"]):"ellipse"==b[0]?a.mergeList(b.slice(1),c.slice(1),["ellipse(",a.mergeNonNegativeSizePair," at ",a.mergeOffsetList,")"]):"polygon"==b[0]&&b[1]==c[1]?a.mergeList(b.slice(2),c.slice(2),["polygon(",b[1],g,")"]):void 0}var d=a.consumeParenthesised.bind(null,a.parseLengthOrPercent),e=a.consumeRepeated.bind(void 0,d,/^/),f=a.mergeNestedRepeated.bind(void 0,a.mergeDimensions," "),g=a.mergeNestedRepeated.bind(void 0,f,",");a.addPropertiesHandler(b,c,["shape-outside"])}(d),function(a,b){function c(a,b){b.concat([a]).forEach(function(b){b in document.documentElement.style&&(d[a]=b),e[b]=a})}var d={},e={};c("transform",["webkitTransform","msTransform"]),c("transformOrigin",["webkitTransformOrigin"]),c("perspective",["webkitPerspective"]),c("perspectiveOrigin",["webkitPerspectiveOrigin"]),a.propertyName=function(a){return d[a]||a},a.unprefixedPropertyName=function(a){return e[a]||a}}(d)}(),function(){if(void 0===document.createElement("div").animate([]).oncancel){var a;if(window.performance&&performance.now)var a=function(){return performance.now()};else var a=function(){return Date.now()};var b=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type="cancel",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()},c=window.Element.prototype.animate;window.Element.prototype.animate=function(d,e){var f=c.call(this,d,e);f._cancelHandlers=[],f.oncancel=null;var g=f.cancel;f.cancel=function(){g.call(this);var c=new b(this,null,a()),d=this._cancelHandlers.concat(this.oncancel?[this.oncancel]:[]);setTimeout(function(){d.forEach(function(a){a.call(c.target,c)})},0)};var h=f.addEventListener;f.addEventListener=function(a,b){"function"==typeof b&&"cancel"==a?this._cancelHandlers.push(b):h.call(this,a,b)};var i=f.removeEventListener;return f.removeEventListener=function(a,b){if("cancel"==a){var c=this._cancelHandlers.indexOf(b);c>=0&&this._cancelHandlers.splice(c,1)}else i.call(this,a,b)},f}}}(),function(a){var b=document.documentElement,c=null,d=!1;try{var e=getComputedStyle(b).getPropertyValue("opacity"),f="0"==e?"1":"0";c=b.animate({opacity:[f,f]},{duration:1}),c.currentTime=0,d=getComputedStyle(b).getPropertyValue("opacity")==f}catch(a){}finally{c&&c.cancel()}if(!d){var g=window.Element.prototype.animate;window.Element.prototype.animate=function(b,c){return window.Symbol&&Symbol.iterator&&Array.prototype.from&&b[Symbol.iterator]&&(b=Array.from(b)),Array.isArray(b)||null===b||(b=a.convertToArrayForm(b)),g.call(this,b,c)}}}(c),function(a,b,c){function d(a){var c=b.timeline;c.currentTime=a,c._discardAnimations(),0==c._animations.length?f=!1:requestAnimationFrame(d)}var e=window.requestAnimationFrame;window.requestAnimationFrame=function(a){return e(function(c){b.timeline._updateAnimationsPromises(),a(c),b.timeline._updateAnimationsPromises()})},b.AnimationTimeline=function(){this._animations=[],this.currentTime=void 0},b.AnimationTimeline.prototype={getAnimations:function(){return this._discardAnimations(),this._animations.slice()},_updateAnimationsPromises:function(){b.animationsWithPromises=b.animationsWithPromises.filter(function(a){return a._updatePromises()})},_discardAnimations:function(){this._updateAnimationsPromises(),this._animations=this._animations.filter(function(a){return"finished"!=a.playState&&"idle"!=a.playState})},_play:function(a){var c=new b.Animation(a,this);return this._animations.push(c),b.restartWebAnimationsNextTick(),c._updatePromises(),c._animation.play(),c._updatePromises(),c},play:function(a){return a&&a.remove(),this._play(a)}};var f=!1;b.restartWebAnimationsNextTick=function(){f||(f=!0,requestAnimationFrame(d))};var g=new b.AnimationTimeline;b.timeline=g;try{Object.defineProperty(window.document,"timeline",{configurable:!0,get:function(){return g}})}catch(a){}try{window.document.timeline=g}catch(a){}}(0,e),function(a,b,c){b.animationsWithPromises=[],b.Animation=function(b,c){if(this.id="",b&&b._id&&(this.id=b._id),this.effect=b,b&&(b._animation=this),!c)throw new Error("Animation with null timeline is not supported");this._timeline=c,this._sequenceNumber=a.sequenceNumber++,this._holdTime=0,this._paused=!1,this._isGroup=!1,this._animation=null,this._childAnimations=[],this._callback=null,this._oldPlayState="idle",this._rebuildUnderlyingAnimation(),this._animation.cancel(),this._updatePromises()},b.Animation.prototype={_updatePromises:function(){var a=this._oldPlayState,b=this.playState;return this._readyPromise&&b!==a&&("idle"==b?(this._rejectReadyPromise(),this._readyPromise=void 0):"pending"==a?this._resolveReadyPromise():"pending"==b&&(this._readyPromise=void 0)),this._finishedPromise&&b!==a&&("idle"==b?(this._rejectFinishedPromise(),this._finishedPromise=void 0):"finished"==b?this._resolveFinishedPromise():"finished"==a&&(this._finishedPromise=void 0)),this._oldPlayState=this.playState,this._readyPromise||this._finishedPromise},_rebuildUnderlyingAnimation:function(){this._updatePromises();var a,c,d,e,f=!!this._animation;f&&(a=this.playbackRate,c=this._paused,d=this.startTime,e=this.currentTime,this._animation.cancel(),this._animation._wrapper=null,this._animation=null),(!this.effect||this.effect instanceof window.KeyframeEffect)&&(this._animation=b.newUnderlyingAnimationForKeyframeEffect(this.effect),b.bindAnimationForKeyframeEffect(this)),(this.effect instanceof window.SequenceEffect||this.effect instanceof window.GroupEffect)&&(this._animation=b.newUnderlyingAnimationForGroup(this.effect),b.bindAnimationForGroup(this)),this.effect&&this.effect._onsample&&b.bindAnimationForCustomEffect(this),f&&(1!=a&&(this.playbackRate=a),null!==d?this.startTime=d:null!==e?this.currentTime=e:null!==this._holdTime&&(this.currentTime=this._holdTime),c&&this.pause()),this._updatePromises()},_updateChildren:function(){if(this.effect&&"idle"!=this.playState){var a=this.effect._timing.delay;this._childAnimations.forEach(function(c){this._arrangeChildren(c,a),this.effect instanceof window.SequenceEffect&&(a+=b.groupChildDuration(c.effect))}.bind(this))}},_setExternalAnimation:function(a){if(this.effect&&this._isGroup)for(var b=0;b<this.effect.children.length;b++)this.effect.children[b]._animation=a,this._childAnimations[b]._setExternalAnimation(a)},_constructChildAnimations:function(){if(this.effect&&this._isGroup){var a=this.effect._timing.delay;this._removeChildAnimations(),this.effect.children.forEach(function(c){var d=b.timeline._play(c);this._childAnimations.push(d),d.playbackRate=this.playbackRate,this._paused&&d.pause(),c._animation=this.effect._animation,this._arrangeChildren(d,a),this.effect instanceof window.SequenceEffect&&(a+=b.groupChildDuration(c))}.bind(this))}},_arrangeChildren:function(a,b){null===this.startTime?a.currentTime=this.currentTime-b/this.playbackRate:a.startTime!==this.startTime+b/this.playbackRate&&(a.startTime=this.startTime+b/this.playbackRate)},get timeline(){return this._timeline},get playState(){return this._animation?this._animation.playState:"idle"},get finished(){return window.Promise?(this._finishedPromise||(-1==b.animationsWithPromises.indexOf(this)&&b.animationsWithPromises.push(this),this._finishedPromise=new Promise(function(a,b){this._resolveFinishedPromise=function(){a(this)},this._rejectFinishedPromise=function(){b({type:DOMException.ABORT_ERR,name:"AbortError"})}}.bind(this)),"finished"==this.playState&&this._resolveFinishedPromise()),this._finishedPromise):(console.warn("Animation Promises require JavaScript Promise constructor"),null)},get ready(){return window.Promise?(this._readyPromise||(-1==b.animationsWithPromises.indexOf(this)&&b.animationsWithPromises.push(this),this._readyPromise=new Promise(function(a,b){this._resolveReadyPromise=function(){a(this)},this._rejectReadyPromise=function(){b({type:DOMException.ABORT_ERR,name:"AbortError"})}}.bind(this)),"pending"!==this.playState&&this._resolveReadyPromise()),this._readyPromise):(console.warn("Animation Promises require JavaScript Promise constructor"),null)},get onfinish(){return this._animation.onfinish},set onfinish(a){this._animation.onfinish="function"==typeof a?function(b){b.target=this,a.call(this,b)}.bind(this):a},get oncancel(){return this._animation.oncancel},set oncancel(a){this._animation.oncancel="function"==typeof a?function(b){b.target=this,a.call(this,b)}.bind(this):a},get currentTime(){this._updatePromises();var a=this._animation.currentTime;return this._updatePromises(),a},set currentTime(a){this._updatePromises(),this._animation.currentTime=isFinite(a)?a:Math.sign(a)*Number.MAX_VALUE,this._register(),this._forEachChild(function(b,c){b.currentTime=a-c}),this._updatePromises()},get startTime(){return this._animation.startTime},set startTime(a){this._updatePromises(),this._animation.startTime=isFinite(a)?a:Math.sign(a)*Number.MAX_VALUE,this._register(),this._forEachChild(function(b,c){b.startTime=a+c}),this._updatePromises()},get playbackRate(){return this._animation.playbackRate},set playbackRate(a){this._updatePromises();var b=this.currentTime;this._animation.playbackRate=a,this._forEachChild(function(b){b.playbackRate=a}),null!==b&&(this.currentTime=b),this._updatePromises()},play:function(){this._updatePromises(),this._paused=!1,this._animation.play(),-1==this._timeline._animations.indexOf(this)&&this._timeline._animations.push(this),this._register(),b.awaitStartTime(this),this._forEachChild(function(a){var b=a.currentTime;a.play(),a.currentTime=b}),this._updatePromises()},pause:function(){this._updatePromises(),this.currentTime&&(this._holdTime=this.currentTime),this._animation.pause(),this._register(),this._forEachChild(function(a){a.pause()}),this._paused=!0,this._updatePromises()},finish:function(){this._updatePromises(),this._animation.finish(),this._register(),this._updatePromises()},cancel:function(){this._updatePromises(),this._animation.cancel(),this._register(),this._removeChildAnimations(),this._updatePromises()},reverse:function(){this._updatePromises();var a=this.currentTime;this._animation.reverse(),this._forEachChild(function(a){a.reverse()}),null!==a&&(this.currentTime=a),this._updatePromises()},addEventListener:function(a,b){var c=b;"function"==typeof b&&(c=function(a){a.target=this,b.call(this,a)}.bind(this),b._wrapper=c),this._animation.addEventListener(a,c)},removeEventListener:function(a,b){this._animation.removeEventListener(a,b&&b._wrapper||b)},_removeChildAnimations:function(){for(;this._childAnimations.length;)this._childAnimations.pop().cancel()},_forEachChild:function(b){var c=0;if(this.effect.children&&this._childAnimations.length<this.effect.children.length&&this._constructChildAnimations(),this._childAnimations.forEach(function(a){b.call(this,a,c),this.effect instanceof window.SequenceEffect&&(c+=a.effect.activeDuration)}.bind(this)),"pending"!=this.playState){var d=this.effect._timing,e=this.currentTime;null!==e&&(e=a.calculateIterationProgress(a.calculateActiveDuration(d),e,d)),(null==e||isNaN(e))&&this._removeChildAnimations()}}},window.Animation=b.Animation}(c,e),function(a,b,c){function d(b){this._frames=a.normalizeKeyframes(b)}function e(){for(var a=!1;i.length;)i.shift()._updateChildren(),a=!0;return a}var f=function(a){if(a._animation=void 0,a instanceof window.SequenceEffect||a instanceof window.GroupEffect)for(var b=0;b<a.children.length;b++)f(a.children[b])};b.removeMulti=function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c];d._parent?(-1==b.indexOf(d._parent)&&b.push(d._parent),d._parent.children.splice(d._parent.children.indexOf(d),1),d._parent=null,f(d)):d._animation&&d._animation.effect==d&&(d._animation.cancel(),d._animation.effect=new KeyframeEffect(null,[]),d._animation._callback&&(d._animation._callback._animation=null),d._animation._rebuildUnderlyingAnimation(),f(d))}for(c=0;c<b.length;c++)b[c]._rebuild()},b.KeyframeEffect=function(b,c,e,f){return this.target=b,this._parent=null,e=a.numericTimingToObject(e),this._timingInput=a.cloneTimingInput(e),this._timing=a.normalizeTimingInput(e),this.timing=a.makeTiming(e,!1,this),this.timing._effect=this,"function"==typeof c?(a.deprecated("Custom KeyframeEffect","2015-06-22","Use KeyframeEffect.onsample instead."),this._normalizedKeyframes=c):this._normalizedKeyframes=new d(c),this._keyframes=c,this.activeDuration=a.calculateActiveDuration(this._timing),this._id=f,this},b.KeyframeEffect.prototype={getFrames:function(){return"function"==typeof this._normalizedKeyframes?this._normalizedKeyframes:this._normalizedKeyframes._frames},set onsample(a){if("function"==typeof this.getFrames())throw new Error("Setting onsample on custom effect KeyframeEffect is not supported.");this._onsample=a,this._animation&&this._animation._rebuildUnderlyingAnimation()},get parent(){return this._parent},clone:function(){if("function"==typeof this.getFrames())throw new Error("Cloning custom effects is not supported.");var b=new KeyframeEffect(this.target,[],a.cloneTimingInput(this._timingInput),this._id);return b._normalizedKeyframes=this._normalizedKeyframes,b._keyframes=this._keyframes,b},remove:function(){b.removeMulti([this])}};var g=Element.prototype.animate;Element.prototype.animate=function(a,c){var d="";return c&&c.id&&(d=c.id),b.timeline._play(new b.KeyframeEffect(this,a,c,d))};var h=document.createElementNS("http://www.w3.org/1999/xhtml","div");b.newUnderlyingAnimationForKeyframeEffect=function(a){if(a){var b=a.target||h,c=a._keyframes;"function"==typeof c&&(c=[]);var d=a._timingInput;d.id=a._id}else var b=h,c=[],d=0;return g.apply(b,[c,d])},b.bindAnimationForKeyframeEffect=function(a){a.effect&&"function"==typeof a.effect._normalizedKeyframes&&b.bindAnimationForCustomEffect(a)};var i=[];b.awaitStartTime=function(a){null===a.startTime&&a._isGroup&&(0==i.length&&requestAnimationFrame(e),i.push(a))};var j=window.getComputedStyle;Object.defineProperty(window,"getComputedStyle",{configurable:!0,enumerable:!0,value:function(){b.timeline._updateAnimationsPromises();var a=j.apply(this,arguments);return e()&&(a=j.apply(this,arguments)),b.timeline._updateAnimationsPromises(),a}}),window.KeyframeEffect=b.KeyframeEffect,window.Element.prototype.getAnimations=function(){return document.timeline.getAnimations().filter(function(a){return null!==a.effect&&a.effect.target==this}.bind(this))}}(c,e),function(a,b,c){function d(a){a._registered||(a._registered=!0,g.push(a),h||(h=!0,requestAnimationFrame(e)))}function e(a){var b=g;g=[],b.sort(function(a,b){return a._sequenceNumber-b._sequenceNumber}),b=b.filter(function(a){a();var b=a._animation?a._animation.playState:"idle";return"running"!=b&&"pending"!=b&&(a._registered=!1),a._registered}),g.push.apply(g,b),g.length?(h=!0,requestAnimationFrame(e)):h=!1}var f=(document.createElementNS("http://www.w3.org/1999/xhtml","div"),0);b.bindAnimationForCustomEffect=function(b){var c,e=b.effect.target,g="function"==typeof b.effect.getFrames();c=g?b.effect.getFrames():b.effect._onsample;var h=b.effect.timing,i=null;h=a.normalizeTimingInput(h);var j=function(){var d=j._animation?j._animation.currentTime:null;null!==d&&(d=a.calculateIterationProgress(a.calculateActiveDuration(h),d,h),isNaN(d)&&(d=null)),d!==i&&(g?c(d,e,b.effect):c(d,b.effect,b.effect._animation)),i=d};j._animation=b,j._registered=!1,j._sequenceNumber=f++,b._callback=j,d(j)};var g=[],h=!1;b.Animation.prototype._register=function(){this._callback&&d(this._callback)}}(c,e),function(a,b,c){function d(a){return a._timing.delay+a.activeDuration+a._timing.endDelay}function e(b,c,d){this._id=d,this._parent=null,this.children=b||[],this._reparent(this.children),c=a.numericTimingToObject(c),this._timingInput=a.cloneTimingInput(c),this._timing=a.normalizeTimingInput(c,!0),this.timing=a.makeTiming(c,!0,this),this.timing._effect=this,"auto"===this._timing.duration&&(this._timing.duration=this.activeDuration)}window.SequenceEffect=function(){e.apply(this,arguments)},window.GroupEffect=function(){e.apply(this,arguments)},e.prototype={_isAncestor:function(a){for(var b=this;null!==b;){if(b==a)return!0;b=b._parent}return!1},_rebuild:function(){for(var a=this;a;)"auto"===a.timing.duration&&(a._timing.duration=a.activeDuration),a=a._parent;this._animation&&this._animation._rebuildUnderlyingAnimation()},_reparent:function(a){b.removeMulti(a);for(var c=0;c<a.length;c++)a[c]._parent=this},_putChild:function(a,b){for(var c=b?"Cannot append an ancestor or self":"Cannot prepend an ancestor or self",d=0;d<a.length;d++)if(this._isAncestor(a[d]))throw{type:DOMException.HIERARCHY_REQUEST_ERR,name:"HierarchyRequestError",message:c};for(var d=0;d<a.length;d++)b?this.children.push(a[d]):this.children.unshift(a[d]);this._reparent(a),this._rebuild()},append:function(){this._putChild(arguments,!0)},prepend:function(){this._putChild(arguments,!1)},get parent(){return this._parent},get firstChild(){return this.children.length?this.children[0]:null},get lastChild(){return this.children.length?this.children[this.children.length-1]:null},clone:function(){for(var b=a.cloneTimingInput(this._timingInput),c=[],d=0;d<this.children.length;d++)c.push(this.children[d].clone());return this instanceof GroupEffect?new GroupEffect(c,b):new SequenceEffect(c,b)},remove:function(){b.removeMulti([this])}},window.SequenceEffect.prototype=Object.create(e.prototype),Object.defineProperty(window.SequenceEffect.prototype,"activeDuration",{get:function(){var a=0;return this.children.forEach(function(b){a+=d(b)}),Math.max(a,0)}}),window.GroupEffect.prototype=Object.create(e.prototype),Object.defineProperty(window.GroupEffect.prototype,"activeDuration",{get:function(){var a=0;return this.children.forEach(function(b){a=Math.max(a,d(b))}),a}}),b.newUnderlyingAnimationForGroup=function(c){var d,e=null,f=function(b){var c=d._wrapper;if(c&&"pending"!=c.playState&&c.effect)return null==b?void c._removeChildAnimations():0==b&&c.playbackRate<0&&(e||(e=a.normalizeTimingInput(c.effect.timing)),b=a.calculateIterationProgress(a.calculateActiveDuration(e),-1,e),isNaN(b)||null==b)?(c._forEachChild(function(a){a.currentTime=-1}),void c._removeChildAnimations()):void 0},g=new KeyframeEffect(null,[],c._timing,c._id);return g.onsample=f,d=b.timeline._play(g)},b.bindAnimationForGroup=function(a){a._animation._wrapper=a,a._isGroup=!0,b.awaitStartTime(a),a._constructChildAnimations(),a._setExternalAnimation(a)},b.groupChildDuration=d}(c,e),b.true=a}({},function(){return this}());
//# sourceMappingURL=web-animations-next.min.js.map

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_accordion___ = __webpack_require__(32);



/* import './src/alert/';
import './src/autocomplete/';
import './src/button/';
import './src/button-group/';
import './src/calendar/';
import './src/card/';
import './src/checkbox/';
import './src/curtain/';
import './src/dropdown/';
import './src/feature/';
import './src/file/';
import './src/input/';
import './src/label-badge/';
import './src/modal/';
import './src/multiple/';
import './src/note/';
import './src/pagination/';
import './src/progress-bar/';
import './src/radio/';
import './src/range/';
import './src/spinner/';
import './src/tabs/';
import './src/tags/';
import './src/tooltip/';
 */

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_html__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__view_html__);





class AccordionClab extends __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__["a" /* Element */] {

  static get is() {
    return 'accordion-clab';
  }

  static get template() {
    return __WEBPACK_IMPORTED_MODULE_1__view_html___default.a;
  }

  static get properties() {
    return {
      title: {
        type: String,
        value: 'Title'
      },
      type: {
        type: String,
        value: ''
      },
      open: {
        type: Boolean,
        value: false,
        observer: '_animateOpenClose'
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // Preparing the animations
    let height = [{ height: '0' }, { height: 'auto' }];
    let margin = [{ 'margin-bottom': '0' }, { 'margin-bottom': '20px' }];

    this.openAccordion = new GroupEffect([new KeyframeEffect(this.$.content, height, {
      duration: 100,
      fill: 'forwards',
      direction: 'normal'
    }), new KeyframeEffect(this.$.block, margin, {
      duration: 100,
      fill: 'forwards',
      direction: 'normal'
    })]);

    this.closeAccordion = new GroupEffect([new KeyframeEffect(this.$.content, height, {
      duration: 100,
      fill: 'forwards',
      direction: 'reverse'
    }), new KeyframeEffect(this.$.block, margin, {
      duration: 100,
      fill: 'forwards',
      direction: 'reverse'
    })]);
  }

  /*----------
  	OBSERVERS
  ----------*/
  _animateOpenClose(val, old) {
    if (old != undefined) {
      if (val) {
        let player = document.timeline.play(this.openAccordion);
        this.$.block.classList.add('active');
        setTimeout(() => {
          this.$.content.classList.add('opened');
        }, 110);
      } else {
        let player = document.timeline.play(this.closeAccordion);
        this.$.block.classList.remove('active');
        this.$.content.classList.remove('opened');
      }
    }
  }

  /*----------
  	COMPUTED
  ----------*/
  _computeType(type) {
    return ['accordion-block', type].join(' ');
  }

  _toggleActive() {
    this.open = !this.open;
  }

}

customElements.define(AccordionClab.is, AccordionClab);

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_async_js__ = __webpack_require__(2);





let caseMap = __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__;

let microtask = __WEBPACK_IMPORTED_MODULE_3__utils_async_js__["a" /* microTask */];

// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
const nativeProperties = {};
let proto = HTMLElement.prototype;
while (proto) {
  let props = Object.getOwnPropertyNames(proto);
  for (let i=0; i<props.length; i++) {
    nativeProperties[props[i]] = true;
  }
  proto = Object.getPrototypeOf(proto);
}

/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @private
 */
function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    let value = model[property];
    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }
        model.__dataProto[property] = value;
      }
    }
  }
}

const PropertyAccessors = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends HTMLElement
   * @unrestricted
   */
  class PropertyAccessors extends superClass {

    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     */
    static createPropertiesForAttributes() {
      let a$ = this.observedAttributes;
      for (let i=0; i < a$.length; i++) {
        this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
      }
    }

    constructor() {
      super();
      /** @type {boolean} */
      this.__serializing;
      /** @type {number} */
      this.__dataCounter;
      /** @type {boolean} */
      this.__dataEnabled;
      /** @type {boolean} */
      this.__dataReady;
      /** @type {boolean} */
      this.__dataInvalid;
      /** @type {!Object} */
      this.__data;
      /** @type {Object} */
      this.__dataPending;
      /** @type {Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__dataProto;
      /** @type {Object} */
      this.__dataHasAccessor;
      /** @type {Object} */
      this.__dataInstanceProps;
      this._initializeProperties();
    }

    /**
     * Implements native Custom Elements `attributeChangedCallback` to
     * set an attribute value to a property via `_attributeToProperty`.
     *
     * @param {string} name Name of attribute that changed
     * @param {?string} old Old attribute value
     * @param {?string} value New attribute value
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }

    /**
     * Initializes the local storage for property accessors.
     *
     * Provided as an override point for performing any setup work prior
     * to initializing the property accessor system.
     *
     * @protected
     */
    _initializeProperties() {
      this.__serializing = false;
      this.__dataCounter = 0;
      this.__dataEnabled = false;
      this.__dataReady = false;
      this.__dataInvalid = false;
      this.__data = {};
      this.__dataPending = null;
      this.__dataOld = null;
      if (this.__dataProto) {
        this._initializeProtoProperties(this.__dataProto);
        this.__dataProto = null;
      }
      // Capture instance properties; these will be set into accessors
      // during first flush. Don't set them here, since we want
      // these to overwrite defaults/constructor assignments
      for (let p in this.__dataHasAccessor) {
        if (this.hasOwnProperty(p)) {
          this.__dataInstanceProps = this.__dataInstanceProps || {};
          this.__dataInstanceProps[p] = this[p];
          delete this[p];
        }
      }
    }

    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeProtoProperties(props) {
      for (let p in props) {
        this._setProperty(p, props[p]);
      }
    }

    /**
     * Called at ready time with bag of instance properties that overwrote
     * accessors when the element upgraded.
     *
     * The default implementation sets these properties back into the
     * setter at ready time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeInstanceProperties(props) {
      Object.assign(this, props);
    }

    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     */
    _ensureAttribute(attribute, value) {
      if (!this.hasAttribute(attribute)) {
        this._valueToNodeAttribute(this, value, attribute);
      }
    }

    /**
     * Deserializes an attribute to its associated property.
     *
     * This method calls the `_deserializeValue` method to convert the string to
     * a typed value.
     *
     * @param {string} attribute Name of attribute to deserialize.
     * @param {?string} value of the attribute.
     * @param {*=} type type to deserialize to.
     */
    _attributeToProperty(attribute, value, type) {
      // Don't deserialize back to property if currently reflecting
      if (!this.__serializing) {
        let property = caseMap.dashToCamelCase(attribute);
        this[property] = this._deserializeValue(value, type);
      }
    }

    /**
     * Serializes a property to its associated attribute.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect.
     * @param {*=} value Property value to refect.
     */
    _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = (arguments.length < 3) ? this[property] : value;
      this._valueToNodeAttribute(this, value,
        attribute || caseMap.camelToDashCase(property));
      this.__serializing = false;
    }

    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * This method calls the `_serializeValue` method to convert the typed
     * value to a string.  If the `_serializeValue` method returns `undefined`,
     * the attribute will be removed (this is the default for boolean
     * type `false`).
     *
     * @param {Element} node Element to set attribute to.
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     */
    _valueToNodeAttribute(node, value, attribute) {
      let str = this._serializeValue(value);
      if (str === undefined) {
        node.removeAttribute(attribute);
      } else {
        node.setAttribute(attribute, str);
      }
    }

    /**
     * Converts a typed JavaScript value to a string.
     *
     * This method is called by Polymer when setting JS property values to
     * HTML attributes.  Users may override this method on Polymer element
     * prototypes to provide serialization for custom types.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property value.
     */
    _serializeValue(value) {
      /* eslint-disable no-fallthrough */
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value.toString();
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch(x) {
              return '';
            }
          }

        default:
          return value != null ? value.toString() : undefined;
      }
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     * Note: The return value of `undefined` is used as a sentinel value to
     * indicate the attribute should be removed.
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     */
    _deserializeValue(value, type) {
      /**
       * @type {*}
       */
      let outValue;
      switch (type) {
        case Number:
          outValue = Number(value);
          break;

        case Boolean:
          outValue = (value !== null);
          break;

        case Object:
          try {
            outValue = JSON.parse(/** @type string */(value));
          } catch(x) {
            // allow non-JSON literals like Strings and Numbers
          }
          break;

        case Array:
          try {
            outValue = JSON.parse(/** @type string */(value));
          } catch(x) {
            outValue = null;
            console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
          }
          break;

        case Date:
          outValue = new Date(value);
          break;

        case String:
        default:
          outValue = value;
          break;
      }

      return outValue;
    }
    /* eslint-enable no-fallthrough */

    /**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.  When calling on
     * a prototype, any overwritten values are saved in `__dataProto`,
     * and it is up to the subclasser to decide how/when to set those
     * properties back into the accessor.  When calling on an instance,
     * the overwritten value is set via `_setPendingProperty`, and the
     * user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @protected
     */
    _createPropertyAccessor(property, readOnly) {
      if (!this.hasOwnProperty('__dataHasAccessor')) {
        this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
      }
      if (!this.__dataHasAccessor[property]) {
        this.__dataHasAccessor[property] = true;
        saveAccessorValue(this, property);
        Object.defineProperty(this, property, {
          /* eslint-disable valid-jsdoc */
          /** @this {PropertyAccessors} */
          get: function() {
            return this.__data[property];
          },
          /** @this {PropertyAccessors} */
          set: readOnly ? function() {} : function(value) {
            this._setProperty(property, value);
          }
          /* eslint-enable */
        });
      }
    }

    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     */
    _hasAccessor(property) {
      return this.__dataHasAccessor && this.__dataHasAccessor[property];
    }

    /**
     * Updates the local storage for a property (via `_setPendingProperty`)
     * and enqueues a `_proeprtiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @protected
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value)) {
        this._invalidateProperties();
      }
    }

    /**
     * Updates the local storage for a property, records the previous value,
     * and adds it to the set of "pending changes" that will be passed to the
     * `_propertiesChanged` callback.  This method does not enqueue the
     * `_propertiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {boolean} Returns true if the property changed
     * @protected
     */
    _setPendingProperty(property, value) {
      let old = this.__data[property];
      let changed = this._shouldPropertyChange(property, value, old);
      if (changed) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (this.__dataOld && !(property in this.__dataOld)) {
          this.__dataOld[property] = old;
        }
        this.__data[property] = value;
        this.__dataPending[property] = value;
      }
      return changed;
    }

    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     */
    _isPropertyPending(prop) {
      return Boolean(this.__dataPending && (prop in this.__dataPending));
    }

    /**
     * Marks the properties as invalid, and enqueues an async
     * `_propertiesChanged` callback.
     *
     * @protected
     */
    _invalidateProperties() {
      if (!this.__dataInvalid && this.__dataReady) {
        this.__dataInvalid = true;
        microtask.run(() => {
          if (this.__dataInvalid) {
            this.__dataInvalid = false;
            this._flushProperties();
          }
        });
      }
    }

    /**
     * Call to enable property accessor processing. Before this method is
     * called accessor values will be set but side effects are
     * queued. When called, any pending side effects occur immediately.
     * For elements, generally `connectedCallback` is a normal spot to do so.
     * It is safe to call this method multiple times as it only turns on
     * property accessors once.
     */
    _enableProperties() {
      if (!this.__dataEnabled) {
        this.__dataEnabled = true;
        if (this.__dataInstanceProps) {
          this._initializeInstanceProperties(this.__dataInstanceProps);
          this.__dataInstanceProps = null;
        }
        this.ready();
      }
    }

    /**
     * Calls the `_propertiesChanged` callback with the current set of
     * pending changes (and old values recorded when pending changes were
     * set), and resets the pending set of changes. Generally, this method
     * should not be called in user code.
     *
     *
     * @protected
     */
    _flushProperties() {
      if (this.__dataPending && this.__dataOld) {
        let changedProps = this.__dataPending;
        this.__dataPending = null;
        this.__dataCounter++;
        this._propertiesChanged(this.__data, changedProps, this.__dataOld);
        this.__dataCounter--;
      }
    }

    /**
     * Lifecycle callback called the first time properties are being flushed.
     * Prior to `ready`, all property sets through accessors are queued and
     * their effects are flushed after this method returns.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its properties initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @public
     */
    ready() {
      this.__dataReady = true;
      // Run normal flush
      this._flushProperties();
    }

    /**
     * Callback called when any properties with accessors created via
     * `_createPropertyAccessor` have been set.
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {!Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {!Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @protected
     */
    _propertiesChanged(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
    }

    /**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` for primitive types if a
     * strict equality check fails, and returns `true` for all Object/Arrays.
     * The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return (
        // Strict equality check
        (old !== value &&
         // This ensures (old==NaN, value==NaN) always returns false
         (old === old || value === value))
      );
    }

  }

  return PropertyAccessors;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyAccessors;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(1);



// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
const templateExtensions = {
  'dom-if': true,
  'dom-repeat': true
};
function wrapTemplateExtension(node) {
  let is = node.getAttribute('is');
  if (is && templateExtensions[is]) {
    let t = node;
    t.removeAttribute('is');
    node = t.ownerDocument.createElement(is);
    t.parentNode.replaceChild(node, t);
    node.appendChild(t);
    while(t.attributes.length) {
      node.setAttribute(t.attributes[0].name, t.attributes[0].value);
      t.removeAttribute(t.attributes[0].name);
    }
  }
  return node;
}

function findTemplateNode(root, nodeInfo) {
  // recursively ascend tree until we hit root
  let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
  // unwind the stack, returning the indexed node at each level
  if (parent) {
    // note: marginally faster than indexing via childNodes
    // (http://jsperf.com/childnodes-lookup)
    for (let n=parent.firstChild, i=0; n; n=n.nextSibling) {
      if (nodeInfo.parentIndex === i++) {
        return n;
      }
    }
  } else {
    return root;
  }
}

// construct `$` map (from id annotations)
function applyIdToMap(inst, map, node, nodeInfo) {
  if (nodeInfo.id) {
    map[nodeInfo.id] = node;
  }
}

// install event listeners (from event annotations)
function applyEventListener(inst, node, nodeInfo) {
  if (nodeInfo.events && nodeInfo.events.length) {
    for (let j=0, e$=nodeInfo.events, e; (j<e$.length) && (e=e$[j]); j++) {
      inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
    }
  }
}

// push configuration references at configure time
function applyTemplateContent(inst, node, nodeInfo) {
  if (nodeInfo.templateInfo) {
    node._templateInfo = nodeInfo.templateInfo;
  }
}

function createNodeEventHandler(context, eventName, methodName) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  context = context._methodHost || context;
  let handler = function(e) {
    if (context[methodName]) {
      context[methodName](e, e.detail);
    } else {
      console.warn('listener method `' + methodName + '` not defined');
    }
  };
  return handler;
}

const TemplateStamp = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */
  class TemplateStamp extends superClass {

    /**
     * Scans a template to produce template metadata.
     *
     * Template-specific metadata are stored in the object returned, and node-
     * specific metadata are stored in objects in its flattened `nodeInfoList`
     * array.  Only nodes in the template that were parsed as nodes of
     * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
     * contains an `index` (`childNodes` index in parent) and optionally
     * `parent`, which points to node info of its parent (including its index).
     *
     * The template metadata object returned from this method has the following
     * structure (many fields optional):
     *
     * ```js
     *   {
     *     // Flattened list of node metadata (for nodes that generated metadata)
     *     nodeInfoList: [
     *       {
     *         // `id` attribute for any nodes with id's for generating `$` map
     *         id: {string},
     *         // `on-event="handler"` metadata
     *         events: [
     *           {
     *             name: {string},   // event name
     *             value: {string},  // handler method name
     *           }, ...
     *         ],
     *         // Notes when the template contained a `<slot>` for shady DOM
     *         // optimization purposes
     *         hasInsertionPoint: {boolean},
     *         // For nested `<template>`` nodes, nested template metadata
     *         templateInfo: {object}, // nested template metadata
     *         // Metadata to allow efficient retrieval of instanced node
     *         // corresponding to this metadata
     *         parentInfo: {number},   // reference to parent nodeInfo>
     *         parentIndex: {number},  // index in parent's `childNodes` collection
     *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
     *       },
     *       ...
     *     ],
     *     // When true, the template had the `strip-whitespace` attribute
     *     // or was nested in a template with that setting
     *     stripWhitespace: {boolean},
     *     // For nested templates, nested template content is moved into
     *     // a document fragment stored here; this is an optimization to
     *     // avoid the cost of nested template cloning
     *     content: {DocumentFragment}
     *   }
     * ```
     *
     * This method kicks off a recursive treewalk as follows:
     *
     * ```
     *    _parseTemplate <---------------------+
     *      _parseTemplateContent              |
     *        _parseTemplateNode  <------------|--+
     *          _parseTemplateNestedTemplate --+  |
     *          _parseTemplateChildNodes ---------+
     *          _parseTemplateNodeAttributes
     *            _parseTemplateNodeAttribute
     *
     * ```
     *
     * These methods may be overridden to add custom metadata about templates
     * to either `templateInfo` or `nodeInfo`.
     *
     * Note that this method may be destructive to the template, in that
     * e.g. event annotations may be removed after being noted in the
     * template metadata.
     *
     * @param {!HTMLTemplateElement} template Template to parse
     * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
     *   template, for parsing nested templates
     * @return {!TemplateInfo} Parsed template metadata
     */
    static _parseTemplate(template, outerTemplateInfo) {
      // since a template may be re-used, memo-ize metadata
      if (!template._templateInfo) {
        let templateInfo = template._templateInfo = {};
        templateInfo.nodeInfoList = [];
        templateInfo.stripWhiteSpace =
          (outerTemplateInfo && outerTemplateInfo.stripWhiteSpace) ||
          template.hasAttribute('strip-whitespace');
        this._parseTemplateContent(template, templateInfo, {parent: null});
      }
      return template._templateInfo;
    }

    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
    }

    /**
     * Parses template node and adds template and node metadata based on
     * the current node, and its `childNodes` and `attributes`.
     *
     * This method may be overridden to add custom node or template specific
     * metadata based on this node.
     *
     * @param {Node} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted;
      let element = /** @type Element */(node);
      if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
        noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
      } else if (element.localName === 'slot') {
        // For ShadyDom optimization, indicating there is an insertion point
        templateInfo.hasInsertionPoint = true;
      }
      if (element.firstChild) {
        noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
      }
      if (element.hasAttributes && element.hasAttributes()) {
        noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
      }
      return noted;
    }

    /**
     * Parses template child nodes for the given root node.
     *
     * This method also wraps whitelisted legacy template extensions
     * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
     * wrappers, collapses text nodes, and strips whitespace from the template
     * if the `templateInfo.stripWhitespace` setting was provided.
     *
     * @param {Node} root Root node whose `childNodes` will be parsed
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     */
    static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
      for (let node=root.firstChild, parentIndex=0, next; node; node=next) {
        // Wrap templates
        if (node.localName == 'template') {
          node = wrapTemplateExtension(node);
        }
        // collapse adjacent textNodes: fixes an IE issue that can cause
        // text nodes to be inexplicably split =(
        // note that root.normalize() should work but does not so we do this
        // manually.
        next = node.nextSibling;
        if (node.nodeType === Node.TEXT_NODE) {
          let /** Node */ n = next;
          while (n && (n.nodeType === Node.TEXT_NODE)) {
            node.textContent += n.textContent;
            next = n.nextSibling;
            root.removeChild(n);
            n = next;
          }
          // optionally strip whitespace
          if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
            root.removeChild(node);
            continue;
          }
        }
        let childInfo = { parentIndex, parentInfo: nodeInfo };
        if (this._parseTemplateNode(node, templateInfo, childInfo)) {
          childInfo.infoIndex = templateInfo.nodeInfoList.push(/** @type {!NodeInfo} */(childInfo)) - 1;
        }
        // Increment if not removed
        if (node.parentNode) {
          parentIndex++;
        }
      }
    }

    /**
     * Parses template content for the given nested `<template>`.
     *
     * Nested template info is stored as `templateInfo` in the current node's
     * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
     * It will then be the responsibility of the host to set it back to the
     * template and for users stamping nested templates to use the
     * `_contentForTemplate` method to retrieve the content for this template
     * (an optimization to avoid the cost of cloning nested template content).
     *
     * @param {HTMLTemplateElement} node Node to parse (a <template>)
     * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
     *   that includes the template `node`
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
      let templateInfo = this._parseTemplate(node, outerTemplateInfo);
      let content = templateInfo.content =
        node.content.ownerDocument.createDocumentFragment();
      content.appendChild(node.content);
      nodeInfo.templateInfo = templateInfo;
      return true;
    }

    /**
     * Parses template node attributes and adds node metadata to `nodeInfo`
     * for nodes of interest.
     *
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
      // Make copy of original attribute list, since the order may change
      // as attributes are added and removed
      let noted = false;
      let attrs = Array.from(node.attributes);
      for (let i=attrs.length-1, a; (a=attrs[i]); i--) {
        noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
      }
      return noted;
    }

    /**
     * Parses a single template node attribute and adds node metadata to
     * `nodeInfo` for attributes of interest.
     *
     * This implementation adds metadata for `on-event="handler"` attributes
     * and `id` attributes.
     *
     * @param {Element} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      // events (on-*)
      if (name.slice(0, 3) === 'on-') {
        node.removeAttribute(name);
        nodeInfo.events = nodeInfo.events || [];
        nodeInfo.events.push({
          name: name.slice(3),
          value
        });
        return true;
      }
      // static id
      else if (name === 'id') {
        nodeInfo.id = value;
        return true;
      }
      return false;
    }

    /**
     * Returns the `content` document fragment for a given template.
     *
     * For nested templates, Polymer performs an optimization to cache nested
     * template content to avoid the cost of cloning deeply nested templates.
     * This method retrieves the cached content for a given template.
     *
     * @param {HTMLTemplateElement} template Template to retrieve `content` for
     * @return {DocumentFragment} Content fragment
     */
    static _contentForTemplate(template) {
      let templateInfo = /** @type {HTMLTemplateElementWithInfo} */ (template)._templateInfo;
      return (templateInfo && templateInfo.content) || template.content;
    }

    /**
     * Clones the provided template content and returns a document fragment
     * containing the cloned dom.
     *
     * The template is parsed (once and memoized) using this library's
     * template parsing features, and provides the following value-added
     * features:
     * * Adds declarative event listeners for `on-event="handler"` attributes
     * * Generates an "id map" for all nodes with id's under `$` on returned
     *   document fragment
     * * Passes template info including `content` back to templates as
     *   `_templateInfo` (a performance optimization to avoid deep template
     *   cloning)
     *
     * Note that the memoized template parsing process is destructive to the
     * template: attributes for bindings and declarative event listeners are
     * removed after being noted in notes, and any nested `<template>.content`
     * is removed and stored in notes as well.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     */
    _stampTemplate(template) {
      // Polyfill support: bootstrap the template if it has not already been
      if (template && !template.content &&
          window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(template);
      }
      let templateInfo = this.constructor._parseTemplate(template);
      let nodeInfo = templateInfo.nodeInfoList;
      let content = templateInfo.content || template.content;
      let dom = /** @type DocumentFragment */ (document.importNode(content, true));
      // NOTE: ShadyDom optimization indicating there is an insertion point
      dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
      let nodes = dom.nodeList = new Array(nodeInfo.length);
      dom.$ = {};
      for (let i=0, l=nodeInfo.length, info; (i<l) && (info=nodeInfo[i]); i++) {
        let node = nodes[i] = findTemplateNode(dom, info);
        applyIdToMap(this, dom.$, node, info);
        applyTemplateContent(this, node, info);
        applyEventListener(this, node, info);
      }
      return /** @type {!StampedTemplate} */(dom);
    }

    /**
     * Adds an event listener by method name for the event provided.
     *
     * This method generates a handler function that looks up the method
     * name at handling time.
     *
     * @param {Node} node Node to add listener on
     * @param {string} eventName Name of event
     * @param {string} methodName Name of method
     * @param {*=} context Context the method will be called on (defaults
     *   to `node`)
     * @return {Function} Generated handler function
     */
    _addMethodEventListenerToNode(node, eventName, methodName, context) {
      context = context || node;
      let handler = createNodeEventHandler(context, eventName, methodName);
      this._addEventListenerToNode(node, eventName, handler);
      return handler;
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {Node} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {Function} handler Listener function to add
     */
    _addEventListenerToNode(node, eventName, handler) {
      node.addEventListener(eventName, handler);
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {Node} node Node to remove event listener from
     * @param {string} eventName Name of event
     * @param {Function} handler Listener function to remove
     */
    _removeEventListenerFromNode(node, eventName, handler) {
      node.removeEventListener(eventName, handler);
    }

  }

  return TemplateStamp;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = TemplateStamp;



/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports) {

module.exports = "<style>\n  .accordion-title.active{\n    font-weight:600;\n  }\n  .accordion-title.active::before{\n    content:\"\\e60f\";\n  }\n</style>\n<div class=\"accordion\">\n  <div class$=\"[[_computeType(type)]]\" id=\"block\">\n    <div class=\"accordion-title\" on-click=\"_toggleActive\">\n      <span>[[title]]</span>\n    </div>\n    <div class=\"accordion-content\" id=\"content\">\n      <slot></slot>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_html__);





class DemoElement extends __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__["a" /* Element */] {

  static get is() {
    return 'demo-element';
  }

  static get template() {
    return __WEBPACK_IMPORTED_MODULE_1__template_html___default.a;
  }

  static get properties() {
    return {};
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      // Dropdown in search mode
      const ddData = [{ "name": "ciccio", "value": "ciccio" }, { "name": "puzzo raga", "value": "puzzo raga" }, { "name": "bella", "value": "bella" }, { "name": "raga", "value": "raga" }, { "name": "tutto raga", "value": "tutto raga" }, { "name": "tutto rego", "value": "tutto rego" }];
      const ddSelected = Object.assign({}, ddData[2]);
      const ddsearch = this.$.ddsearch;

      setTimeout(() => {
        ddsearch.options = ddData;
      }, 1500);
      setTimeout(() => {
        ddsearch.selected = ddSelected;
      }, 700);

      // MODAL
      this.modal1 = this.$.modalOne;
      this.modal2 = this.$.modalTwo;
      this.modal1.addEventListener('modal-primary', function () {
        alert('Clicked');
      });
      this.modal1.addEventListener('modal-secondary', function (evt) {
        evt.target.hide();
      });
      this.modal2.addEventListener('modal-primary', function () {
        alert('Clicked');
      });
      this.modal2.addEventListener('modal-secondary', function (evt) {
        evt.target.hide();
      });
      this.modal2.addEventListener('modal-warning', function (evt) {
        if (this.modal2.primaryDisabled) this.modal2.primaryDisabled = false;
      }.bind(this));
      // Calendar
      this.$.cal.options = {
        time: false,
        inputFormat: "DD/MM/YYYY"
      };
      Array.prototype.map.call(document.querySelectorAll('autocomplete-clab'), function (el) {
        el.addEventListener('change', function (evt) {
          console.log('autocomplete-clab ', evt.detail);
        });
        el.addEventListener('sendRes', function (evt) {
          console.log('autocomplete-clab ', evt.detail);
        });
        el.addEventListener('typing', function (evt) {
          console.log('autocomplete-clab typing', evt);
        });
      });
      Array.prototype.map.call(document.querySelectorAll('dropdown-clab'), function (dropdown) {
        dropdown.addEventListener('change', function (evt) {
          console.log('dropdown-clab ', evt.detail);
        });
      });
      this.$.multi.addEventListener('change', function (evt) {
        console.log('multiple-clab ', evt.detail.selected);
      });
    }, 200);

    /*var menu = document.querySelector('menu-clab');
    menu.menu = [{
      "label": "Home",
      "url": "#/home",
      "visible": false
    }, {
      "label": "Plans",
      "url": "#/plans",
      "icon": "clab-icon icon-dashboard icon"
    }, {
      "label": "Segments",
      "url": "#/segments",
      "icon": "clab-icon icon-segment icon"
    }, {
      "label": "Reports",
      "url": "#/reports",
      "icon": "clab-icon icon-analytics icon"
    }, {
      "label": "Settings",
      "url": "#/settings",
      "icon": "clab-icon icon-settings icon",
      "submenu": [{
        "label": "Showed fields",
        "url": "#/settings/fields"
      }, {
        "label": "Time zones & week",
        "url": "#/settings/timezones"
      }, {
        "label": "Do Not Disturb Policy",
        "url": "#/settings/dnd"
      }, {
        "label": "Users",
        "url": "#/settings/users"
      }]
    }];*/
  }

  _openModal1() {
    this.modal1.show();
  }

  _openModal2() {
    this.modal2.show();
  }

  _notify(evt) {
    this.$.notify.visible = true;
  }

  _fire(evt) {
    console.log('primary');
  }

  _checkboxChange(evt) {
    console.log(evt.target);
  }

  _changeCurrentHash(evt) {
    this.set('currentHash', evt.detail.href);
  }

  _dateChange(evt) {
    console.log(evt.detail);
  }

}

customElements.define(DemoElement.is, DemoElement);

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "<style>\n    .content.dark {\n        background-color: var(--bg-color);\n    }\n    .content:last-child {\n        margin-bottom: 100px;\n    }\n</style>\n  <menu-clab title-icon=\"icon-sign sign\" link=\"#/home\" current-hash=\"[[currentHash]]\" on-a-click=\"_changeCurrentHash\">\n    <span class=\"product-name\">contact<b>plan</b></span>\n\n    <div class=\"alerts\">\n        <alert-clab id=\"notify\" notify>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed, corporis a eius aliquam quasi perspiciatis consequatur\n        aliquid dolores reprehenderit quidem enim consectetur officia ducimus doloribus inventore numquam officiis voluptas.\n        </alert-clab>\n    </div>\n    </menu-clab>\n\n    <main class=\"main-content\">\n    <section class=\"icons\" style=\"font-size: 50px\">\n        <i class=\"clab-icon icon-play\"></i>\n        <i class=\"clab-icon icon-pause\"></i>\n        <i class=\"clab-icon icon-stop\"></i>\n        <i class=\"clab-icon icon-fast-backward\"></i>\n        <i class=\"clab-icon icon-backward\"></i>\n        <i class=\"clab-icon icon-forward\"></i>\n        <i class=\"clab-icon icon-fast-forward\"></i>\n        <i class=\"clab-icon icon-equal-circle\"></i>\n        <i class=\"clab-icon icon-equal-circle-full\"></i>\n        <i class=\"clab-icon icon-full-arrow-top\"></i>\n        <i class=\"clab-icon icon-full-arrow-right\"></i>\n        <i class=\"clab-icon icon-full-arrow-down\"></i>\n        <i class=\"clab-icon icon-full-arrow-left\"></i>\n    </section>\n    <section>\n        <h2>Alerts</h2>\n        <alert-clab visible type=\"primary\" primary=\"Go\" secondary=\"Cancel\">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed, corporis a eius aliquam quasi perspiciatis consequatur\n        aliquid dolores reprehenderit quidem enim consectetur officia ducimus doloribus inventore numquam officiis voluptas.\n        </alert-clab>\n        <alert-clab visible primary=\"Go\" secondary=\"Cancel\">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed, corporis a eius aliquam quasi perspiciatis consequatur\n        aliquid dolores reprehenderit quidem enim consectetur officia ducimus doloribus inventore numquam officiis voluptas.\n        </alert-clab>\n        <alert-clab visible type=\"warning\" primary=\"Go\" secondary=\"Cancel\">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed, corporis a eius aliquam quasi perspiciatis consequatur\n        aliquid dolores reprehenderit quidem enim consectetur officia ducimus doloribus inventore numquam officiis voluptas.\n        </alert-clab>\n        <alert-clab visible type=\"error\" primary=\"Go\" secondary=\"Cancel\">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed, corporis a eius aliquam quasi perspiciatis consequatur\n        aliquid dolores reprehenderit quidem enim consectetur officia ducimus doloribus inventore numquam officiis voluptas.\n        </alert-clab>\n        <alert-clab visible type=\"info\" primary=\"Go\" secondary=\"Cancel\" no-animation>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sed, corporis a eius aliquam quasi perspiciatis consequatur\n        aliquid dolores reprehenderit quidem enim consectetur officia ducimus doloribus inventore numquam officiis voluptas.\n        </alert-clab>\n\n        <button-clab on-click=\"_notify\">Show notification alert</button-clab>\n    </section>\n\n    <section>\n        <ul>\n          <li>Lorem ipsum dolor sit amet.</li>\n          <li>Ipsam eos assumenda laboriosam veritatis!</li>\n        </ul>\n    </section>\n\n    <section>\n      <h2>Searchable dropdown</h2>\n      <dropdown-clab search max-in-view=\"4\" label=\"Awesome Dropdown\" result-as-obj options='[{\"name\":\"ciccio\", \"value\":\"ciccio\"},{\"name\":\"puzzo raga\", \"value\":\"puzzo raga\"},{\"name\":\"bella\", \"value\":\"bella\"},{\"name\":\"raga\", \"value\":\"raga\"},{\"name\":\"tutto raga\", \"value\":\"tutto raga\"},{\"name\":\"tutto rego\", \"value\":\"tutto rego\"}]'\n        selected='{\"name\":\"puzzo raga\", \"value\":\"puzzo raga\"}' label-field=\"name\">\n      </dropdown-clab>\n\n      <dropdown-clab search id=\"ddsearch\" max-in-view=\"4\" label=\"Awesome Dropdown [test]\" result-as-obj label-field=\"name\">\n      </dropdown-clab>\n    </section>\n\n    <section>\n        <h2>Tables</h2>\n        <table class=\"striped-table\">\n        <tr>\n            <th>Lorem ipsum.</th>\n            <th>Quia, doloremque!</th>\n            <th>Nesciunt, odio?</th>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        </table>\n\n        <br>\n\n        <table class=\"hover-table\">\n        <tr>\n            <th>Lorem ipsum.</th>\n            <th>Quia, doloremque!</th>\n            <th>Nesciunt, odio?</th>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        <tr>\n            <td>Lorem ipsum.</td>\n            <td>Quia, doloremque!</td>\n            <td>Nesciunt, odio?</td>\n        </tr>\n        </table>\n\n        <br>\n\n        <!-- Responsive table -->\n        <div class=\"table responsive-table\">\n        <div class=\"thead\">\n            <div class=\"tr\">\n            <div class=\"th\">Table Header 1</div>\n            <div class=\"th\">Table Header 2</div>\n            <div class=\"th\">Table Header 3</div>\n            </div>\n        </div>\n        <div class=\"tbody\">\n            <div class=\"tr\">\n            <div class=\"td\" data-th=\"Table Header 1\">Division 1</div>\n            <div class=\"td\" data-th=\"Table Header 2\">Division 2</div>\n            <div class=\"td\" data-th=\"Table Header 3\">Division 3</div>\n            </div>\n        </div>\n        </div>\n    </section>\n\n    <section>\n        <h2>Accordion</h2>\n        <accordion-clab title=\"Accordion 1\">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus debitis cupiditate nisi dolore aut dolor quae officia\n        vitae ad accusamus tempora fugiat ullam molestias eius laborum hic similique beatae, officiis. Lorem ipsum dolor\n        sit amet, consectetur adipisicing elit. Necessitatibus debitis cupiditate nisi dolore aut dolor quae officia vitae\n        ad accusamus tempora fugiat ullam molestias eius laborum hic similique beatae, officiis. Lorem ipsum dolor sit\n        amet, consectetur adipisicing elit. Necessitatibus debitis cupiditate nisi dolore aut dolor quae officia vitae\n        ad accusamus tempora fugiat ullam molestias eius laborum hic similique beatae, officiis. Lorem ipsum dolor sit\n        amet, consectetur adipisicing elit. Necessitatibus debitis cupiditate nisi dolore aut dolor quae officia vitae\n        ad accusamus tempora fugiat ullam molestias eius laborum hic similique beatae, officiis.\n        </accordion-clab>\n        <accordion-clab title=\"Accordion 2\">\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus debitis cupiditate nisi dolore aut dolor quae officia\n        vitae ad accusamus tempora fugiat ullam molestias eius laborum hic similique beatae, officiis.\n        </accordion-clab>\n    </section>\n\n    <section>\n        <h2>Buttons</h2>\n        <article>\n        <button-clab>\n            Just click me\n        </button-clab>\n\n\n        <button-clab type=\"primary\">\n            Just click me\n        </button-clab>\n\n\n        <button-clab type=\"primary empty\">\n            Just click me\n        </button-clab>\n        </article>\n\n        <article>\n        <button-clab block>\n            Just click me\n        </button-clab>\n\n\n        <button-clab block size=\"small\">\n            Just click me\n        </button-clab>\n        </article>\n\n        <article>\n        <button-clab size=\"small\">\n            Just click me\n        </button-clab>\n\n\n        <button-clab size=\"small\" type=\"primary\">\n            Just click me\n        </button-clab>\n\n\n        <button-clab size=\"small\" type=\"primary empty\">\n            Just click me\n        </button-clab>\n        </article>\n\n    </section>\n\n    <section>\n        <h2>Buttons group</h2>\n        <article>\n        <group-clab options='[\"First\", \"Second\", \"Third\"]'></group-clab>\n        </article>\n\n        <article>\n        <group-clab type=\"success\" options='[\"First\", \"Second\", \"Third\"]'></group-clab>\n        </article>\n\n        <article>\n        <group-clab type=\"info\" size=\"small\" options='[\"First\", \"Second\", \"Third\"]'></group-clab>\n        </article>\n\n        <article>\n        <group-clab type=\"success\" size=\"smaller\" options='[\"First\", \"Second\", \"Third\"]'></group-clab>\n        </article>\n    </section>\n\n    <section>\n        <h2>Cards</h2>\n        <card-clab title=\"My Card\" icon=\"icon-class\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi?</p>\n        </card-clab>\n        <card-clab title=\"My Card 2\" no-actions>\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi?</p>\n        </card-clab>\n        <card-clab link='{\"text\":\"blabla\", \"href\":\"#/hearts\"}' icon=\"clab-icon icon-heart-full\" title=\"Queen of hearts\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi? With\n            a link</p>\n        </card-clab>\n    </section>\n\n    <section>\n        <h2>Features</h2>\n        <feature-clab icon-class=\"clab-icon icon-heart-full\" size=\"small\">\n        <div class=\"title\">Title</div>\n        <div class=\"text\">\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi?\n        </div>\n        </feature-clab>\n\n        <feature-clab icon-class=\"clab-icon icon-heart-full\" link=\"#\" vertical>\n        <div class=\"title\">Title</div>\n        <div class=\"text\">\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi?\n        </div>\n        </feature-clab>\n\n        <feature-clab src=\"https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?q=75&fm=jpg&s=5e57c661d0f772ce269188a6f5325708\"\n        size=\"big\">\n        <div class=\"title\">Title</div>\n        <div class=\"text\">\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi?\n        </div>\n        </feature-clab>\n\n        <feature-clab src=\"https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?q=75&fm=jpg&s=5e57c661d0f772ce269188a6f5325708\"\n        size=\"big\" vertical link=\"https://www.google.it/\" link-target=\"_blank\">\n        <div class=\"title\">Title</div>\n        <div class=\"text\">\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro expedita amet labore itaque praesentium, enim dignissimos\n            nulla recusandae incidunt laboriosam inventore alias quis officia. Quod possimus unde adipisci, vero sequi?\n        </div>\n        </feature-clab>\n    </section>\n\n    <section>\n        <h2>Spinner</h2>\n        <div style=\"display: flex;\">\n        <article style=\"position: relative; flex-grow: 1; height: 200px;\">\n            <spinner-clab visible background=\"200, 200, 200, 0.8\"></spinner-clab>\n        </article>\n        <article style=\"position: relative; flex-grow: 1; height: 200px;\">\n            <spinner-clab visible background=\"0, 0, 0, 0.9\" dark></spinner-clab>\n        </article>\n        </div>\n    </section>\n\n    <section>\n        <h2>Progress bar</h2>\n        <progress-clab value=\"42\" minimal></progress-clab>\n        <progress-clab value=\"87\" type=\"primary\"></progress-clab>\n    </section>\n\n    <section>\n        <h2>Tabs & pills</h2>\n        <tabs-clab labels='[\"All\", \"Tab 2\", \"Tab 3\", \"lorem ipsum\", \"dolor sit\", \"amet\"]' vertical centered full-width restamp>\n        <div class=\"tab-content\">\n            <div>\n            <button-clab>vai</button-clab>\n            </div>\n        </div>\n        <div class=\"tab-content\">\n            <input-clab></input-clab>\n        </div>\n        <div class=\"tab-content\">Tab 3 content</div>\n        <div class=\"tab-content\">Tab 4 content</div>\n        <div class=\"tab-content\">Tab 5 content</div>\n        <div class=\"tab-content\">Tab 6 content</div>\n        </tabs-clab>\n\n        <tabs-clab pills labels='[\"All\", \"Tab 2\", \"Tab 3\", \"lorem ipsum\", \"dolor sit\", \"amet\"]' centered full-width>\n        <div class=\"tab-content\">\n            <accordion-clab title=\"ciccio\">ciccio puzzo</accordion-clab>\n        </div>\n        <div class=\"tab-content\">\n            <input-clab></input-clab>\n        </div>\n        <div class=\"tab-content\">Tab 3 content</div>\n        <div class=\"tab-content\">Tab 4 content</div>\n        <div class=\"tab-content\">Tab 5 content</div>\n        <div class=\"tab-content\">Tab 6 content</div>\n        </tabs-clab>\n\n    </section>\n\n    <section>\n        <h2>Tooltips</h2>\n        <article>\n        <tooltip-clab type=\"primary\" wait=\"200\">\n            <button-clab class=\"tt-label\">Edit</button-clab>\n            <span class=\"tt-content\">Click to edit this block</span>\n        </tooltip-clab>\n        <tooltip-clab type=\"error\" wait=\"0\">\n            <button-clab class=\"tt-label\">Cancel</button-clab>\n            <span class=\"tt-content\">Click to cancel this block</span>\n        </tooltip-clab>\n        </article>\n        <article>\n        <tooltip-clab type=\"info\" wait=\"0\">\n            <accordion-clab class=\"tt-label\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quae inventore eveniet labore, explicabo magnam\n            voluptas, at facere hic totam obcaecati illo! Labore rerum excepturi itaque exercitationem voluptatum modi\n            cumque.\n            </accordion-clab>\n            <span class=\"tt-content\">Click to read more</span>\n        </tooltip-clab>\n        </article>\n        <article>\n        <tooltip-clab type=\"info\" wait=\"0\">\n            <span class=\"tt-label\">My Tooltip</span>\n            <span class=\"tt-content\">Click to read more</span>\n        </tooltip-clab>\n        </article>\n\n    </section>\n\n    <section>\n        <h2>Label & badges</h2>\n        <label-clab type=\"error\">\n        Just a test\n        </label-clab>\n\n        <label-clab badge>\n        42\n        </label-clab>\n    </section>\n\n    <section>\n        <h2>Autocomplete</h2>\n        <autocomplete-clab inline label=\"Normal auto-complete\" options='[{\"label\":\"ciccio\", \"value\":\"ciccio\"},{\"label\":\"puzzo raga\", \"value\":\"puzzo raga\"},{\"label\":\"bella\", \"value\":\"bella\"},{\"label\":\"raga\", \"value\":\"raga\"},{\"label\":\"tutto raga\", \"value\":\"tutto raga\"},{\"label\":\"tutto rego\", \"value\":\"tutto rego\"}]'\n        min-char=\"1\" label-size=\"larger\" type=\"success\" note-type=\"info\">\n        <span class=\"note\">Type here to get hints</span>\n        <span class=\"button\"><button-clab>hola</button-clab></span>\n        </autocomplete-clab>\n        &nbsp;\n        <autocomplete-clab label=\"AJAX auto-complete\" min-char=\"1\" filter url=\"http://localhost:4000/json\">\n        <span class=\"note\">Type here to get hints</span>\n        </autocomplete-clab>\n    </section>\n\n    <section>\n        <h2>Dropdown</h2>\n        <dropdown-clab max-in-view=\"5\" type=\"success\" note-type=\"error\" result-as-obj options='[{\"label\":\"ciccio\", \"value\":\"ciccio\"},{\"label\":\"puzzo raga\", \"value\":\"puzzo raga\"},{\"label\":\"bella\", \"value\":\"bella\"},{\"label\":\"raga\", \"value\":\"raga\"},{\"label\":\"tutto raga\", \"value\":\"tutto raga\"},{\"label\":\"tutto rego\", \"value\":\"tutto rego\"}]'\n        selected='{\"label\":\"bella\", \"value\":\"bella\"}' inline label-size=\"larger\" icon=\"icon-edit\">>\n        <span class=\"note\">This is my note</span>\n        <span class=\"button\"><button-clab>ciao</button-clab></span>\n        </dropdown-clab>\n\n\n        <dropdown-clab max-in-view=\"5\" result-as-obj inline label-size=\"larger\" icon=\"icon-edit\">\n        <span class=\"note\">This is my note</span>\n        </dropdown-clab>\n\n        <dropdown-clab max-in-view=\"3\" label=\"Awesome Dropdown\" result-as-obj options='[{\"name\":\"ciccio\", \"value\":\"ciccio\"},{\"name\":\"puzzo raga\", \"value\":\"puzzo raga\"},{\"name\":\"bella\", \"value\":\"bella\"},{\"name\":\"raga\", \"value\":\"raga\"},{\"name\":\"tutto raga\", \"value\":\"tutto raga\"},{\"name\":\"tutto rego\", \"value\":\"tutto rego\"}]'\n        label-field=\"name\">\n        <span class=\"note\">This is my note</span>\n        </dropdown-clab>\n    </section>\n\n    <section>\n        <h2>Tags</h2>\n        <article>\n        <tags-clab label=\"Add tag\" placeholder=\"rosso\" type=\"warning\">\n            <span class=\"note\">Lorem ipsum dolor sit.</span>\n        </tags-clab>\n        </article>\n        <article>\n        <div class=\"input-wrapper\">\n            <label for=\"\">Add tag</label>\n            <div class=\"input\">\n            <input type=\"text\" placeholder=\"placeholder\">\n            <button class=\"btn\">Add</button>\n            </div>\n            <div class=\"note-clab\">Lorem ipsum dolor sit.</div>\n        </div>\n        </article>\n    </section>\n\n    <section>\n        <h2>Modal</h2>\n        <button-clab id=\"openModal-one\" on-click=\"_openModal1\">\n        Open modal (content via attribute)\n        </button-clab>\n        <button-clab id=\"openModal-two\" on-click=\"_openModal2\">\n        Open modal (content via HTML)\n        </button-clab>\n\n        <modal-clab id=\"modalOne\" max-width=\"500px\" title=\"Dummy modal\" primary=\"Confirm\" secondary=\"Cancel\" content=\"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo iste rerum ea ipsam, sequi explicabo, et officiis maxime adipisci! Aliquid labore unde eum consequatur mollitia similique ducimus, dolor adipisci reiciendis?\"\n        width=\"800px\" no-actions>\n        </modal-clab>\n\n        <modal-clab id=\"modalTwo\" title=\"Dummy modal\" primary=\"Confirm\" primary-disabled secondary=\"Cancel\" warning=\"Do something\"\n        no-animation>\n        <h2>Some HTML...</h2>\n        <hr>\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo iste rerum ea ipsam, sequi explicabo, et officiis\n            maxime adipisci! Aliquid labore unde eum consequatur mollitia similique ducimus, dolor adipisci reiciendis? Lorem\n            ipsum dolor sit amet, consectetur adipisicing elit. Atque sapiente aspernatur impedit natus dolorum omnis, consectetur\n            a velit laudantium reiciendis eligendi iure repellendus ducimus provident error similique, eveniet distinctio\n            nobis modi at ea aliquam in et obcaecati! Provident expedita amet, sequi! Ab similique ullam praesentium vel\n            in officiis quidem tempora, quis est rem omnis nesciunt excepturi ipsum, deleniti voluptatum, sed voluptates\n            ipsa qui id inventore! Dolores cupiditate iusto magnam porro magni! Itaque, ea! Deleniti ab atque voluptas, obcaecati\n            corporis autem labore omnis dolores tempore enim quidem delectus incidunt odio, perferendis esse. Repellat distinctio\n            qui, tempore, nulla vel a, ipsam voluptatem, praesentium exercitationem accusamus magnam asperiores commodi voluptatibus\n            ea? Suscipit consequatur laboriosam necessitatibus ipsa cum reprehenderit quae tenetur nemo similique, dignissimos\n            ipsum. Illo quis, dolor. Distinctio explicabo, earum assumenda, incidunt quod consequuntur facilis. Numquam consequatur\n            consectetur natus dicta modi error. Quidem mollitia eius expedita, nobis, placeat recusandae necessitatibus ut\n            odit, fugiat iste a quibusdam autem quisquam ab. Quis recusandae, dignissimos expedita aliquam. Earum, distinctio\n            veniam dolorum soluta numquam obcaecati officia totam, tenetur non laboriosam harum commodi minima ut consectetur\n            illum illo reiciendis? Necessitatibus deserunt officia fuga, in ducimus provident harum incidunt quam excepturi\n            iusto corporis voluptas reiciendis ut perspiciatis soluta temporibus, nihil dolorum! Ipsum magnam est, vel alias\n            minima a ratione debitis ipsam id, possimus. Sit ad error hic doloremque fugit. Deserunt sapiente voluptatibus\n            perspiciatis, quidem ratione quo distinctio delectus dolorem quisquam asperiores fugiat esse nesciunt alias minima\n            commodi velit quis voluptate explicabo maxime cumque nam facere accusamus omnis sint. Placeat neque reprehenderit\n            ratione aperiam fuga dolorum voluptate iusto eaque quam officia cupiditate nostrum modi, voluptatum illo ullam\n            doloribus ut, sunt dolorem! Consectetur aliquid eveniet ipsum possimus at officia rem quia recusandae est vel!\n            Et earum temporibus, voluptatum dicta, velit qui voluptate illo officia perferendis accusamus voluptatem, quaerat\n            in repellat. Rem a fuga dolorem odio dolor minima rerum cupiditate, esse quam nemo officia ipsam quae, explicabo.\n            Dolorum dolorem, modi tempora. Consequuntur nostrum delectus necessitatibus nemo recusandae non pariatur totam\n            vel nisi molestiae iste eos exercitationem est odit quasi, ex excepturi molestias sint itaque, libero tenetur\n            ratione obcaecati numquam! Voluptatem minima iste dolore tempora beatae quod magnam doloremque, cum non nobis\n            odio reiciendis assumenda a distinctio harum tenetur id consectetur eligendi molestias quae eveniet! Quibusdam\n            repellendus obcaecati at dolore impedit, veritatis assumenda reiciendis odio rerum itaque ullam adipisci, repellat\n            totam iusto amet! Placeat perferendis, omnis molestiae perspiciatis architecto sed in fugit ratione rerum accusantium\n            quo facilis hic, aliquid et, consequuntur laudantium tempore excepturi ea nesciunt nam eos quod possimus tempora\n            temporibus illo. Beatae, officia, rerum. Hic nobis sapiente, dolor maiores reprehenderit dignissimos repudiandae\n            ex culpa? Neque harum cupiditate laudantium cum nesciunt exercitationem praesentium iure qui est ipsa aliquid\n            dolorem ducimus facilis perferendis beatae dolore aliquam explicabo placeat nulla, aspernatur dignissimos suscipit\n            fugiat autem incidunt! Accusantium sed at repellendus iure inventore velit nobis nemo porro qui unde. Exercitationem\n            veritatis quibusdam, amet id. Alias consectetur, laudantium dolores, inventore eum nemo, voluptatibus vel autem\n            ab accusantium corrupti. Repellendus harum, quam sed, ullam distinctio consequatur quisquam!</p>\n        <p>\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse dignissimos natus blanditiis, nemo quibusdam eos adipisci,\n            quas doloribus accusantium maxime. Maiores sapiente provident sed esse facilis, placeat neque eum quos architecto!\n            Tempora, culpa nobis ipsa a voluptatibus alias laborum iure iste temporibus, tenetur eum reiciendis nihil rerum\n            est esse! Vitae ipsum, voluptatem quos ratione officiis soluta facere debitis enim est asperiores rem cupiditate\n            architecto necessitatibus amet consequatur! Culpa sunt exercitationem nihil. Accusantium dolor laudantium deserunt.\n            Ratione voluptatum ipsam eaque esse dolore, debitis ipsa, beatae error tenetur voluptate ea in. Cum perferendis\n            temporibus numquam error dolorem doloremque autem, omnis facilis ducimus!\n        </p>\n        <ul>\n            <li>ksbdfkbsdf</li>\n            <li>sdfbgsdfgsdfg</li>\n            <li>sdfgsdfgsdfg</li>\n        </ul>\n        </modal-clab>\n    </section>\n\n    <section>\n        <h2>Pagination</h2>\n        <pagination-clab tot=\"20\"></pagination-clab>\n    </section>\n\n    <section>\n        <h2>Multiple</h2>\n        <multiple-clab label=\"Select multiple options\" max-in-view=\"10\" id=\"multi\"\n        options='[{\"label\":\"ciccio\", \"value\":\"ciccio\"},{\"label\":\"puzzo raga\", \"value\":\"puzzo raga\"},{\"label\":\"bella\", \"value\":\"bella\"},{\"label\":\"raga\", \"value\":\"raga\"},{\"label\":\"tutto raga\", \"value\":\"tutto raga\"},{\"label\":\"tutto rego\", \"value\":\"tutto rego\"}]'\n        >\n        <span class=\"note\">This is a note</span>\n        </multiple-clab>\n    </section>\n\n    <section>\n        <h2>Row actions</h2>\n        <div class=\"row-action success\">\n        <a><i class=\"clab-icon icon-check\"></i></a>\n        </div>\n\n        <div class=\"row-action error\">\n        <a><i class=\"clab-icon icon-close\"></i></a>\n        </div>\n    </section>\n\n    <section>\n        <h2>Input</h2>\n        <input-clab value=\"ciao\" label=\"My label\" note-type=\"error\" type=\"success\">\n        <span class=\"note\">A simple input component</span>\n        </input-clab>\n        <input-clab value=\"ciao\" icon=\"icon-edit\">\n        <span class=\"note\">A simple input component</span>\n        </input-clab>\n\n        <input-clab value=\"ciao\" label=\"Input with buttons\">\n        <span class=\"note\">A simple note</span>\n        <button-clab class=\"button\" type=\"error\">cancel</button-clab>\n        <button-clab class=\"button\" type=\"success\">save</button-clab>\n        </input-clab>\n\n        <input-clab value=\"ciao\" label=\"Input inline\" inline label-size=\"small\">\n        <span class=\"note\">A simple note</span>\n        <button-clab class=\"button\" type=\"success\">ok</button-clab>\n        </input-clab>\n        <input-clab value=\"ciao\" icon=\"icon-edit\" inline>\n        <span class=\"note\">A simple note</span>\n        <button-clab class=\"button\" type=\"success\">ok</button-clab>\n        </input-clab>\n        <input-clab value=\"ciao\" label=\"Input inline\" inline label-size=\"large\" icon=\"icon-edit\">\n        <span class=\"note\">A simple note</span>\n        <button-clab class=\"button\" type=\"success\">ok</button-clab>\n        </input-clab>\n    </section>\n\n    <section>\n        <h2>Password</h2>\n        <input-clab password check value=\"ciao\" label=\"My label\"></input-clab>\n    </section>\n\n    <section>\n        <h2>Calendar</h2>\n        <calendar-clab inline id=\"cal\"></calendar-clab>\n\n        <calendar-clab label=\"Calendar not inline - ITALIAN\" options='{\"locale\": \"it\"}' type=\"info\" note-type=\"error\" on-datechange=\"_dateChange\">\n        <span class=\"note\">This is note</span>\n        </calendar-clab>\n        <calendar-clab label=\"Calendar not inline - FRENCH\" options='{\"locale\": \"fr\"}' type=\"info\" note-type=\"error\"></calendar-clab>\n    </section>\n\n    <section>\n        <h2>Range</h2>\n        <range-clab label=\"My wonderful range input label\" value=\"5\" min=\"0\" max=\"10\" step=\"1\" show-details></range-clab>\n    </section>\n\n    <section>\n        <h2>Radio</h2>\n        <radio-clab labels='[\"radio 1\", \"radio 3\", \"radio 2\"]' name=\"group1\" active=\"0\" disabled='[1]'></radio-clab>\n    </section>\n\n    <section>\n        <h2>Checkbox</h2>\n        <checkbox-clab label=\"ciao\" active on-selected-change=\"_checkboxChange\"></checkbox-clab>\n    </section>\n\n    <section>\n        <h2>Input file</h2>\n        <file-clab label=\"My wonderful file input label\" type=\"info\" note-type=\"error\">\n        <span class=\"note\">A simple input component</span>\n        </file-clab>\n    </section>\n    </main>\n"

/***/ })
/******/ ]);
//# sourceMappingURL=components.js.map