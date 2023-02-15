<template>
  安全等级 —— level 1。<br><br>
  可以直接修改属性，其他方式也可以。<br><br>
  <hr>
 
  数据：{{state1}}<br><br>
  getter：{{state1.nameTest}}<br><br>
  
  <el-input
    v-model="stateText"
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 10 }"
  ></el-input>
  
  <hr>
  <el-button type="" @click="state1.name='改属性'"> 修改属性</el-button><br>
  <el-button type="" @click="state1.$state = {name: 'state 修改'}"> state 修改属性</el-button><br>
  <el-button type="" @click="state1.$patch({name: '模板改 patch'})"> patch 修改属性</el-button><br>
  <el-button type="" @click="state1.actionTest()"> actionTest 修改属性</el-button><br>
  <el-button type="" @click="state1.$reset()"> 重置</el-button>  <br>

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
        name: '宽松级别',
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
        this.name = 'js 文件里 的 action 修改了name'
      }
    }
  },{level: 1})

  const stateText = computed(() => JSON.stringify(state1, null , 2))
   
</script>