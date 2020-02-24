import core from 'express-serve-static-core'
import { DefaultRequestContext } from './default-request-context'
import { DefaultResponseContext } from './default-response-context'
import { HttpContext } from './http-context'
import { RequestContext } from './request-context'
import { ResponseContext } from './response-context'
export class DefaultHttpContext extends HttpContext {
  public constructor(request: RequestContext, response: ResponseContext) {
    super(request, response)
  }

  public static Create(
    request: core.Request,
    response: core.Response
  ): HttpContext {
    let requestContext = new DefaultRequestContext(request)
    let responseContext = new DefaultResponseContext(response)
    let httpContext = new DefaultHttpContext(requestContext, responseContext)
    requestContext.HttpContext = httpContext
    responseContext.HttpContext = httpContext
    return httpContext
  }
}
