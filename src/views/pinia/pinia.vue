<template>
  {{xiaoming}}<br>
  {{xiaoming.age}}<br><br>
  {{xiaoming.ageTest}}<br><br>
  解构：{{toref}}<br><br>

  <div v-for="(item, key, index) in xiaoming" :key="index">
    {{index}} -- {{key}}: {{item}}
  </div>
  <br><br>
  <button @click="start">开始</button><br><br>
  <button @click="update">更新</button>
  <button @click="reset">重置</button>

  <hr>
  <hr>
  <!---->
  <son1></son1>
  <hr>
  <son2></son2>
  
  <hr>
  <son3></son3>
  <hr>
  <son4></son4>

</template>

<script lang="ts">
  import * as pinia  from 'pinia'
  import { toRefs } from 'vue'
  import { usePersonStore } from './object'

  import son4 from './son4.vue'
  import son3 from './son3.vue'

  import son1 from './son1.vue'
  import son2 from './son2.vue'

</script>

<script lang="ts" setup>

  console.log(pinia)
   
  console.time('usePersonStore实例化用时')
  const xiaoming = usePersonStore()
  console.timeEnd('usePersonStore实例化用时')

  xiaoming.$patch({

  })

  // 解构
  const toref = toRefs(xiaoming)  
  console.log('toref:')
  console.log(Object.keys(toref))

  // const toref3 = storeToRefs(xiaoming)
  // console.log('toref3:')
  // console.log(Object.keys(toref3))

  const start = () => {
    console.log('\n xiaoming:')
    console.dir(xiaoming)
    console.log('xiaoming - keys :')
    console.log(Object.keys(xiaoming))
    
    console.log('xiaoming - for in :')
    for (const key in xiaoming){
      console.log(key)
    }
  }
  
  const update = () => {
    xiaoming.nameAction()
  }

  const reset = () => {
    xiaoming.$reset()
  }
  

</script>