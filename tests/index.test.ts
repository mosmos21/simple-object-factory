import ObjectFactory from '~/index'

describe('exportedFunctions', () => {
  test('ObjectFactory.factoryPool is a object.', () => {
    expect(typeof ObjectFactory.factoryPool).toEqual('object')
  })

  test('ObjectFactory.define is a function.', () => {
    expect(typeof ObjectFactory.define).toEqual('function')
  })

  test('ObjectFactory.build is a function.', () => {
    expect(typeof ObjectFactory.build).toEqual('function')
  })

  test('ObjectFactory.create is a function.', () => {
    expect(typeof ObjectFactory.create).toEqual('function')
  })
})
