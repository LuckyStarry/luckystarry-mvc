import { expect } from 'chai'
import { Injectable } from '../src/injectable'
import { ServiceProvider } from '../src/service-provider'
import { ServiceCollection } from '../src/service-collection'
import {
  ServiceContainer,
  ClassPool,
  IServiceContainer
} from '../src/service-container'

describe('/service-provider.ts', function() {
  it('存在 Class ServiceProvider', function() {
    expect(typeof ServiceProvider).to.equal('function')
  })

  it('ServiceProvider.GetService 有参构造类获取正常', function() {
    let collection = new ServiceCollection()
    let provider = new ServiceProvider(collection)
    collection.AddTransient(TestService)
    collection.AddTransient(TestBiz)
    let biz = provider.GetService(TestBiz)
    // tslint:disable-next-line:no-unused-expression
    expect(biz).not.be.null
    // tslint:disable-next-line:no-unused-expression
    expect(biz).not.be.undefined
    // tslint:disable-next-line:no-unused-expression
    expect(biz instanceof TestBiz).is.true
    // tslint:disable-next-line:no-unused-expression
    expect(biz.Service).not.be.null
    // tslint:disable-next-line:no-unused-expression
    expect(biz.Service).not.be.undefined
    // tslint:disable-next-line:no-unused-expression
    expect(biz.Service instanceof TestService).is.true
  })

  it('ServiceCollection.GetService 有参构造类未注册依赖类时获取报错', function() {
    let pool = new Array<Function>(TestBiz)
    let container = new ServiceContainer(pool)
    let collection = new ServiceCollection(container)
    let provider = new ServiceProvider(collection)
    expect(() => {
      provider.GetService(TestBiz)
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
