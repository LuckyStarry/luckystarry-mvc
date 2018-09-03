import http from 'http'
import { HttpRequest } from './http-request'
import { HttpResponse } from './http-response'
import { IHttpHandler } from './http-handler'
export class HttpContext {
  private request: HttpRequest
  private response: HttpResponse
  private handler: IHttpHandler

  public constructor(payload: {
    request: http.IncomingMessage
    response: http.ServerResponse
  }) {
    this.request = new HttpRequest(payload.request)
    this.response = new HttpResponse(payload.response)
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
}
