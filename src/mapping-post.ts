import LoggerFactory from 'luckystarry-log4ts'
import { Mapping } from './mapping'
export function MappingPost(path?: string) {
  return Mapping(path, 'POST')
}

const logger = LoggerFactory.GetLogger(MappingPost.name)
