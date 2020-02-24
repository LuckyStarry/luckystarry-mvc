import LoggerFactory from 'luckystarry-log4ts'
import { ArgumentGetterHeader } from './argument-getter-header'
import { ArgumentsBuilder } from './arguments-builder'
import { parameters } from './parameters'

export function FromHeader(header: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    logger.Info(
      `${target.constructor.name}.${propertyKey} Header:${header} => Index:${parameterIndex}`
    )
    let key = `${target.constructor.name}.${propertyKey}`
    let builder = parameters.get(key)
    if (!builder) {
      builder = new ArgumentsBuilder()
      parameters.set(key, builder)
    }
    builder.Set(parameterIndex, new ArgumentGetterHeader(propertyKey, header))
  }
}

const logger = LoggerFactory.GetLogger(FromHeader.name)
