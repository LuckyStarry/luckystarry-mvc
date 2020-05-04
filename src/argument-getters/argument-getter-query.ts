import { ArgumentContext } from '../argument-context'
import { ParameterType } from '../parameter-type'
import { ArgumentGetter } from './argument-getter'

export class ArgumentGetterQuery implements ArgumentGetter {
  private name: string
  private param: string
  private type: string
  public constructor(
    name: string,
    param: string,
    type: ParameterType = 'string'
  ) {
    this.name = name
    this.param = param
    this.type = type
  }
  public GetValue(context: ArgumentContext) {
    let text = context.HttpContext.Request.GetQuery(this.param)
    if (this.type === 'string') {
      return text
    } else if (this.type === 'number') {
      if (text) {
        if (text.indexOf('.') > -1) {
          return parseFloat(text)
        } else {
          return parseInt(text, 10)
        }
      } else {
        return null
      }
    } else if (this.type === 'boolean') {
      return (text || '').toString().toLowerCase() === 'true'
    }
    throw new Error(`不支持的数据类型:${this.type}`)
  }
}
