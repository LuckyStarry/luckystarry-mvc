import { ArgumentContext } from '../argument-context'
import { ArgumentGetter } from './argument-getter'

export class ArgumentGetterAuthorization<T> implements ArgumentGetter {
  private getter: (token: string) => T
  private verify: (profile: T) => boolean
  public constructor(
    getter: (token: string) => T,
    verify: (profile: T) => boolean
  ) {
    this.getter = getter
    this.verify = verify
  }
  public GetValue(context: ArgumentContext) {
    let authorization = context.HttpContext.Request.GetHeader('authorization')
    if (authorization) {
      let [schema, token] = authorization.split(' ')
      if (schema && token) {
        if (schema.toLowerCase() === 'berear') {
          let profile = this.getter(token)
          if (profile) {
            if (this.verify) {
              if (this.verify(profile)) {
                return profile
              } else {
                context.Stop(403, '权限不足')
                return
              }
            }
            return profile
          }
        }
      }
    }
    context.Stop(401, '必须登录后才可以使用')
  }
}
