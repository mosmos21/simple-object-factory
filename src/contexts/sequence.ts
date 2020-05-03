const seqFunc = <T>(id: number) => (func: (id: number) => T) => func(id)

const sequence = (id: number) => {
  of: seqFunc<string>(id)
  ofNumber: seqFunc<number>(id)
}

export default sequence