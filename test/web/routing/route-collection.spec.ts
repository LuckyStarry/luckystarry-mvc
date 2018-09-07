import { expect } from 'chai'
import { RouteCollection } from '../../../src/web/routing/route-collection'
import { IRouter } from '../../../src/web/routing/router'
import { RouteContext } from '../../../src/web/routing/route-context'

describe('/web/routing/route-collection.ts', function() {
  it('存在 Class RouteCollection', function() {
    expect(typeof RouteCollection).to.equal('function')
  })

  it('RouteCollection.Add 传入正常参数不报错', function() {
    let collection = new RouteCollection()
    expect(() => {
      collection.Add(new FakeRouter())
    }).not.throw()
  })
})

class FakeRouter implements IRouter {
  public RouteAsync(context: RouteContext): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
