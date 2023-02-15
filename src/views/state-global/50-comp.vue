<template>
  可以在js文件里面注册全局状态。<br><br>
  也可以在组件里面注册全局状态。<br><br>
 
  组件里注册的状态：{{state2}}<br><br>
  <el-button type="" @click="state2.$patch({name: '模板改 patch'})">模板 $patch修改</el-button><br>
  <el-button type="" @click="myclick1">action 修改</el-button><br>
  <el-button type="" @click="state2.$reset()"> 重置</el-button> <br>
   
</template>

<script setup lang="ts">
  import { globalTest } from './test-state'

  // 创建 js 里面定义的全局状态
  const state2 = globalTest()

  // 修改
  const myclick1 = () => {
    if (state2.actionTest)
      state2.actionTest()
  }
   
</script>