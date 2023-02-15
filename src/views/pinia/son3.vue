<template>
{{counter}}<br>

  <button @click="update">更新</button>

</template>

<script>
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => {
    return { count1: 0, a3:'a3定义的' }
  },
  // 也可以这样定义状态
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count1 ++
    },
  },
})
</script>

<script setup>
  
  const counter = useCounterStore()
  
  const update = () => {
    counter.count1++
    // 编辑器会有代码提示 ✨
    counter.$patch({ count: counter.count1 + 1 })
    // 也可以使用action来代替
    counter.increment()
  }
  

</script>