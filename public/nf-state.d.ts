import type { InjectionKey } from 'vue'

import type {
  Store,
  IState,
  StateLogInfo,
  StateLog,
  StateOption,
  StateCreateOption,
  StateCreateListOption
} from './type'

/**
 * 状态的基础类型
 * * $id —— 状态标识，string | symbol
 * * _value —— 记录原值，可以是对象，也可以是 function 
 * * isLog —— 是否记录日志。true ：记日志；false： 不记日志（默认值）
 * * 内置方法
 * * * $reset —— 重置
 * * * $patch —— 修改部分属性
 * * * set $state —— 整体赋值，会去掉原属性
 * * * $toRaw —— 取原型，不包含内部方法
 * * * get log() —— 获取日志
 * * * 
 * * 
 */
declare class BaseObject {
  get $id(): string | symbol | InjectionKey<string>
  get $isLog(): boolean
  get $_value(): any

  constructor(_info: any)

  /**
   * 恢复初始值
   */
  $reset(): void;

  /**
   * 替换部分属性，支持深层
   */
  $patch(_val: any): void;
  
  /**
   * 整体替换，会删除原有属性
   */
  set $state(value: any);

  $statef(value: any);

  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): T;

  /**
   * 给 object 加一个 forEach 的方法
   * @param { function } cb 回调函数
   */
  $forEach(cb: () => void) : void;

  /**
   * 获取日志
   */
  get $log() : Array<StateLogInfo>;
  
  /**
   * 清空日志
   */
  $clearLog(): void;
}

/**
 * 继承 Array，做一个子类 implements IState
 */
declare class BaseArray {
  get $id(): string | symbol | InjectionKey<string>
  get $isLog(): boolean
  get $_value() : any

  constructor(_info: any)

  /**
   * 恢复初始值
   */
  $reset(): void;

  /**
   * 没有实现功能，仅兼容 对象基类的方法
   */
  $patch(_val): void;
 
  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): T;
    
  /**
   * 整体替换，会删除原有属性
   */
  set $state(value: any);
  
  /**
   * 获取日志
   */
  get $log() : Array<StateLogInfo>;

  /**
   * 清空日志
   */
  $clearLog(): void;

  /**
   * 在开头添加，封装 unshift
   * @returns void
   */
  pushA(...arg: Array<any>): void;
  
  /**
   * 在指定位置i开始添加新元素，封装 splice
   * @param { number } i 从 0 开始的位置
   * @param { any } val 要添加的新元素
   * @returns void
   */
  pushAt(i: number, ...arg: Array<any>): void;

  /**
   * 删除第一个元素
   * @returns void
   */
  deleteA(): void

  
  /**
   * 删除从指定位置 i 开始的 n 个元素
   * @param {number} i 从 0 开始的位置
   * @param {number} n 删除多少个元素
   * @returns void
   */
  deleteAt(i: number, n: number): void;

  /**
   * 删除最后一个元素
   * @returns void
   */
  deleteZ(): void

  /**
   * 交换两个数组元素的位置
   * @param { number } 数组下标
   * @param { number } 数组下标
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
declare function stateReactive (id: string | symbol | InjectionKey<string>, info: StateCreateOption, options?: StateOption): void;
 
/**
 * 创建只有 state 的状态。
 * * 只有 state 的情况，直接使用 BaseObject 的实例
 * @param { string | symbol | InjectionKey<string> } id 状态的标识
 * @param { any } state state
 * @param { StateOption } options 配置选项
 * * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：安全等级，* 1：宽松（都行）；2：一般（不能直接改属性）；3：严格（仅action）；4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 * @returns 
 */
declare function stateOnly (id: string | symbol | InjectionKey<string>, state: any, options?: StateOption): void;
 
/**
 * 获取全局状态。
 */
declare const store: Store;
 
/**
 * 获取全局状态。implements IState
 * @param id 全局状态 的 ID，string | symbol | InjectionKey<string>
 * @returns 指定的状态
 */
declare function useStore<T> (id?: string | symbol | InjectionKey<string>): T & IState

/**
 * 获取局部状态
 * @param id 状态的ID
 * @returns 局部状态
 */
declare function useStoreLocal<T> (id: string | symbol | InjectionKey<string>): T & IState
  
/**
 * 创建全局状态。
 * @param { StateCreateListOption } info 状态列表，多个状态
 */
declare function createStore(info: StateCreateListOption): void;
  
/**
 * 单独定义状态，可以是全局状态，也可以是局部状态
 * @param { string | symbol | InjectionKey<string> } id 标识（string | symbol），全局状态不能重名；局部状态可以重名。
 * @param { StateCreateOption } info 状态描述：state、getter、action，或者 reactive、readonly
 * * info：
 * * 一：reactive、readonly，直接存入状态
 * * 二：含有getter或则action -- 使用子类的实例
 * * 三：对象（无state属性）--直接视为 state，不设置 getter 和 action
 * * 四：只有state属性，-- 使用基类的实例，同上
 * @param { StateOption } options 配置选项
 * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：number，安全等级，
 * * * * 1：宽松（都行）；
 * * * * 2：一般（不能直接改属性）；
 * * * * 3：严格（仅action）；
 * * * * 4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 */
declare function defineStore<T>(id: string | symbol | InjectionKey<string>, info: StateCreateOption | any, options?: StateOption): T & IState;