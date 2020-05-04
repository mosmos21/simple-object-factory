import FactoryPool from '~/factoryPool'
import defineObject from '~/defineObject'

const factoryPool = new FactoryPool()

export const define = defineObject(factoryPool)

const ObjectFactory = {
  factoryPool,
  define
}

export default ObjectFactory
