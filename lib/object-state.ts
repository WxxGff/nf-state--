

import { reactive } from 'vue'
import type { StateOption } from './types/type'
import type { InjectionKey } from 'vue'

import {
  BaseObject,
  BaseArray
  // deepClone
} from './main'

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
export default function stateOnly (id: string | symbol | InjectionKey<string>, state: any, options?: StateOption) {
  // 先看看有没有，然后再获取
  // 直接使用实例
  let tmp = null
  const _state = (typeof state === 'function') ? state(): state
  
  if (Array.isArray(_state)) {
    tmp = new BaseArray(state)
  } else {
    tmp = new BaseObject(state)
  }
  // 获取初始值
  tmp.$_value = () => state
  // 获取 id
  tmp.$id = () => id
  // 是否写日志
  tmp.$isLog = () => (!!options.isLog)
  
  const ret = reactive(tmp)
  
  return ret
}