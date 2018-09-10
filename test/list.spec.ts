import { expect } from 'chai'
import { List } from '../src/list'

describe('/list.ts', function() {
  it('存在 Class List', function() {
    expect(typeof List).to.equal('function')
  })

  it('List 默认构造 Count = 0', function() {
    let list = new List()
    expect(list.Count).is.equal(0)
  })

  it('List 使用 Array 进行构造 Count => Array.length', function() {
    let array = new Array()
    array.push(1)
    array.push(2)
    array.push(3)
    let list = new List(array)
    expect(list.Count).is.equal(array.length)
    expect(list.Count).is.equal(3)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
  })

  it('List 使用 List 进行构造 Count => List.Count', function() {
    let array = new List()
    array.Add(1)
    array.Add(2)
    array.Add(3)
    let list = new List(array)
    expect(list.Count).is.equal(array.Count)
    expect(list.Count).is.equal(3)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
  })

  it('List.Add 可正常工作', function() {
    let list = new List<number>()
    expect(list.Count).is.equal(0)
    list.Add(1)
    list.Add(2)
    list.Add(3)
    expect(list.Count).is.equal(3)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
  })

  it('List.Add 可重复加入同一个元素', function() {
    let list = new List<number>()
    expect(list.Count).is.equal(0)
    list.Add(1)
    list.Add(2)
    list.Add(3)
    expect(list.Count).is.equal(3)
    list.Add(3)
    expect(list.Count).is.equal(4)
  })

  it('List.Insert 可正常从 0下标 插入元素', function() {
    let list = new List<number>()
    expect(list.Count).is.equal(0)
    list.Add(1)
    list.Add(2)
    list.Add(3)
    expect(list.Count).is.equal(3)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    list.Insert(0, 10000)
    expect(list.Count).is.equal(4)
    expect(list.Get(0)).is.equal(10000)
    expect(list.Get(1)).is.equal(1)
    expect(list.Get(2)).is.equal(2)
    expect(list.Get(3)).is.equal(3)
  })

  it('List.Insert 可正常从 length下标 插入元素', function() {
    let list = new List<number>()
    expect(list.Count).is.equal(0)
    list.Add(1)
    list.Add(2)
    list.Add(3)
    expect(list.Count).is.equal(3)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    list.Insert(3, 10000)
    expect(list.Count).is.equal(4)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(10000)
  })

  it('List.Contains 不存在的值返回 false', function() {
    let list = new List<number>()
    list.Add(1)
    list.Add(2)
    list.Add(3)
    // tslint:disable-next-line:no-unused-expression
    expect(list.Contains(4)).is.false
  })

  it('List.Contains 存在的键返回 true', function() {
    let list = new List<number>()
    list.Add(1)
    list.Add(2)
    list.Add(3)
    // tslint:disable-next-line:no-unused-expression
    expect(list.Contains(3)).is.true
  })

  it('List.Remove 不存在的值返回 false', function() {
    let list = new List<number>()
    list.Add(1)
    list.Add(2)
    list.Add(3)
    // tslint:disable-next-line:no-unused-expression
    expect(list.Remove(4)).is.false
  })

  it('List.Remove 存在的值返回 true', function() {
    let list = new List<number>()
    list.Add(1)
    list.Add(2)
    list.Add(3)
    // tslint:disable-next-line:no-unused-expression
    expect(list.Remove(3)).is.true
    expect(list.Count).is.equal(2)
  })

  it('List 可使用 for of 递归', function() {
    let list = new List<number>()
    list.Add(1)
    list.Add(2)
    list.Add(3)
    let count = 0
    let array = new Array<number>()
    for (let v of list) {
      count++
      array.push(v)
    }
    expect(count).is.equal(3)
    expect(array.length).is.equal(3)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })
})
