<template>
  <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="角色名称" label-width="80px">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="80px">
        <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="adduserRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole } from '@/api/role.js'
export default {
  name: 'addRoles',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    showaddform () {
      this.dialogFormVisible = true
    },
    async adduserRole () {
      const { roleName, roleDesc } = this.form
      const { data } = await addRole(roleName, roleDesc)
      if (data.meta.status === 201) {
        this.dialogFormVisible = false
        this.$emit('add-success')
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
