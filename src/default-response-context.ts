import core from 'express-serve-static-core'
import { HttpContext } from './http-context'
import { ResponseContext } from './response-context'

export class DefaultResponseContext implements ResponseContext {
  private context: HttpContext
  private response: core.Response
  public constructor(response: core.Response) {
    this.response = response
  }

  public set HttpContext(value: HttpContext) {
    this.context = value
  }

  public get HttpContext(): HttpContext {
    return this.context
  }

  public Status(code: number): ResponseContext {
    this.response.status(code)
    return this
  }

  public Json(body: any): ResponseContext {
    this.response.json(body)
    return this
  }
  public End(): void {
    this.response.end()
  }
}
