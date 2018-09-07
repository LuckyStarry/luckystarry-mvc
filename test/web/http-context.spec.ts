import http from 'http'
import { expect } from 'chai'
import { HttpContext } from '../../src/web/http-context'

describe('/web/http-context.ts', function() {
  it('存在 Class EventHandler', function() {
    expect(typeof HttpContext).to.equal('function')
  })

  it('HttpContext 构造时传入参数不报错', function() {
    let request = new http.IncomingMessage(null)
    let response = new http.ServerResponse(request)
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new HttpContext({ request, response })
    }).not.throw()
  })

  it('HttpContext 构造时传入空的 REQUEST RESPONSE 参数不报错', function() {
    let request: http.IncomingMessage
    let response: http.ServerResponse
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new HttpContext({ request, response })
    }).not.throw()
  })

  it('HttpContext 构造时传入 null 报错', function() {
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new HttpContext(null)
    }).to.throw('没有传入上下文必需的参数')
  })

  it('HttpContext 构造时传入 undefined 报错', function() {
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new HttpContext(undefined)
    }).to.throw('没有传入上下文必需的参数')
  })

  it('HttpContext 构造成功时 Items 属性不为空', function() {
    let request: http.IncomingMessage
    let response: http.ServerResponse
    let context = new HttpContext({ request, response })
    // tslint:disable-next-line:no-unused-expression
    expect(context.Items).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(context.Items).not.undefined
  })

  it('HttpContext 构造成功时 Request 属性不为空', function() {
    let request: http.IncomingMessage
    let response: http.ServerResponse
    let context = new HttpContext({ request, response })
    // tslint:disable-next-line:no-unused-expression
    expect(context.Request).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(context.Request).not.undefined
  })

  it('HttpContext 构造成功时 Response 属性不为空', function() {
    let request: http.IncomingMessage
    let response: http.ServerResponse
    let context = new HttpContext({ request, response })
    // tslint:disable-next-line:no-unused-expression
    expect(context.Response).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(context.Response).not.undefined
  })
})
