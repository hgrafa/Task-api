interface Param {
  key: string
  value: string
}

export function extractQueryParams(query: string) {
  return query
    .slice(1)
    .split('&')
    .reduce((queryParams, querySlice) => {
      const [key, value] = querySlice.split('=')
      const param: Param = { key, value }
      queryParams.push(param)
      return queryParams
    }, [] as Param[])
}
