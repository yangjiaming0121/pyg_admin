<template>
  <el-dialog title="授权角色" :visible.sync="dialogFormVisible">
    <!--
      tree 组件
      data 数据
      show-checkbox 是否显式复选框
      node-key 用来指定数据中唯一的标识字段
      default-expanded-keys 默认展开的节点 id
      default-checked-keys 默认选中的节点
      **
      default-expand-all 默认展开所有选项，

    -->
    <el-tree
      :data="rights"
      show-checkbox
      default-expand-all
      :default-checked-keys="defaultChecked"
      node-key="id"
      ref="tree"
      :props="defaultProps">
    </el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRightsList, updateRightsByRoleId } from '@/api/Rights'
export default {
  name: 'editRights',
  data () {
    return {
      dialogFormVisible: false,
      rights: [],
      defaultChecked: [],
      defaultProps: {
        children: 'children', // 告诉 tree 你的数据中哪个字段是子节点数组
        label: 'authName' // 告诉 tree 你的数据中哪个字段是节点的文本
      },
      role: {}
    }
  },
  methods: {
    // 显示
    showeditRightsEl (item) {
      this.role = item
      this.dialogFormVisible = true
      this.loadRights()
      this.getRights(item.children)
    },

    // 获取用户的权限 id 数组
    getRights (roleRights) {
      const tmp = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          // 只需要三级节点的 id 就可以了，因为父级会根据子级自动选中
          second.children.forEach(third => tmp.push(third.id))
        })
      })
      this.defaultChecked = tmp
    },

    // 获取树状角色权限
    async loadRights () {
      const { data, meta } = await getRightsList('tree')
      if (meta.status === 200) {
        this.rights = data
      }
    },

    // 角色授权
    async handleSubmit () {
      const tree = this.$refs.tree
      const rids = [...tree.getCheckedKeys(), ...tree.getHalfCheckedKeys()].join(',')
      const { data } = await updateRightsByRoleId(this.role.id, rids)
      if (data.meta.status === 200) {
        this.$emit('edit-rights-success')
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '授权成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
