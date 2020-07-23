import LoggerFactory from 'luckystarry-log4ts'
import { ActionDescriptor } from './action-descriptor'
import { HttpMethod } from './http-method'
import { mappings } from './mappings'
export function Mapping(path: string, method: HttpMethod) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    logger.Info(`${target.constructor.name}.${propertyKey} => [${method}] ${path}`)
    mappings.set(`${method}:${path}`, new ActionDescriptor(path, target.constructor, propertyKey, method, descriptor))
  }
}

const logger = LoggerFactory.GetLogger(Mapping.name)
