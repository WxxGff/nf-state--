import { createStore, // 统一创建全局状态
useStore, // 获取全局状态
useStoreLocal, // 获取局部状态
defineStore, // 单独创建状态，可以全局、局部
store } from './_store';
import { deepSet, deepClone } from './base/assign';
import BaseObject from './base/base-object';
import BaseArray from './base/base-array';
import stateReactive from './object-reactive';
import stateOnly from './object-state';
export { deepSet, deepClone, BaseObject, // 对象基类
BaseArray, // 数组基类
stateReactive, // 有getter、actions 的状态
stateOnly, // 只有 state 的状态
store, // 返回给外部的状态容器
useStore, // 获取全局状态，
useStoreLocal, // 获取局部状态
createStore, // 统一创建全局状态
defineStore };
