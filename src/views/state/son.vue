<template>
  子组件：<br>
  局部状态：<br>
  <el-button type="" @click="updateState1">修改状态1</el-button>
  <el-button type="" @click="updateState2">修改状态2</el-button><br>
  {{s1}}<br>
  {{s2}}<br>
</template>

<script>
import lc from './controller/localController.js'
import { get } from './controller/local2Controller.js'
import { defineStore } from 'pinia'

</script>

<script setup>

const s1 = lc().get()
const s2 = get()

const updateState1 = () => {
  s1.name = '子组件修改' + new Date().valueOf()
}
const updateState2 = () => {
  s2.name = '子组件修改' + new Date().valueOf()
}

</script>