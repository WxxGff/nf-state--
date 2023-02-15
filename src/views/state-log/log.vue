<template>
  <el-button type="" @click="state.$clearLog()">清空日志</el-button><br>
  <div class="el-table--fit el-table--border el-table--group el-table--enable-row-hover el-table--enable-row-transition el-table el-table--layout-fixed is-scrolling-none"
    style="height:400px;width:1250px;overflow:auto;padding: 20px;"
  >
    <table class="el-table__body" border="0" cellpadding="0" cellspacing="0" sytle="table-layout: fixed;" >
      <thead class="is-group">
        <tr>
          <th>序号</th><th>时间</th><th>类型</th><th>原值</th><th>新值</th><th>提交值</th><th>定位(F12)</th>
        </tr>
      </thead>
      <tr 
        v-for="(item, key) in state.$log"
        :key="key"
      >
        <td style="width:40px">
          {{key}}
        </td>
        <td style="width:100px">
          {{getdate(item.time)}}
        </td>
        <td style="width:100px">
          {{item.kind}}
        </td>
        <td style="width:400px">
          <div
            v-for="(item2, key2) in item.oldValue"
            :key="key2"
          >
            {{key2}}：{{item2}}
          </div>
        </td>
        <td style="width:400px">
          <div
            v-for="(item2, key2) in item.newValue"
            :key="key2"
          >
            {{key2}}：{{item2}}
          </div>
        </td>
        <td style="width:400px">
          <div
            v-for="(item2, key2) in item.subValue"
            :key="key2"
          >
            {{key2}}：{{item2}}
          </div>
        </td>
        <td>
          <a href="javascript:"
            style="cursor:pointer;"
            @click="position(item.callFun)"
          >
            点我
          </a>
        </td>
      
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { IState } from '../../../lib/types/type'

  interface Props {
    state: IState
  }

  // 对 defineProps() 的响应性解构
  // 默认值会被编译为等价的运行时选项
  defineProps<Props>()

  // const { state } = props
  
  // 定位代码位置
  const position = (stack: string) => {
    console.log(stack)
  }

  const getdate = (ts: number) => {
    const now = new Date(ts)
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)
      + " " + now.toTimeString().substr(0, 8)
  }

</script>