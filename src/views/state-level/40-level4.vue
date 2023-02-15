<template>
  安全等级 —— level 4。<br><br>
  <br><br>
  只能在引入状态的组件里变更状态，其他组件里不能变更状态！
  
  <hr>
  数据：{{state1}}<br><br>
  getter：{{state1.nameTest}}<br><br>
  
  <el-input
    v-model="stateText"
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 10 }"
  ></el-input>
  
  <hr>
  <el-button type="" @click="state1.name='改属性'"> 修改属性</el-button> 引入组件可以改 <br>
  <el-button type="" @click="state1.$state = {name: '$state 修改'}"> $state 修改属性</el-button> 引入组件可以改 <br>
  <el-button type="" @click="state1.$patch({name: '模板改 $patch'})"> $patch 修改属性</el-button> 引入组件可以改 <br>
  <el-button type="" @click="state1.actionTest()"> actionTest 修改属性</el-button> 引入组件可以改 <br>
  <el-button type="" @click="state1.$reset()"> 重置</el-button>  <br>

  <hr>
  <son-state></son-state>

</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import sonState from './42-level4-2.vue'

  // 定义状态
  import { regState } from './state-level4'

  const state1 = regState()

  console.log(state1)

  const stateText = computed(() => JSON.stringify(state1, null , 2))
   
</script>