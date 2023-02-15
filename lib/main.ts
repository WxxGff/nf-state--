// 引入各种函数，便于做成npm包

import {
  createStore, // 统一创建全局状态
  useStore, // 获取全局状态
  useStoreLocal, // 获取局部状态
  defineStore, // 单独创建状态，可以全局、局部
  store // 返回给出外部的状态容器
} from './_store'

// 深层拷贝
import { deepSet, deepClone } from './base/assign'
// 对象基类
import BaseObject from './base/base-object'

// 数组基类
import BaseArray from './base/base-array'

// 创建状态
import stateReactive from './object-reactive' // 挂载 getter、action
import stateOnly from './object-state' // 不需要 getter、action

export {
  // 拷贝
  deepSet,
  deepClone,
  // 基类
  BaseObject, // 对象基类
  BaseArray, // 数组基类
  // 创建状态
  stateReactive, // 有getter、actions 的状态
  stateOnly, // 只有 state 的状态
  // 状态
  store, // 返回给外部的状态容器
  useStore, // 获取全局状态，
  useStoreLocal, // 获取局部状态
  createStore, // 统一创建全局状态
  defineStore // 单独创建状态，可以全局状态、局部状态
}
