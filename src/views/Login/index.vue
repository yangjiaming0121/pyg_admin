<template>
  <div class="login">
    <div class="login-form">
      <el-form label-width="80px" :rules="loginformrules" ref="ruleForm" :model="loginform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginform.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Axios from 'axios'
import { login } from '@/api/login.js'
export default {
  name: 'login',
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      loginformrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 该正常发送请求了
          login(this.loginform).then(res => {
            const { data, meta } = res
            // console.log(meta)
            if (meta.status === 200) {
              window.localStorage.setItem('token', data.token)
              this.$notify({
                title: '成功',
                message: '登录成功',
                type: 'success'
              })
              this.$router.push('/')
            } else {
              this.$notify.error({
                title: '错误',
                message: `${meta.msg}`
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  height: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  height: 200px;
  width: 400px;
  background-color: aliceblue;
  border-radius: 10px;
  padding: 50px;
}
.login-btn {
  width: 100%;
}
</style>
