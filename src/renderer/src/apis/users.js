import request from './request'

export function requestLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
