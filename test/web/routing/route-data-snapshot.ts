import { expect } from 'chai'
import { IRouter } from '../../../src/web/routing/router'
import { RouteCollection } from '../../../src/web/routing/route-collection'
import { RouteContext } from '../../../src/web/routing/route-context'
import { HttpContext } from '../../../src/web/http-context'
import { RequestMessage } from '../../../src/web/http-request'
import { ResponseMessage } from '../../../src/web/http-response'
import { RouteData } from '../../../src/web/routing/route-data'
import { RouteDataSnapshot } from '../../../src/web/routing/route-data-snapshot'

describe('/web/routing/route-data-snapshot.ts', function() {
  it('存在 Class RouteDataSnapshot', function() {
    expect(typeof RouteDataSnapshot).to.equal('function')
  })

  it('RouteDataSnapshot 构造时传入正常参数不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let routers = new Array<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, dataTokens, routers, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 routeData 为 null 报错', function() {
    let dataTokens = new Map<string, any>()
    let routers = new Array<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(null, dataTokens, routers, values)
    }).to.throw('路由数据不可为空')
  })

  it('RouteDataSnapshot 构造时 routeData 为 undefined 报错', function() {
    let dataTokens = new Map<string, any>()
    let routers = new Array<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(undefined, dataTokens, routers, values)
    }).to.throw('路由数据不可为空')
  })

  it('RouteDataSnapshot 构造时 dataTokens 为 null 不报错', function() {
    let routeData = new RouteData()
    let routers = new Array<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, null, routers, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 dataTokens 为 undefined 不报错', function() {
    let routeData = new RouteData()
    let routers = new Array<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, undefined, routers, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 routers 为 null 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, dataTokens, null, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 routers 为 undefined 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let values = new Map<string, any>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, dataTokens, undefined, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 values 为 null 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let routers = new Array<IRouter>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, dataTokens, routers, null)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 values 为 undefined 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let routers = new Array<IRouter>()
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new RouteDataSnapshot(routeData, dataTokens, routers, undefined)
    }).not.throw()
  })
})

class FakeRouter implements IRouter {
  public RouteAsync(context: RouteContext): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

class FakeRequestMessage implements RequestMessage {}

class FakeResponseMessage implements ResponseMessage {
  write(content: string) {
    throw new Error('Method not implemented.')
  }
  end() {
    throw new Error('Method not implemented.')
  }
}
