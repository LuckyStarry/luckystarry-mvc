import { ContentResult } from './content-result'
import { ControllerContext } from './controller-context'

export class JsonResult extends ContentResult {
  public constructor(content: any) {
    super({ content: JSON.stringify(content), 'content-type': 'text/json' })
  }
}
