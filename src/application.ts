import express from 'express'
import core from 'express-serve-static-core'
import http from 'http'
import { IServiceCollection } from 'luckystarry-ioc'
import LoggerFactory from 'luckystarry-log4ts'
import { ActionDescriptor } from './action-descriptor'
import { ArgumentContext } from './argument-context'
import { ControllerFactory } from './controller-factory'
import { DefaultHttpContext } from './default-http-context'
import { mappings } from './mappings'
import { parameters } from './parameters'

export class Application {
  private static logger = LoggerFactory.GetLogger(Application)
  private serviceCollection: IServiceCollection
  private controllerFactory: ControllerFactory
  private port: number

  public constructor(
    serviceCollection: IServiceCollection,
    controllerFactory: ControllerFactory,
    port: number
  ) {
    this.serviceCollection = serviceCollection
    this.controllerFactory = controllerFactory
    this.port = port
  }

  public get ServiceCollection(): IServiceCollection {
    return this.serviceCollection
  }

  public Start() {
    Application.logger.Info(`项目启动，监听 ${this.port} 号端口。`)
    const app = express()
    app.use(express.json({ verify }))
    app.use(express.urlencoded({ extended: false, verify }))
    mappings.forEach(descriptor => {
      this.controllerFactory.Register(descriptor)
      switch (descriptor.HttpMethod) {
        case 'GET':
          app.get(descriptor.Path, (req, res, next) =>
            this.bind(descriptor, req, res, next)
          )
          break
        case 'POST':
          app.post(descriptor.Path, (req, res, next) =>
            this.bind(descriptor, req, res, next)
          )
          break
        case 'PUT':
          app.put(descriptor.Path, (req, res, next) =>
            this.bind(descriptor, req, res, next)
          )
          break
        case 'DELETE':
          app.delete(descriptor.Path, (req, res, next) =>
            this.bind(descriptor, req, res, next)
          )
          break
        default:
          Application.logger.Error(
            `不支持的方法：[${descriptor.HttpMethod}]=>${descriptor.Path}`
          )
      }
    }, this)
    const server = http.createServer(app)
    server.listen(this.port)
  }

  public bind(
    descriptor: ActionDescriptor,
    req: core.Request,
    res: core.Response,
    next: core.NextFunction
  ) {
    let context = DefaultHttpContext.Create(req, res)
    let controller = this.controllerFactory.CreateController(
      descriptor,
      context
    )
    let action: Function = controller[descriptor.ActionName]
    if (action) {
      let key = `${controller.constructor.name}.${descriptor.ActionName}`
      let params = []
      let argumentsBuilder = parameters.get(key)
      if (argumentsBuilder) {
        let argumentContext = new ArgumentContext(context)
        params = argumentsBuilder.GenerateArguments(argumentContext)
        if (argumentContext.Stopped) {
          return
        }
      }

      let result: any
      try {
        result = action.apply(controller, params)
        if (result instanceof Promise) {
          return result
            .then(obj => {
              res.json(obj)
            })
            .catch(e => {
              res.status(503)
              if (e) {
                Application.logger.Error(`系统异常`, {
                  controller: controller.constructor.name,
                  action: descriptor.ActionName,
                  message: e && e.message,
                  stack: e && e.stack
                })
              }
            })
        } else {
          res.json(result)
        }
      } catch (e) {
        res.status(503)
        if (e) {
          Application.logger.Error(`系统异常`, {
            controller: controller.constructor.name,
            action: descriptor.ActionName,
            message: e && e.message,
            stack: e && e.stack
          })
        }
      }
    } else {
      res.status(404)
    }
  }
}

function verify(req, res, buf, encoding) {
  req.rawBody = buf
}
