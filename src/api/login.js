import http from '@/utils/http.js'

export const login = (data) => {
  return http({
    method: 'post',
    url: '/login',
    data: {
      username: data.username,
      password: data.password
    }
  }).then(res => {
    return res.data
  })
}
