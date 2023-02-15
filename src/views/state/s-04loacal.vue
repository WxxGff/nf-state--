<template>
  局部状态的测试：<br>
 
  <br>
  <hr>
  <el-row :gutter="20">
    <el-col :span="10">
      父组件1：
      <parent></parent>
    </el-col>
    <el-col :span="10">
      父组件2：
      <parent></parent>
    </el-col>
  </el-row>
  
</template>

<script>
import { store } from '/nf-state'
import { ElRow, ElCol } from 'element-plus'

// 组件
import parent from './parent.vue'

console.log('--------')
console.log(store)

</script>

<script setup>

/*
watchState.trackTest((path, key, value, oldValue) => {
  if (path === '') {
    console.log(`\nstateKey.${key}=`)
  } else {
    console.log(`\nstateKey.${path.replace(',','.')}.${key}=` )
  }
  console.log('oldValue:', oldValue)
  console.log('value:', value )
  // return null
})


watchState.test2((path, key, value, oldValue) => {
  console.log(`\ntest2.${key}=`)
  console.log('oldValue:', oldValue)
  console.log('value:', value )
  // return null
})
*/

const testState = () => {
  state.user.name = new Date().valueOf()
}

const testReadonly = () => {
  state.dbFlag.project_db_meta = new Date().valueOf()

}

const testTract = () => {
  state.trackTest.name = new Date().valueOf()

}

const testTract2 = () => {
  state.trackTest.children1.name1 = new Date().valueOf()

}
 
const testTract3 = () => {
  state.trackTest.children1.children2.name2 = new Date().valueOf()
  state.test2.name = new Date().valueOf()

}

</script>