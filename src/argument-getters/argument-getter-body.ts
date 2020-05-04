import { ArgumentContext } from './argument-context'
import { ArgumentGetter } from './argument-getter'

export class ArgumentGetterBody<T> implements ArgumentGetter {
  private name: string
  private factory: (body: string) => T
  public constructor(name: string, factory: (body: string) => T) {
    this.name = name
    this.factory = factory
  }
  public GetValue(context: ArgumentContext) {
    let text = context.HttpContext.Request.GetBody()
    if (this.factory) {
      return this.factory(text)
    } else {
      if (text) {
        return JSON.parse(text)
      } else {
        return null
      }
    }
  }
}
