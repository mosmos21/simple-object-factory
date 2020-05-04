import FactoryPool from '~/factoryPool'
import defineObject from '~/defineObject'
import buildObject from '~/buildObject'

const factoryPool = new FactoryPool()

export const define = defineObject(factoryPool)

export const build = buildObject(factoryPool)

const ObjectFactory = {
  factoryPool,
  define,
  build
}

export default ObjectFactory
