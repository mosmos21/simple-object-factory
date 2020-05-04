const sequence = (id: number) => ({
  id: id,
  of: (func: (id: number) => string) => func(id),
  ofNumber: (func: (id: number) => number | string) => Number(func(id))
})

export default sequence
