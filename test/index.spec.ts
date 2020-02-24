/* tslint:disable */
import { expect } from 'chai'
import * as mvc from '../src/index'

describe('Index', function() {
  it('存在 mvc.Controller', function() {
    expect(mvc.Controller).not.null
    expect(mvc.Controller).not.undefined
    expect(typeof mvc.Controller).to.equal('function')
  })

  it('存在 mvc.FromAuthorization', function() {
    expect(mvc.FromAuthorization).not.null
    expect(mvc.FromAuthorization).not.undefined
    expect(typeof mvc.FromAuthorization).to.equal('function')
  })

  it('存在 mvc.FromBody', function() {
    expect(mvc.FromBody).not.null
    expect(mvc.FromBody).not.undefined
    expect(typeof mvc.FromBody).to.equal('function')
  })

  it('存在 mvc.FromHeader', function() {
    expect(mvc.FromHeader).not.null
    expect(mvc.FromHeader).not.undefined
    expect(typeof mvc.FromHeader).to.equal('function')
  })

  it('存在 mvc.FromQuery', function() {
    expect(mvc.FromQuery).not.null
    expect(mvc.FromQuery).not.undefined
    expect(typeof mvc.FromQuery).to.equal('function')
  })

  it('存在 mvc.FromRoute', function() {
    expect(mvc.FromRoute).not.null
    expect(mvc.FromRoute).not.undefined
    expect(typeof mvc.FromRoute).to.equal('function')
  })
})
