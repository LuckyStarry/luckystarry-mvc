/* tslint:disable */
import { expect } from 'chai'
import { ArgumentContext } from '../src/argument-context'
import { HttpContext } from '../src/http-context'
import { RequestContext } from '../src/request-context'
import { ResponseContext } from '../src/response-context'

describe('./argument-context.ts', function() {
  it('存在 ArgumentContext', function() {
    expect(ArgumentContext).not.null
    expect(ArgumentContext).not.undefined
    expect(typeof ArgumentContext).to.equal('function')
  })

  it('初始化 ArgumentContext', function() {
    let requestContext = new FakeRequestContext()
    let responseContext = new FakeResponseContext()
    let httpContext = new FakeHttpContext(requestContext, responseContext)
    let argumentContext = new ArgumentContext(httpContext)
    expect(argumentContext.HttpContext).is.equal(httpContext)
  })

  it('初始状态：ArgumentContext.Stopped = false', function() {
    let requestContext = new FakeRequestContext()
    let responseContext = new FakeResponseContext()
    let httpContext = new FakeHttpContext(requestContext, responseContext)
    let argumentContext = new ArgumentContext(httpContext)
    expect(argumentContext.Stopped).is.false

    responseContext.Status = code => {
      expect(code).is.equal(12345)
      return responseContext
    }
    responseContext.Json = entity => {
      expect(JSON.stringify(entity)).is.equal(
        JSON.stringify({ Success: false, Message: '67890' })
      )
      return responseContext
    }
    let ended = false
    responseContext.End = () => {
      ended = true
      return responseContext
    }
    argumentContext.Stop(12345, '67890')
    expect(ended).is.true
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
