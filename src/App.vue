<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { ElContainer, ElHeader, ElFooter, ElAside, ElMain, ElSwitch } from 'element-plus'
  import { useRouter } from '@naturefw/ui-core'
  
  export default defineComponent({
    components: {
      ElContainer,
      ElHeader,
      ElFooter,
      ElAside,
      ElMain,
      ElSwitch
    },
    setup () {
      const itemProps = {
        'inline-prompt': true,
        'active-text': '多',
        'inactive-text': '单',
        'active-color': '#378FEB',
        'inactive-color': '#EA9712'
      }

      const isTabs = ref<boolean>(true)

      const router = useRouter()

      const myselect = (index, indexPath) => {
        console.log('select-外面', index, indexPath)
        // 验证权限，如果没有权限，加载登录
        // router.currentRoute.paths = ''
        // router.currentRoute.key = ''
      }

      return {
        myselect,
        isTabs,
        itemProps
      }
    }
  })
</script>

<template>
  <el-container>
    <el-header>
      <!--导航-->
      <div style="float: left;">
        <!--写网站logo、标题等-->
        <h1>nf-state 轻量级状态管理</h1>
      </div>
      <div style="float: right;min-width: 100px;height: 40px;padding-top: 3px;">
        <!--写网站logo、标题等-->
        <el-switch v-model="isTabs" v-bind="itemProps"></el-switch>
      </div>
      <div style="float: right;min-width: 600px;height: 60px;">
        <!--网站导航-->
      </div>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <!--菜单 -->
        <nf-menu @select="myselect"/>
      </el-aside>
      <el-container>
        <el-main>
          <!--编辑区域  -->
          <nf-router-view v-if="!isTabs"></nf-router-view>
          <nf-router-view-tabs v-if="isTabs"></nf-router-view-tabs>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>
body {
  background-color:#f3e8d7;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color: #f5f2ed;
  margin: 0px;
}
.el-header{
  background-color: #959a9e;
  color: #f5f2ed;
  text-align: left;
}
.el-footer {
  background-color: #7e8285;
  color: #f5f2ed;
  text-align: left;
}

.el-aside {
  background-color: #6c747c;
  color: var(--el-text-color-primary);
  text-align: left;
  min-height: 700px;
}

.el-main {
  background-color: #f5f2ed;
  color: var(--el-text-color-primary);
  text-align: left;
  padding: 5px;
  min-height: 700px;
}
</style>
