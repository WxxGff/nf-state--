<template>
  数组基类的测试。<br><br>
 
  数组基类：
  <el-input
    v-model="personText"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 9 }"
  ></el-input>
  <hr>
  <el-button @click="click1">整体赋值</el-button> <br><br>

  <el-button @click="click10"> pathA </el-button> 前面加 <br><br>
  <el-button @click="click11"> pushAt </el-button> 第二位置加 <br><br>
  <el-button @click="list.swap(1, 2)"> pushAt </el-button> 交换 1 —— 2 <br><br>

  <el-button @click="list.deleteA()"> deleteA </el-button> 删除第一个 <br><br>
  <el-button @click="list.deleteAt(2, 1)"> deleteAt </el-button> 删除第二个 <br><br>
  <el-button @click="list.deleteZ()"> deleteAt </el-button> 删除最后一个 <br><br>

  <el-button @click="list.$reset()">重置（不支持）</el-button> <br><br>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { BaseArray } from '../../../lib/main'

  const _list = new BaseArray(() => {
    return [
      {
        name: 'jyk1'
      },
      {
        name: 'jyk2'
      }
    ]
  })

  let count = 1
  const list = reactive(_list)

  // 显示结构
  console.log('list', list)


  // 序列化
  const personText = computed<string>(() => JSON.stringify(list, null ,2))
  
  // $state
  const click1 = () => {
    list.$state = [
      {
        name: 'jyk133'
      },
      {
        name: 'jyk244'
      },
    ]
  }

  // 第二层 对象
  const click10 = () => {
    list.pushA({
      a1: '在开头加' + count ++
    })

    console.log('list', list.$toRaw())

  }
  const click11 = () => {
    list.pushAt(2, {
      a1: '在第二位加' + count ++
    })
  }

</script>