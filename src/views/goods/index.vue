<template>
<div>

  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
        placeholder="请输入内容"
        v-model="SearchText"
        @keyup.enter.native="loadgoodsList(1)">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="$router.push('/toadd')">添加商品</el-button>
    </el-col>
  </el-row>

  <el-table
    :data="goods"
    :v-loading="true"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.6)"
    stripe
    style="width: 100%">
    <el-table-column
      type="index"
      label="编号">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="140">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格"
      width="140">
    </el-table-column>
    <el-table-column
      prop=""
      label="商品状态"
      width="140">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量"
      width="140">
    </el-table-column>
    <!--
      这里使用的是全局过滤器，就是一个函数，可以在全局调用，管道符前边的是第一个参数，
      在过滤器里就可以操作这个参数，并且返回，{{  }} 就可以接收到返回的数据
      ** 过滤器中操作这个事件戳的是 dayjs 第三方库，这个库可以格式化时间，格式成自己想要的那种数据
     -->
    <el-table-column
      prop="add_time"
      label="创建时间"
      width="140">
      <template slot-scope="scoped">{{ scoped.row.add_time | dataformat }}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template>
        <el-button
          size="mini"
          type="info">编辑</el-button>
        <el-button
          size="mini"
          type="danger">删除</el-button>
        <el-button
          size="mini"
          type="success">审核</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="10  "
    @current-change="loadgoodsList">
  </el-pagination>

</div>
</template>

<script>

import { getgoodslist } from '@/api/goods'

export default {
  name: 'goodsList',
  data () {
    return {
      SearchText: '',
      goods: [],
      total: 0
    }
  },
  created () {
    this.loadgoodsList()
  },
  methods: {
    // 获取商品列表
    async loadgoodsList (page) {
      const { data, meta } = await getgoodslist(page, 10, this.SearchText)
      if (meta.status === 200) {
        this.total = data.total
        this.goods = data.goods
      }
    }
  }
}
</script>

<style>

</style>
