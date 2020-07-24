import { HttpContext } from './http-context'

export class ArgumentContext {
  private stop: boolean = false
  private context: HttpContext
  public constructor(context: HttpContext) {
    this.context = context
  }

  public get HttpContext(): HttpContext {
    return this.context
  }

  public Stop(code: number, message?: string): void {
    this.context.Response.Status(code).Json({ Success: false, Message: message }).End()
    this.stop = true
  }

  public get Stopped(): boolean {
    return this.stop
  }
}
