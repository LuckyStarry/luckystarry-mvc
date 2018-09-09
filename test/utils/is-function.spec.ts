import { expect } from 'chai'
import { isFunction } from '../../src/utils/is-function'

describe('/utils/is-function.ts', function() {
  it('存在 Function isFunction', function() {
    expect(typeof isFunction).to.equal('function')
  })

  it('isFunction(null) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(null)).is.false
  })

  it('isFunction(undefined) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(undefined)).is.false
  })

  it('isFunction(Object) => false', function() {
    let target = {}
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(target)).is.false
  })

  it('isFunction(Number) => false', function() {
    let target = 1
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(target)).is.false
  })

  it('isFunction(String) => false', function() {
    let target = 'This is a string'
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(target)).is.false
  })

  it('isFunction(Lambda) => true', function() {
    // tslint:disable-next-line:no-empty
    let target = () => {}
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(target)).is.true
  })

  it('isFunction(Function) => true', function() {
    // tslint:disable-next-line:no-empty
    let target = function() {}
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(target)).is.true
  })

  it('isFunction(Class) => true', function() {
    // tslint:disable-next-line:no-empty
    let target = class Test {}
    // tslint:disable-next-line:no-unused-expression
    expect(isFunction(target)).is.true
  })
})
