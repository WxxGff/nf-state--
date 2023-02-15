<template>
  <el-button type="" @click="state.$clearLog()">清空日志</el-button><br>
   <el-table
    :data="list"
    :height="350"
    stripe
    border="true"
    :default-sort="{ prop: 'time2', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column sortable prop="time2" label="时间" width="90" header-align="center" />
    <el-table-column prop="kind" label="类型" width="80" header-align="center"  />
    <el-table-column prop="oldValue" label="原值" width="300"  header-align="center">
      <template #default="scope">
        <el-input
          v-model="scope.row.oldValue"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="newValue" label="新值" width="300"  header-align="center">
      <template #default="scope">
        <el-input
          v-model="scope.row.newValue"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="subValue" label="提交" width="300" header-align="center">
      <template #default="scope">
        <el-input
          v-model="scope.row.subValue"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="st" label="定位(F12)" width="50"  header-align="center">
      <template #default="scope">
        <a href="javascript:"
          style="cursor:pointer;"
          @click="position(scope.row.callFun)"
        >
          点我
        </a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { IState, StateLogInfo } from '../../../lib/types/type'

  interface Props {
    state: IState
  }

  // 对 defineProps() 的响应性解构
  // 默认值会被编译为等价的运行时选项
  const { state } = defineProps<Props>()


  const getdate = (ts: number) => {
    const now = new Date(ts)
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)
      + " " + now.toTimeString().substr(0, 8)
  }

  const list = computed(() => {
    const arr: Array<StateLogInfo> = []
    state.$log.forEach((item, index) => {
      const tmp: StateLogInfo = {
        time: item.time,
        time2: getdate(item.time),
        kind: item.kind,
        oldValue: JSON.stringify(item.oldValue, null, 2),
        newValue: JSON.stringify(item.newValue, null, 2),
        subValue: JSON.stringify(item.subValue, null, 2),
        callFun: item.callFun
      }
      arr.push(tmp)
    })

    return arr
  })

  // 定位代码位置
  const position = (stack: string) => {
    console.log(stack)
  }


</script>