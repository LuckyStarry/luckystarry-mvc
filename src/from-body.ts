import LoggerFactory from 'luckystarry-log4ts'
import { ArgumentGetterBody } from './argument-getter-body'
import { ArgumentsBuilder } from './arguments-builder'
import { parameters } from './parameters'

export function FromBody<T>(factory?: (body: string) => T) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    logger.Info(
      `${target.constructor.name}.${propertyKey} Body => Index:${parameterIndex}`
    )
    let key = `${target.constructor.name}.${propertyKey}`
    let builder = parameters.get(key)
    if (!builder) {
      builder = new ArgumentsBuilder()
      parameters.set(key, builder)
    }
    builder.Set(parameterIndex, new ArgumentGetterBody(propertyKey, factory))
  }
}

const logger = LoggerFactory.GetLogger(FromBody.name)
