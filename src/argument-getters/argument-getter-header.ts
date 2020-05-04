import { ArgumentContext } from './argument-context'
import { ArgumentGetter } from './argument-getter'

export class ArgumentGetterHeader implements ArgumentGetter {
  private name: string
  private header: string
  public constructor(name: string, header: string) {
    this.name = name
    this.header = header
  }
  public GetValue(context: ArgumentContext) {
    return context.HttpContext.Request.GetHeader(this.header)
  }
}
