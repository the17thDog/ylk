import request from './request'

export function requestAccounts(data) {
  return request({
    url: '/user/list',
    data
  })
}

export function requestCreateAccount(params) {
  return Promise.resolve()

  return request({
    url: '',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function requestDeleteAccount(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}

export function requestDisableAccount(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}

export function requestEnableAccount(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}
