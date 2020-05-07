import cycleOf from '~/contexts/cycleOf'
import FactoryPool from '~/factoryPool'

describe('contexts/cycleOf', () => {
  const factoryPool = new FactoryPool()

  test('', () => {
    jest.spyOn(factoryPool, 'getResources')
      .mockImplementation(() => ['foo', 'bar'])
    expect(cycleOf('key', factoryPool, 1)('name')).toEqual('foo')
    expect(cycleOf('key', factoryPool, 2)('name')).toEqual('bar')
    expect(cycleOf('key', factoryPool, 3)('name')).toEqual('foo')
  })
})
