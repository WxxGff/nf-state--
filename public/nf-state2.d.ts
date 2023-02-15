import type { InjectionKey } from 'vue';
import type { StateOption, IState, Store, StateCreateListOption, StateCreateOption
} from './type';
export declare const store: Store;
/**
 * 单独定义状态，可以是全局状态，也可以是局部状态
 * @param id 标识（string | symbol），全局状态不能重名；局部状态可以重名。
 * @param info StateCreateOption 状态描述：state、getter、action，或者 reactive、readonly
 * * info：
 * * 一：reactive、readonly，直接存入状态
 * * 二：含有getter或则action -- 使用子类的实例
 * * 三：对象（无state属性）--直接视为 state，不设置 getter 和 action
 * * 四：只有state属性，-- 使用基类的实例，同上
 * @param options StateOption 配置选项
 * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：number，安全等级，
 * * * * 1：宽松（都行）；
 * * * * 2：一般（不能直接改属性）；
 * * * * 3：严格（仅action）；
 * * * * 4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 */
export declare function defineStore<T>(id: string | symbol | InjectionKey<string>, info: StateCreateOption | any, options?: StateOption): T & IState;
/**
 * 创建全局状态。
 * @param info 状态列表，多个状态
 */
export declare function createStore(info: StateCreateListOption): (app: any) => void;
/**
 * 获取全局状态。implements IState
 * @param id 全局状态 的 ID，string | symbol
 * @returns 指定的状态
 */
export declare function useStore<T>(id: string | symbol | InjectionKey<string>): T & IState;
/**
 * 获取局部状态
 * @param id 状态的ID
 * @returns 局部状态
 */
export declare function useStoreLocal<T>(id: string | symbol | InjectionKey<string>): T & IState;

/**
 * 深层设置属性值，保留原属性，然后覆盖新属性值 options
 * @param target 目标
 * @param _source 来源
 */
export declare function deepSet<T extends object, U extends object>(target: T, _source: U): T;
 /**
  * 深层拷贝，只拷贝数据，新对象
  * @param target 目标，空的
  * @param  _source 来源
  */
export declare function deepClone<T extends object, U extends object>(target: T, _source: U): T;
 
 /**
 * 对象的状态的基类，提供基础功能 implements IState
 * * $state = {...} 整体赋值
 * * $patch({...}) 修改部分属性
 * * $reset() 恢复初始值
 */
export declare class BaseObject implements IState {
  get $id(): string | symbol | InjectionKey<string>;
  get $isLog(): boolean;
  get $_value(): any;
  constructor(_info: any);
  /**
   * 获取初始值，需要子类实现
   */
  /**
   * 恢复初始值
   */
  $reset(): void;
  /**
   * 替换部分属性，支持深层
   */
  $patch(_val: any): void;
  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): T;
  /**
   * 整体替换，会删除原有属性
   */
  set $state(value: any);
  /**
   * 给 object 加一个 forEach 的方法
   * @param cb 回调函数
   */
  $forEach(cb: (obj: any, key: string, index: number) => void): void;
  /**
   * 获取日志
   */
  get $log(): any;
  /**
   * 清空日志
   */
  $clearLog(): void;
}

/**
 * 继承 Array，做一个子类 implements IState
 */
export declare class BaseArray extends Array implements IState {
  get $id(): string | symbol | InjectionKey<string>;
  get $isLog(): boolean;
  get $_value(): any;
  constructor(_info?: any);
  /**
   * 获取初始值
   */
  /**
   * 恢复初始值
   */
  $reset(): void;
  /**
   * 没有实现功能，仅兼容 对象基类的方法
   */
  $patch(): void;
  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): Array<T>;
  /**
   * 整体替换，会清空原数组，
   */
  set $state(value: any);
  /**
   * 给 object 加一个 forEach 的方法
   */
  $forEach(): void;
  /**
   * 获取日志
   */
  get $log(): any;
  /**
   * 清空日志
   */
  $clearLog(): void;
  /**
   * 在开头添加，封装 unshift
   * @returns 返回新数组的长度
   */
  pushA(...arg: Array<any>): number;
  /**
   * 在指定位置i开始添加新元素，封装 splice
   * @param i 从 0 开始的位置
   * @param val 要添加的新元素
   * @returns 返回新数组的长度
   */
  pushAt(i: number, ...arg: Array<any>): void;
  /**
   * 删除第一个元素
   * @returns 返回被删除的元素
   */
  deleteA(): void;
  /**
   * 删除从指定位置 i 开始的 n 个元素
   * @param i 从 0 开始的位置
   * @param n 删除多少个元素
   * @returns 返回被删除的元素
   */
  deleteAt(i: number, n: number): any[];
  /**
   * 删除最后一个元素
   * @returns 返回被删除的元素
   */
  deleteZ(): void;
  /**
   * 交换两个数组元素的位置
   * @param i1 数组下标
   * @param i2 数组下标
   */
  swap(i1: number, i2: number): void;
}


