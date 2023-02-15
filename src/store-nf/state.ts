
import { readonly } from 'vue'

// 加载状态的类库
import { createStore, stateReactive } from '../../lib/main'
import type { Store, StateCreateOption } from '../../lib/types/type'

import type {
  StateOnly,
  StateGA,
  Person
} from '../types/typs'

// 仅 state + 对象
const stateOnly: StateCreateOption = {
  state: {
    name: '只有state的状态，对象'
  }
}

// 仅 state + 函数
const stateOnlyFun: StateCreateOption = {
  state: (): StateOnly => {
    return {
      name: '只有state的状态，函数'
    }
  }
}

// 普通状态 + 函数
const stateGA: StateCreateOption = {
  state: (): StateGA => {
    return {
      name: '带有getter、action 的状态',
      age: 18
    }
  },
  getters: {
    getterTest() {
      return this.name
    }
  },
  actions: {
    actionTest() {
      this.name = 'action 修改了name' +  new Date().valueOf()
    }
  }
}


// 普通状态 日志 异步操作

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

const stateLog: StateCreateOption = {
  state: (): StateGA => {
    return {
      name: '带有getter、action 的状态',
      age: 18
    }
  },
  actions: {
    actionTest() {
      this.name = 'action 修改了name' +  new Date().valueOf()
    },
    async yibu() {
      const p = await testPromie()
      this.name = p.name
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
}

// 自己定义的状态，套上 readonly 传入状态容器
const stateRet = stateReactive('stateRet', {
  state: (): StateGA => {
    return {
      name: 'readonly 的状态',
      age: 18
    }
  },
  getters: {
    getterTest() {
      return this.name
    }
  },
  actions: {
    actionTest() {
      this.name = 'action 修改了name' +  new Date().valueOf()
    }
  }
},{})

setTimeout(() => {
  stateRet.name = '内部修改' + new Date().valueOf()
}, 500)

/**
 * 统一注册全局状态
 */
export default createStore({
  // 定义状态，直接使用 reactive
  store: {
    stateOnly,
    stateOnlyFun,
    stateGA,
    stateRet: readonly(stateRet),
    stateLog,
    // 纯 state
    user: {
      state: (): Person => {
        return {
          isLogin: false,
          name: 'jyk', //
          age: 19,
          info: {
            a1: '对象属性',
            b: {
              b1: '第三成'
            }
          },
          arr: [
            {
              c: {
                c1: '数组1'
              },
              d: {
                d1: '数组2'
              }
            }
          ],
          roles: ['1', '2']
        }
      },
      actions: {
        test(){
          this.age ++
        }
      }
    }
  },
  
  // 可以给全局状态设置初始状态，同步数据可以直接在上面设置，如果是异步数据，可以在这里设置。
  init (store: Store) {
    console.log('初始化', store)
  }
})
