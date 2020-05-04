import FactoryPool from '~/factoryPool'
import defineObject, { DefineContext } from '~/defineObject'
import buildObject from '~/buildObject'
import createObject from '~/createObject'

const factoryPool = new FactoryPool()

export const define = defineObject(factoryPool)

export const build = buildObject(factoryPool)

export const create = createObject(factoryPool)

const ObjectFactory = {
  factoryPool,
  define,
  build,
  create
}

export default ObjectFactory
