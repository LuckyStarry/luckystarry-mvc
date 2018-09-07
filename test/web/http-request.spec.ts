import http from 'http'
import { expect } from 'chai'
import { HttpRequest } from '../../src/web/http-request'

describe('/web/http-request.ts', function() {
  it('存在 Class HttpRequest', function() {
    expect(typeof HttpRequest).to.equal('function')
  })

  it('HttpRequest 构造时传入参数不报错', function() {
    let request = new http.IncomingMessage(null)
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new HttpRequest(request)
    }).not.throw()
  })

  it('HttpRequest 构造时传入空的 REQUEST 参数不报错', function() {
    let request: http.IncomingMessage
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new HttpRequest(request)
    }).not.throw()
  })

  it('HttpRequest 构造成功时 Params 属性不为空', function() {
    let request = new HttpRequest(null)
    // tslint:disable-next-line:no-unused-expression
    expect(request).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(request).not.undefined
    // tslint:disable-next-line:no-unused-expression
    expect(request instanceof HttpRequest).is.true
  })

  it('HttpRequest URL: / => PATH: /', function() {
    let request = new FakeHttpRequest()
    request.Url = '/'
    expect(request.Path).to.equal('/')
  })

  it('HttpRequest URL: /foo => PATH: /foo', function() {
    let request = new FakeHttpRequest()
    request.Url = '/foo'
    expect(request.Path).to.equal('/foo')
  })

  it('HttpRequest URL: /foo/ => PATH: /foo/', function() {
    let request = new FakeHttpRequest()
    request.Url = '/foo/'
    expect(request.Path).to.equal('/foo/')
  })

  it('HttpRequest URL: /foo/bar => PATH: /foo/bar', function() {
    let request = new FakeHttpRequest()
    request.Url = '/foo/bar'
    expect(request.Path).to.equal('/foo/bar')
  })

  it('HttpRequest URL: /?p=v => PATH: /', function() {
    let request = new FakeHttpRequest()
    request.Url = '/?p=v'
    expect(request.Path).to.equal('/')
  })

  it('HttpRequest URL: /foo/bar?p=v => PATH: /foo/bar', function() {
    let request = new FakeHttpRequest()
    request.Url = '/foo/bar?p=v'
    expect(request.Path).to.equal('/foo/bar')
  })
})

class FakeHttpRequest extends HttpRequest {
  public constructor() {
    super(null)
  }

  private url: string

  public set Url(value: string) {
    this.url = value
  }

  public get Url(): string {
    return this.url
  }
}
