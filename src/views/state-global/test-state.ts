import type { InjectionKey } from 'vue'

import { defineStore } from '../../../lib/main'
import type { IState } from '../../../lib/types/type'

import type { StateGA } from '../../types/typs'

const flag = Symbol('globalTest') as InjectionKey<string>
// const flag = 'globalTest'

const globalTest = (): StateGA & IState => defineStore<StateGA>(flag, {
  state: (): StateGA => {
    return {
      name: 'js 文件里定义的状态',
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
},{isLog: true})

export {
  flag,
  globalTest
}