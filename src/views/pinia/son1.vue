<template>
{{counter}}<br>

  <button @click="update('async')">更新 async </button>
  <button @click="counter.loadData2('then')">更新 then </button>
  <button @click="counter.increment('increment')"> increment </button>

</template>

<script>
import { useCounterStore } from './count.js'
import { createPinia } from 'pinia'

</script>

<script setup>
  
  const counter = useCounterStore()
  
  const update = () => {
    // counter.count++
    // 编辑器会有代码提示 ✨
    // counter.$patch({ count: counter.count + 1 })
    // 也可以使用action来代替
    // counter.increment('22')
    counter.loadData('55')
  }

  counter.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now()
    // this will trigger before an action on `store` is executed
    // console.log(`开始调用 "${name}"，参数：[${args.join(', ')}].`)

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      console.log(
        `"${name}" 结束 ${Date.now() - startTime}ms。\n结果: ${result}.\n`
      )
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }

)
  

  counter.$subscribe((val) => {
    console.log('\n counter - subscribe --------------')
    console.log(val.storeId, val.events)

    // react to store changes
  })

</script>