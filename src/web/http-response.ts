import http from 'http'
export class HttpResponse {
  private response: http.ServerResponse

  public constructor(response: http.ServerResponse) {
    this.response = response
  }

  public Write(content: string) {
    this.response.write(content)
  }

  public End(): void {
    this.response.end()
  }
}
