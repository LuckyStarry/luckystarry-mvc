/* tslint:disable */
import { expect } from 'chai'
import { HttpContext } from '../src/http-context'
import { RequestContext } from '../src/request-context'
import { ResponseContext } from '../src/response-context'

describe('Index', function() {
  it('存在 HttpContext', function() {
    expect(HttpContext).not.null
    expect(HttpContext).not.undefined
    expect(typeof HttpContext).to.equal('function')
  })

  it('初始化 HttpContext', function() {
    let requestContext = new FakeRequestContext()
    let responseContext = new FakeResponseContext()
    let httpContext = new FakeHttpContext(requestContext, responseContext)
    expect(httpContext.Request).is.equal(requestContext)
    expect(httpContext.Response).is.equal(responseContext)
  })
})

class FakeHttpContext extends HttpContext {
  public constructor(
    request: FakeRequestContext,
    response: FakeResponseContext
  ) {
    super(request, response)
  }
}

class FakeRequestContext implements RequestContext {
  HttpContext: HttpContext
  GetHeader(name: string): string {
    throw new Error('Method not implemented.')
  }
  GetBody(): string {
    throw new Error('Method not implemented.')
  }
  GetQuery(name: string): string {
    throw new Error('Method not implemented.')
  }
  GetRoute(path: string): string {
    throw new Error('Method not implemented.')
  }
}
class FakeResponseContext implements ResponseContext {
  HttpContext: HttpContext
  Status(code: number): ResponseContext {
    throw new Error('Method not implemented.')
  }
  Json(body: any): ResponseContext {
    throw new Error('Method not implemented.')
  }
  End(): void {
    throw new Error('Method not implemented.')
  }
}
