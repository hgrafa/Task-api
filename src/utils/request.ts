import { IncomingMessage } from 'node:http'
import { Param } from './param'

export interface Request extends IncomingMessage {
  body?: any
  params?: Param[]
  queryParams?: Param[]
}
