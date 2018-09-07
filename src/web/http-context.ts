import http from 'http'
import { HttpRequest } from './http-request'
import { HttpResponse } from './http-response'
import { IHttpHandler } from './http-handler'
export class HttpContext {
  private request: HttpRequest
  private response: HttpResponse
  private handler: IHttpHandler
  public items: Map<string, any>

  public constructor(payload: {
    request: http.IncomingMessage
    response: http.ServerResponse
  }) {
    if (!payload) {
      throw new Error('没有传入上下文必需的参数')
    }
    this.request = new HttpRequest(payload.request)
    this.response = new HttpResponse(payload.response)
    this.items = new Map<string, any>()
  }

  public get Request(): HttpRequest {
    return this.request
  }

  public get Response(): HttpResponse {
    return this.response
  }

  public get Handler(): IHttpHandler {
    return this.handler
  }

  public RemapHandler(handler: IHttpHandler) {
    this.handler = handler
  }

  public get Items(): Map<string, any> {
    return this.items
  }
}
