import sequence from '~/contexts/sequence'

export type Context = {
  sequence: ReturnType<typeof sequence>
}