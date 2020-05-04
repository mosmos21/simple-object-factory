import { Context } from '~/contexts'

export type ObjectBuilderType<T = any> = (ctx: Context) => T

export default class FactoryPool {
  private idMap: { [key: string]: number } = {}
  private defineMap: { [key: string]: ObjectBuilderType } = {}
  private traitMap: { [key: string]: { [key: string]: ObjectBuilderType } } = {}

  public nextId(key: string): number {
    const id = (this.idMap[key] || 0) + 1
    this.idMap[key] = id
    return id
  }

  public resetAllId(): void {
    this.idMap = {}
  }

  public resetId(key: string): void {
    delete this.idMap[key]
  }

  public addDefine(key: string, func: ObjectBuilderType): void {
    if (this.defineMap[key]) {
      throw new Error(`Key "${key}": It has already defined.`)
    }
    this.defineMap[key] = func
    this.traitMap[key] = {}
  }

  public getDefine(key: string): ObjectBuilderType {
    if (!this.defineMap[key]) {
      throw new Error(`Key "${key}": It has not defined.`)
    }
    return this.defineMap[key]
  }

  public addTrait(key: string, name: string, func: ObjectBuilderType) {
    const context = this.traitMap[key]
    if (!context) {
      throw new Error(`Key "${key}": It has not defined.`)
    }
    if (context[name]) {
      throw new Error(`The trait "${name}" in the key "${key}" is already defined.`)
    }
    this.traitMap[key] = { ...context, [name]: func }
  }

  public getTrait(key: string, name: string) {

  }
}
