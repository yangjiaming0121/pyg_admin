<template>
  <div>
    <div class="add-from-top">添加商品信息</div>
    <el-steps :active="0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-tabs tab-position="left" style="height: 100%;">

      <!-- 基本信息 -->
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="formdata" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="formdata.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model.number="formdata.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model.number="formdata.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model.number="formdata.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
              }"
              v-model="formdata.goods_cat">
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formdata.is_promote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 基本信息 -->


      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { getgoodscategroylist, addgoods } from '@/api/goods_categroy'

export default {
  name: 'GoodsAdd',
  data() {
    return {
      formdata: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: '',
      },
      options: []
    }
  },

  created () {
    this.loadgoodscategroy()
  },
  methods: {
    // 获取商品分类列表
    async loadgoodscategroy () {
      const { data, meta } = await getgoodscategroylist()
      if (meta.status === 200) {
        this.options = data
      }
    },

    // 添加商品
    async handleSubmit () {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight
      } = this.formdata
      const { data, meta } = await addgoods({
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight
      })
      if (meta.status === 201) {
        this.$router.push('/goods')
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
.add-from-top {
  margin-bottom: 15px;
  background-color: #ccc;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}
.el-steps {
  margin-bottom: 20px;
}
</style>
