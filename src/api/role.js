import http from '@/utils/http.js'

// 获取角色列表
export const getRolelist = () => {
  return http({
    method: 'GET',
    url: '/roles'
  }).then(res => res.data)
}

// 添加角色
export const addRole = (roleName, roleDesc) => {
  return http({
    method: 'post',
    url: 'roles',
    data: {
      roleName,
      roleDesc
    }
  })
}

// 删除角色制定权限
export const RoleRightByidDel = (roleId, rightId) => {
  return http({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  }).then(res => res.data)
}
