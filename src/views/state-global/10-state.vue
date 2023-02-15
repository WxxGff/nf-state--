<template>
  仅 state 的全局状态<br>
  对象的定义方式：<br>
  泛型的方式获取：{{state1}}<br>
  普通的方式获取：{{state2}}<br>
  <el-button type="" @click="myclick1">修改名称</el-button><br>
  <el-button type="" @click="myclick12">$patch修改</el-button><br>
  <el-button type="" @click="state2.$reset()"> 重置</el-button> 不支持 <br>
  <hr>
  函数的定义方式：<br>
  泛型的方式获取：{{state3}}<br>
  普通的方式获取：{{state4}}<br>
  <hr>
  <el-button type="" @click="myclick3">修改名称</el-button><br>
  <el-button type="" @click="myclick32">$state修改</el-button><br>
  <el-button type="" @click="state4.$reset()"> 重置</el-button> 不支持 <br>
</template>

<script setup lang="ts">
  import { useStore } from '../../../lib/main'
  
  import type {
    StateOnly
  } from '../../types/typs'

  const state1 = useStore<StateOnly>('stateOnly')
  const state2 = useStore('stateOnly')
  const state3 = useStore<StateOnly>('stateOnlyFun')
  const state4 = useStore('stateOnlyFun')

  console.log('结构：', state1)
  console.log('keys：', Object.keys(state1))
  console.log('原型：', state1.$toRaw())

  console.log('内置forEach')
  state1.$forEach((item: any, key: string, index: number) => {
    console.log(index, key, item)
  })

  console.log('函数，keys：', Object.keys(state3))


  const myclick1 = () => {
    state1.name = '修改一下：' + new Date().valueOf()
  }
  
  const myclick12 = () => {
    state1.$patch({
      name: '$patch修改' + new Date().valueOf(),
      age: 18
    })
  }

  const myclick3 = () => {
    state3.name = '修改一下：' + new Date().valueOf()
  }
  
  const myclick32 = () => {
    state3.$state = {
      name: '$state修改' + new Date().valueOf(),
      age: 18
    }
  }

</script>