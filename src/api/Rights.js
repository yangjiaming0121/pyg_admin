
import http from '@/utils/http.js'

// 所有权限列表
export const getRightsList = (parameter) => {
  return http({
    method: 'get',
    url: `rights/${parameter}`
  }).then(res => res.data)
}

// 角色授权
export const updateRightsByRoleId = (roleId, rids) => {
  return http({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}

// 左侧菜单权限
export const asidermenu = () => {
  return http({
    method: 'GET',
    url: 'menus'
  }).then(res => res.data)
}
