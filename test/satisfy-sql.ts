import { multilineRegExp } from './util';

export default function (chai, utils) {
  function reduceSql(val: string) {
    val = val.replace(/\s\s*/g, ' ').trim();

    return val;
  }

  chai.sql = chai.sql || {};

  chai.sql.satisfySql = function (str: string, expected: string | RegExp | RegExp[] | ((val: string) => boolean)) {
    let strReduced = reduceSql(str);

    if (typeof expected === 'function')
      return expected(strReduced);

    if (typeof expected === 'string')
      return strReduced.toLowerCase() === reduceSql(expected).toLowerCase();

    if (expected instanceof RegExp) {
      return expected.test(strReduced);
    }

    if (Array.isArray(expected)) {
      return multilineRegExp(expected, 'i').test(strReduced);
    }

    return false;
  };

  let satisfySql = function (expected) {
    let actual = this._obj;

    return this.assert(
      chai.sql.satisfySql(actual, expected),
      'expected ' + this._obj + ' to satisfy SQL ' + expected,
      'expected ' + this._obj + ' not to satisfy SQL ' + expected
    );
  };

  chai.Assertion.addChainableMethod('satisfySql', satisfySql);

  // Asserts
  let assert = chai.assert;

  assert.satisfySql = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.satisfySql(exp);
  };
}
