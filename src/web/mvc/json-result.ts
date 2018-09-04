import { ContentResult } from './content-result'

export class JsonResult extends ContentResult {
  public constructor(content: any) {
    super({ content: JSON.stringify(content), 'content-type': 'text/json' })
  }
}
