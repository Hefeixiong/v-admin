import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/v-admin/user/info',
    method: 'get',
    params: {token}
  })
}
