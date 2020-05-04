import sequence from '~/contexts/sequence'
import { Sequence } from '../../src/contexts'

describe('contexts/sequence', () => {
  let seq: Sequence

  beforeEach(() => seq = sequence(1))

  describe('#id', () => {
    test('Return value is equal id', () => {
      expect(seq.id).toEqual(1)
    })
  })

  describe('#of', () => {
    test('A string is returned', () => {
      expect(seq.of(id => `seq-${id}`)).toEqual('seq-1')
    })
  })

  describe('#ofNumber', () => {
    test('A number is returned', () => {
      expect(seq.ofNumber(id => `${id * 10}`)).toEqual(10)
    })
  })
})
