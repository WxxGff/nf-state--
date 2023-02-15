<template>
  修改属性，不会记日志，其他变更都可以记录日志。（默认不记录，需要通过 option 设置）<br><br>
  异步操作，建议使用 async、await，否则无法记录新值。<br><br>
  可以定位触发状态变更的代码位置。<br><br>
  状态：{{state1}}<br><br>
  <el-button type="" @click="myclick1">修改属性（不记日志）</el-button><br>
  <el-button type="" @click="myclick12">$patch 修改</el-button><br>
  <el-button type="" @click="myclick13">$state 修改</el-button><br>
  <el-button type="" @click="myclick14">action 修改</el-button><br><br>
  <el-button type="" @click="myclick15">action 异步修改</el-button><br><br>

  <el-button type="" @click="state1.$patch({name: '模板改 patch'})">模板 $patch修改</el-button><br>
  <el-button type="" @click="state1.$state = {name: '模板改 state '}">模板 $state修改</el-button><br>
  <el-button type="" @click="state1.actionTest()">模板 action修改</el-button><br><br>
  <el-button type="" @click="state1.$reset()"> 重置</el-button> <br>

  <state-log :state="state1"/>
  <hr>
  js 文件里定义的状态：{{state2}}<br>
  <state-log :state="state2"/>

   
</template>

<script setup lang="ts">
  import { useStore } from '../../../lib/main'
  
  import type { StateGA } from '../../types/typs'
  // 显示日志的组件
  import stateLog from '../state-log/log-table.vue'

  // 获取js文件里定义的状态的 id
  import { globalTest } from './test-state'

  // 获取在js文件的全局状态
  // const state2 = useStore<StateGA>(flag)
  const state2 = globalTest()

  // 统一定义的全局状态
  const state1 = useStore<StateGA>('stateLog')

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
  
  // actions 修改
  const myclick14 = () => {
    state1.actionTest()
  }

  // 异步 actions 修改
  const myclick15 = () => {
    state1.yibu()
  }

</script>