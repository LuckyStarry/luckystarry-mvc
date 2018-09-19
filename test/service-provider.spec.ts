import { expect } from 'chai'
import { Injectable, ServiceCollection } from 'luckystarry-ioc'
import { ServiceProvider } from '../src/service-provider'

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
    let collection = new ServiceCollection(pool)
    let provider = new ServiceProvider(collection)
    expect(() => {
      provider.GetService(TestBiz)
    }).to.throw('没有被注册')
  })
})

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

@Injectable()
class TestServiceSelfRel {
  // tslint:disable-next-line:no-empty
  constructor(obj: TestServiceSelfRel) {}
}
