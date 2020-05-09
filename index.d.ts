export type Context = {
  key: string
  id: number
  cycleOf: <T>(name: string) => T
}


export type ObjectBuilderType<T = any> = (ctx: Context) => T


export type DefineContext<T = any> = {
  withTrait: (traits: { [key: string]: ObjectBuilderType<T> }) => DefineContext<T>
  withResource: (resources: { [key: string]: any[] }) => DefineContext<T>
  onCreate: <U>(func: (object: T) => U) => DefineContext<T>
}


export interface IFactoryPool {
  nextId(key: string): number
  resetAllId(): void
  resetId(key: string): void
  addDefine(key: string, func: ObjectBuilderType): void
  getDefine(key: string): ObjectBuilderType
  addTrait(key: string, name: string, func: ObjectBuilderType): void
  getTrait(key: string, name: string): ObjectBuilderType
  addResource(key: string, name: string, resource: any[]): void
  getResource<T>(key: string, name: string): T[]
  addCreator(key: string, func: Function): void
  getCreator(key: string): Function
}


export declare const define: <T, U = Partial<T>>(
  key: string, func: ObjectBuilderType<T>) => DefineContext<U>


export declare const build: <T, U = Partial<T>>(
  key: string, traitNames?: string[] | undefined, option?: U | undefined) => U & T


export declare const create: <T, U = Partial<T>, V = any>(
  key: string, traitNames?: string[] | undefined, option?: U | undefined) => V


declare const ObjectFactory: {
  factoryPool: IFactoryPool

  define: <T, U = Partial<T>>(
    key: string, func: ObjectBuilderType<T>) => DefineContext<U>

  build: <T_1, U_1 = Partial<T_1>>(
    key: string, traitNames?: string[] | undefined, option?: U_1 | undefined) => U_1 & T_1

  create: <T_2, U_2 = Partial<T_2>, V = any>(
    key: string, traitNames?: string[] | undefined, option?: U_2 | undefined) => V

}

export default ObjectFactory
