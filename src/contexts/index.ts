import cycleOf from '~/contexts/cycleOf'
import { IFactoryPool } from '~/factoryPool'

export type Context = {
  key: string
  id: number
  cycleOf: <T>(name: string) => T
}

export const createContext = (key: string, factoryPool: IFactoryPool): Context => {
  const id = factoryPool.nextId(key)

  return {
    key,
    id,
    cycleOf: cycleOf(key, factoryPool, id)
  }
}
