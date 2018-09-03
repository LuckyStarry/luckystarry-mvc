import { EventArgs } from './event-args'

export class PayloadEventArgs<T> extends EventArgs {
  private payload: T

  public set Payload(value: T) {
    this.payload = value
  }

  public get Payload(): T {
    return this.payload
  }
}
