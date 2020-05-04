import LoggerFactory from 'luckystarry-log4ts'
import { ArgumentGetterQuery } from '../argument-getters/argument-getter-query'
import { ArgumentsBuilder } from '../arguments-builder'
import { ParameterType } from '../parameter-type'
import { parameters } from '../parameters'

export function FromQuery(paramName: string, paramType?: ParameterType) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    logger.Info(
      `${target.constructor.name}.${propertyKey} Parameter:${paramName} => Index:${parameterIndex}`
    )
    let key = `${target.constructor.name}.${propertyKey}`
    let builder = parameters.get(key)
    if (!builder) {
      builder = new ArgumentsBuilder()
      parameters.set(key, builder)
    }
    builder.Set(
      parameterIndex,
      new ArgumentGetterQuery(propertyKey, paramName, paramType)
    )
  }
}

const logger = LoggerFactory.GetLogger(FromQuery.name)
