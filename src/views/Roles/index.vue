<template>
<div>
  <el-col>
    <el-button type="primary" @click="$refs.addRolesEl.showaddform()">添加角色</el-button>
  </el-col>
  <el-table
    :data="tableData"
    style="width: 100%">

    <el-table-column type="expand">
      <template slot-scope="scope">
        <!-- row 是行， col 是列 -->
        <el-row v-for="first in scope.row.children" :key="first.id">

          <el-col :span="2">
            <el-tag closable>{{ first.authName }}</el-tag>
          </el-col>

          <el-col :span="22">
            <el-row v-for="second in first.children" :key="second.id">
              <el-col :span="2">
                <el-tag closable type="warning">{{ second.authName }}</el-tag>
              </el-col>
              <el-col :span="20">
                <!--
                  @close => 这个事件是 Vue 中的事件， 是关闭 tag 时触发的事件
                  @click => 这个事件是 Vue 中的事件， 点击 Tag 时触发的事件
                -->
                <el-tag
                  closable
                  type="info"
                  v-for="third in second.children"
                  :key="third.id"
                  @close="handleDeleteRights(scope.row, third)">{{ third.authName }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>

    <el-table-column
      type="index"
      width="50">
    </el-table-column>

    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>

    <el-table-column
      label="描述"
      prop="roleDesc">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="props">
        <el-button
          size="mini"
          type="info">编辑</el-button>
        <el-button
          size="mini"
          type="danger">删除</el-button>
        <el-button
          size="mini"
          type="success"
          @click="$refs.editRightsEl.showeditRightsEl(props.row)">授权</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加角色 -->
  <addRoles ref="addRolesEl" v-on:add-success="loadRoles()"></addRoles>
  <!-- /添加角色 -->

  <!-- 角色授权 -->
  <editRights ref="editRightsEl" @edit-rights-success="loadRoles"></editRights>
  <!-- /角色授权 -->
</div>
</template>

<script>
import { getRolelist, RoleRightByidDel } from '@/api/role.js'
import addRoles from './add'
import editRights from './editRights'
export default {
  name: 'RolesList',
  components: {
    addRoles,
    editRights
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    // 获取角色列表
    async loadRoles () {
      const { data, meta } = await getRolelist()
      if (meta.status === 200) {
        this.tableData = data
        // console.log(data)
      }
    },

    // 删除角色权限
    async handleDeleteRights (role, right) {
      console.log(role)
      const { data, meta } = await RoleRightByidDel(role.id, right.id)
      if (meta.status === 200) {
        // 这里刷新列表的话不合适
        // 参数role 就是当前循环向，
        role.children = data
      }
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-top: 5px;
  margin-right: 5px;
}
.el-input__inner {
  width: 30 px;
}

</style>
