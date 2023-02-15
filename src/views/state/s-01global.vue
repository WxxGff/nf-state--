<template>
  状态的测试：<br>
  <el-button type="" @click="testState">修改状态</el-button>
  <el-button type="" @click="testTract2">修改第二层属性</el-button>
  <el-button type="" @click="testTract3">修改第三层属性</el-button>

  <hr>
  轻量级状态，直接从模板读取：<br>
  全局状态-user：{{$state.user}}<br>
  <hr>
  轻量级状态，setup 返回的状态：<br>
  全局状态-user：{{store.user}}<br>
  只读状态-userCenter：{{store.userCenter}}<br>
  只读状态-dataList：{{store.dataList}}<br>
  只读状态-dataList2：{{store.dataList2}}<br>
 

  <hr>
  <el-input
    v-model="textarea1"
    :autosize="{ minRows: 5, maxRows: 15 }"
    type="textarea"
    placeholder="Please input"
  />
  
</template>

<script>
import { store } from '/nf-state'
import { ElButton } from 'element-plus'

console.log('--------')
console.log(store)

</script>

<script setup>

const textarea1 = '' // JSON.stringify(state.platMeta, null, 2)

/*
watchState.test2((path, key, value, oldValue) => {
  console.log(`\ntest2.${key}=`)
  console.log('oldValue:', oldValue)
  console.log('value:', value )
  // return null
})
*/

const testState = () => {
  store.user.name = new Date().valueOf()
}

const testTract2 = () => {
  store.userCenter.name = new Date().valueOf()
}
 
const testTract3 = () => {
  store.dataList.push(new Date().valueOf())
  store.dataList2.push(new Date().valueOf())
  
}

</script>