import { Path } from './path'
import { Route } from './route'

export function restController<T extends { new (...args: any[]): {} }>(
  controller: T,
) {
  return class extends controller {
    static getRoute(): Route[] {
      const endpoints = this.__endpoints || []
      return endpoints
    }
  }
}

export function httpGet(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value

    const route: Route = {
      method: 'GET',
      path: Path.of(path),
      handler: function (req, res) {
        const result = method.call(this, req, res)
        return result
          .setHeader('Content-Type', 'application/json')
          .end(JSON.stringify(result))
      },
    }

    if (!target.__endpoints) target.__endpoints = [route]
    target.__endpoints.push(route)
  }
}

export function httpPost(path: string) {}

export function httpPut(path: string) {}

export function httpPatch(path: string) {}

export function httpDelete(path: string) {}
