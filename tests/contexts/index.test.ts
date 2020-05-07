import { createContext } from '~/contexts'
import FactoryPool from '~/factoryPool'

describe('createContext', () => {
  const sequence = jest.fn()
  jest.mock('~/contexts/sequence', () => sequence)

  test('A context is created with passed number.', () => {
    expect(Object.keys(createContext('key', new FactoryPool())))
      .toEqual(expect.arrayContaining(['sequence', 'cycleOf']))
  })
})
