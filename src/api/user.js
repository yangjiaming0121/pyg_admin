import http from '@/utils/http.js'

// 获取列表
export const getuserlist = ({ pagenum = 1, pagesize = 5, query = '' }) => {
  return http({
    method: 'get',
    url: '/users',
    params: { // 传递 GET 参数
      pagenum,
      pagesize,
      query
    }
  }).then(res => res.data)
}

// 添加用户
export const addUser = ({ username, password, email, mobile }) => {
  return http({
    method: 'post',
    url: '/users',
    data: { // 传递 GET 参数
      username,
      password,
      email,
      mobile
    }
  }).then(res => res.data)
}

// 改变用户状态
export const changeuserstate = (id, state) => {
  return http({
    method: 'put',
    url: `/users/${id}/state/${state}`
  }).then(res => res.data)
}

// 删除单个用户
export const userdelete = (id) => {
  return http({
    method: 'delete',
    url: `users/${id}`
  }).then(res => res.data)
}

// 编辑用户
export const userEdit = (id, { email, mobile }) => {
  console.log(id, email, mobile)
  return http({
    method: 'put',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  }).then(res => res.data)
}

// 根据用户 id 获取值
export const userByid = (id) => {
  return http({
    method: 'GET',
    url: `users/${id}`
  }).then(res => res.data)
}

// 编辑用户角色
export const UpdatauserRole = (id, rid) => {
  return http({
    method: 'put',
    url: `/users/${id}/role`,
    data: {
      rid
    }
  }).then(res => res.data)
}
