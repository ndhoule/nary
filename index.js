'use strict';

var objToString = Object.prototype.toString;

/**
 * Determine if a value is a function.
 *
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to lib
var isFunction = function(val) {
  return typeof val === 'function';
};

/**
 * Determine if a value is a number.
 *
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to lib
var isNumber = function(val) {
  var type = typeof val;
  return type === 'number' || (type === 'object' && objToString.call(val) === '[object Number]');
};

 /**
  * Creates an array of generic, numbered argument names.
  *
  * @name createParams
  * @api private
  * @param {number} n
  * @return {Array}
  * @example
  * argNames(2);
  * //=> ['arg1', 'arg2']
  */
var createParams = function createParams(n) {
  var args = [];

  for (var i = 1; i <= n; i += 1) {
    args.push('arg' + i);
  }

  return args;
};

 /**
  * Dynamically construct a wrapper function of `n` arity. Only passes `n`
  * arguments to the wrapped function.
  *
  * @name createNaryWrapper
  * @api private
  * @param {number} n
  * @return {Function(Function)}
  */
var createNaryWrapper = function createNaryWrapper(n) {
  var paramNames = createParams(n).join(', ');
  var wrapperBody = ''.concat(
    '  return function(', paramNames, ') {\n',
    '    return func.apply(this, Array.prototype.slice.call(arguments, 0, ' + n + '));\n',
    '  };'
  );

  /* eslint-disable no-new-func */
  return new Function('func', wrapperBody);
  /* eslint-enable no-new-func */
};

 /**
  * Cache common nary wrappers to avoid constructing them at runtime.
  */
var naryWrapperCache = [
  /* eslint-disable no-unused-vars */
  function(fn) {
    return function() {
      return fn.apply(this);
    };
  },

  function(fn) {
    return function(arg1) {
      return fn.apply(this, Array.prototype.slice.call(arguments, 0, 1));
    };
  },

  function(fn) {
    return function(arg1, arg2) {
      return fn.apply(this, Array.prototype.slice.call(arguments, 0, 2));
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3) {
      return fn.apply(this, Array.prototype.slice.call(arguments, 0, 3));
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3, arg4) {
      return fn.apply(this, Array.prototype.slice.call(arguments, 0, 4));
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3, arg4, arg5) {
      return fn.apply(this, Array.prototype.slice.call(arguments, 0, 5));
    };
  }
  /* eslint-enable no-unused-vars */
];

/**
 * Takes a function and an [arity](https://en.wikipedia.org/wiki/Arity) `n`, and returns a new
 * function that passes only `n` arguments to the wrapped function.
 *
 * @name nary
 * @api public
 * @category Function
 * @see {@link curry}
 * @param {Number} n The desired arity of the returned function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A function of n arity, wrapping `fn`.
 * @example
 * var add = function() {
 *   return reduce(function(sum, num) {
 *     return sum + num;
 *   }, 0, arguments);
 * };
 *
 * // Expects `n` arguments
 * var unaryAdd = nary(2, add);
 * unaryAdd.length;
 * //=> 2
 *
 * // Only passes `n` arguments to the wrapped function
 * unaryAdd(1, 2, 3, 4, 5);
 * // => 3
 */
var nary = function nary(n, func) {
  if (!isFunction(func)) {
    throw new TypeError('Expected a function but got ' + typeof func);
  }

  var _n = Math.max(isNumber(n) ? n : 0, 0);

  if (!naryWrapperCache[_n]) {
    naryWrapperCache[_n] = createNaryWrapper(_n);
  }

  return naryWrapperCache[_n](func);
};

/*
 * Exports.
 */

module.exports = nary;
