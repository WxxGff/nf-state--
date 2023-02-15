# nf-state 轻量级状态管理

> 源码目录：https://naturefw.gitee.io/  

## 介绍
Vue3 的轻量级的状态管理。  
简称：nf-state  
基于 reactive， 完全发挥 composition API 的特点，简单快捷，好用。

参考了一下 Vuex 和 Pinia，去掉了自己不需要的功能，以及不喜欢的方式，按照个人喜好设计需要的功能。

* 全局状态，用法和 Vuex 类似。  
* 局部状态，用法参考 pinia。（pinia是全局状态）
* 只读状态，只有指定位置才可以改变，其他组件只能读取，更安全。  
* 初始化，可以对全局状态进行初始化赋值。  


## 多种改变状态的安全级别

如何变更状态？可以使用哪种方式，哪些组件可以哪些组件不可以？  
做了三种模式，应对不同的需求。

|安全级别|state类型|直接改属性|内置函数|action|范围|举例|
|:----:|:----:|:----:|:----:|:----:|----|----|
|宽松|reactive|✔|✔|✔|所有组件|弹窗状态|
|一般|readonly|✘|✔|✔|所有组件|弹窗状态|
|严格|readonly|✘|✘|✔|所有组件||
|超严|readonly|✘|✔|✔|特定组件才可更改|当前用户状态|

## 技术栈

* vite2
* Vue3 （composition API）

## 目录结构

* lib 状态管理的源码
* src 状态管理的使用demo
* distp 在线演示的代码

## 源码

https://gitee.com/naturefw-code/nf-rollup-state

[![自然框架源码/nf-state-轻量级状态管理](https://gitee.com/naturefw-code/nf-rollup-state/widgets/widget_card.svg?colors=ffffff,1e252b,323d47,455059,d7deea,99a0ae)](https://gitee.com/naturefw-code/nf-rollup-state)

## 在线演示

https://naturefw-code.gitee.io/nf-rollup-state/

## 在线文档

https://nfpress.gitee.io/doc-nf-state

 
## 安装教程

npm i @naturefw/nf-state  
或者  
yarn add @naturefw/nf-state


## 使用说明


1.  createStore 创建实例，定义全局状态和初始化函数。

```js
// store-nf/index.js
// 加载状态的类库
import { createStore } from '/nf-state'

const testPromie = () => {
  return new Promise((fun) => {
    setTimeout(() => {
      fun('模拟异步设置的。')
    }, 500)
  })
}

/**
 * 统一注册全局状态
 */
export default createStore({
  // 读写状态，直接使用 reactive
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
        async loadData() {
          this.name = await testPromie()
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


```


2.  main.js 挂载到 app

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store-nf' // 轻量级状态

createApp(App)
  .use(store) // 加载状态，调用 init 执行初始化函数。
  .mount('#app')
```


3.  模板里可以用 $state 访问全局状态。

```html
<template>
  全局状态-user：{{$state.user1}}<br>
</template>
```

> 目前只支持全局状态，局部状态需要先在代码里面获取，然后返回给模板。  



4.  在组件里获取状态。

```js
import { store } from '@naturefw/nf-state'

// 可以直接操作状态
console.log(store)
 


```
  

基本用法就是这些了，其他的就是各种灵活应用。