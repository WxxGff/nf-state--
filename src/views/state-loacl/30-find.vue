<template>
  查询组件
  <el-input v-model="query" placeholder=""></el-input>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  import { getListState } from './test-list'

  // 获取里面定义的局部状态
  const state2 = getListState()

  const query = ref<string>('')

  watch(query, (txt: string) => {
    state2.findValue.name = txt
  })

</script>