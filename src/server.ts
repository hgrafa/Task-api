import http, { ServerResponse } from 'node:http'
import { Request } from './utils/request'
import { json } from './middlewares/json'
import { routes } from './routes'

const server = http.createServer(async (req: Request, res: ServerResponse) => {
  const { method, url } = req
  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
