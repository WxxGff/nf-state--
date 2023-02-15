
import type { InjectionKey } from 'vue'

/**
 * 内部保存状态的容器
 */
export interface Store {
  [key: string | number | symbol | InjectionKey<string>] : any
}

/**
 * 状态的类型，对象和数组都需要实现这个接口
 * * $id —— 状态标识，string | symbol
 * * _value —— 记录原值，可以是对象，也可以是 function 
 * * isLog —— 是否记录日志。true ：记日志；false： 不记日志（默认值）
 * * 内置方法
 * * * $reset —— 重置
 * * * $patch —— 修改部分属性
 * * * set $state —— 整体赋值，会去掉原属性
 * * * $toRaw —— 取原型，不包含内部方法
 * * * get $log() —— 获取日志
 * * * $clearLog() —— 清空日志
 * * * 
 * * 
 */
export interface IState {
  /**
   * 状态标识，string | symbol
   */
  get $id(): string | symbol | InjectionKey<string>
  
  /**
   * 记录原值，可以是对象，也可以是 function 
   */
  get $_value(): any
  
  /**
   * 是否记录日志。true ：记日志；false： 不记日志（默认值）
   */
  $isLog: boolean

  /**
   * 重置
   */
  $reset (): void
  
  /**
   * 修改部分属性
   */
  $patch(_val: any): void
  
  /**
   * 整体赋值，会去掉原属性
   */
  set $state(value: any)
  
  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): T
  
  /**
   * 对象内置的遍历方式
   * @param cb 回调函数
   */
  $forEach(cb:(obj: any, key: string, index: number) => void): void

  /**
   * 获取日志
   */
  get $log(): Array<StateLogInfo>

  /**
   * 清空日志
   */
  $clearLog(): void
}

/**
 * 日志的类型
 * * {
 * *   time: '时间戳',
 * *   kind: '', // 操作类型
 * *   oldValue: {},
 * *   newValue: {},
 * *   subValue: {}, // 参数
 * *   callFun: '' // 调用的函数名
 * * }
 */
export interface StateLogInfo {
  time: number,
  time2?: string,
  kind: string, // 操作类型
  oldValue: any,
  newValue: any,
  subValue: any, // 参数
  callFun: string // 调用的函数名
}

/**
 * 记录状态的变化日志容器，用key来区分
 * * stateLog = {
 * *  key: {
 * *   log: [
 * *     {
 * *       time: '时间戳',
 * *       kind: '', // 操作类型
 * *       oldValue: {},
 * *       newValue: {},
 * *       subValue: {}, // 参数
 * *       callFun: '' // 调用的函数名
 * *     }
 * *   ]
 * *  }
 * * }
 */
export interface StateLog {
  [index: string | symbol] : {
    log: Array<StateLogInfo>
  }
}

/**
 * 创建状态的选项。
 * * isLocal —— true：局部状态；false：全局状态（默认属性）；
 * * isLog ——  true：做记录；false：不用做记录（默认属性）；
 * * level ——
 * * * 1：宽松，可以各种改变属性，适合弹窗、抽屉、多tab切换等。
 * * * 2：一般，不能通过属性直接改状态，只能通过内置函数、action 改变状态
 * * * 3：严格，不能通过属性、内置函数改状态，只能通过 action 改变状态
 * * * 4：超严，只能在指定组件内改变状态，比如当前用户的状态，只能在登录组件改，其他组件完全只读
 */
export interface StateOption {
  /**
   * true：局部状态；false：全局状态（默认属性）；
   */
  isLocal?: boolean, 
  /**
   * true：做记录；false：不用做记录（默认属性）；
   */
  isLog?: boolean, // 
  /**
   * 1：宽松，可以各种改变属性，适合弹窗、抽屉、多tab切换等。
   * 2：一般，不能通过属性直接改状态，只能通过内置函数、action 改变状态
   * 3：严格，不能通过属性、内置函数改状态，只能通过 action 改变状态
   * 4：超严，只能在指定组件内改变状态，比如当前用户的状态，只能在登录组件改，其他组件完全只读
  */
  level?: number
}


/**
 * 创建一个状态的参数类型
 */
export interface StateCreateOption {
  state?: any,
  getters?: any,
  actions?: any,
  options?: StateOption
}

/**
 * 创建多个状态的类型
 */
export interface StateCreateListOption {
  store: {
    [index: string | symbol]: StateCreateOption | any
  },
  init: () => void
}
