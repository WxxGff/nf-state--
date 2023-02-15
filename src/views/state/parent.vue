<template>
  父组件：<br>
  局部状态：<br>
  <el-button type="" @click="updateState1">修改状态1</el-button>
  <el-button type="" @click="updateState2">修改状态2</el-button><br>
  <el-button type="" @click="updateState3">修改局部跟踪状态</el-button><br>
  {{s1}}<br>
  {{s2}}<br>
  {{loaclTrack}}<br>
  
  <hr>
  <son></son>
  <hr>
  <div
    style="margin: 20px;"
    v-for="(item, index) in logTrack"
    :key="index"
  >
    <div v-if="item.keyPath === ''">
      {{index}} 状态：【{{item.stateKey}}】.{{item.key}} = '{{item.oldValue}}' to '{{item.value}}'
    </div>
    <div v-else>
      {{index}} 状态：【{{item.stateKey}}】.{{item.keyPath.replace(',','.')}}.{{item.key}} = '{{item.oldValue}}' to '{{item.value}}'
    </div>
    time &nbsp;at {{_dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}}<br>
    code {{item.stack}}
  </div>
</template>

<script>
import lc from './controller/localController.js'
import { reg, regTrack } from './controller/local2Controller.js'
import { ElButton } from 'element-plus'
import dayjs from 'dayjs'

// 组件
import son from './son.vue'

</script>

<script setup>
const _dayjs = dayjs

const s1 = lc().reg()
const s2 = reg()
const { loaclTrack, logTrack, watchSet} = regTrack()

const updateState1 = () => {
  s1.name = '父组件修改' + new Date().valueOf()
}

const updateState2 = () => {
  s2.name = '父组件修改' + new Date().valueOf()
}

const updateState3 = () => {
  loaclTrack.name = '父组件修改' + new Date().valueOf()
}
</script>