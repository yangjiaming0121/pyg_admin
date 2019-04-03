import http from '@/utils/http.js'

// 获取商品分类列表
export const getgoodscategroylist = (type = 3) => {
  return http({
    method: 'GET',
    url: '/categories',
    params: {
      type
    }
  }).then(res => res.data)
}

// 添加商品
export const addgoods = ({ goods_name, goods_cat, goods_price, goods_number, goods_weight }) => {
  return http({
    method: 'post',
    url: '/goods',
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight
    }
  }).then(res => res.data)
}
