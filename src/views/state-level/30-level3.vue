<template>
  安全等级 —— level 3 。<br><br>
  只能通过 action 修改状态，其他方式不可以变更状态。<br><br>
  可以限定状态的哪些属性可以改，哪些属性不可以改。<br><br>
  <hr>
 
  数据：{{state1}}<br><br>
  getter：{{state1.nameTest}}<br><br>
  
  <el-input
    v-model="stateText"
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 10 }"
  ></el-input>
  
  <hr>
  <el-button type="" @click="state1.name='改属性'"> 修改属性</el-button> 不让改<br>
  <el-button type="" @click="state1.$state = {name: '$state 修改'}"> $state 修改属性</el-button> 不让改 <br>
  <el-button type="" @click="state1.$statef({name: '$statef 修改'})"> $statef 修改属性</el-button> 不让改 <br>
  <el-button type="" @click="state1.$patch({name: '模板改 $patch'})"> patch 修改属性</el-button> 不让改 <br>
  <el-button type="" @click="state1.actionTest()"> actionTest 修改属性</el-button> 可以改 <br>
  <el-button type="" @click="state1.$reset()"> 重置</el-button> 不让改 <br>

</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { InjectionKey } from 'vue'

  import { defineStore } from '../../../lib/main'
  import type { StateGA } from '../../types/typs'

  // 定义状态
  const flag = Symbol('level1') as InjectionKey<string>

  const state1 = defineStore<StateGA>(flag, {
    state: (): StateGA => {
      return {
        name: '严格级别',
        age: 18
      }
    },
    getters: {
      nameTest(): string {
        return this.name + '_通过 getter 获取'
      }
    },
    actions: {
      actionTest() {
        this.name = 'js 文件里 的 action 修改了name' + new Date().valueOf()
      }
    }
  },{level: 3})

  console.log(state1)

  const stateText = computed(() => JSON.stringify(state1, null , 2))
   
</script>