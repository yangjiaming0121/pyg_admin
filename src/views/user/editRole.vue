<template>
  <el-dialog
    title="分配角色"
    :visible.sync="fomrVisible"
    width="40%"
    ref="addFormEl">
    <el-form
      :model="editForm"
      size="mini"
      label-position="left"
      :rules="formRules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px" prop="email">
        <template>
          <el-select placeholder="请选择" v-model="editForm.rid">
            <el-option :value="-1" label="请选择"></el-option>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fomrVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEditrole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRolelist } from '@/api/role'
import { userByid, UpdatauserRole} from '@/api/user'
export default {
  name: 'UserEditRole',
  data () {
    return {
      fomrVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile : ''
      },
      roles: [],
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleEditrole () {
      const { data, meta } = await UpdatauserRole(this.editForm.id, this.editForm.rid)
      if (meta.status === 200) {
        this.fomrVisible = false
        this.$notify({
          title: '成功',
          message: '设置角色成功',
          type: 'success'
        })
      }
    },
    async showEditDialog (item) {
      // 如果不考虑安全的情况下可以这样使用，在点击编辑的时候，传过来一个当前循环遍历的项，在这把这个项赋值给data 中的成员，
      // 发送保存编辑的请求的时候，就可以使用这个数据，

      // 如果考虑安全，就需要重新发送一次请求，根据 id 可以获取到当前的用户信息，这时候获取的用户信息是安全的，在后台返回来的，
      // 如果不发送这次请求，有其他用户改动用户的数据的时候，我不刷新页面的情况下，我是获取不到最新的数据。
      const { data: datas } = await userByid(item.id)
      this.editForm = datas
      this.fomrVisible = true
      const { data, meta } = await getRolelist()
      if (meta.status === 200) {
        this.roles = data
      }
    }
  }
}
</script>

<style>
</style>
