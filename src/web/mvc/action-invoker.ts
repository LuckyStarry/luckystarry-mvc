export abstract class IActionInvoker {
  public abstract InvokeAsync(): Promise<void>
}
