<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :router="true">
    <el-submenu :index="one.path  " v-for="one in menus" :key="one.id">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ one.authName }}</span>
      </template>

      <el-menu-item :index="two.path" v-for="two in one.children" :key="two.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ two.authName }}</span>
        </template>
      </el-menu-item>

    </el-submenu>

    <!-- <el-submenu index="2">

      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>

      <el-menu-item index="/Roles">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>角色列表</span>
        </template>
      </el-menu-item>

      <el-menu-item index="/Rights">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限列表</span>
        </template>
      </el-menu-item>

    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="3-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3-2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类参数</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3-3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类列表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="4-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单列表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item index="4-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据报表</span>
        </template>
      </el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
import { asidermenu } from '@/api/Rights'
export default {
  name: 'Aside',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadasidergiht()
  },
  methods: {
    async loadasidergiht () {
      const { data, meta } = await asidermenu()
      if (meta.status === 200) {
        this.menus = data
      }
    }
  }
}
</script>
<style scoped>

</style>
