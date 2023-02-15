<template>
  安全等级 —— 子组件 —— level 4。<br><br>
  其他组件不可以变更状态！<br><br>
 
  数据：{{state1}}<br><br>
  getter：{{state1.nameTest}}<br><br>
  
  <hr>
  <el-button type="" @click="state1.name='改属性'"> 修改属性</el-button> 其他组件不让改<br>
  <el-button type="" @click="state1.$state = {name: '$state 修改'}"> $state 修改属性</el-button> 其他组件不让改 <br>
  <el-button type="" @click="state1.$patch({name: '模板改 $patch'})"> patch 修改属性</el-button> 其他组件不让改 <br>
  <el-button type="" @click="state1.actionTest()"> actionTest 修改属性</el-button> 其他组件不让改 <br>
  <el-button type="" @click="state1.$reset()"> 重置</el-button>  <br>

</template>

<script setup lang="ts">
  // 获取状态
  import { getState } from './state-level4'

  const state1 = getState()

  console.log(state1)
   
</script>