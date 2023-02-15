<template>
  普通的全局状态<br>
  泛型的方式获取：{{state1}}<br>
  普通的方式获取：{{state2}}<br>
  <el-button type="" @click="myclick1">修改名称</el-button><br>
  <el-button type="" @click="myclick12">$patch修改</el-button><br>
  <el-button type="" @click="state2.$reset()"> 重置</el-button> <br>
</template>

<script setup lang="ts">
  import { useStore } from '../../../lib/main'
  
  import type { StateGA } from '../../types/typs'

  const state1 = useStore<StateGA>('stateGA')
  const state2 = useStore('stateGA')

  console.log('结构：', state1)
  console.log('keys：', Object.keys(state1))
  console.log('原型：', state1.$toRaw())

  console.log('内置forEach')
  state1.$forEach((item: any, key: string, index: number) => {
    console.log(index, key, item)
  })

  const myclick1 = () => {
    state1.name = '修改一下：' + new Date().valueOf()
  }
  
  const myclick12 = () => {
    state1.$patch({
      name: '$patch修改' + new Date().valueOf(),
      age: 18
    })
  }

</script>