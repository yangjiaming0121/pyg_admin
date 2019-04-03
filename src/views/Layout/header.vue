<template>
  <el-row class="app-header">
    <el-col :span="4">
      <img src="./logo.png" alt="黑马程序员">
    </el-col>
    <el-col :span="16">黑马程序员</el-col>
    <el-col :span="4">
      <el-button type="primary" @click.prevent="logout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.$router.replace('/login')
        this.$notify({
          title: '成功',
          message: '退出成功',
          type: 'success'
        })
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: `已取消退出`
        })
      })
    }
  }
}
</script>

<style scoped>
.el-col-16 {
  text-align: center;
  color: #ffffff;
  font-size: 24px;
}
</style>
