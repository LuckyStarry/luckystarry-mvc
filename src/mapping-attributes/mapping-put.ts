import LoggerFactory from 'luckystarry-log4ts'
import { Mapping } from './mapping'
export function MappingPut(path?: string) {
  return Mapping(path, 'PUT')
}

const logger = LoggerFactory.GetLogger(MappingPut.name)
