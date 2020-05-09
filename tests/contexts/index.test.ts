import { createContext } from '~/contexts'
import FactoryPool from '~/factoryPool'

describe('createContext', () => {
  test('A context is created with passed number.', () => {
    expect(Object.keys(createContext('key', new FactoryPool())))
      .toEqual(expect.arrayContaining(['cycleOf']))
  })
})
