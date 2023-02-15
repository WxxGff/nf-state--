<template>
  翻页组件
  <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="50"
    :page-size="10"
    v-model:current-page="state2.pagerInfo.pagerIndex"
    class="mt-4"
  />
</template>

<script setup lang="ts">
  // import type { StateGA } from '../../types/typs'

  import { getListState } from './test-list'

  // 获取里面定义的局部状态
  const state2 = getListState()
   
</script>