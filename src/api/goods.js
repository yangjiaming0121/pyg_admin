import http from '@/utils/http.js'

export const getgoodslist = (pagenum = 1, pagesize = 10, query = '') => {
  return http({
    method: 'GET',
    url: '/goods',
    params: {
      pagenum,
      pagesize,
      query
    }
  }).then(res => res.data)
}
