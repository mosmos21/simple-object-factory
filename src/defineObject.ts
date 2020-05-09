import { ObjectBuilderType, IFactoryPool } from '~/factoryPool'

export type DefineContext<T = any> = {
  withTrait: (traits: { [key: string]: ObjectBuilderType<T> }) => DefineContext<T>
  withResource: (resources: { [key: string]: any[] }) => DefineContext<T>
  onCreate: <U>(func: (object: T) => U) => DefineContext<T>
  onCreateWithClass: <U extends { new(attr: T): any }>(clazz: U) => DefineContext<T>
}

const createContext = <T>(factoryPool: IFactoryPool, key: string): DefineContext<T> => ({
  withTrait: withTrait<T>(factoryPool, key),
  withResource: withResource<T>(factoryPool, key),
  onCreate: onCreate<T>(factoryPool, key),
  onCreateWithClass: onCreateWithClass<T>(factoryPool, key)
})

const withTrait = <T>(factoryPool: IFactoryPool, key: string) =>
  (traits: { [key: string]: ObjectBuilderType<T> }) => {
    Object.entries(traits).forEach(([traitName, func]) => {
      factoryPool.addTrait(key, traitName, func)
    })
    return createContext<T>(factoryPool, key)
  }

const withResource = <T>(factoryPool: IFactoryPool, key: string) =>
  (resources: { [key: string]: any[] }) => {
    Object.entries(resources).forEach(([resourceName, resource]) => {
      factoryPool.addResource(key, resourceName, resource)
    })
    return createContext<T>(factoryPool, key)
  }

const onCreate = <T>(factoryPool: IFactoryPool, key: string) =>
  <U>(func: (object: T) => U) => {
    factoryPool.addCreator(key, func)
    return createContext<T>(factoryPool, key)
  }

const onCreateWithClass = <T>(factoryPool: IFactoryPool, key: string) =>
  <U extends { new(attr: T): any }>(clazz: U) => {
    factoryPool.addCreator(key, (attr: T) => new clazz(attr))
    return createContext<T>(factoryPool, key)
  }

const defineObject = (factoryPool: IFactoryPool) =>
  <T,U = Partial<T>>(key: string, func: ObjectBuilderType<T>): DefineContext<U> => {
    factoryPool.addDefine(key, func)
    return createContext<U>(factoryPool, key)
  }

export default defineObject
