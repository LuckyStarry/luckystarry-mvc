import { ArgumentContext } from '../argument-context'

export interface ArgumentGetter {
  GetValue(context: ArgumentContext)
}
