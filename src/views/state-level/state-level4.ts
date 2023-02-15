
import type { InjectionKey } from 'vue'

import { defineStore, useStore } from '../../../lib/main'
import type { IState } from '../../../lib/types/type'
import type { StateGA } from '../../types/typs'

// 定义状态
const flag = Symbol('level4') as InjectionKey<string>

/**
 * 注册局部状态，父组件使用 provide
 * * 数据列表用
 * @returns
 */
const regState = (): StateGA & IState => {

  const state1 = defineStore<StateGA>(flag, {
    state: (): StateGA => {
      return {
        name: '超严级别',
        age: 18
      }
    },
    getters: {
      nameTest(): string {
        return this.name + '_通过 getter 获取'
      }
    },
    actions: {
      actionTest() {
        this.name = 'js 文件里 的 action 修改了name'
      }
    }
  },{level: 4})

  return state1
}
  
/**
 * 子组件用 inject 获取状态
 * @returns
 */
const getState = (): StateGA & IState => {
  return useStore<StateGA & IState>(flag)
}

export {
  regState,
  getState
}