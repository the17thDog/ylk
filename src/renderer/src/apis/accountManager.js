import request from './request'

export function requestAccounts(data) {
  return request({
    url: '/user/list',
    data
  })
}

export function requestCreateAccount(params) {
  return request({
    url: '/user/addAccountInfo',
    data: {
      ...params
    }
  })
}

export function requestModifyAccount(params) {
  return request({
    url: '/user/updateAccountInfo',
    data: {
      ...params
    }
  })
}

export function requestDeleteAccount(id) {
  return request({
    url: '/user/deleteAccountInfo',
    data: {
      id,
    }
  })
}

export function requestDisableAccount(id) {

  return request({
    url: '/user/updateAccountInfo',
    data: {
      id,
      status: 0
    }
  })
}

export function requestEnableAccount(id) {
  return request({
    url: '/user/updateAccountInfo',
    data: {
      id,
      status: 1
    }
  })
}
