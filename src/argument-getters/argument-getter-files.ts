import { ArgumentContext } from './argument-context'
import { ArgumentGetter } from './argument-getter'

export class ArgumentGetterFiles implements ArgumentGetter {
  private name: string
  public constructor(name: string) {
    this.name = name
  }
  public GetValue(context: ArgumentContext) {
    return context.HttpContext.Request['request'].files
  }
}
