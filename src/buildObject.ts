import FactoryPool from '~/factoryPool'
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

const buildObject = (factoryPool: FactoryPool) =>
  <T>(key: string, option?: Partial<T>): T => {
    const objectDefine = factoryPool.getDefine(key)
    const context = createContext(factoryPool.nextId(key))

    return mergeObject([
      option,
      objectDefine(context)
    ]) as T
  }

export default buildObject
