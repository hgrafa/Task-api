import { IncomingMessage } from 'node:http'

export interface Request extends IncomingMessage {
  body?: any
  params?: any[]
  queryParams?: any[]
}
