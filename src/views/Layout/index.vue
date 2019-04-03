<template>
  <el-container>
    <el-header>
    <AppHeader></AppHeader>
    </el-header>
    <el-container>
      <el-aside width="200px" class="Aside">
        <!-- 侧边栏 -->
        <AppAside></AppAside>
        <!-- /侧边栏 -->
      </el-aside>
      <el-main class="Main">
        <el-card class="box-card">

          <!-- 公共面包屑 -->
          <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- /公共面包屑 -->

          <router-view></router-view>

        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './header.vue'
import AppAside from './aside.vue'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    AppHeader,
    AppAside
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // }
  }
}
</script>

<style scoped>
.el-header {
  background-color:#ccc;
}
.app-header {
  display: flex;
  align-items: center;
}
.el-container {
  height: 100%;
}
.el-menu {
  height: 100%;
  background-color: #ccc;
}
.el-card {
  min-height: 100%;
}
</style>
