import http, { ServerResponse } from 'node:http'
import { Request } from './utils/request'
import { json } from './middlewares/json'
import { routes } from './routes'
import { extractQueryParams } from './middlewares/extract-query-params'
import { Params } from './utils/params'

const server = http.createServer(async (req: Request, res: ServerResponse) => {
  const { method, url = '' } = req
  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.pathRegex.test(url)
  })

  if (route) {
    const routeParams = url.match(route.path.pathRegex) ?? { groups: {} }

    Object.entries(routeParams.groups!).forEach(([key, value]) => {
      if (key === 'query') {
        req.queryParams = extractQueryParams(value ?? '')
      } else {
        if (!req.params) {
          req.params = new Params()
        }

        req.params.add(key, value)
      }
    })

    console.log(req.params)
    console.log(req.queryParams)
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
