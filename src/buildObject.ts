import { IFactoryPool } from '~/factoryPool'
import { createContext } from '~/contexts'

const mergeObject = (objects: { [key: string]: any }[]) => {
  const arr = objects.filter(Boolean)
  const map: { [key: string]: true } = {}

  arr.forEach(obj => Object.keys(obj).forEach(key => map[key] = true))

  const res: { [key: string]: any } = {}
  Object.keys(map).forEach(key => {
    const obj = arr.find(obj => obj[key] !== undefined)
    obj && (res[key] = obj[key])
  })
  return res
}

const buildObject = (factoryPool: IFactoryPool) =>
  <T, U = Partial<T>>(key: string, traitNames?: string[], option?: U): U & T => {
    const objectDefine = factoryPool.getDefine(key)
    const context = createContext(factoryPool.nextId(key))
    const traitObjects = traitNames
      ? traitNames.map(name => factoryPool.getTrait(key, name)(context))
      : []

    return mergeObject([
      option,
      ...traitObjects,
      objectDefine(context)
    ]) as U & T
  }

export default buildObject
