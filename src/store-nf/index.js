// 加载状态的类库
import { createStore } from '/nf-state'

const testPromie = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const re = {
        name: '异步的方式设置name'
      }
      resolve(re)
    }, 500)
  })
}

/**
 * 统一注册全局状态
 */
export default createStore({
  // 定义状态，直接使用 reactive
  store: {
    // 纯 state
    user: {
      isLogin: false,
      name: 'jyk', //
      age: 19,
      roles: []
    },
    // 有 getters、actions
    userCenter: {
      state: {
        name: '',
        age: 12
      },
      getters: {
        userName () {
          return this.name + '---- 测试 getter'
        }
      },
      actions: {
        async loadData(val, state) {
          const foo = await testPromie()
          state.name = foo.name
          this.name = foo.name
          this.$state = foo
          this.$patch(foo)
        },
        loadData2 (val, state) {
          testPromie().then((val1) => {
            this.name = val1
          })
        },
        loadData3: (val, state) => {
          testPromie().then((val1) => {
            state.name = val1
          })
        }
      },
      options: {
        isLocal: false, // true：局部状态；false：全局状态（默认属性）；
        isLog: true, // true：做记录；false：不用做记录（默认属性）；
        /**
         * 1：宽松，可以各种改变属性，适合弹窗、抽屉、多tab切换等。
         * 2：一般，不能通过属性直接改状态，只能通过内置函数、action 改变状态
         * 3：严格，不能通过属性、内置函数改状态，只能通过 action 改变状态
         * 4：超严，只能在指定组件内改变状态，比如当前用户的状态，只能在登录组件改，其他组件完全只读
        */
        level: 1
      }
    },
    level1: {
      state: () => {
        return {
          name: ''
        }
      }
    },
    level2: {
      state: () => {
        return {
          name: ''
        }
      },
      actions: {
        loadData() {
          this.name = '通过 action 设置 2。'
        }
      },
      options: {
        isLocal: false, // true：局部状态；false：全局状态（默认属性）；
        isLog: false, // true：做记录；false：不用做记录（默认属性）；
        /**
         * 1：宽松，可以各种改变属性，适合弹窗、抽屉、多tab切换等。
         * 2：一般，不能通过属性直接改状态，只能通过内置函数、action 改变状态
         * 3：严格，不能通过属性、内置函数改状态，只能通过 action 改变状态
         * 4：超严，只能在指定组件内改变状态，比如当前用户的状态，只能在登录组件改，其他组件完全只读
        */
        level: 2
      }
    },
    level3: {
      state: () => {
        return {
          name: ''
        }
      },
      actions: {
        loadData() {
          this.name = '通过 action 设置 3。' + new Date().valueOf()
        }
      },
      options: {
        isLocal: false, // true：局部状态；false：全局状态（默认属性）；
        isLog: false, // true：做记录；false：不用做记录（默认属性）；
        /**
         * 1：宽松，可以各种改变属性，适合弹窗、抽屉、多tab切换等。
         * 2：一般，不能通过属性直接改状态，只能通过内置函数、action 改变状态
         * 3：严格，不能通过属性、内置函数改状态，只能通过 action 改变状态
         * 4：超严，只能在指定组件内改变状态，比如当前用户的状态，只能在登录组件改，其他组件完全只读
        */
        level: 3
      }
    },
    // 数组的情况
    dataList: [123],
    dataList2: {
      state: [456],
      actions: {
        test() {
          this.push(11)
        }
      }
    }
  },
  
  // 可以给全局状态设置初始状态，同步数据可以直接在上面设置，如果是异步数据，可以在这里设置。
  init (store) {
  }
})
