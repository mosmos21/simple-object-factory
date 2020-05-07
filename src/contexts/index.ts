import sequence from '~/contexts/sequence'
import cycleOf from '~/contexts/cycleOf'
import { IFactoryPool } from '~/factoryPool'

export type Sequence = ReturnType<typeof sequence>

export type Context = {
  key: string
  sequence: Sequence,
  cycleOf: <T>(name: string) => T
}

export const createContext = (key: string, factoryPool: IFactoryPool): Context => {
  const id = factoryPool.nextId(key)

  return {
    key,
    sequence: sequence(id),
    cycleOf: cycleOf(key, factoryPool, id)
  }
}
