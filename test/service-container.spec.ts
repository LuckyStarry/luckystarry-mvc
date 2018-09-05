import { expect, assert } from 'chai'
import {
  ServiceContainer,
  ClassPool,
  IServiceContainer
} from '../src/service-container'
import { Injectable } from '../src/injectable'

describe('/service-container.ts', function() {
  it('存在 class ServiceContainer', function() {
    expect(typeof ServiceContainer).to.equal('function')
  })

  it('ServiceContainer.Current 是常量', function() {
    expect(ServiceContainer.Current).to.equal(ServiceContainer.Current)
  })

  it('ServiceContainer.AddService 无参构造类注册不报错', function() {
    let container = new ServiceContainer()
    expect(() => {
      container.AddService(TestService)
    }).not.throw()
  })

  it('ServiceContainer.AddService 重复注册不报错', function() {
    let container = new ServiceContainer()
    container.AddService(TestService)
    expect(() => {
      container.AddService(TestService)
    }).not.throw()
  })

  it('ServiceContainer.AddService 有参构造类注册不报错', function() {
    let container = new ServiceContainer()
    expect(() => {
      container.AddService(TestService)
      container.AddService(TestBiz)
    }).not.throw()
  })

  it('ServiceContainer.AddService 有依赖构造类未注册依赖类时注册报错', function() {
    let container = new ServiceContainer()
    expect(() => {
      container.AddService(TestBiz)
    }).to.throw('没有被注册')
  })

  it('ServiceContainer.AddService 有自身依赖构造类注册报错', function() {
    let container = new ServiceContainer()
    expect(() => {
      container.AddService(TestServiceSelfRel)
    }).to.throw('不能依赖自身')
  })

  it('ServiceContainer.GetService 无参构造类获取正常', function() {
    let container = new ServiceContainer()
    container.AddService(TestService)
    let service = container.GetService(TestService)
    // tslint:disable-next-line:no-unused-expression
    expect(service).not.be.null
    // tslint:disable-next-line:no-unused-expression
    expect(service).not.be.undefined
    // tslint:disable-next-line:no-unused-expression
    expect(service instanceof TestService).to.true
  })

  it('ServiceContainer.GetService 有参构造类获取正常', function() {
    let container = new ServiceContainer()
    container.AddService(TestService)
    container.AddService(TestBiz)
    let biz = container.GetService(TestBiz)
    // tslint:disable-next-line:no-unused-expression
    expect(biz).not.be.null
    // tslint:disable-next-line:no-unused-expression
    expect(biz).not.be.undefined
    // tslint:disable-next-line:no-unused-expression
    expect(biz instanceof TestBiz).to.true
    // tslint:disable-next-line:no-unused-expression
    expect(biz.Service).not.be.null
    // tslint:disable-next-line:no-unused-expression
    expect(biz.Service).not.be.undefined
    // tslint:disable-next-line:no-unused-expression
    expect(biz.Service instanceof TestService).to.true
  })

  it('ServiceContainer.GetService 有参构造类未注册依赖类时获取报错', function() {
    let pool = new Array<Function>(TestBiz)
    let container = new ServiceContainer(pool)
    expect(() => {
      container.GetService(TestBiz)
    }).to.throw('没有被注册')
  })
})

class FakePool implements ClassPool {
  indexOf(type: Function): number {
    return -1
  }
  push(type: Function): void {
    return
  }
}

class FakeServiceContainer implements IServiceContainer {
  AddService<T>(type: Function) {
    return
  }
  GetService<T>(constructorFunction: new (...args: any[]) => T): T {
    return
  }
}

const fakeContainer = new FakeServiceContainer()

@Injectable()
class TestService {
  // tslint:disable-next-line:no-empty
  public constructor() {}
}

@Injectable()
class TestBiz {
  private service: TestService
  // tslint:disable-next-line:no-empty
  constructor(service: TestService) {
    this.service = service
  }

  public get Service(): TestService {
    return this.service
  }
}

@Injectable(fakeContainer)
class TestServiceSelfRel {
  // tslint:disable-next-line:no-empty
  constructor(obj: TestServiceSelfRel) {}
}
