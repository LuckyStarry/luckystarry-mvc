import LoggerFactory from 'luckystarry-log4ts'
import { Mapping } from './mapping'
export function MappingGet(path?: string) {
  return Mapping(path, 'GET')
}

const logger = LoggerFactory.GetLogger(MappingGet.name)
