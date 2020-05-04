import { ArgumentContext } from '../argument-context'
import { ParameterType } from '../parameter-type'
import { ArgumentGetter } from './argument-getter'

export class ArgumentGetterRoute implements ArgumentGetter {
  private name: string
  private path: string
  private type: string
  public constructor(
    name: string,
    path: string,
    type: ParameterType = 'string'
  ) {
    this.name = name
    this.path = path
    this.type = type
  }
  public GetValue(context: ArgumentContext) {
    let text = context.HttpContext.Request.GetRoute(this.path)
    if (this.type === 'string') {
      return text
    } else if (this.type === 'number') {
      if (text) {
        return parseInt(text, 10)
      } else {
        return null
      }
    } else if (this.type === 'boolean') {
      return (text || '').toString().toLowerCase() === 'true'
    }
    throw new Error(`不支持的数据类型:${this.type}`)
  }
}
