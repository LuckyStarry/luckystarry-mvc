import 'reflect-metadata'

import { ClassPool } from './class-pool'

export function Injectable() {
  return (constructorFunction: Function) => {
    let paramTypes: Array<Function> = Reflect.getMetadata(
      'design:paramtypes',
      constructorFunction
    )
    if (ClassPool.indexOf(constructorFunction) != -1) return
    for (let val of paramTypes) {
      if (val === constructorFunction) throw new Error('不能依赖自己')
      else if (ClassPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
    }
    ClassPool.push(constructorFunction)
  }
}

export function GetService<T>(constructorFunction: {
  new (...args: Array<any>): T
}): T {
  let paramTypes: Array<Function> = Reflect.getMetadata(
    'design:paramtypes',
    constructorFunction
  )
  let paramInstance = paramTypes.map((val: Function) => {
    if (ClassPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
    else if (val.length) {
      return GetService(val as any)
    } else {
      return new (val as any)()
    }
  })
  return new constructorFunction(...paramInstance)
}
