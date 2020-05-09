Simple Object Factory
===

![](https://github.com/mosmos21/simple-object-factory/workflows/Run%20Test/badge.svg)
![](https://github.com/mosmos21/simple-object-factory/workflows/Build%20Check/badge.svg)

Define and build/create object.

## Installation

```bash
# use npm
$ npm install --save simple-object-factory
# use yarn
$ yarn add simple-object-factory
```

## Usage

```typescript
import ObjectFactory from 'simple-object-factory'
// or, you can import each function individually.
import { define, build, create } from 'simple-object-factory' 

type UserAttribute = { id: number, name: string, age: number }

class User {
  constructor(public attr: UserAttribute) {
  }
}

ObjectFactory
  .define<UserAttribute>('user', ({ id }) => ({
    id: id,
    name: `userName${id}`,
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

This library is broadly dividing into three functions.

- define  
It can define a function, receive a context, and returns an object.
Following the definition, it can define the trait, resource, and function for creating an object.

- build  
The function is building the object with a defined function.
When building, it can pass the trait and optional values.

- create  
The function is creating the object with a defined function.
To call this function, "onCreate" or "onCreateWithClass" must be called at definition.

### Function definitions

#### define\<\<T, U = Partial\<T\>\>(key: string, func: ObjectBuilderType\<T\>) => DefineContext\<U\>) 

`DefineContext` contains the following functions described below.

- withTrait
- onCreate
- onCreateWithClass

The definition of `Context` and `ObjectBuilderType` is as follows.

```
type Context = {
  key: string
  id: number
  cycleOf: <T>(name: string) => T
}

type ObjectBuilderType<T = any> = (ctx: Context) => T
```

The values of `Context` are as follows.

- key: Its value equals the key, the argument of define.
- id: It increments every time "define" or "create" is called.
- cycleOf: Returns the value of the array defined in "withResource".


#### withTrait(traits: { [key: string]: ObjectBuilderType\<T\> }) => DefineContext\<T\>

It can call after ObjectFactory.define().
The argument is the object; the key is trait name, and the value is function receive `Context` and returns an object.

#### withResource(resources: { [key: string]: any[] }) => DefineContext\<T\>

It can call after ObjectFactory.define().
The argument is the object; the key is resource name, and the value is array.

#### onCreate<U>(func: (object: T) => U) => DefineContext<T>

It can call after ObjectFactory.define().
The argument is the function, receive the value of built and returns any value.


### onCreateWithClass<U extends { new(attr: T): any }>(clazz: U) => DefineContext<T>

It equals `onCreaate(attr => new clazz)`
