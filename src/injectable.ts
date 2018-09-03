import { ServiceContainer, IServiceContainer } from './service-container'

export function Injectable(container?: IServiceContainer) {
  return (type: Function) => {
    container = container || ServiceContainer.Current
    container.AddService(type)
  }
}
