export declare type ObjectBuilderType<T = any> = (ctx: Context) => T;


export type Sequence = {
  id: number,
  of :(func: (id: number) => string) => string;
  ofNumber: (func: (id: number) => number | string) => number;
}


export declare type DefineContext<T = any> = {
  withTrait: (traits: {
    [key: string]: ObjectBuilderType<T>;
  }) => DefineContext<T>;
  onCreate: <U>(func: (object: T) => U) => DefineContext<T>;
};


export declare type Context = {
  sequence: Sequence;
};


export interface IFactoryPool {
  nextId(key: string): number;
  resetAllId(): void;
  resetId(key: string): void;
  addDefine(key: string, func: ObjectBuilderType): void;
  getDefine(key: string): ObjectBuilderType;
  addTrait(key: string, name: string, func: ObjectBuilderType): void;
  getTrait(key: string, name: string): ObjectBuilderType;
  addCreator(key: string, func: Function): void;
  getCreator(key: string): Function;
}


export declare const define: <T, U = Partial<T>>(
  key: string, func: ObjectBuilderType<T>) => DefineContext<U>;


export declare const build: <T, U = Partial<T>>(
  key: string, traitNames?: string[] | undefined, option?: U | undefined) => U & T;


export declare const create: <T, U = Partial<T>, V = any>(
  key: string, traitNames?: string[] | undefined, option?: U | undefined) => V;


declare const ObjectFactory: {
  factoryPool: IFactoryPool;
  define: <T, U = Partial<T>>(key: string, func: ObjectBuilderType<T>) => DefineContext<U>;
  build: <T_1, U_1 = Partial<T_1>>(
    key: string, traitNames?: string[] | undefined, option?: U_1 | undefined) => U_1 & T_1;
  create: <T_2, U_2 = Partial<T_2>, V = any>(
    key: string, traitNames?: string[] | undefined, option?: U_2 | undefined) => V;

};

export default ObjectFactory;
