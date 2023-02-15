import { defineStore } from 'pinia'

// const sy = Symbol('testPinia')

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count22: 0 }
  },
  // 也可以这样定义状态
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count22 ++
    },
  },
})