import { defineStore } from 'pinia'

interface Person {
  isLogin: boolean,
  name: string, //
  age: number,
  roles: Array<string>
}

export const usePersonStore = defineStore('objectTest', {
  state: (): Person => {
    return {
      isLogin: true,
      name: 'jyk',
      age: 18,
      roles: [
        '11',
        '22'
      ]
    }
  },
  // 也可以这样定义状态
  // state: () => ({ count: 0 })
  actions: {
    nameAction() {
      this.name += '11'
    }
  },
  getters: {
    ageTest(state) {
      // 会有代码自动补全!
      return state.age += 100
    }
  }
})