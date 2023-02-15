<template>
{{counter}}<br>

  <button @click="update">更新</button>

</template>

<script>
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter23', {
  state: () => {
    return []
  },
  // 也可以这样定义状态
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.$state = [1, 2, 3]
    },
  },
})
</script>

<script setup>
  
  const counter = useCounterStore()
  
  const update = () => {
    // counter.count++
    // 编辑器会有代码提示 ✨
    // counter.$patch({ count: counter.count + 1 })
    // 也可以使用action来代替
    counter.increment()
  }
  

</script>