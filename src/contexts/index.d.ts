import sequence from '~/contexts/sequence'

export type Sequence = ReturnType<typeof sequence>

export type Context = {
  sequence: Sequence
}