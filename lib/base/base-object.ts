
import { toRaw } from 'vue'
import type { InjectionKey } from 'vue'

import type { IState } from '../types/type'

// 两种深层赋值的函数
import { deepSet, deepClone } from './assign'
import BaseArray from "./base-array"

// 日志
import {
  stateLog, // 记录容器
  addLog // 添加一条记录
} from './_log'


/**
 * 对象的状态的基类，提供基础功能 implements IState 
 * * $state = {...} 整体赋值
 * * $patch({...}) 修改部分属性
 * * $reset() 恢复初始值
 */
export default class BaseObject implements IState {
  get $id(): string | symbol | InjectionKey<string>
  get $isLog(): boolean
  get $_value(): any

  constructor (_info: any) {
    if (typeof _info === 'function') {
      // state 是函数，执行
      const val = _info()
      Object.keys(val).forEach(key => {
        const p = val[key]
        if (Array.isArray(p)) {
          this[key] = new BaseArray(p)
        } else {
          if (typeof p === 'object' && p !== null) {
            this[key] = new BaseObject(p)
          } else {
            this[key] = p
          }
        }
      })
    } else {
      // state 是对象，深考
      deepClone(this, _info)
    }
    if (this.$isLog) {
      addLog(this.$id, 'init', {}, {})
    }
  }
  /**
   * 获取初始值，需要子类实现
   */
  // get _value() {
  //  return _initialValue
  // }
  
  /**
   * 恢复初始值
   */
  $reset () {
    if (this) {
      // 没有设置的话，就不重置了
      if (!this.$_value) return
      
      const v = this.$_value
      const newVal = (typeof v === 'function') ? v() : deepClone({}, v)

      // 记录变化
      if (this.$isLog) {
        addLog(this.$id, '$reset', this, newVal)
      }

      this.$state = newVal
    }
  }

  /**
   * 替换部分属性，支持深层
   */
  $patch(_val: any) {
    // 判断是不是函数
    const val = (typeof _val === 'function') ? _val(this) : _val

    // 记录原值
    let oldVal: string | any = ''
    if (this.$isLog) {
      oldVal = (this.$isLog) ? deepClone({}, this) : ''
    }
    // 改变状态
    deepSet(this, val)

    // 记录变化
    if (this.$isLog) {
      addLog(this.$id, '$patch', oldVal, this, val)
    }
  }

  /**
   * 取原型，不包含内部方法
   */
  $toRaw<T>(): T {
    const obj: T = {}
    const tmp = toRaw(this)
    Object.keys(tmp).forEach(key => {
      if (key !== '$id' && key !== '$isLog' && key !== '$_value' && key !== '$log') {
        obj[key] = (tmp[key].$toRaw) ? tmp[key].$toRaw() : tmp[key]
      }
    })
    return obj
  }

  /**
   * 整体替换，会删除原有属性
   */
  set $state(value: any) {
    // 记录原值
    let oldVal = ''
    if (this.$isLog) {
      oldVal = (this.$isLog) ? deepClone({}, this) : ''
    }

    // 记录原有 属性，然后遍历新对象的属性，记录没有的属性，删除
    // 记录原有属性
    const oldAttr = Object.keys(this)
    // 遍历新值
    Object.keys(value).forEach(key => {
      if (this[key]) {
        if (this[key].$toRaw) {
          this[key].$state = value[key]
        } else {
          this[key] = value[key]
        }
        // 去掉有的属性，剩下的就是没有的属性
        const index = oldAttr.findIndex((item) => item === key)
        if (index > -1) {
          oldAttr.splice(index , 1)
        }
      } else {
        // 没有 key ，增加 key
        this[key] = value[key]
      }
    })

    // 删除没有的属性
    oldAttr.forEach(key => {
      delete this[key]
    })
    
    // 记录变化
    if (this.$isLog) {
      addLog(this.$id, '$state', oldVal, this, value)
    }
  }

  /**
   * 给 object 加一个 forEach 的方法
   * @param cb 回调函数
   */
  $forEach(cb:(obj: any, key: string, index: number) => void): void {
    if (typeof cb === 'function') {
      const tmp = toRaw(this)
      Object.keys(tmp).forEach((key: string, index: number) => {
        if (key !== '$_value' && key !== '$id' && key !== '$isLog') {
          const obj = tmp[key]
          cb(obj, key, index)
        }
      })
    }
  }

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
 
}
