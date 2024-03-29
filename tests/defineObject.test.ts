import FactoryPool, { ObjectBuilderType } from '~/factoryPool'
import defineObject from '~/defineObject'

type T = {
  id: number,
  name: string,
  value: number
}

describe('defineObject', () => {
  const contextNames = ['withTrait', 'withResource', 'onCreate', 'onCreateWithClass']
  const func: ObjectBuilderType<T> = (({ id }) => ({
    id: id,
    name: 'foo',
    value: 1
  }))

  let factoryPool: FactoryPool

  beforeEach(() => factoryPool = new FactoryPool())

  test('FactoryPool#setDefine is called.', () => {
    jest.spyOn(factoryPool, 'addDefine')
    const define = defineObject(factoryPool)

    define('key', func)
    expect(factoryPool.addDefine).toBeCalledWith('key', func)
  })

  test('The function returns DefineContext', () => {
    const define = defineObject(factoryPool)

    expect(Object.keys(define('key', func))).toEqual(contextNames)
  })

  describe('.withTrait', () => {
    test('factoryPool.addTrait is called twice.', () => {
      jest.spyOn(factoryPool, 'addTrait')
      const defineContext = defineObject(factoryPool)('key', func)

      defineContext.withTrait({
        trait_a: () => ({ name: 'name' }),
        trait_b: () => ({ value: 2 })
      })
      expect(factoryPool.addTrait).toBeCalledTimes(2)
    })

    test('The function returns DefineContext', () => {
      const defineContext = defineObject(factoryPool)('key', func)

      expect(Object.keys(defineContext.withTrait({}))).toEqual(contextNames)
    })
  })

  describe('.withResource', () => {
    test('factoryPool.addResource is called twice.', () => {
      jest.spyOn(factoryPool, 'addResource')
      const defineContext = defineObject(factoryPool)('key', func)

      defineContext.withResource({
        resource_a: [1, 2, 3],
        resource_b: ['foo', 'bar', 'baz']
      })
      expect(factoryPool.addResource).toBeCalledTimes(2)
    })

    test('The function returns DefineContext', () => {
      const defineContext = defineObject(factoryPool)('key', func)

      expect(Object.keys(defineContext.withResource({}))).toEqual(contextNames)
    })
  })

  describe('.onCreate', () => {
    test('factoryPool.addCreator is called.', () => {
      jest.spyOn(factoryPool, 'addCreator')
      const defineContext = defineObject(factoryPool)('key', func)

      defineContext.onCreate(_ => ({}))
      expect(factoryPool.addCreator).toBeCalled()
    })

    test('The function returns DefineContext', () => {
      const defineContext = defineObject(factoryPool)('key', func)

      expect(Object.keys(defineContext.onCreate(_ => ({})))).toEqual(contextNames)
    })
  })

  describe('.onCreateWithClass', () => {
    class Foo {}
    test('factoryPool.addCreator is received the function, returning a value of the instance of Foo.', () => {
      jest.spyOn(factoryPool, 'addCreator').mockImplementation((key, func) => {
        expect(key).toEqual('key')
        expect(func(Foo)).toBeInstanceOf(Foo)
      })
      const defineContext = defineObject(factoryPool)('key', func)
      defineContext.onCreateWithClass(Foo)
    })
  })

  test('The function returns DefineContext', () => {
    class Foo {}
    const defineContext = defineObject(factoryPool)('key', func)

    expect(Object.keys(defineContext.onCreateWithClass(Foo))).toEqual(contextNames)
  })
})
