'use strict';

var assert = require('assert');
var eql = require('deep-eql');
var nary = require('../');

describe('nary', function() {
  var add;

  beforeEach(function() {
    add = function(/* nums */) {
      return Array.prototype.slice.call(arguments).reduce(function(sum, num) {
        return sum + num;
      }, 0);
    };
  });

  it('should be a function', function() {
    assert.equal(typeof nary, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(nary.length, 2);
  });

  it('should return a new function', function() {
    assert.equal(typeof nary(2, add), 'function');
  });

  it('should set the returned function\'s arity', function() {
    assert.equal(nary(3, add).length, 3);
  });

  it('should handle large (uncached) arities', function() {
    assert.equal(nary(100, add).length, 100);
  });

  it('should gracefully handle negative arities', function() {
    assert.equal(nary(-1, add).length, 0);
  });

  it('should gracefully handle non-numeric arities', function() {
    assert.equal(nary('omg', add).length, 0);
  });

  it('should throw an error when passed a non-function', function() {
    assert.throws(function() { nary(2, 'omg'); });
  });

  it('should pass only `n` arguments to the wrapped function', function() {
    var unaryParseInt = nary(1, parseInt);

    assert(eql(
      ['1', '2', '3'].map(unaryParseInt),
      [1, 2, 3]
    ));
  });
});
