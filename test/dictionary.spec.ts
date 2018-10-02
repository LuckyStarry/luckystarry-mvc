import { expect } from 'chai'
import { Dictionary } from '../src/dictionary'

describe('/dictionary.ts', function() {
  it('存在 Class Dictionary', function() {
    expect(typeof Dictionary).to.equal('function')
  })

  it('Dictionary 默认构造 Count = 0', function() {
    let dictionary = new Dictionary()
    expect(dictionary.Count).is.equal(0)
  })

  it('Dictionary 使用 Map 进行构造 Count => Map.size', function() {
    let maps = new Map()
    maps.set('k1', 1)
    maps.set('k2', 2)
    maps.set('k3', 3)
    let dictionary = new Dictionary(maps)
    expect(dictionary.Count).is.equal(maps.size)
    expect(dictionary.Count).is.equal(3)
    expect(dictionary.Get('k1')).is.equal(1)
    expect(dictionary.Get('k2')).is.equal(2)
    expect(dictionary.Get('k3')).is.equal(3)
  })

  it('Dictionary 使用 Dictionary 进行构造 Count => Dictionary.Count', function() {
    let maps = new Dictionary()
    maps.Add('k1', 1)
    maps.Add('k2', 2)
    maps.Add('k3', 3)
    let dictionary = new Dictionary(maps)
    expect(dictionary.Count).is.equal(maps.Count)
    expect(dictionary.Count).is.equal(3)
    expect(dictionary.Get('k1')).is.equal(1)
    expect(dictionary.Get('k2')).is.equal(2)
    expect(dictionary.Get('k3')).is.equal(3)
  })

  it('Dictionary.Add 可正常工作', function() {
    let dictionary = new Dictionary<string, number>()
    expect(dictionary.Count).is.equal(0)
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    expect(dictionary.Count).is.equal(3)
    expect(dictionary.Get('k1')).is.equal(1)
    expect(dictionary.Get('k2')).is.equal(2)
    expect(dictionary.Get('k3')).is.equal(3)
  })

  it('Dictionary.Add 可重复对同一个键赋值', function() {
    let dictionary = new Dictionary<string, number>()
    expect(dictionary.Count).is.equal(0)
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    expect(dictionary.Count).is.equal(3)
    dictionary.Add('k3', 3000)
    expect(dictionary.Get('k3')).is.equal(3000)
  })

  it('Dictionary.ContainsKey 不存在的键返回 false', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.ContainsKey('k4')).is.false
  })

  it('Dictionary.ContainsKey 存在的键返回 true', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.ContainsKey('k3')).is.true
  })

  it('Dictionary.ContainsValue 不存在的值返回 false', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.ContainsValue(4)).is.false
  })

  it('Dictionary.ContainsValue 存在的值返回 true', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.ContainsValue(3)).is.true
  })

  it('Dictionary.Remove 不存在的键返回 false', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.Remove('k4')).is.false
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.Get('k4')).is.undefined
    expect(dictionary.Count).is.equal(3)
  })

  it('Dictionary.Remove 存在的键返回 true', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.Remove('k3')).is.true
    // tslint:disable-next-line:no-unused-expression
    expect(dictionary.Get('k3')).is.undefined
    expect(dictionary.Count).is.equal(2)
  })

  it('Dictionary 可使用 for of 递归', function() {
    let dictionary = new Dictionary<string, number>()
    dictionary.Add('k1', 1)
    dictionary.Add('k2', 2)
    dictionary.Add('k3', 3)
    let count = 0
    let maps = new Map<string, number>()
    for (let [k, v] of dictionary) {
      count++
      maps.set(k, v)
    }
    expect(count).is.equal(3)
    expect(maps.size).is.equal(3)
    expect(maps.get('k1')).is.equal(1)
    expect(maps.get('k2')).is.equal(2)
    expect(maps.get('k3')).is.equal(3)
  })
})
