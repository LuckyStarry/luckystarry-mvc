import { expect } from 'chai'
import { Install } from '../src'

describe('初始化测试', function() {
  it('存在 Install 方法', function() {
    expect(typeof Install).to.equal('function')
  })
})
