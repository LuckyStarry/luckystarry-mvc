/* tslint:disable */
import { expect } from 'chai'
import { Controller } from '../src'
import { ActionDescriptor } from '../src/action-descriptor'
import { HttpMethod } from '../src/http-method'

describe('./action-descriptor.ts', function () {
  it('存在 ActionDescriptor', function () {
    expect(ActionDescriptor).not.null
    expect(ActionDescriptor).not.undefined
    expect(typeof ActionDescriptor).to.equal('function')
  })

  it('初始化 ActionDescriptor', function () {
    let path = '/foo'
    let action = 'bar'
    let method: HttpMethod = 'GET'
    let descriptor = null
    let actionDescriptor = new ActionDescriptor(path, FooController, action, method, descriptor)
    expect(actionDescriptor).is.not.null
    expect(actionDescriptor.Path).is.eq(path)
    expect(actionDescriptor.ActionName).is.eq(action)
    expect(actionDescriptor.Controller).is.eq(FooController)
    expect(actionDescriptor.Descriptor).is.eq(descriptor)
    expect(actionDescriptor.HttpMethod).is.eq(method)
  })
})

class FooController extends Controller {}
