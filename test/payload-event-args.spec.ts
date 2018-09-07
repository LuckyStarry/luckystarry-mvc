import http from 'http'
import { expect } from 'chai'
import { PayloadEventArgs } from '../src/payload-event-args'

describe('/http-request.ts', function() {
  it('存在 Class HttpRequest', function() {
    expect(typeof PayloadEventArgs).to.equal('function')
  })
})
