<template>
{{counter}}<br>

  <button @click="update">更新</button>

</template>

<script>
import { useCounterStore } from './count2.js'


</script>

<script setup>
  
  const counter = useCounterStore()
  
  const update = () => {
    counter.count++
    // 编辑器会有代码提示 ✨
    counter.$patch({ count: counter.count + 1 })
    // 也可以使用action来代替
    counter.increment()
  }
  

</script>