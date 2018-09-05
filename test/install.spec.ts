import { expect } from 'chai'
import { Install } from '../src/install'

describe('/install.ts', function() {
  it('存在 Function Install', function() {
    expect(typeof Install).to.equal('function')
  })
})
