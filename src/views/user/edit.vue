<template>
  <el-dialog
    title="编辑用户"
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
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="fomrVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userEdit } from '@/api/user'
export default {
  name: 'UserEdit',
  data () {
    return {
      fomrVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      formRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit () {
      this.$refs.addFormEl.validate(async (valid) => {
        if (valid) {
          const { meta } = await userEdit(this.editForm.id, this.editForm)
          if (meta.status === 200) {
            this.fomrVisible = false
            // 这里的知识点就是一个时间，编辑成功的事件，如果想编辑成功之后重新加载列表，这里是没有这个方法的，index中有，
            // 所以我们在这添加一个成功的事件，只要编辑成功，这个事件就会触发，在哪里都可以监听
            // 这里就是在子组件的标签上添加这个事件，成功之后重新加载列表
            this.$emit('edit-success')
            this.$notify({
              title: '成功',
              message: '编辑成功',
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
    showEditDialog (item) {
      // 如果不考虑安全的情况下可以这样使用，在点击编辑的时候，传过来一个当前循环遍历的项，在这把这个项赋值给data 中的成员，
      // 发送保存编辑的请求的时候，就可以使用这个数据，

      // 如果考虑安全，就需要重新发送一次请求，根据 id 可以获取到当前的用户信息，这时候获取的用户信息是安全的，在后台返回来的，
      // 如果不发送这次请求，有其他用户改动用户的数据的时候，我不刷新页面的情况下，我是获取不到最新的数据。
      this.editForm = item
      this.fomrVisible = true
    }
  }
}
</script>

<style>
</style>
