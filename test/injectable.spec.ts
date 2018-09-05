import { expect } from 'chai'
import { Injectable } from '../src/injectable'

describe('/injectable.ts', function() {
  it('存在 Function Injectable', function() {
    expect(typeof Injectable).to.equal('function')
  })
})
