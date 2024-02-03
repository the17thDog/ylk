import request from './request'

export function requestLogin(data) {
  return request({
    url: '/user/login',
    data
  })
}

export function requestChangePassword(data) {
  return request({
    url: '/user/resetPassword',
    data
  })
}

export function requestLogout(data) {
  return request({
    url: '/user/logout',
    data
  })
}


export function requestGetUserInfo() {
  return request({
    url: '/user/getAccountInfo',
    method: 'get',
  })
}

export function requestModifyNickname(data) {
  return request({
    url: '/user/updateAccountInfo',
    data
  })
}
