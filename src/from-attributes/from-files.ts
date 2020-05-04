import LoggerFactory from 'luckystarry-log4ts'
import { ArgumentGetterFiles } from '../argument-getters/argument-getter-files'
import { ArgumentsBuilder } from '../arguments-builder'
import { parameters } from '../parameters'

export function FromFiles() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    logger.Info(
      `${target.constructor.name}.${propertyKey} File(s) => Index:${parameterIndex}`
    )
    let key = `${target.constructor.name}.${propertyKey}`
    let builder = parameters.get(key)
    if (!builder) {
      builder = new ArgumentsBuilder()
      parameters.set(key, builder)
    }
    builder.Set(parameterIndex, new ArgumentGetterFiles(propertyKey))
  }
}

const logger = LoggerFactory.GetLogger(FromFiles.name)
