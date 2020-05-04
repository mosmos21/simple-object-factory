import sequence from '~/contexts/sequence'

export type Sequence = ReturnType<typeof sequence>

export type Context = {
  sequence: Sequence
}

export const createContext = (n: number): Context => ({
  sequence: sequence(n)
})
