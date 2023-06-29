import { IncomingMessage } from 'node:http'
import { Params } from './params'

export interface Request extends IncomingMessage {
  body?: any
  params?: Params
  queryParams?: Params
}
