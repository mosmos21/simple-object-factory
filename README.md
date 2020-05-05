Simple Object Factory
===

Define and build/create object.

## Installation

```bash
# use npm
$ npm install --save object-comparator
# use yarn
$ yarn add object-comparator
```

## Usage

```typescript
import ObjectFactory from 'simple-object-factory'
import { define, build, create } from 'simple-object-factory' // or, you can import each function individually.

type UserAttribute = { id: number, name: string, age: number }

class User {
  constructor(public attr: UserAttribute) {
  }
}

ObjectFactory
  .define<UserAttribute>('user', ({ sequence }) => ({
    id: sequence.id,
    name: sequence.of(id => `userName${id}`),
    age: 20
  }))
  .withTrait({
    underAge: () => ({
      age: 10
    }),
    senior: () => ({
      age: 60
    })
  })
  .onCreate((attr: UserAttribute) => new User(attr))


const userAttribute = build('user')
console.log(userAttribute)
// => { id: 1, name: 'userName1', age: 20 }


const user = create('user', ['underAge'])
console.log(user.attr)
// => { age: 10, id: 2, name: 'userName2' }
```

## API
