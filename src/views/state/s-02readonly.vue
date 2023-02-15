<template>
  状态的测试：<br>
  <el-button type="" @click="testReadonly">修改只读状态</el-button>
  <el-button type="" @click="ulogin">模拟登录</el-button>
  <el-button type="" @click="ulogout">模拟退出</el-button>
  <el-button type="" @click="updateUser">直接修改用户信息（只读）</el-button>

  <br>
  
  <hr>
  轻量级状态，setup 返回的状态：<br><br>
  全局状态-user：{{state.user}}<br><br>
  只读状态-user1：{{state.user1}}<br><br>
  只读状态-dbFlag：{{state.dbFlag}}<br>

  <hr>
  
</template>

<script>
import { store } from '/nf-state'
import userController from './controller/userController.js'
import { ElButton } from 'element-plus'

console.log('--------')
console.log(store)

</script>

<script setup>

const { login, logout } = userController()
// 模拟登录
const ulogin = () => {
  login('jyk', '123')
}
// 模拟退出登录
const ulogout = () => {
  logout()
}

// 模拟修改用户
const updateUser = () => {
  state.user.name = '直接修改用户名' // 不是只读的可以改
  state.user1.name = '直接修改用户名' // 只读的不可以改
  state.user1.info.name = '直接修改用户名' // 二级属性也不能改

}

const testReadonly = () => {
  state.dbFlag.project_db_meta = new Date().valueOf()

}

</script>