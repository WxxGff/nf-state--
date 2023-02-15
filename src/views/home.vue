<template>
  nf-state 轻量级状态管理
  {{state}}<br>
  <el-button @click="myclick">赋值</el-button><br>
  {{state2}}<br>
  <el-button @click="myclick2">赋值</el-button><br>
  {{state3}}<br>
  <el-button @click="myclick3">赋值</el-button><br>
</template>

<script lang="ts">

  import { reactive, defineComponent } from 'vue'
  import type { InjectionKey } from 'vue'

  interface IState {
    get $id(): string | symbol | InjectionKey<string>
    set $state(value: any)
    [key: string | number]: any
  }

  class BaseObject implements IState {
    get $id(): string | symbol | InjectionKey<string>
    name: string
    age: number
    readonly name2: string

    constructor (name: string, age: number) {
      this.name = name
      this.name2 = '只读的'
      this.age = age
    }
    
    set $state(value: any) {
      console.log('父类的$id', this.$id)
      Object.assign(this, value)
    }
  }

  // implements IState
  class BaseArray extends Array implements IState {
    get $id(): string | symbol | InjectionKey<string>
   
    constructor (_info?: any) {
      // 调用父类的 constructor()
      super()
    }

    set $state(value: any) {
      this.length = 0
      if (Array.isArray(value)) {
        this.push(...value)
      } else {
        this.push(value)
      }
    }
  }

  function createState(id: string, name: string, age: number) {
    // 继承 BaseObject 再定义一个class
    class myState extends BaseObject {
      constructor (name: string, age: number) {
        // 调用父类的 constructor()
        super(name, age)
      }
      // 使用 override 覆盖父类 $id
      get $id() {
        return id
      }
    }
    
    const _state = new myState(name, age)
    const state = reactive(_state)

    return state
  }

  export default defineComponent({
    name: 'state-home',
    setup() {
      const _state = new BaseObject('jyk', 18)
      const state = reactive(_state)

      const myclick = () => {
        state.$state = {
          name: '直接赋值'
        }
      }

      const _state2 = new BaseArray()
      const state2 = reactive(_state2)

      const myclick2 = () => {
        state2.$state = [
          {
            name: '008'
          },
          {
            name: '009'
          }
        ]
        console.log(state2)
      }

      const state3 = createState('010', 'jyk0013', 29)
      console.log(state3)
      console.log('state3 - keys', Object.keys(state3))
      for (const key in state3) {
        console.log(key, state3[key])
      }

      const state4 = createState('011', 'jyk0019', 28)
      console.log(state4)
      console.log('state4 - keys', Object.keys(state4))
      
     
      const myclick3 = () => {
        state3.$state = {
          name: '直接赋值111'
        }
        console.log(state3)
        console.log(state4)

      }

      return {
        myclick,
        state,
        myclick2,
        state2,
        myclick3,
        state3
      }

    }
  
  })

</script>