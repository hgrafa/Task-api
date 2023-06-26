import { ServerResponse } from 'http'
import { Request } from './request'
import { Path } from './path'

export interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: Path
  handler: (req: Request, res: ServerResponse) => ServerResponse
}
