export class Path {
  public url: string
  public params?: string[]
  public queryParams?: string[]

  private constructor(url: string) {
    this.url = url
  }

  static of(...values: string[]): Path {
    const url = values.reduce((acc, value) => {
      return acc.concat(`/${value}`)
    }, '')

    return new Path(url)
  }
}
