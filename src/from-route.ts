import LoggerFactory from 'luckystarry-log4ts'
import { ArgumentGetterRoute } from './argument-getter-route'
import { ArgumentsBuilder } from './arguments-builder'
import { ParameterType } from './parameter-type'
import { parameters } from './parameters'

export function FromRoute(path: string, paramType?: ParameterType) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    logger.Info(
      `${target.constructor.name}.${propertyKey} Parameter:${path} => Index:${parameterIndex}`
    )
    let key = `${target.constructor.name}.${propertyKey}`
    let builder = parameters.get(key)
    if (!builder) {
      builder = new ArgumentsBuilder()
      parameters.set(key, builder)
    }
    builder.Set(
      parameterIndex,
      new ArgumentGetterRoute(propertyKey, path, paramType)
    )
  }
}

const logger = LoggerFactory.GetLogger(FromRoute.name)
