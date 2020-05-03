import FactoryPool from '~/factoryPool'

describe('factoryPool.ts', () => {
  let factoryPool: FactoryPool
  beforeEach(() => factoryPool = new FactoryPool())
  
  describe ('#nextId', () => {
  
    test('Got 1, when get with undefined id.', () => {
      expect(factoryPool.nextId('newKey')).toEqual(1)
    })

    test('Got 2, when get with same id.', () => {
      factoryPool.nextId('key')
      expect(factoryPool.nextId('key')).toEqual(2)
    })
  })

  describe('#resetAllId', () => {
    test('Got 1, when after calling resetAllId.', () => {
      factoryPool.nextId('key')
      factoryPool.resetAllId()
      expect(factoryPool.nextId('key')).toEqual(1)
    })
  })

  describe('#resetId', () => {
    beforeEach(() => {
      factoryPool.nextId('key1')
      factoryPool.nextId('key2')
    })

    test('Got 1, when after calling resetId.', () => {
      factoryPool.resetId('key1')
      expect(factoryPool.nextId('key1')).toEqual(1)
    })

    test('A key not rese teturns the next id.', () => {
      factoryPool.resetId('key1')
      expect(factoryPool.nextId('key2')).toEqual(2)
    })
  })

  describe('#addDefine', () => {
    test('When defining with the new key, the error is not thrown.', () => {
      expect(() => { factoryPool.addDefine('newKey', _ => {})}).not.toThrow()
    })

    test('When defining with the exists key, the error is thrown.', () => {
      factoryPool.addDefine('key', _ => {})
      expect(() => { factoryPool.addDefine('key', _ => {}) }).toThrow()
    })
  })

  describe('#getDefine', () => {
    beforeEach(() => factoryPool.addDefine('key', _ => {}))
    
    test('When getting to the exists key, the error is not thrown.', () => {
      expect(() => { factoryPool.getDefine('key') }).not.toThrow()
    })

    test('When getting to the new key, the error is thrown.', () => {
      expect(() => { factoryPool.getDefine('newKey' )}).toThrow()
    })
  })
})
