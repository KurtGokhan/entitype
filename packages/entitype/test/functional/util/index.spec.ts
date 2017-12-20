import { expect } from 'chai';
import { getObjectPath, setObjectPath } from '../../../src/common/util';

describe('entitype > util > setObjectPath', async () => {
  it('should be able to set existing path', async () => {
    let root = { a: { b: {} } };

    let res = setObjectPath(root, ['a', 'b', 'c'], 42, false);

    expect(res.a.b.c).to.eql(42);
  });

  it('should be able to set non-existing path', async () => {
    let root = null;

    let res = setObjectPath(root, ['a', 'b', 'c'], 42);

    expect(res.a.b.c).to.eql(42);
  });

  it('should throw on non-existing path when not ignoring missing keys', async () => {
    let root = { a: {} };

    let res = () => setObjectPath(root, ['a', 'b', 'c'], 42, false);

    expect(res).to.throw();
  });

  it('should be able to set empty path', async () => {
    let root = null;

    let res = setObjectPath(root, [], 42);

    expect(res).to.eql(42);
  });
});


describe('entitype > util > getObjectPath', async () => {
  it('should be able to get existing path', async () => {
    let root = { a: { b: { c: 42 } } };

    let res = getObjectPath(root, ['a', 'b', 'c'], false);

    expect(res).to.eql(42);
  });

  it('should be able to get non-existing path as null', async () => {
    let root = null;

    let res = getObjectPath(root, ['a', 'b', 'c']);

    expect(res).to.eql(null);
  });

  it('should throw on non-existing path when not ignoring missing keys', async () => {
    let root = { a: {} };

    let res = () => getObjectPath(root, ['a', 'b', 'c'], false);

    expect(res).to.throw();
  });

  it('should be able to get empty path', async () => {
    let root = 42;

    let res = getObjectPath(root, []);

    expect(res).to.eql(42);
  });
});