/**
 * 创建有getter、actions 的状态
 * reactive 类型的状态，挂载 getter、action
 * @param { string | symbol | InjectionKey<string> } id 状态的标志
 * @param { StateCreateOption } info state、getter、action、options
 * @param { StateOption } options 配置选项
 * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：安全等级，
 * * * * 1：宽松（都行）；
 * * * * 2：一般（不能直接改属性）；
 * * * * 3：严格（仅action）；
 * * * * 4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 */
export declare function stateReactive (id: string | symbol | InjectionKey<string>, info: StateCreateOption, options?: StateOption = {}): void;
 

/**
 * 创建只有 state 的状态。
 * * 只有 state 的情况，直接使用 BaseObject 的实例
 * @param id 状态的标识
 * @param state state
 * @param options StateOption 配置选项
 * * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：安全等级，* 1：宽松（都行）；2：一般（不能直接改属性）；3：严格（仅action）；4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 * @returns
 */
export declare function stateOnly(id: string | symbol | InjectionKey<string>, state: any, options?: StateOption): {
  [x: number]: any;
  readonly $id: string | symbol | {
      toString: () => string;
      valueOf: () => symbol;
      readonly description: string | undefined;
      [Symbol.toPrimitive]: (hint: string) => symbol;
      readonly [Symbol.toStringTag]: string;
  };
  readonly $isLog: boolean;
  readonly $_value: any;
  $reset: () => void;
  $patch: () => void;
  $toRaw: <T>() => T[];
  $state: any;
  $forEach: () => void;
  readonly $log: any;
  $clearLog: () => void;
  pushA: (...arg: any[]) => number;
  pushAt: (i: number, ...arg: any[]) => void;
  deleteA: () => void;
  deleteAt: (i: number, n: number) => any[];
  deleteZ: () => void;
  swap: (i1: number, i2: number) => void;
  length: number;
  toString: () => string;
  toLocaleString: () => string;
  pop: () => any;
  push: (...items: any[]) => number;
  concat: {
      (...items: ConcatArray<any>[]): any[];
      (...items: any[]): any[];
  };
  join: (separator?: string | undefined) => string;
  reverse: () => any[];
  shift: () => any;
  slice: (start?: number | undefined, end?: number | undefined) => any[];
  sort: (compareFn?: ((a: any, b: any) => number) | undefined) => BaseArray;
  splice: {
      (start: number, deleteCount?: number | undefined): any[];
      (start: number, deleteCount: number, ...items: any[]): any[];
  };
  unshift: (...items: any[]) => number;
  indexOf: (searchElement: any, fromIndex?: number | undefined) => number;
  lastIndexOf: (searchElement: any, fromIndex?: number | undefined) => number;
  every: {
      <S extends any>(predicate: (value: any, index: number, array: any[]) => value is S, thisArg?: any): this is S[];
      (predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
  };
  some: (predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any) => boolean;
  forEach: (callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any) => void;
  map: <U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any) => U[];
  filter: {
      <S_1 extends any>(predicate: (value: any, index: number, array: any[]) => value is S_1, thisArg?: any): S_1[];
      (predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
  };
  reduce: {
      (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
      (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
      <U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: any[]) => U_1, initialValue: U_1): U_1;
  };
  reduceRight: {
      (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
      (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
      <U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: any[]) => U_2, initialValue: U_2): U_2;
  };
  find: {
      <S_2 extends any>(predicate: (this: void, value: any, index: number, obj: any[]) => value is S_2, thisArg?: any): S_2 | undefined;
      (predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): any;
  };
  findIndex: (predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any) => number;
  fill: (value: any, start?: number | undefined, end?: number | undefined) => BaseArray;
  copyWithin: (target: number, start: number, end?: number | undefined) => BaseArray;
  entries: () => IterableIterator<[number, any]>;
  keys: () => IterableIterator<number>;
  values: () => IterableIterator<any>;
  includes: (searchElement: any, fromIndex?: number | undefined) => boolean;
  flatMap: <U_3, This = undefined>(callback: (this: This, value: any, index: number, array: any[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
  flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
  at: (index: number) => any;
  [Symbol.iterator]: () => IterableIterator<any>;
  [Symbol.unscopables]: () => {
      copyWithin: boolean;
      entries: boolean;
      fill: boolean;
      find: boolean;
      findIndex: boolean;
      keys: boolean;
      values: boolean;
  };
} | {
  readonly $id: string | symbol | {
      toString: () => string;
      valueOf: () => symbol;
      readonly description: string | undefined;
      [Symbol.toPrimitive]: (hint: string) => symbol;
      readonly [Symbol.toStringTag]: string;
  };
  readonly $isLog: boolean;
  readonly $_value: any;
  $reset: () => void;
  $patch: (_val: any) => void;
  $toRaw: <T_1>() => T_1;
  $state: any;
  $forEach: (cb: (obj: any, key: string, index: number) => void) => void;
  readonly $log: any;
  $clearLog: () => void;
};
