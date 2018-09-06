import http from 'http'
import { WebHostBuilder } from './web-host-builder'
import { IApplicationBuilder } from './application-builder'

export interface IWebHost {
  Start()
}

export class WebHost {
  public static CreateDefaultBuilder() {
    return new WebHostBuilder()
  }
}

export class LuckyStarryWebHost implements IWebHost {
  private app: IApplicationBuilder

  public constructor(app: IApplicationBuilder) {
    this.app = app
  }

  public Start() {
    let port = parseInt(process.env.PORT, 10)
    if (isNaN(port)) {
      port = 3000
    } else if (port < 10) {
      port = 3000
    } else if (port > 65535) {
      port = 3000
    }
    http
      .createServer((req, res) => {
        this.app.Build()
      })
      .listen(port)
  }
}
