import FactoryPool, { ObjectBuilderType } from '~/factoryPool'

type DefineContext<T> = {

}

const createContext = <T>(key: string): DefineContext<T> => ({

})

const withTrait = <T>(key: string) =>
  (traits: { [key: string]: ObjectBuilderType<T> }) => {

  }

const defineObject = (factoryPool: FactoryPool) =>
  <T>(key: string, func: ObjectBuilderType<T>): DefineContext<T> => {
    factoryPool.addDefine(key, func)
    return createContext(key)
  }

export default defineObject
