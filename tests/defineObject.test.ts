import FactoryPool, { ObjectBuilderType } from '~/factoryPool'
import defineObject from '~/defineObject'

describe('defineObject', () => {
  const func: ObjectBuilderType = (({ sequence }) => ({ id: sequence.id }))

  let factoryPool: FactoryPool

  beforeEach(() => factoryPool = new FactoryPool())

  test('FactoryPool#setDefine is called.', () => {
    jest.spyOn(factoryPool, 'addDefine')
    const define = defineObject(factoryPool)

    define('key', func)
    expect(factoryPool.addDefine).toBeCalledWith('key', func)
  })
})
