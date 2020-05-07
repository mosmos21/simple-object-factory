import { Context } from '~/contexts'

export type ObjectBuilderType<T = any> = (ctx: Context) => T

export interface IFactoryPool {
  nextId(key: string): number;
  resetAllId(): void;
  resetId(key: string): void;
  addDefine(key: string, func: ObjectBuilderType): void;
  getDefine(key: string): ObjectBuilderType;
  addTrait(key: string, name: string, func: ObjectBuilderType): void;
  getTrait(key: string, name: string): ObjectBuilderType;
  addResources(key: string, name: string, resources: any[]): void;
  getResources<T>(key: string, name: string): T[];
  addCreator(key: string, func: Function): void;
  getCreator(key: string): Function;
}

export default class FactoryPool implements IFactoryPool {
  private idMap: { [key: string]: number } = {}
  private defineMap: { [key: string]: ObjectBuilderType } = {}
  private traitMap: { [key: string]: { [key: string]: ObjectBuilderType } } = {}
  private resourcesMap: { [key: string]: { [key: string]: any[] } } = {}
  private creatorMap: { [key: string]: Function } = {}

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
      throw new Error(`The key "${key}" is already defined.`)
    }
    this.defineMap[key] = func
    this.traitMap[key] = {}
    this.resourcesMap[key] = {}
  }

  public getDefine(key: string): ObjectBuilderType {
    if (!this.defineMap[key]) {
      throw new Error(`The key "${key}" is not defined.`)
    }
    return this.defineMap[key]
  }

  public addTrait(key: string, name: string, func: ObjectBuilderType) {
    const context = this.traitMap[key]
    if (!context) {
      throw new Error(`The key "${key}" is not defined.`)
    }
    if (context[name]) {
      throw new Error(`The trait "${name}" in the key "${key}" is already defined.`)
    }
    this.traitMap[key] = { ...context, [name]: func }
  }

  public getTrait(key: string, name: string): ObjectBuilderType {
    const context = this.traitMap[key]
    if (!context) {
      throw new Error(`The key "${key}" is not defined.`)
    }
    if (!context[name]) {
      throw new Error(`The trait "${name}" in the key "${key}" is not defined.`)
    }
    return context[name]
  }

  public addResources(key: string, name: string, resources: any[]) {
    const context = this.resourcesMap[key]
    if (!context) {
      throw new Error(`The key "${key}" is not defined.`)
    }
    if (context[name]) {
      throw new Error(`The resources "${name}" in the key "${key}" is already defined.`)
    }
    this.resourcesMap[key] = { ...context, [name]: resources }
  }

  public getResources<T = any>(key: string, name: string): T[] {
    const context = this.resourcesMap[key]
    if (!context) {
      throw new Error(`The key "${key}" is not defined.`)
    }
    if (!context[name]) {
      throw new Error(`The resources "${name}" in the key "${key}" is not defined.`)
    }
    return context[name]
  }

  public addCreator(key: string, func: Function) {
    if (!this.defineMap[key]) {
      throw new Error (`The key "${key}" is not defined.`)
    }
    this.creatorMap[key] = func
  }

  public getCreator(key: string): Function {
    if(!this.creatorMap[key]) {
      throw new Error(`The creator for "${key}" is not defined.`)
    }
    return this.creatorMap[key]
  }
}
