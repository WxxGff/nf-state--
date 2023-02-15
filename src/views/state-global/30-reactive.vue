<template>
  直接定义状态，传入<br>
  泛型的方式获取：{{state1}}<br>
  普通的方式获取：{{state2}}<br>
  <el-button type="" @click="myclick1">修改名称（不让改）</el-button><br>
  <el-button type="" @click="myclick12">$patch修改（不让改）</el-button><br>
  <el-button type="" @click="myclick13">$state修改（不让改）</el-button><br>
  <el-button type="" @click="myclick14">action修改</el-button><br>
  <el-button type="" @click="state2.$reset()"> 重置</el-button> 失效 <br>
</template>

<script setup lang="ts">
  import { useStore } from '../../../lib/main'
  
  import type { StateGA } from '../../types/typs'

  const state1 = useStore<StateGA>('stateRet')
  const state2 = useStore('stateRet')

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
  
  const myclick13 = () => {
    state1.$state = {
      name: '$state 修改' + new Date().valueOf(),
      age: 18
    }
  }
  
  const myclick14 = () => {
    state1.actionTest()
  }

</script>