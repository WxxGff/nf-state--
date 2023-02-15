
import { toRaw } from 'vue'
import type { InjectionKey } from 'vue'

import type { IState } from '../types/type'

// 日志
import {
  stateLog // 记录容器
  // addLog // 添加一条记录
} from './_log'

/**
 * 继承 Array，做一个子类 implements IState
 */
export default class BaseArray extends Array implements IState {
  get $id(): string | symbol | InjectionKey<string>
  get $isLog(): boolean
  get $_value() : any

  constructor (_info?: any) {
    // 调用父类的 constructor()
    super()
    let arr = _info
    if (typeof _info === 'function') {
      arr = _info()
    }
    // 设置初始值
    if (Array.isArray(arr)) {
      if (arr.length > 0) this.push(...arr)
    } else {
      if (arr) this.push(arr)
    }
  }
  /**
   * 获取初始值
   */
  // get _value() {
  //  return {}
  // }
  /**
   * 恢复初始值
   */
  $reset () {
    if (this.$_value) {
      this.length = 0
      const _val = (typeof this.$_value === 'function') ? this.$_value() : this.$_value
      this.push(..._val)
    }
  }
  /**
   * 没有实现功能，仅兼容 对象基类的方法
   */
  $patch() {
    // this.splice(...arguments)
  }
  
  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): Array<T> {
    const arr: Array<T> = []
    const tmp = toRaw(this)
    tmp.forEach(item => {
      arr.push( (item.$toRaw) ? item.$toRaw() : item )
    })
    return arr
  }

  /**
   * 整体替换，会清空原数组，
   */
  set $state(value) {
    // 删除原有数据
    this.length = 0
    if (Array.isArray(value)) {
      this.push(...value)
    } else {
      this.push(value)
    }
  }

  
  /**
   * 给 object 加一个 forEach 的方法
   */
  $forEach() {}

  /**
   * 获取日志
   */
  get $log() {
    if (stateLog[this.$id]) {
      return stateLog[this.$id].log
    } else {
      return []
    }
  }
  
  /**
   * 清空日志
   */
  $clearLog() {
    if (stateLog[this.$id]) {
      stateLog[this.$id].log.length = 0
    }
  }
  
  // 添加类==========================================
  /**
   * 在开头添加，封装 unshift
   * @returns 返回新数组的长度
   */
  pushA(...arg: Array<any>) {
    return this.unshift(...arg)
    // return this.unshift(...arguments)
  }

  /**
   * 在指定位置i开始添加新元素，封装 splice
   * @param i 从 0 开始的位置
   * @param val 要添加的新元素
   * @returns 返回新数组的长度
   */
  pushAt(i: number, ...arg: Array<any>) {
    // console.log(arguments)
    this.splice(i, 0, ...arg)
  }

  // 删除类==========================================
  /**
   * 删除第一个元素
   * @returns 返回被删除的元素
   */
  deleteA() {
    this.shift()
  }

  /**
   * 删除从指定位置 i 开始的 n 个元素
   * @param i 从 0 开始的位置
   * @param n 删除多少个元素
   * @returns 返回被删除的元素
   */
  deleteAt(i: number, n: number) {
    return this.splice(i, n)
  }

  /**
   * 删除最后一个元素
   * @returns 返回被删除的元素
   */
  deleteZ() {
    this.pop()
  }

  // 修改类==========================================
  /**
   * 交换两个数组元素的位置
   * @param i1 数组下标 
   * @param i2 数组下标 
   */
  swap(i1: number, i2: number) {
    const tmp = this[i1]
    this[i1] = this[i2]
    this[i2] = tmp
  }
  // 查找类==========================================
  // 其他类==========================================


}
