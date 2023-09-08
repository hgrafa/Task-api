import { buildRoutePath } from '../middlewares/build-route-path'

export class Path {
  public url: string
  public pathRegex: RegExp
  public params?: string[]
  public queryParams?: string[]

  private constructor(url: string) {
    this.url = url
    this.pathRegex = buildRoutePath(url)
  }

  static from(...params: { key: string; value: string }[]) {
    const paramsArray = params.map(({ key, value }) => {
      return this.of(key, value)
    })

    return paramsArray
  }

  static of(...values: string[]): Path {
    if (values.length === 1) return new Path(values[0])

    const url = values.reduce((acc, value) => {
      return acc.concat(`/${value}`)
    }, '')

    return new Path(url)
  }
}
