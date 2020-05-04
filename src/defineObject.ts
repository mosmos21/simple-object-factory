import FactoryPool, { ObjectBuilderType } from '~/factoryPool'

export type DefineContext<T = any> = {
  withTrait: (traits: { [key: string]: ObjectBuilderType<T> }) => DefineContext<T>
}

const createContext = <T>(factoryPool: FactoryPool, key: string): DefineContext<T> => ({
  withTrait: withTrait<T>(factoryPool, key)
})

const withTrait = <T>(factoryPool: FactoryPool, key: string) =>
  (traits: { [key: string]: ObjectBuilderType<T> }) => {
    Object.entries(traits).forEach(([traitName, func]) => {
      factoryPool.addTrait(key, traitName, func)
    })
    return createContext<T>(factoryPool, key)
  }

const defineObject = (factoryPool: FactoryPool) =>
  <T,U = Partial<T>>(key: string, func: ObjectBuilderType<T>): DefineContext<U> => {
    factoryPool.addDefine(key, func)
    return createContext(factoryPool, key)
  }

export default defineObject
