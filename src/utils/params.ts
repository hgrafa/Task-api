export class Params {
  private params: Map<string, string> = new Map<string, string>()

  public has(key: string): boolean {
    return this.params.has(key)
  }

  public add(key: string, value: string) {
    this.params.set(key, value)
  }

  public get(key: string) {
    return this.params.get(key)
  }

  public remove(key: string) {
    this.params.delete(key)
  }
}
