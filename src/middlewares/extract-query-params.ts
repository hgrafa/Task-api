import { Params } from '../utils/params'

export function extractQueryParams(query: string): Params {
  const queryParams: Params = new Params()

  if (!query.includes('?')) return queryParams

  query
    .slice(1)
    .split('&')
    .forEach((queryParam) => {
      const [key, value] = queryParam.split('=')
      queryParams.add(key, value)
    })

  return queryParams
}
