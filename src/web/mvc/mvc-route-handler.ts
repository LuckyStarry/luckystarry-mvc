import { IRouteHandler, RequestContext } from '../routing'
import { IHttpHandler } from '../http-handler'
import { MvcHandler } from './mvc-handler'

export class MvcRouteHandler implements IRouteHandler {
  public GetHttpHandler(requestContext: RequestContext): IHttpHandler {
    return new MvcHandler(requestContext)
  }
}
