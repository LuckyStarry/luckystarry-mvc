import { HttpContext } from './http-context'

export class Controller {
  private context: HttpContext
  public set Context(context: HttpContext) {
    this.context = context
  }

  public get Context(): HttpContext {
    return this.context
  }
}
