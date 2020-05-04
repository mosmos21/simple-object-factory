import FactoryPool, { ObjectBuilderType } from '~/factoryPool'

const defineObject = (factoryPool: FactoryPool) => (key: string, func: ObjectBuilderType) => {
  factoryPool.addDefine(key, func)
}

export default defineObject
