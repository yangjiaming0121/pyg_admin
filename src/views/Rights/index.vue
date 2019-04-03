<template>
  <el-table
    :data="Rights"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
        {{ ["一级", "二级", "三级"][scope.row.level] }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getRightsList } from '@/api/Rights.js'

export default {
  name: 'RightsList',
  data () {
    return {
      Rights: []
    }
  },
  created () {
    this.RoghtsList()
  },
  methods: {
    async RoghtsList () {
      const { data, meta } = await getRightsList('list')
      if (meta.status === 200) {
        this.Rights = data
      }
    }
  }
}
</script>

<style>

</style>
