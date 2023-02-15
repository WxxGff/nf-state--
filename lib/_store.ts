import type { InjectionKey } from 'vue'

import {
  readonly,
  isReactive,
  provide,
  inject
} from 'vue'

// 获取类型
import type {
  StateOption,
  IState,
  Store,
  StateCreateListOption,
  StateCreateOption
} from './types/type'

// 获取 两种状态形式，带 getter、actions，纯 state的两种。
import { stateReactive, stateOnly } from './main'

// provide 的标记，全局状态用
const _storeFlag = Symbol('__nf-state__') as InjectionKey<string>

// 内部使用的状态集合，普通对象，如果用 reactive，那么把readonly存入，取出来就变成了 reactive
// const _stateList = reactive({})
const _stateList: Store = {}
const _retList: Store = {}

// 返回给出外部的状态容器，shallowReactive 类型，还是不行
export const store: Store = _stateList
// const store = shallowReadonly(_stateList)

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
export function defineStore<T> (id: string | symbol | InjectionKey<string>, info: StateCreateOption | any, options?: StateOption): T & IState {
  // 默认，全局状态
  const isLocal = (options?.isLocal)?? false

  // 变更状态的安全级别
  const _level = (options?.level) ? options.level : 1

  // 判断ID是否重复
  if (isLocal) {
    // 局部状态，可以重复
  } else {
    // 全局状态，ID 如果重复 返回ID对应的状态
    if (_stateList[id]) {
      return _stateList[id]
    }
  }

  // 创建状态
  let tmp = null
  // info === reactive ，直接作为状态
  if (isReactive(info)) {
    //
    tmp = info
  } else {
    // 有 getter 或则 action，使用 stateReactive
    if (info.getters || info.actions) {
      // 挂载
      tmp = stateReactive(id, info, options)
    } else {
      // 没有 state属性的话，info 视为 state
      const _state = (info.state) ? info.state : info
      tmp = stateOnly(id, _state, options)
    }
  }
  
  // 如果只读，套上 readonly 
  const re = (_level === 1) ?  tmp : readonly(tmp) 
  
  // 判断是否全局状态
  if (isLocal) {
    // 局部状态，使用 provide 注入
    provide<T>(id, re)
  } else {
    // 全局状态，存入容器
    _stateList[id] = re
  }
  if (_level === 4) {
    return tmp
  } else {
    return re
  }
}

/**
 * 创建全局状态。
 * @param info 状态列表，多个状态
 */
export function createStore(info: StateCreateListOption) {
  // 获取状态列表
  const _store = info.store
  
  // 遍历，调用 defineStore 注册状态
  Object.keys(_store).forEach(key => {
    const __state = _store[key]
    // 处理 options 
    const options = __state.options ? __state.options : {
      isLocal: false, // 全局状态
      isLog: false, // 不写日志
      level: 1 // 可以随便改状态
    }

    if (__state.state) {
      _retList[key] = defineStore(key, __state, options)
    } else {
      if (isReactive(__state)) {
        _retList[key] = defineStore(key, __state, options)
      } else {
        _retList[key] = defineStore(key, { state: __state }, options)
      }
    }
  })

  // 创建完毕，调用回调
  if (typeof info.init === 'function') {
    info.init(_retList)
  }

  // 安装插件
  return (app: any) => {
    // 设置模板直接使用状态
    app.config.globalProperties.$state = _stateList
    // 发现个问题，这是个object，不用注入到 provide
    app.provide(_storeFlag, store)
  }
}

/**
 * 获取全局状态。implements IState
 * @param id 全局状态 的 ID，string | symbol
 * @returns 指定的状态
 */
export function useStore<T> (id: string | symbol | InjectionKey<string>): T & IState {
  // const re = inject(_storeFlag) ?? store
  const re = inject<Store>(_storeFlag) ?? store

  if (re[id]) {
    return re[id]
  }
  console.error('没有找到这个状态：', id)
  return null
}

/**
 * 获取局部状态
 * @param id 状态的ID
 * @returns 局部状态
 */
export function useStoreLocal<T> (id: string | symbol | InjectionKey<string>): T & IState {
  const re = inject<T>(id)
  return re 
}
