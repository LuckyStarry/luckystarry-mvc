import { ArgumentGetterFiles } from 'argument-getters/argument-getter-files'
import { ArgumentContext } from './argument-context'
import { ArgumentGetter } from './argument-getters/argument-getter'

export class ArgumentsBuilder {
  private getters: ArgumentGetter[] = []
  public Set(index: number, getter: ArgumentGetter) {
    this.getters[index] = getter
  }

  public get NeedReadFile(): boolean {
    if (this.getters.length) {
      for (let i = 0; i < this.getters.length; i++) {
        let builder = this.getters[i]
        if (builder instanceof ArgumentGetterFiles) {
          return true
        }
      }
    }
    return false
  }

  public GenerateArguments(context: ArgumentContext): any[] {
    if (this.getters.length) {
      let params = []
      for (let i = 0; i < this.getters.length; i++) {
        let builder = this.getters[i]
        if (builder) {
          params[i] = builder.GetValue(context)
          if (context.Stopped) {
            return
          }
        }
      }
      return params
    } else {
      return []
    }
  }
}
