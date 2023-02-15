<template>
  对象基类的测试。<br><br>
 
  对象基类：{{person}}<br><br>
  <div v-for="(item, key) in person" :key="key">
    {{key}}：{{item}}
  </div>
  <el-input
    v-model="personText"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 9 }"
  ></el-input>
  <hr>
  <el-button @click="click1">整体赋值</el-button> <br><br>
  <el-button @click="click2">部分赋值</el-button> <br><br>

  <el-button @click="click10">第二层对象 state 赋值</el-button> <br><br>
  <el-button @click="click11">第二层对象 patch 赋值</el-button> <br><br>

  <el-button @click="click12">第二层数组 state 赋值</el-button> <br><br>
  <el-button @click="click13">第二层数组 patch 赋值</el-button> <br><br>

  <el-button @click="person.$reset">重置（不支持）</el-button> <br><br>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { BaseObject } from '../../../lib/main'

  const _person = new BaseObject(() => {
    return {
      name: '第一层属性',
      info: {
        a1: '第二层属性'
      },
      list: [
        {
          name: 'jyk1'
        },
        {
          name: 'jyk2'
        },
        
      ]
    }
  })

  const person = reactive(_person)

  // 显示结构
  console.log('person：', person)

  // keys
  console.log('person.keys：', Object.keys(person))

  // 遍历
  person.$forEach((item, key, index) => {
    console.log(index, key, item)
  })

  // 序列化
  const personText = computed<string>(() => JSON.stringify(person, null ,2))
  
  // $state
  const click1 = () => {
    person.$state = {
      name: '第一层属性11',
      info: {
        a1: '第二层属性22'
      },
      list: [
        {
          name: 'jyk133'
        },
        {
          name: 'jyk244'
        },
      ]
    }
  }

  // $patch
  const click2 = () => {
    person.$patch({
      name: '第一层属性1111',
      info: {
        a1: '第二层属性2222'
      },
      list: [
        {
          name: 'jyk13333'
        },
        {
          name: 'jyk24444'
        },
      ]
    })
  }

  // 第二层 对象
  const click10 = () => {
    person.info.$state = {
      a1: '改第二层 —— state'
    }
  }
  const click11 = () => {
    person.info.$patch({
      a1: '改第二层 —— patch'
    })
  }

  // 第二层 数组
  const click12 = () => {
    person.list.$state = [
      {
        name: '第二层数组 —— state'
      }
    ]
  }
  const click13 = () => {
    person.list.$patch([
      {
        name: '第二层数组 —— patch'
      }
    ])
  }

</script>