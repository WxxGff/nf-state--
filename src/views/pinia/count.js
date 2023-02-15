import { defineStore } from 'pinia'

const testPromie = () => {
  return new Promise((fun) => {
    setTimeout(() => {
      fun(100)
    }, 500)
  })
}


export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count22: 0, name: '' }
  },
  // 也可以这样定义状态
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count22 ++
      return 'increment000'
    },
    async loadData(val, state) {
      const foo = await testPromie()
      this.count22 += foo
      this.name = 'async 赋值，，' + new Date().valueOf()
    },
    loadData2(val, state) {
      testPromie().then((val) => {
        this.count22 += val
        this.name = '异步赋值，，' + new Date().valueOf()
      })
    }
  },
})