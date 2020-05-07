import { IFactoryPool } from '~/factoryPool'

const cycleOf = (key: string, factoryPool: IFactoryPool, id: number) =>
  <T>(name: string) => {
    const resources = factoryPool.getResources<T>(key, name)
    return resources[(id - 1) % resources.length]
  }

export default cycleOf
