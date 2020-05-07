import { IFactoryPool } from '~/factoryPool'

const cycleOf = (key: string, factoryPool: IFactoryPool, id: number) =>
  <T>(name: string) => {
    const resource = factoryPool.getResource<T>(key, name)
    return resource[(id - 1) % resource.length]
  }

export default cycleOf
