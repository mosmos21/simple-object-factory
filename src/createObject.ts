import { IFactoryPool } from '~/factoryPool'
import buildObject from '~/buildObject'

const createObject = (factoryPool: IFactoryPool) =>
  <T, U = Partial<T>, V = any>(key: string, traitNames?: string[], option?: U): V => {
    const obj = buildObject(factoryPool)(key, traitNames, option)
    return factoryPool.getCreator(key)(obj) as V
  }

export default createObject
