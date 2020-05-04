import { createContext } from '~/contexts'

describe('createContext', () => {
  const sequence = jest.fn()
  jest.mock('~/contexts/sequence', () => sequence)

  test('A context is created with passed number.', () => {
    expect(Object.keys(createContext(1))).toEqual(expect.arrayContaining(['sequence']))
  })
})
