import FactoryPool, { ObjectBuilderType } from '~/factoryPool'

export type DefineContext<T = any> = {
  withTrait: (traits: { [key: string]: ObjectBuilderType<T> }) => DefineContext<T>
  onCreate: <U>(func: (object: T) => U) => DefineContext<T>
}

const createContext = <T>(factoryPool: FactoryPool, key: string): DefineContext<T> => ({
  withTrait: withTrait<T>(factoryPool, key),
  onCreate: onCreate<T>(factoryPool, key)
})

const withTrait = <T>(factoryPool: FactoryPool, key: string) =>
  (traits: { [key: string]: ObjectBuilderType<T> }) => {
    Object.entries(traits).forEach(([traitName, func]) => {
      factoryPool.addTrait(key, traitName, func)
    })
    return createContext<T>(factoryPool, key)
  }

const onCreate = <T>(factoryPool: FactoryPool, key: string) =>
  <U>(func: (object: T) => U) => {
    factoryPool.addCreator(key, func)
    return createContext<T>(factoryPool, key)
  }

const defineObject = (factoryPool: FactoryPool) =>
  <T,U = Partial<T>>(key: string, func: ObjectBuilderType<T>): DefineContext<U> => {
    factoryPool.addDefine(key, func)
    return createContext(factoryPool, key)
  }

export default defineObject
