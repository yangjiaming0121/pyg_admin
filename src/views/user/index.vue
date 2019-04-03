<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="请输入内容"
          v-model="SearchText"
          @keyup.enter.native="loadusers()">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>


    <el-table
      :data="userdata"
      v-loading="userloading"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      stripe
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>

      <!-- 状态列 -->
      <el-table-column label="用户状态">
        <!--
          template 是自定义列内容的一个标签
          slot-scope 是你自定义的这一列需要的数据
          scope 就是你渲染表格使用的数据（你写在 el-table 中那个 data 属性的数组）
          row 就是在循环过程中的当前行（类似于我们 v-for 的时候那个 item）
        -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handlechangestate(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <!-- /状态列 -->

      <!--
        在 vue 里面，每一个元素你都可以给他添加一个 ref 属性
        在 Vue 里面使用 $refs 就能拿到一个对象，对象里面的成员就是拥有 ref 属性的元素
        例如：
          有一个 <div ref="box"></div>
          那么当你使用 $refs 的时候，这个对象中就有一个 box 成员
          $refs = {
            box: <div></div>
          }
        这个 $refs 是 Vue 中到了万不得已的时候给我们提供了一个属于 Vue 的操作 DOM 的方式
      -->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--
            点击编辑的时候，需要调用edit中的方法，来显示这个弹出框
            这里用到了， refs 这个知识点，
            1.给需要显示的子组件元素 添加 ref属性， 值就是userEditEl
            2.showEditDialog 这个方法在子组件中， 在这调用
            -->
          <el-button
            size="mini"
            type="info"
            @click="$refs.userEditEl.showEditDialog(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="success"
            @click="$refs.userEditRoleEl.showEditDialog(scope.row)">角色分配</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      @current-change="loadusers">
    </el-pagination>
    <!-- /分页组件 -->

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="500px">
      <el-form :model="addFormData" :rules="adduserformrules" ref="ruleForm">
        <el-form-item label="用户名称" label-width="100px" prop="username">
          <el-input v-model="addFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="100px" prop="password">
          <el-input v-model="addFormData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="addFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" prop="mobile">
          <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="Handleadd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加用户 -->

    <!-- 编辑用户 -->
    <userEdit ref="userEditEl" v-on:edit-success="loadusers()"></userEdit>
    <!-- /编辑用户 -->

    <!-- 分配角色 -->
    <UserEditRole ref="userEditRoleEl"></UserEditRole>
    <!-- /分配角色 -->
  </div>
</template>

<script>
import { getuserlist, addUser, changeuserstate, userdelete } from '@/api/user.js'
import userEdit from './edit'
import UserEditRole from './editRole'

export default {
  name: 'userslist',
  data () {
    return {
      userdata: [],
      SearchText: '',
      addFormVisible: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      adduserformrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.loadusers()
  },
  methods: {
    // 获取用户列表
    async loadusers (page = 1) {
      this.userloading = true
      const { data } = await getuserlist({ pagenum: page, pagesize: 5, query: this.SearchText })
      this.total = data.total
      this.userdata = data.users
      this.userloading = false
    },
    // 添加用户
    Handleadd () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.addFormVisible = true
          const { meta } = await addUser(this.addFormData)
          if (meta.status === 201) {
            this.$refs.ruleForm.resetFields()
            this.addFormVisible = false
            this.loadusers()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: `${meta.msg}`
            })
          }
        } else {
          return false
        }
      })
    },
    // 修改用户状态
    async handlechangestate (item) {
      const { data, meta } = await changeuserstate(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$notify({
          title: '成功',
          message: `${data.mg_state ? '启用' : '禁用'}用户成功`,
          type: 'success'
        })
      }
    },
    // 删除用户
    handleDelete (item) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await userdelete(item.id)
        if (meta.status === 200) {
          this.$notify({
            title: '成功',
            message: `删除用户成功`,
            type: 'success'
          })
          this.loadusers()
        }
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: `已取消删除`
        })
      })
    }
    // 查找用户
    // 模糊查询，获取列表的时候有个 query 参数，这个参数就是可以模糊查询的
  },
  components: {
    userEdit,
    UserEditRole
  }
}
</script>

<style scoped>
.el-table--fit {
  margin-top: 10px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
