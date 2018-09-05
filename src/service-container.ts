import 'reflect-metadata'

export interface ClassPool {
  indexOf(type: Function): number
  push(type: Function): void
}

export interface IServiceContainer {
  AddService<T>(type: Function)
  GetService<T>(constructorFunction: { new (...args: Array<any>): T }): T
}

export class ServiceContainer implements IServiceContainer {
  public static readonly Current: IServiceContainer = new ServiceContainer()
  private readonly classPool: ClassPool = []

  public constructor(classPool?: ClassPool) {
    this.classPool = classPool || []
  }

  public AddService<T>(type: Function) {
    let paramTypes: Array<Function> =
      Reflect.getMetadata('design:paramtypes', type) || []
    if (this.classPool.indexOf(type) !== -1) return
    for (let val of paramTypes) {
      if (val === type) {
        throw new Error('不能依赖自身')
      } else if (this.classPool.indexOf(val) === -1) {
        throw new Error(`${val}没有被注册`)
      }
    }
    this.classPool.push(type)
  }

  public GetService<T>(type: { new (...args: Array<any>): T }): T {
    let paramTypes: Array<Function> =
      Reflect.getMetadata('design:paramtypes', type) || []
    let paramInstance = paramTypes.map((val: Function) => {
      if (this.classPool.indexOf(val) === -1) {
        throw new Error(`${val}没有被注册`)
      } else {
        return new (val as any)()
      }
    })
    return new type(...paramInstance)
  }
}
