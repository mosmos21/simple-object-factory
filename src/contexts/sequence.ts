export type Sequence = {
  id: number,
  of :(func: (id: number) => string) => string;
  ofNumber: (func: (id: number) => number) => number;
}

const sequence = (id: number): Sequence => ({
  id,
  of: (func: (id: number) => string) => func(id),
  ofNumber: (func: (id: number) => number | string) => Number(func(id))
})

export default sequence
