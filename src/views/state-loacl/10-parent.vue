<template>
  局部状态——父组件。<br><br>
  在js文件里注册，父、子组件引入。<br><br>
 
  数据：{{state2.dataList}}<br><br>
  查询：{{state2.findValue}}<br><br>
  页号：{{state2.pagerInfo.pagerIndex}}<br><br>
  <el-button type="" @click="state2.pagerInfo.pagerIndex++">翻页</el-button><br>
  <el-button type="" @click="state2.$reset()"> 重置</el-button> <br>
  
  <el-input
    v-model="stateText"
    type="textarea"
    :autosize="{ minRows: 5, maxRows: 10 }"
  ></el-input>
  
  <hr>
  <!--查询-->
  <list-find></list-find><br><br>
  <!--翻页-->
  <list-pager></list-pager><br><br>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { regListState } from './test-list'

  // 加载组件
  // 翻页
  import listPager from './20-pager.vue'
  // 翻页
  import listFind from './30-find.vue'

  // 创建 js 里面定义的局部状态
  const state2 = regListState()

  const stateText = computed(() => JSON.stringify(state2, null , 2))
   
</script>