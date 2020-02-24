import LoggerFactory from 'luckystarry-log4ts'
import { Mapping } from './mapping'
export function MappingDelete(path?: string) {
  return Mapping(path, 'DELETE')
}

const logger = LoggerFactory.GetLogger(MappingDelete.name)
