
import { computed, reactive } from 'vue'
import type { InjectionKey } from 'vue'
import type { StateOption, StateCreateOption } from './types/type'

import {
  BaseObject,
  BaseArray,
  deepClone,
} from './main'

// 日志
import {
  // stateLog, // 记录容器
  addLog // 添加一条记录
} from './base/_log'

/**
 * 创建有getter、actions 的状态
 * reactive 类型的状态，挂载 getter、action
 * @param id 状态的标志
 * @param info StateCreateOption state、getter、action、options
 * @param options StateOption 配置选项
 * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：安全等级，
 * * * * 1：宽松（都行）；
 * * * * 2：一般（不能直接改属性）；
 * * * * 3：严格（仅action）；
 * * * * 4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 */
export default function stateReactive (id: string | symbol | InjectionKey<string>, info: StateCreateOption, options?: StateOption = {}) {
  
  // 判断 state 是 object 还是 array，继承不同的基类
  let tmp = null
  let basec: any = null

  const _state = (typeof info.state === 'function') ? info.state(): info.state
  if (Array.isArray(_state)) {
    // 数组
    // 继承一下
    class arrayClass extends BaseArray {
      constructor(_info) {
        super(_info) // 调用父类的constructor()
      }
      // 根据 options 判断，是否需要做日志
      override get $isLog() {
        return (!!options.isLog)
      }
      /**
       * 获取 id
       */
      override get $id() {
        return id
      }
    }
    basec = arrayClass

    // 创建实例
    tmp = new arrayClass(info.state)
  } else {
    // 对象
    // 继承一下
    class objClass extends BaseObject {
      constructor(_info: any) {
        super(_info) // 调用父类的constructor()
      }
      // 根据 options 判断，是否需要做日志
      get $isLog() {
        return (!!options.isLog)
      }
      /**
       * 获取初始值
       */
      get $_value() {
        return info.state
      }
      /**
       * 获取 id
       */
      get $id() {
        return id
      }
    }
    basec = objClass

    // 创建实例
    tmp = new objClass(info.state)
  }

  // 套上 reactive 
  const ret = reactive(tmp)

  // 是否只读
  const _level = (options.level) ? options.level : 1
  if (_level === 2) {
    // 子类的原型上做同名函数，内部调用 ret。
    const _$patch = ret.$patch
    basec.prototype.$patch = function(_val) {
      _$patch.call(ret, _val)
    }
    
    const _$reset = ret.$reset
    basec.prototype.$reset = function(_val) {
      _$reset.call(ret, _val)
    }
    
    // $state 被视为 属性，被 readonly 拦截，所以只好改为函数形式
    basec.prototype.$statef = function(_val) {
      ret.$state = _val
    }
  }
  // ===================

  // 挂载 getters，变成 computed
  if (typeof info.getters === 'object') {
    Object.keys(info.getters).forEach(key => {
      basec.prototype[key] = computed(() => {
        // 记录原值
        let oldVal = ''
        if (ret.$isLog) {
          oldVal = (ret.$isLog) ? deepClone({}, ret) : ''
        }

        const re = info.getters[key].call(ret, ret)

        // 记录变化
        if (ret.$isLog) {
          addLog(ret.$id, `getters-${_level}-${key}`, oldVal, ret, {})
        }

        return re
      })
    })
  }

  // 挂载 actions
  if (typeof info.actions === 'object') {
    Object.keys(info.actions).forEach(key => {
      basec.prototype[key] = async function (val) {
        const stack = new Error().stack
        const arr = stack.split('\n')
        // 记录原值
        let oldVal = ''
        if (ret.$isLog) {
          oldVal = (ret.$isLog) ? deepClone({}, ret) : ''
        }

        // 判断安全级别
        if (_level < 4 ) {
          // 可以使用
          // const promiseFlag = info.actions[key] instanceof Promise
          // const isFun = !!info.actions[key].prototype 不是箭头函数

          // console.log(promiseFlag)
          await info.actions[key].call(ret, val, ret)
        } else {
          // 不可以使用
          await info.actions[key].call(this, val, this)
        }
        // 记录变化
        if (ret.$isLog) {
          addLog(ret.$id, `actions-${_level}-${key}`, oldVal, ret, val, arr[2])
        }
      }
    })
  }
  
  return ret
}