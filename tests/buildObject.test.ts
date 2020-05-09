import FactoryPool, { ObjectBuilderType } from '~/factoryPool'
import buildObject from '~/buildObject'

describe('buildObject', () => {
  const func: ObjectBuilderType = (({ id }) => ({
    id: id,
    name: 'objectName',
    value: undefined
  }))

  test('FactoryPool#getDefine is called.', () => {
    const factoryPool = new FactoryPool()
    jest.spyOn(factoryPool, 'getDefine').mockImplementation(() => func)
    const build = buildObject(factoryPool)

    build('key')
    expect(factoryPool.getDefine).toBeCalledWith('key')
  })

  test('the object is created with defined build-function.', () => {
    const factoryPool = new FactoryPool()
    jest.spyOn(factoryPool, 'getDefine').mockImplementation(() => func)
    const build = buildObject(factoryPool)

    expect(build('key')).toMatchObject({ id: 1, name: 'objectName' })
  })

  test('The returned object merges with the passed optional object.', () => {
    const factoryPool = new FactoryPool()
    jest.spyOn(factoryPool, 'getDefine').mockImplementation(() => func)
    const build = buildObject(factoryPool)
    const option =  { name: 'optionalName', value: undefined }

    expect(build('key', [], option)).toMatchObject({
      id: 1,
      name: 'optionalName'
    })
  })
})
