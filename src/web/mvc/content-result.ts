import { ActionResult } from './action-result'
import { ControllerContext } from './controller-context'

export class ContentResult extends ActionResult {
  private content: string
  private 'content-type': string

  public constructor(
    content:
      | string
      | {
          content: string
          'content-type': string
        }
  ) {
    super()
    if (typeof content === 'string') {
      this.content = content
    } else {
      this.content = content.content
      this['content-type'] = content['content-type'] || 'text/plain'
    }
  }

  public ExecuteResult(context: ControllerContext): void {
    context.RequestContext.HttpContext.Response.Write(this.content)
    if (this['content-type']) {
      context.RequestContext.HttpContext.Response
    }
    context.RequestContext.HttpContext.Response.End()
  }
}
