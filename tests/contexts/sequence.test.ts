import sequence from '~/contexts/sequence'
import { Sequence } from '~/contexts'

describe('contexts/sequence', () => {
  let seq: Sequence

  beforeEach(() => seq = sequence(1))

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