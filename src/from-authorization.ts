import LoggerFactory from 'luckystarry-log4ts'
import { ArgumentGetterAuthorization } from './argument-getter-authorization'
import { ArgumentsBuilder } from './arguments-builder'
import { parameters } from './parameters'

export function FromAuthorization<T>(
  getter: (token: string) => T,
  verify: (profile: T) => boolean
) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    logger.Info(
      `${target.constructor.name}.${propertyKey} Authorization => Index:${parameterIndex}`
    )
    let key = `${target.constructor.name}.${propertyKey}`
    let builder = parameters.get(key)
    if (!builder) {
      builder = new ArgumentsBuilder()
      parameters.set(key, builder)
    }
    builder.Set(parameterIndex, new ArgumentGetterAuthorization(getter, verify))
  }
}

const logger = LoggerFactory.GetLogger(FromAuthorization.name)
