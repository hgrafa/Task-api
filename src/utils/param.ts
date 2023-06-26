export class Param {
  public key: string
  public value: string

  private constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }

  public static of(key: string, value: string = key): Param {
    return new Param(key, value)
  }
}
